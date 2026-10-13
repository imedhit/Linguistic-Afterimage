/**
 * Web Audio API Engine for Ec(ak)ou Ghost Speech Transduction
 * Generates synthetic ghost speech harmonics, vocal formants, and ambient drone
 * without external audio file dependencies.
 */

import { SignalFragment } from '../data/bangaloreMapData';

class GhostAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private pulseInterval: number | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private currentSignal: SignalFragment | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setValueAtTime(440, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(3.5, this.ctx.currentTime);

      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 512;
      this.analyserNode.smoothingTimeConstant = 0.85;

      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyserNode;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setMaskResonanceFrequency(freq: number) {
    if (this.filterNode && this.ctx) {
      this.filterNode.frequency.setTargetAtTime(Math.max(80, Math.min(3200, freq)), this.ctx.currentTime, 0.05);
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, vol)) * 0.25;
      this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
    }
  }

  public playSignal(signal: SignalFragment) {
    this.init();
    if (!this.ctx || !this.filterNode || !this.masterGain) return;

    this.stop();
    this.currentSignal = signal;
    this.isPlaying = true;

    const now = this.ctx.currentTime;
    const { baseFreq, modulationType, harmonics } = signal.audioProfile;

    // Set filter center frequency near signal base frequency
    this.filterNode.frequency.setValueAtTime(baseFreq * 1.8, now);

    // 1. Sub-bass ground carrier
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(baseFreq * 0.5, now);
    subGain.gain.setValueAtTime(0.2, now);
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start();
    this.oscillators.push(subOsc);

    // 2. Harmonic formant oscillators
    harmonics.forEach((hMultiplier, idx) => {
      if (!this.ctx || !this.filterNode) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(baseFreq * hMultiplier, now);

      // Subtle LFO frequency vibrato to simulate organic vocal cords
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(3.5 + idx * 0.7, now);
      lfoGain.gain.setValueAtTime(4.0 + idx * 2.0, now);
      lfo.connect(osc.frequency);
      lfo.start();
      this.oscillators.push(lfo);

      const amp = 0.15 / (idx + 1);
      oscGain.gain.setValueAtTime(amp, now);

      osc.connect(oscGain);
      oscGain.connect(this.filterNode);
      osc.start();
      this.oscillators.push(osc);
    });

    // 3. Pink noise layer for "whisper" or "market" or "cistern"
    this.startNoiseTexture(modulationType);

    // 4. Speculative rhythmic micro-pulses
    this.startModulationCadence(modulationType, signal.audioProfile.tempo, baseFreq);
  }

  private startNoiseTexture(type: string) {
    if (!this.ctx || !this.filterNode) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filter algorithm
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }

    const whiteSource = this.ctx.createBufferSource();
    whiteSource.buffer = noiseBuffer;
    whiteSource.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = type === 'whisper' ? 'highpass' : type === 'cistern-drone' ? 'lowpass' : 'bandpass';
    noiseFilter.frequency.setValueAtTime(type === 'whisper' ? 1200 : type === 'cistern-drone' ? 300 : 800, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const noiseLevel = type === 'whisper' ? 0.09 : type === 'cistern-drone' ? 0.05 : 0.07;
    gain.gain.setValueAtTime(noiseLevel, this.ctx.currentTime);

    whiteSource.connect(noiseFilter);
    noiseFilter.connect(gain);
    gain.connect(this.masterGain!);
    whiteSource.start();

    this.noiseNode = whiteSource;
    this.noiseGain = gain;
  }

  private startModulationCadence(type: string, tempo: number, baseFreq: number) {
    const intervalMs = (60 / tempo) * 1000;

    let beat = 0;
    this.pulseInterval = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.filterNode) return;
      beat++;

      // Subtle vocal formant shift
      const now = this.ctx.currentTime;
      if (type === 'solkattu') {
        // Solkattu rhythmic cadence (Tha-Dhi-Gi-Na-Thom)
        const vowelFreqs = [300, 500, 750, 420, 600];
        const nextFreq = vowelFreqs[beat % vowelFreqs.length];
        this.filterNode.frequency.setTargetAtTime(nextFreq * 1.5, now, 0.04);
      } else if (type === 'whisper') {
        const whisperFreq = baseFreq * (1.8 + Math.sin(beat * 0.8) * 0.4);
        this.filterNode.frequency.setTargetAtTime(whisperFreq, now, 0.08);
      } else if (type === 'metal-resonance') {
        if (beat % 4 === 0) {
          // Cleaver/bell metallic ring impulse
          const pingOsc = this.ctx.createOscillator();
          const pingGain = this.ctx.createGain();
          pingOsc.type = 'triangle';
          pingOsc.frequency.setValueAtTime(baseFreq * 3.8, now);
          pingGain.gain.setValueAtTime(0.08, now);
          pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
          pingOsc.connect(pingGain);
          pingGain.connect(this.masterGain!);
          pingOsc.start();
          pingOsc.stop(now + 0.4);
        }
      }
    }, intervalMs);
  }

  public stop() {
    if (this.pulseInterval !== null) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }

    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore already stopped
      }
    });
    this.oscillators = [];

    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }

    this.isPlaying = false;
    this.currentSignal = null;
  }
}

export const ghostAudio = new GhostAudioEngine();
