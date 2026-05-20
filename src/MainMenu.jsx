// MainMenu.jsx
import React from 'react';
import './css/MainMenu.css'; // 분리한 외부 CSS 파일 연동

export default function MainMenu({ onViewChange }) {
  return (
    <div className="menu-container">
      {/* 1. 상단 로고 영역 */}
      <header className="menu-header">
        <h1 className="menu-main-title">뮤직박스마스터</h1>
        <p className="menu-sub-title">오르골 매니아를 위한 가상 클래식 시뮬레이터</p>
      </header>

      {/* 2. 중앙 오르골 이미지 영역 (CSS 애니메이션 탑재) */}
      <div className="menu-image-container">
        <div className="menu-image-placeholder">
          🎵
        </div>
      </div>

      {/* 3. 하단 메뉴 선택 아이콘 카드 리스트 */}
      <nav className="menu-grid">
        {/* 메뉴 1: 기존 음악 재생 */}
        <div className="menu-card" onClick={() => onViewChange('player')}>
          <div className="menu-icon">📻</div>
          <h3 className="menu-card-title">명곡 재생 모드</h3>
          <p className="menu-card-desc">내장된 명곡 악보를 부드러운 오르골 연주로 감상합니다.</p>
        </div>

        {/* 메뉴 2: 자작곡 조작/제작 */}
        <div className="menu-card" onClick={() => onViewChange('editor')}>
          <div className="menu-icon">🛠️</div>
          <h3 className="menu-card-title">자작곡 제작 모드</h3>
          <p className="menu-card-desc">천공 종이 테이프에 직접 돌기를 심어 나만의 음악을 만듭니다.</p>
        </div>

        {/* 메뉴 3: 다른 유저 자작곡 자랑방 */}
        <div className="menu-card" onClick={() => onViewChange('community')}>
          <div className="menu-icon">🌐</div>
          <h3 className="menu-card-title">마스터 전시장</h3>
          <p className="menu-card-desc">다른 게이머들이 공유한 창의적인 자작곡을 들어봅니다.</p>
        </div>
      </nav>
    </div>
  );
}