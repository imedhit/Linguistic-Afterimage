/**
 * Real-time Oscilloscope and Spectrogram Visualizer
 * Renders live audio output from the Ghost Audio Engine.
 */

import React, { useEffect, useRef } from 'react';
import { ghostAudio } from '../utils/audioEngine';

interface AudioVisualizerProps {
  isPlaying: boolean;
  accentColor?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  accentColor = '#00f5d4'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);

      const analyser = ghostAudio.getAnalyser();
      const width = canvas.width;
      const height = canvas.height;

      // Dark background with slight decay trail
      ctx.fillStyle = 'rgba(7, 10, 16, 0.4)';
      ctx.fillRect(0, 0, width, height);

      // Fine grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridStep = 20;
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (!isPlaying || !analyser) {
        // Idle faint carrier line
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const midY = height / 2;
        ctx.moveTo(0, midY);
        for (let x = 0; x < width; x += 6) {
          const idleWave = Math.sin(x * 0.05 + Date.now() * 0.002) * 1.5;
          ctx.lineTo(x, midY + idleWave);
        }
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const timeData = new Uint8Array(bufferLength);
      const freqData = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(timeData);
      analyser.getByteFrequencyData(freqData);

      // 1. Draw subtle frequency bars (spectrogram background)
      const barCount = 32;
      const barWidth = width / barCount;
      for (let i = 0; i < barCount; i++) {
        const binIndex = Math.floor((i / barCount) * (bufferLength / 3));
        const val = freqData[binIndex] || 0;
        const barHeight = (val / 255) * (height * 0.7);

        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, 'rgba(0, 245, 212, 0.04)');
        gradient.addColorStop(1, 'rgba(244, 63, 94, 0.25)');

        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
      }

      // 2. Draw sharp glowing time-domain waveform
      ctx.lineWidth = 1.75;
      ctx.strokeStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = timeData[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, accentColor]);

  return (
    <div className="relative w-full h-24 bg-[#06080d] border border-white/10 rounded-sm overflow-hidden">
      <canvas
        ref={canvasRef}
        width={360}
        height={96}
        className="w-full h-full block"
      />
      {/* Telemetry overlay labels */}
      <div className="absolute top-1.5 left-2 flex items-center gap-2 pointer-events-none text-[9px] font-mono tracking-wider text-slate-400">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>GHOST SPEECH TRANSDUCTION</span>
      </div>
      <div className="absolute bottom-1.5 right-2 pointer-events-none text-[8px] font-mono text-slate-500 tabular-nums">
        {isPlaying ? 'SPECTRAL FORMANT LOCK // ACTIVE' : 'CARRIER STANDBY'}
      </div>
    </div>
  );
};
