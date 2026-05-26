// StaffSelect.jsx
import React from 'react';
import './css/StaffSelect.css'; // 필요시 전용 CSS 파일 연동

export default function StaffSelect({ selectedSong, onSelectStaff, onBack }) {
  return (
    <div className="staff-select-container" style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ marginBottom: '15px', color: '#8c7b6e' }}>
        선택된 음악: <strong>{selectedSong?.title}</strong>
      </div>
      <h2>🎼 보표 스타일을 선택하세요</h2>
      <p>오르골 실린더에 매핑할 악보 뷰 스타일을 결정합니다.</p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '30px 0' }}>
        <button 
          onClick={() => onSelectStaff('single')}
          style={{ padding: '20px 40px', fontSize: '16px', cursor: 'pointer' }}
        >
          🎵 단일 보표 (높은음자리표 전용)
        </button>
        <button 
          onClick={() => onSelectStaff('grand')}
          style={{ padding: '20px 40px', fontSize: '16px', cursor: 'pointer' }}
        >
          🎹 복합 보표 (피아노 큰보표 2단)
        </button>
      </div>

      <button onClick={onBack} className="back-button">◁ 곡 다시 고르기</button>
    </div>
  );
}