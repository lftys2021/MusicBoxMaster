// OrgelCanvas.jsx
import React, { useEffect, useRef } from 'react';
import { NOTE_ORDER } from './js/musicConstants'; // 👈 상수 가져오기

export default function OrgelCanvas({ song, currentMeasure, tickPosition }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // 1. 우드 하우징 프레임 배경
    ctx.fillStyle = '#A67C52';
    ctx.fillRect(0, 0, width, height);

    // 종이 테이프 스크롤러
    const tapeHeight = height * 0.8;
    const tapeY = (height - tapeHeight) / 2;
    ctx.fillStyle = '#F8F1E7';
    ctx.fillRect(0, tapeY, width, tapeHeight);

    // 2. 가로 음계 레일 가이드라인
    const laneCount = NOTE_ORDER.length;
    const laneHeight = tapeHeight / laneCount;
    
    ctx.strokeStyle = '#eaddca';
    ctx.lineWidth = 1;
    for (let i = 0; i <= laneCount; i++) {
      ctx.beginPath();
      ctx.moveTo(0, tapeY + (i * laneHeight));
      ctx.lineTo(width, tapeY + (i * laneHeight));
      ctx.stroke();
    }

    const triggerX = 80; 

    // 세로 기계식 철제 트리거 라인
    ctx.strokeStyle = '#d9534f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(triggerX, tapeY);
    ctx.lineTo(triggerX, tapeY + tapeHeight);
    ctx.stroke();

    const measurePixels = 400; 
    const pixelsPerTick = measurePixels / 16;

    // 3. 펀칭 도트 드로잉 내부 함수
    const drawOrgelMeasure = (measureIdx, measureOffsetTicks) => {
      const notes = song.measures[measureIdx] || [];
      notes.forEach(noteItem => {
        const laneIdx = NOTE_ORDER.indexOf(noteItem.note);
        if (laneIdx === -1) return;

        const totalTickDelta = (noteItem.tick + measureOffsetTicks) - tickPosition;
        const noteX = triggerX + (totalTickDelta * pixelsPerTick);
        const noteY = tapeY + (laneIdx * laneHeight) + (laneHeight / 2);

        if (noteX >= triggerX - 5 && noteX <= width + 20) {
          ctx.beginPath();
          ctx.arc(noteX, noteY, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#4A2A1A';
          ctx.fill();
        }
      });
    };

    drawOrgelMeasure(currentMeasure, 0);
    if (currentMeasure + 1 < song.totalMeasures) {
      drawOrgelMeasure(currentMeasure + 1, 16);
    }
    if (currentMeasure + 2 < song.totalMeasures) {
      drawOrgelMeasure(currentMeasure + 2, 32);
    }
  }, [song, currentMeasure, tickPosition]);

  return <canvas ref={canvasRef} width={650} height={260} className="orgel-tape-canvas" />;
}