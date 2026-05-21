// StaffSelect.jsx
import React from 'react';
import './css/StaffSelect.css'; // 필요에 따라 스타일링 추가

export default function StaffSelect({ selectedSong, onSelectStaff, onBack }) {
  return (
    <div className="menu-card animate-fade-in">
      {/* 선택한 곡명을 보여주어 유저에게 컨텍스트를 제공합니다 */}
      <div className="selected-song-badge">
        🎵 선택된 곡: <strong>{selectedSong?.title}</strong>
      </div>
      
      <h2>🎼 보표 스타일 선택</h2>
      <p className="menu-subtitle">이 곡을 어떤 악보 형태로 연주할까요?</p>
      
      <div className="menu-button-group">
        <button 
          className="btn btn-primary"
          onClick={() => onSelectStaff('single')}
        >
          <span className="icon">𝄞</span>
          <div className="btn-text">
            <strong>단일 보표 (Single Staff)</strong>
            <span>기본 멜로디 위주의 단선율 악보</span>
          </div>
        </button>

        <button 
          className="btn btn-secondary"
          onClick={() => onSelectStaff('grand')}
        >
          <span className="icon">𝄃𝄂</span>
          <div className="btn-text">
            <strong>복합 보표 (Grand Staff)</strong>
            <span>양손 연주를 위한 피아노 2단 큰보표</span>
          </div>
        </button>
      </div>

      <button className="btn-back" onClick={onBack}>
        ◁ 곡 다시 고르기
      </button>
    </div>
  );
}