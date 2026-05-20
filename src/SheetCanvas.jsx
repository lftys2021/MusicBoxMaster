// SheetCanvas.jsx
import React, { useEffect, useRef } from 'react';
import { SHEET_NOTE_POSITIONS } from './js/musicConstants'; // 👈 상수 가져오기

export default function SheetCanvas({ song, currentMeasure, tickPosition }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#f4eae1';
    ctx.fillRect(0, 0, width, height);

    // 1. 5선지 드로잉
    const startY = 40;
    const lineSpacing = 10;
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, startY + i * lineSpacing);
      ctx.lineTo(width, startY + i * lineSpacing);
      ctx.stroke();
    }

    const triggerX = 80;

    // 높은음자리표 & 박자 기호
    ctx.fillStyle = '#333';
    ctx.font = 'bold 36px Georgia';
    ctx.fillText('𝄞', 20, startY + 32);
    
    ctx.font = 'bold 16px Helvetica';
    ctx.fillText('4', 55, startY + 15);
    ctx.fillText('4', 55, startY + 37);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(53, startY + 20);
    ctx.lineTo(65, startY + 20);
    ctx.stroke();

    const measurePixels = 400; 
    const pixelsPerTick = measurePixels / 16;
    const sheetLineTop = startY;
    const sheetLineBottom = startY + 4 * lineSpacing;

    // 2. 마디 선 및 마지막 종지선 드로잉
    for (let i = 0; i <= song.totalMeasures; i++) {
      const measureOffsetTicks = (i - currentMeasure) * 16;
      const totalTickDelta = measureOffsetTicks - tickPosition;
      const barlineX = triggerX + (totalTickDelta * pixelsPerTick);

      if (barlineX >= triggerX - 10 && barlineX <= width + 50) {
        if (i === song.totalMeasures) {
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(barlineX - 4, sheetLineTop);
          ctx.lineTo(barlineX - 4, sheetLineBottom);
          ctx.stroke();

          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(barlineX, sheetLineTop);
          ctx.lineTo(barlineX, sheetLineBottom);
          ctx.stroke();
        } else {
          ctx.strokeStyle = '#333333';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(barlineX - 80, sheetLineTop);
          ctx.lineTo(barlineX - 80, sheetLineBottom);
          ctx.stroke();
        }
      }
    }

    // 3. 음표 그리기 내부 함수
    const drawSheetMeasure = (measureIdx, measureOffsetTicks) => {
      const notes = song.measures[measureIdx] || [];
      notes.forEach(noteItem => {
        const totalTickDelta = (noteItem.tick + measureOffsetTicks) - tickPosition;
        const noteX = triggerX + (totalTickDelta * pixelsPerTick);
        const posStep = SHEET_NOTE_POSITIONS[noteItem.note] || 4; 
        const noteY = startY + (posStep * (lineSpacing / 2));

        if (noteX >= triggerX - 5 && noteX <= width + 20) {
          if (noteItem.note === 'C5') {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(noteX - 12, noteY);
            ctx.lineTo(noteX + 12, noteY);
            ctx.stroke();
          }
          ctx.save();
          ctx.translate(noteX, noteY);
          ctx.rotate(-0.2);
          ctx.fillStyle = '#222';
          ctx.beginPath();
          ctx.ellipse(0, 0, 6, 4.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = '#222';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(noteX + 5, noteY);
          ctx.lineTo(noteX + 5, noteY - 25);
          ctx.stroke();
        }
      });
    };

    drawSheetMeasure(currentMeasure, 0);
    if (currentMeasure + 1 < song.totalMeasures) {
      drawSheetMeasure(currentMeasure + 1, 16);
    }

    // 4. 레드 판정선 가이드라인
    ctx.strokeStyle = '#d9534f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(triggerX, 10);
    ctx.lineTo(triggerX, height - 10);
    ctx.stroke();
  }, [song, currentMeasure, tickPosition]);

  return <canvas ref={canvasRef} width={650} height={110} className="orgel-sheet-canvas" />;
}