// SingleStaff.jsx
import React, { useEffect, useRef } from 'react';
import { SHEET_NOTE_POSITIONS, KEY_SIGNATURES, TIME_SIGNATURES } from './js/musicConstants';
import { MusicDrawer } from './js/SheetMusicLibrary';
import './css/SheetCanvas.css';

function MeasureBox({ measureNotes, measureIndex, isLast, ticksPerMeasure, measureWidth }) {
  // ... 기존 MeasureBox 내부 Canvas 드로잉 코드는 그대로 유지됩니다 ...
  const canvasRef = useRef(null);
  const startY = 35;
  const lineSpacing = 10;
  const sheetTop = startY;
  const sheetBottom = startY + 4 * lineSpacing;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, measureWidth, 105);
    ctx.fillStyle = '#fbf9f5';
    ctx.fillRect(0, 0, measureWidth, 105);

    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(0, startY + i * lineSpacing); ctx.lineTo(measureWidth, startY + i * lineSpacing); ctx.stroke();
    }
    if (isLast) {
      MusicDrawer.drawFinalBarline(ctx, measureWidth - 5, sheetTop, sheetBottom);
    } else {
      MusicDrawer.drawNormalBarline(ctx, measureWidth, sheetTop, sheetBottom);
    }

    const paddingLeft = 20;  
    const paddingRight = 20; 
    const usableWidth = measureWidth - (paddingLeft + paddingRight); 
    const pixelsPerTick = usableWidth / ticksPerMeasure;

    measureNotes.forEach(noteItem => {
      const noteX = paddingLeft + (noteItem.tick * pixelsPerTick);
      const isRest = noteItem.type.includes('Rest');
      const posStep = isRest ? 4 : (SHEET_NOTE_POSITIONS[noteItem.note] || 4);
      const noteY = startY + (posStep * (lineSpacing / 2));
      const isUp = posStep > 4;

      if (isRest) {
        switch (noteItem.type) {
          case 'wholeRest':     MusicDrawer.drawWholeRest(ctx, noteX, startY + lineSpacing); break;
          case 'halfRest':      MusicDrawer.drawHalfRest(ctx, noteX, startY + 2 * lineSpacing); break;
          case 'quarterRest':   MusicDrawer.drawQuarterRest(ctx, noteX, noteY); break;
          case 'eighthRest':    MusicDrawer.drawEighthRest(ctx, noteX, noteY); break;
          case 'sixteenthRest': MusicDrawer.drawSixteenthRest(ctx, noteX, noteY); break;
          default: break;
        }
      } else {
        const isWhole = noteItem.type === 'whole';
        const isHalf = noteItem.type === 'half';
        MusicDrawer.drawNoteHead(ctx, noteX, noteY, (!isWhole && !isHalf));
        if (!isWhole) MusicDrawer.drawStem(ctx, noteX, noteY, isUp);
        if (noteItem.type === 'eighth') MusicDrawer.drawFlag(ctx, noteX, noteY, isUp, false);
        if (noteItem.type === 'sixteenth') MusicDrawer.drawFlag(ctx, noteX, noteY, isUp, true);
      }

      if (noteItem.note === 'C4' && !isRest) { 
        ctx.strokeStyle = '#221100'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(noteX - 11, noteY); ctx.lineTo(noteX + 11, noteY); ctx.stroke();
      }
      if (noteItem.isDotted) {
        const offsetX = isRest ? 9 : 11;
        const offsetY = isRest ? (noteItem.type === 'halfRest' ? -8 : -2) : (isUp ? -2 : -5);
        MusicDrawer.drawDot(ctx, noteX, noteY, offsetX, offsetY);
      }
    });

    ctx.fillStyle = '#887766';
    ctx.font = 'italic 10px Helvetica';
    ctx.fillText(measureIndex + 1, 6, 15);
  }, [measureNotes, measureIndex, isLast, ticksPerMeasure, measureWidth]);

  return <canvas ref={canvasRef} width={measureWidth} height={105} className="measure-box-canvas" />;
}

export default function SheetCanvas({ song, currentMeasure, tickPosition }) {
  const measureWidth = 260;  
  const ticksPerMeasure = 16; 
  const pixelsPerTick = measureWidth / ticksPerMeasure;

  // 1. 현재 곡의 조표 명세 확보
  const currentKey = song.keySignature || 'C';
  const keyAccidentals = KEY_SIGNATURES[currentKey] || [];
  const accidentalCount = keyAccidentals.length;

  // 2. 🔥 [오늘의 핵심] 조표 개수에 따른 가변형 triggerX 연산
  // 기본 80px에서 출발하여 샵/플랫이 늘어날 때마다 기호 크기(개당 12px)만큼 유연하게 확장
  const triggerX = 80 + (accidentalCount * 12);      

  // 실시간 기차 이동 오프셋 계산 (픽셀 단위)
  const scrollOffset = (currentMeasure * measureWidth) + (tickPosition * pixelsPerTick);
  //const isMoving = tickPosition !== 0;

  // SingleStaff.jsx (핵심 분기 구역만 발췌)

  // ... 기본 계산 로직 (triggerX 연산 등)은 기존과 동일 ...

  // 낮은음자리표를 그릴 때 음표 Y축 위치를 다르게 잡기 위한 헬퍼 공식 예시
  const getNoteY = (note, clefType, startY, lineSpacing) => {
    if (clefType === 'bass') {
      // 낮은음자리표는 기준 도(C4)가 오선지 위쪽 가운뎃줄에 걸치므로 
      // 기존 높은음자리표 포지션 데이터에서 일정 스텝만큼 offset을 더하거나 빼서 튜닝합니다.
      const baseStep = SHEET_NOTE_POSITIONS[note] || 4;
      return startY + ((baseStep - 12) * (lineSpacing / 2)); 
    }
    // 기본 높은음자리표
    const posStep = SHEET_NOTE_POSITIONS[note] || 4;
    return startY + (posStep * (lineSpacing / 2));
  };

  // 캔버스 렌더링 내부
  if (clefType === 'treble') {
    MusicDrawer.drawTrebleClef(ctx, 16, startY);
  } else {
    // 특수문자표에서 찾으신 𝄢 기호를 사용하거나 직접 그리기 메서드 호출!
    MusicDrawer.drawBassClef(ctx, 16, startY); 
  }
  
  return (
    <div className="orgel-sheet-viewport">
      
      {/* 가. 왼쪽 고정 헤더 레이어 (가변 가로폭 적용) */}
      <div className="sheet-header" style={{ width: `${triggerX}px` }}>
        <canvas ref={(el) => {
          if (!el) return;
          const ctx = el.getContext('2d');
          ctx.clearRect(0, 0, triggerX, 105);
          
          const startY = 35;
          const lineSpacing = 10;

          // 헤더 안의 오선지 선도 가변 너비(triggerX)만큼 꽉 차게 긋기
          ctx.strokeStyle = '#332211'; ctx.lineWidth = 1;
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, startY + i * lineSpacing);
            ctx.lineTo(triggerX, startY + i * lineSpacing);
            ctx.stroke();
          }

          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, startY);
          ctx.lineTo(0, startY + 40);
          ctx.stroke();
          
          // 높은음자리표 안착
          MusicDrawer.drawTrebleClef(ctx, 16, startY);
          
          // 조표 나열 시작 (음자리표 바로 옆인 45px 위치에서 출발)
          let currentX = 45;
          keyAccidentals.forEach((acc) => {
            const posStep = SHEET_NOTE_POSITIONS[acc.note] || 4;
            const accY = startY + (posStep * (lineSpacing / 2));
            
            if (acc.type === 'sharp') {
              MusicDrawer.drawSharp(ctx, currentX, accY);
            } else if (acc.type === 'flat') {
              MusicDrawer.drawFlat(ctx, currentX, accY);
            }
            currentX += 12; // 💡 요청하신 기호 크기(12px)만큼 다음 X 좌표 확보
          });

          // 박자표 배치 (조표가 늘어난 만큼 우측 여백을 두고 배치)
          const timeSignatureX = currentX + 6;
          const sigConfig = TIME_SIGNATURES[song.timeSignature || '4/4'] || TIME_SIGNATURES['4/4'];
          MusicDrawer.drawTimeSignature(ctx, timeSignatureX, startY, sigConfig);

        }} width={triggerX} height={105} />
      </div>

      {/* 나. 마디들이 주루룩 붙어서 통째로 움직이는 기차 트랙 (가변 left 수신) */}
      <div 
        className={`sheet-tracks-train animated`}
        style={{
          left: `${triggerX}px`, // 💡 헤더 크기가 줄어들면 기차 출발선도 당겨집니다.
          transform: `translateX(${-scrollOffset}px)`,
          width: `${song.totalMeasures * measureWidth}px`
        }}
      >
        {song.measures.map((measureNotes, index) => (
          <MeasureBox 
            key={index}
            measureNotes={measureNotes}
            measureIndex={index}
            isLast={index === song.totalMeasures - 1}
            ticksPerMeasure={ticksPerMeasure}
            measureWidth={measureWidth}
          />
        ))}
      </div>

      {/* 다. 가이드 판정선 레이어 (가변 left 수신) */}
      <div className="sheet-player-line" style={{ left: `${triggerX}px` }} />
    </div>
  );
}