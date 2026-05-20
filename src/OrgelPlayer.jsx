// OrgelPlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BUILTIN_SONGS } from './js/songsData';
import { NOTE_FREQS } from './js/musicConstants'; // 👈 상수 가져오기
import SheetCanvas from './SheetCanvas'; // 분리 컴포넌트 1
import OrgelCanvas from './OrgelCanvas'; // 분리 컴포넌트 2
import SongSelect from './SongSelect'; // 👈 1. 분리한 곡 선택 컴포넌트 임포트
import './css/OrgelPlayer.css';


export default function OrgelPlayer() {
  // 🧭 라우팅 상태 제어 ('SONG_SELECT' | 'PLAYER')
  const [viewStage, setViewStage] = useState('SONG_SELECT');
  // 선택된 곡 데이터를 동적으로 담을 상태
  const [selectedSong, setSelectedSong] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMeasure, setCurrentMeasure] = useState(0);
  const [renderTick, setRenderTick] = useState(0);
  
  const [isWaiting, setIsWaiting] = useState(false);
  const delayStartTimeRef = useRef(0);

  const audioCtxRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  const tickPositionRef = useRef(0);
  const playedTicksRef = useRef(new Set());

  const createMusicBoxSound = (freq, ctx) => {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.5);
  };

  const playLoop = (now) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = now;
      if (isWaiting) delayStartTimeRef.current = now;
    }

    if (isWaiting) {
      const elapsedDelay = (now - delayStartTimeRef.current) / 1000;
      if (elapsedDelay < 1.0) {
        lastTimeRef.current = now;
        animationRef.current = requestAnimationFrame(playLoop);
        return;
      } else {
        setIsWaiting(false);
        lastTimeRef.current = now;
      }
    }

    const deltaTime = (now - lastTimeRef.current) / 1000;
    lastTimeRef.current = now;

    // 선택된 곡의 BPM 정보 활용
    const bpm = selectedSong ? selectedSong.bpm : 120;
    const ticksPerSecond = (bpm / 60) * 4;
    tickPositionRef.current += deltaTime * ticksPerSecond;

    setRenderTick(tickPositionRef.current);

    const currentMeasureNotes = selectedSong?.measures[currentMeasure] || [];
    currentMeasureNotes.forEach(noteItem => {
      if (tickPositionRef.current >= noteItem.tick && !playedTicksRef.current.has(noteItem.tick)) {
        const freq = NOTE_FREQS[noteItem.note];
        if (freq) createMusicBoxSound(freq, audioCtxRef.current);
        playedTicksRef.current.add(noteItem.tick);
      }
    });

    if (tickPositionRef.current >= 16) {
      if (currentMeasure + 1 >= (selectedSong?.totalMeasures || 0)) {
        setIsPlaying(false);
        tickPositionRef.current = 16;
        setRenderTick(16);
        return;
      }
      tickPositionRef.current -= 16;
      playedTicksRef.current.clear();
      setCurrentMeasure(prev => prev + 1);
    }

    animationRef.current = requestAnimationFrame(playLoop);
  };

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (selectedSong && tickPositionRef.current >= 16 && currentMeasure === selectedSong.totalMeasures - 1) {
        tickPositionRef.current = 0;
        setCurrentMeasure(0);
        setRenderTick(0);
      }
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(playLoop);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, currentMeasure, isWaiting, selectedSong]);

  const handleTogglePlay = () => {
    if (!isPlaying) setIsWaiting(true);
    else setIsWaiting(false);
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsWaiting(false);
    tickPositionRef.current = 0;
    setRenderTick(0);
    playedTicksRef.current.clear();
    setCurrentMeasure(0);
  };

  // 특정 곡을 선택하여 플레이어로 진입하는 핸들러
  const handleSelectSong = (songData) => {
    setSelectedSong(songData);
    handleReset();
    setViewStage('PLAYER');
  };

  // 뒤로 가기 네비게이션 제어
  const handleGoBack = () => {
    handleReset();
    if (viewStage === 'PLAYER') setViewStage('SONG_SELECT');
    else if (viewStage === 'SONG_SELECT') setViewStage('MAIN_MENU');
  };

  return (
    <div className="orgel-container">
      {/* 🧭 1단계: 곡 선택 리스트 화면 */}
      {viewStage === 'SONG_SELECT' && (
        <SongSelect 
          onSelectSong={handleSelectSong} 
          onGoBack={handleGoBack} 
        />
      )}

      {/* 🧭 3단계: 실제 오르골 및 악보 렌더링 플레이어 화면 */}
      {viewStage === 'PLAYER' && selectedSong && (
        <>
          <div className="orgel-nav-bar">
            <button className="orgel-btn-back" onClick={handleGoBack}>⬅ 곡 선택으로</button>
          </div>

          <h2 className="orgel-title">{selectedSong.title}</h2>
          <p className="orgel-info">{selectedSong.bpm} BPM | {selectedSong.timeSignature} 박자</p>

          <SheetCanvas 
            song={selectedSong} 
            currentMeasure={currentMeasure} 
            tickPosition={renderTick} 
          />

          <OrgelCanvas 
            song={selectedSong} 
            currentMeasure={currentMeasure} 
            tickPosition={renderTick} 
          />

          <div className="orgel-progress-container">
            <div className="orgel-track-bar">
              {Array.from({ length: selectedSong.totalMeasures }).map((_, idx) => (
                <div 
                  key={idx} 
                  className="orgel-progress-chunk"
                  style={{
                    backgroundColor: idx === currentMeasure ? '#d9534f' : idx < currentMeasure ? '#4a3525' : '#ccc'
                  }} 
                />
              ))}
            </div>
            <div className="orgel-progress-text">
              진행 상황: <strong>{currentMeasure + 1}</strong> / {selectedSong.totalMeasures} 마디
            </div>
          </div>

          <div className="orgel-control-box">
            <button 
              onClick={handleTogglePlay} 
              className={`orgel-btn ${isPlaying ? 'orgel-btn-pause' : 'orgel-btn-play'}`}
            >
              {isWaiting ? '⏳ 준비 중...' : isPlaying ? '⏸ 일시정지' : '▶ 오르골 태엽 감기'}
            </button>
            <button onClick={handleReset} className="orgel-btn orgel-btn-reset">
              ⏹ 처음으로 리셋
            </button>
          </div>
        </>
      )}
    </div>
  );
}