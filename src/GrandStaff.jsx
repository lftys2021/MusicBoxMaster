import React from 'react';
import SingleStaff from './SingleStaff'; // (구 SheetCanvas)

export default function GrandStaff({ song, currentMeasure, tickPosition }) {
  // 부모로부터 song이 내려오지 않았다면 렌더링을 잠시 대기하여 에러를 방지합니다.
  if (!song) return <div className="loading-staff">악보를 불러오는 중...</div>;

  return (
    <div className="grand-staff-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 🎼 상단 트랙: 높은음자리표 (오른손) */}
      <div className="treble-staff-row">
        <span className="staff-label">Right Hand</span>
        <SingleStaff 
          song={song} // 👈 이게 누락되면 자식인 SingleStaff에서 undefined 에러가 납니다!
          currentMeasure={currentMeasure}
          tickPosition={tickPosition}
          clefType="treble" // 높은음자리표 표시용 변수 (커스텀)
        />
      </div>

      {/* 🎼 하단 트랙: 낮은음자리표 (왼손) */}
      <div className="bass-staff-row">
        <span className="staff-label">Left Hand</span>
        <SingleStaff 
          song={song} // 👈 여기도 똑같이 안전하게 넘겨줍니다.
          currentMeasure={currentMeasure}
          tickPosition={tickPosition}
          clefType="bass" // 낮은음자리표 표시용 변수 (커스텀)
        />
      </div>

    </div>
  );
}