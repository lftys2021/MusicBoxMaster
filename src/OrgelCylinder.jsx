// OrgelCylinder.jsx
import React, { useEffect, useRef } from 'react';
import { SHEET_NOTE_POSITIONS, KEY_SIGNATURES } from './js/musicConstants';
import './css/OrgelCylinder.css';

// 💡 한 마디 분량의 오르골 격자판과 타공 도트를 그리는 컴포넌트
function CylinderBox({ measureNotes, isLast, ticksPerMeasure, measureWidth }) {
  const canvasRef = useRef(null);
  const totalRows = 15; // 연주 가능한 총 음계 행 수 (구조에 맞춰 조절 가능)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const height = canvas.height;
    
    // 1. 도화지 밀어버리기
    ctx.clearRect(0, 0, measureWidth, height);
    ctx.fillStyle = '#f7f2ea';
    ctx.fillRect(0, 0, measureWidth, height);

    // 2. 가로 가이드 점선들 (오르골 악보 특유의 잔잔한 배경 격자)
    ctx.strokeStyle = 'rgba(180, 160, 140, 0.15)';
    ctx.lineWidth = 1;
    const rowSpacing = height / (totalRows + 1);
    for (let i = 1; i <= totalRows; i++) {
      ctx.beginPath();
      ctx.setLineDash([3, 3]); // 점선 효과
      ctx.moveTo(0, i * rowSpacing);
      ctx.lineTo(measureWidth, i * rowSpacing);
      ctx.stroke();
    }
    ctx.setLineDash([]); // 다른 선들을 위해 점선 초기화

    // 3. 🌟 [수정] 마디를 가르는 우측 세로줄 - 판정선보다 확연히 가늘고 은은하게 수동 드로잉
    ctx.strokeStyle = 'rgba(100, 80, 60, 0.25)';
    ctx.lineWidth = 0.8; // 얇고 투명한 세로줄
    ctx.beginPath();
    ctx.moveTo(measureWidth, 0);
    ctx.lineTo(measureWidth, height);
    ctx.stroke();

    // 4. 🌟 악보와 자로 잰 듯 일치시키는 내부 마디 패딩(Padding) 시스템
    const paddingLeft = 20;
    const paddingRight = 20;
    const usableWidth = measureWidth - (paddingLeft + paddingRight);
    const pixelsPerTick = usableWidth / ticksPerMeasure;

    // 5. 펀칭 도트(음표 위치) 렌더링
    measureNotes.forEach(noteItem => {
      // 쉼표 데이터는 도트를 뚫지 않고 패스
      if (noteItem.type.includes('Rest')) return;

      // 악보의 틱 위치와 기하학적으로 완벽히 동기화된 X 좌표
      const dotX = paddingLeft + (noteItem.tick * pixelsPerTick);

      // 음계 주소록 사전 파싱 후 Y축 매핑
      const posStep = SHEET_NOTE_POSITIONS[noteItem.note];
      if (posStep === undefined) return;

      // 오르골 판의 높이에 맞춰 음높이 역산 배치
      // (posStep이 작을수록 고음이므로 위쪽에 찍히도록 수식 정착)
      const dotY = (posStep + 4) * (height / (totalRows + 5));

      // 🟫 아날로그 오르골 돌기/구멍 입체 드로잉 (진한 브라운 톤 원형)
      ctx.fillStyle = '#4a321f';
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // 미세한 하이라이트 효과를 주어 구멍 느낌 극대화
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(dotX - 1.5, dotY - 1.5, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // ❌ 마디 번호(넘버링)를 표기하던 기존 코드가 완벽히 삭제되었습니다.

  }, [measureNotes, isLast, ticksPerMeasure, measureWidth]);

  return <canvas ref={canvasRef} width={measureWidth} height={180} className="cylinder-box-canvas" />;
}

// 메인 실린더 제어기
export default function OrgelCylinder({ song, currentMeasure, tickPosition }) {
  const measureWidth = 260;  
  const ticksPerMeasure = 16; 
  const pixelsPerTick = measureWidth / ticksPerMeasure;

  // 악보의 가변 조표 개수 감지 로직 그대로 수입
  const currentKey = song.keySignature || 'C';
  const keyAccidentals = KEY_SIGNATURES[currentKey] || [];
  const accidentalCount = keyAccidentals.length;

  // 💡 악보 헤더 너비와 미크론 단위까지 정확히 동기화되는 가변 triggerX
  const triggerX = 80 + (accidentalCount * 12);      

  const scrollOffset = (currentMeasure * measureWidth) + (tickPosition * pixelsPerTick);

  return (
    <div className="orgel-cylinder-viewport">
      
      {/* 가. 좌측 가변 고정 영역 (격자 무늬 바탕선 동기화용) */}
      <div className="cylinder-header" style={{ width: `${triggerX}px` }}>
        <canvas ref={(el) => {
          if (!el) return;
          const ctx = el.getContext('2d');
          ctx.clearRect(0, 0, triggerX, 180);
          ctx.fillStyle = '#f7f2ea';
          ctx.fillRect(0, 0, triggerX, 180);

          // 헤더 내부에도 은은한 격자 연장선 드로잉
          ctx.strokeStyle = 'rgba(180, 160, 140, 0.15)';
          ctx.lineWidth = 1.5;
          for (let i = 1; i <= 15; i++) {
            ctx.beginPath(); ctx.setLineDash([3, 3]);
            ctx.moveTo(0, i * (180 / 16)); ctx.lineTo(triggerX, i * (180 / 16));
            ctx.stroke();
          }
        }} width={triggerX} height={180} />
      </div>

      {/* 나. 마디 격자판들이 끊김 없이 가로로 정렬되어 스크롤되는 트랙 */}
      <div 
        className="cylinder-tracks-train animated"
        style={{
          left: `${triggerX}px`,
          transform: `translateX(${-scrollOffset}px)`,
          width: `${song.totalMeasures * measureWidth}px`
        }}
      >
        {song.measures.map((measureNotes, index) => (
          <CylinderBox 
            key={index}
            measureNotes={measureNotes}
            isLast={index === song.totalMeasures - 1}
            ticksPerMeasure={ticksPerMeasure}
            measureWidth={measureWidth}
          />
        ))}
      </div>

      {/* 다. 메인 플레이어 판정 레드 라인 (2px 선명하게 고정) */}
      <div className="cylinder-player-line" style={{ left: `${triggerX}px` }} />
    </div>
  );
}