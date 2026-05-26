// OrgelPlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NOTE_FREQS } from './js/musicConstants';
import SheetCanvas from './SheetCanvas';   // 단일 보표
import GrandStaff from './GrandStaff';     // 🎯 새로 만든 복합 보표 임포트
import OrgelCanvas from './OrgelCylinder'; // 오르골 타공판
import './css/OrgelPlayer.css';

// 💡 부모 매니저로부터 song, staffType, onGoBack을 직접 주입받습니다.
export default function OrgelPlayer({ song, staffType, onGoBack }) {
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

  // 소리 생성 헬퍼 (기존과 동일)
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

    const bpm = song ? song.bpm : 120;
    const ticksPerSecond = (bpm / 60) * 4;
    tickPositionRef.current += deltaTime * ticksPerSecond;

    setRenderTick(tickPositionRef.current);

    // 🌟 [수정 포인트 1] 현재 마디에서 소리 낼 음표 목록을 보표 타입에 따라 합치거나 추출합니다.
    let currentMeasureNotes = [];
    
    if (staffType === 'grand') {
      // 복합 보표일 때는 오른손(treble)과 왼손(bass) 음표 데이터를 한데 모아 싱크를 맞춥니다.
      const trebleNotes = song?.trebleMeasures?.[currentMeasure] || [];
      const bassNotes = song?.bassMeasures?.[currentMeasure] || [];
      currentMeasureNotes = [...trebleNotes, ...bassNotes];
    } else {
      // 단일 보표일 때는 기존 포맷대로 단선율 데이터를 가져옵니다.
      currentMeasureNotes = song?.measures?.[currentMeasure] || [];
    }

    // 소리 재생 루프 (기존 로직 유지)
    currentMeasureNotes.forEach(noteItem => {
      if (tickPositionRef.current >= noteItem.tick && !playedTicksRef.current.has(noteItem.tick)) {
        const freq = NOTE_FREQS[noteItem.note];
        if (freq) createMusicBoxSound(freq, audioCtxRef.current);
        playedTicksRef.current.add(noteItem.tick);
      }
    });

    // 마디 전환 루프 (기존 로직 유지)
    if (tickPositionRef.current >= 16) {
      if (currentMeasure + 1 >= (song?.totalMeasures || 0)) {
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
      if (song && tickPositionRef.current >= 16 && currentMeasure === song.totalMeasures - 1) {
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
  }, [isPlaying, currentMeasure, isWaiting, song, staffType]); // 💡 staffType 의존성 주입

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

  return (
    <div className="orgel-container">
      <div className="orgel-nav-bar">
        <button className="orgel-btn-back" onClick={onGoBack}>⬅ 보표 선택으로</button>
      </div>

      <h2 className="orgel-title">{song.title}</h2>
      <p className="orgel-info"> {song.term || 'Moderato'} | {song.bpm} BPM | {song.timeSignature} 박자</p>

      {/* 🌟 [수정 포인트 2] 선택된 보표 스타일에 따라 화면에 그려지는 악보 컴포넌트를 스위칭합니다 */}
      <div className="music-sheet-wrapper" style={{ margin: '20px 0' }}>
        {staffType === 'single' ? (
          <SheetCanvas 
            song={song} 
            currentMeasure={currentMeasure} 
            tickPosition={renderTick} 
          />
        ) : (
          <GrandStaff 
            song={song} 
            currentMeasure={currentMeasure} 
            tickPosition={renderTick} 
          />
        )}
      </div>

      {/* 오르골 타공판 (이전에 양손 데이터를 합치도록 수정했으므로 그대로 유지) */}
      <OrgelCanvas 
        song={song} 
        currentMeasure={currentMeasure} 
        tickPosition={renderTick} 
      />

      {/* 마디 프로그레스 바 (기존과 동일) */}
      <div className="orgel-progress-container">
        <div className="orgel-track-bar">
          {Array.from({ length: song.totalMeasures }).map((_, idx) => (
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
          진행 상황: <strong>{currentMeasure + 1}</strong> / {song.totalMeasures} 마디
        </div>
      </div>

      {/* 하단 컨트롤러 바 (기존과 동일) */}
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
    </div>
  );
}