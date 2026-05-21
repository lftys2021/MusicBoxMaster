// GrandStaff.jsx
import React, { useState, useEffect } from 'react';
import SingleStaff from './SingleStaff'; // 기존 SheetCanvas를 리팩토링한 것
import './css/GrandStaff.css';

export default function GrandStaff({ song }) {
  // 💡 재생 타이머 상태를 부모가 관리합니다.
  const [currentMeasure, setCurrentMeasure] = useState(0);
  const [tickPosition, setTickPosition] = useState(0);

  // (여기에 타이머 구동 로직: bpm에 맞춰 tickPosition을 증가시키는 useEffect 위치)

  return (
    <div className="grand-staff-container">
      {/* 1. 위쪽 보표: 오른손 (높은음자리표) */}
      <SingleStaff 
        clefType="treble" // 💡 어떤 음자리표를 그릴지 명시
        keySignature={song.keySignature}
        timeSignature={song.timeSignature}
        measures={song.trebleMeasures} // 오른손 데이터 주입
        totalMeasures={song.totalMeasures}
        currentMeasure={currentMeasure}
        tickPosition={tickPosition}
      />

      {/* 2. 아래쪽 보표: 왼손 (낮은음자리표) */}
      <SingleStaff 
        clefType="bass" // 💡 낮은음자리표 명시
        keySignature={song.keySignature}
        timeSignature={song.timeSignature}
        measures={song.bassMeasures} // 왼손 데이터 주입
        totalMeasures={song.totalMeasures}
        currentMeasure={currentMeasure}
        tickPosition={tickPosition}
      />
    </div>
  );
}