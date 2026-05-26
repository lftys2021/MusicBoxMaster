// App.jsx
import React, { useState } from 'react';
import MainMenu from './MainMenu';
import PlayerStageManager from './PlayerStageManager'; // 🎯 새롭게 추가할 중간 관리자
import './css/App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('menu'); // menu, player, editor, community

  return (
    <div>
      {currentView === 'menu' && (
        <MainMenu onViewChange={setCurrentView} />
      )}
      
      {/* 명곡 재생 모드 진입 시 단계를 전문적으로 관리하는 매니저에게 위임합니다 */}
      {currentView === 'player' && (
        <PlayerStageManager onBackToMainMenu={() => setCurrentView('menu')} />
      )}

      {currentView === 'editor' && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <button onClick={() => setCurrentView('menu')} className="back-button">⬅ 메인 메뉴로</button>
          <h2>🛠️ 자작곡 제작 모드 (준비 중)</h2>
        </div>
      )}

      {currentView === 'community' && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <button onClick={() => setCurrentView('menu')} className="back-button">⬅ 메인 메뉴로</button>
          <h2>🌐 마스터 전시장 (준비 중)</h2>
        </div>
      )}
    </div>
  );
}