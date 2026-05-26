// PlayerStageManager.jsx
import React, { useState, useEffect } from 'react';
import SongSelect from './SongSelect';
import StaffSelect from './StaffSelect'; // 3번 단계에서 만들 파일
import OrgelPlayer from './OrgelPlayer';

export default function PlayerStageManager({ onBackToMainMenu }) {
  // 단계 제어 상태: 'SONG_SELECT' | 'STAFF_SELECT' | 'PLAYER'
  const [stage, setStage] = useState('SONG_SELECT');
  const [selectedSong, setSelectedSong] = useState(null);
  const [staffType, setStaffType] = useState('single'); // single 또는 grand

  // 🌟 파일 접속 실시간 추적 로거 심기!
  useEffect(() => {
    const logStyle = 'color: #ffffff; font-weight: bold; background: #5c4636; padding: 4px 8px; border-radius: 4px;';
    
    if (stage === 'SONG_SELECT') {
      console.log('%c📂 [접속 파일] SongSelect.jsx (명곡 선택 화면)', logStyle);
    } else if (stage === 'STAFF_SELECT') {
      console.log(`%c🎼 [접속 파일] StaffSelect.jsx (보표 선택 화면) | 곡명: ${selectedSong?.title}`, logStyle);
    } else if (stage === 'PLAYER') {
      console.log(`%c📻 [접속 파일] OrgelPlayer.jsx (오르골 플레이 가동) | 보표: ${staffType === 'single' ? '단일보표' : '복합보표'}`, 'color: #ffffff; font-weight: bold; background: #28a745; padding: 4px 8px; border-radius: 4px;');
    }
  }, [stage, staffType, selectedSong]);

  return (
    <div className="stage-manager-wrapper">
      
      {/* 1단계: 곡 선택 */}
      {stage === 'SONG_SELECT' && (
        <SongSelect 
          onSelectSong={(songData) => {
            setSelectedSong(songData);
            setStage('STAFF_SELECT'); // 곡 선택 완료되면 보표 선택으로!
          }}
          onGoBack={onBackToMainMenu} // 최상위 메인 메뉴로 후퇴
        />
      )}

      {/* 2단계: 보표 스타일 선택 */}
      {stage === 'STAFF_SELECT' && (
        <StaffSelect 
          selectedSong={selectedSong}
          onSelectStaff={(type) => {
            setStaffType(type);
            setStage('PLAYER'); // 보표까지 선택 완료되면 최종 플레이 시작!
          }}
          onBack={() => setStage('SONG_SELECT')} // 곡 다시 고르러 뒤로가기
        />
      )}

      {/* 3단계: 순수한 연주 플레이어 */}
      {stage === 'PLAYER' && selectedSong && (
        <OrgelPlayer 
          song={selectedSong}      // 💡 외부에서 주입받은 곡 데이터 사용
          staffType={staffType}    // 💡 선택한 보표 정보 전달
          onGoBack={() => setStage('STAFF_SELECT')} // 뒤로가기 시 보표 선택으로 리턴
        />
      )}
    </div>
  );
}