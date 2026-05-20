// App.jsx
import React, { useState } from 'react';
import MainMenu from './MainMenu';
import OrgelPlayer from './OrgelPlayer'; // 지난번에 만든 기존곡 재생 컴포넌트
import './css/App.css'

export default function App() {
  const [currentView, setCurrentView] = useState('menu'); // menu, player, editor, community

  return (
    <div>
      {currentView === 'menu' && (
        <MainMenu onViewChange={setCurrentView} />
      )}
      
      {currentView === 'player' && (
        <div>
          {/* 2. style 속성 대신 className 적용 */}
          <button onClick={() => setCurrentView('menu')} className="back-button">
            ⬅ 메인 메뉴로
          </button>
          <OrgelPlayer />
        </div>
      )}

      {currentView === 'editor' && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <button onClick={() => setCurrentView('menu')} className="back-button">
            ⬅ 메인 메뉴로
          </button>
          <h2>🛠️ 자작곡 제작 모드 (준비 중)</h2>
        </div>
      )}

      {currentView === 'community' && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <button onClick={() => setCurrentView('menu')} className="back-button">
            ⬅ 메인 메뉴로
          </button>
          <h2>🌐 마스터 전시장 (준비 중)</h2>
        </div>
      )}
    </div>
  );
}