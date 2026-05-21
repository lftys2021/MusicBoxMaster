// SongSelect.jsx
import React from 'react';

import { BUILTIN_SONGS } from './js/songsData';

export default function SongSelect({ onSelectSong, onGoBack }) {

  // 나중에 songsData.js에 곡이 늘어나면 자동으로 이 리스트에 추가됩니다.
  const songList = Object.values(BUILTIN_SONGS);

  return (
    <div className="orgel-menu-box">
      {/* 상단 네비게이션 바 */}
      <div className="orgel-nav-bar">
        <button className="orgel-btn-back" onClick={onGoBack}>
          ⬅ 메인으로
        </button>
      </div>

      <h2 className="orgel-main-title">🎼 플레이할 곡 선택</h2>
      <p className="orgel-menu-desc">오르골 종이 테이프로 들을 명곡을 골라주세요.</p>
      
      {/* 곡 리스트 그리드 */}
      <div className="orgel-song-list">
        {songList.map((song) => (
          <button 
            key={song.id || song.title} 
            className="orgel-btn-large" 
            onClick={() => onSelectSong(song)}
          >
            {song.title}
          </button>
        ))}

        {/* 추후 추가될 명곡들을 위한 플레이스홀더 (시각적 가이드) */}
        <button 
          className="orgel-btn-large" 
          style={{ backgroundColor: '#aaa', cursor: 'default' }} 
          disabled
        >
          (업데이트 예정)
        </button>
      </div>
    </div>
  );
}