// MusicBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { createMusicBoxSound, NOTE_FREQS } from './musicBoxAudio';

// 간단한 고정 악보 데이터 (타임스탬프 기반)
const sampleScore = [
  { time: 0, note: 'C5' }, { time: 0.5, note: 'E5' },
  { time: 1.0, note: 'G5' }, { time: 1.5, note: 'C6' },
  { time: 2.0, note: 'G5' }, { time: 2.5, note: 'E5' }
];

export default function MusicBox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const playbackTimeRef = useRef(0);
  const lastIndexRef = useRef(0); // 어디까지 연주했는지 기억
  const requestRef = useRef(null);
  const lastFrameTimeRef = useRef(null);

  // 브라우저 보안 정책으로 인해 사용자의 첫 클릭 때 AudioContext를 생성해야 함
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  const handlePlayToggle = () => {
    initAudio();
    if (!isPlaying) {
      lastFrameTimeRef.current = performance.now();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      cancelAnimationFrame(requestRef.current);
    }
  };

  // 메인 게임 루프 (정밀 타임 추적)
  const loop = (now) => {
    if (!lastFrameTimeRef.current) lastFrameTimeRef.current = now;
    const delta = (now - lastFrameTimeRef.current) / 1000; // 초 단위 변환
    lastFrameTimeRef.current = now;

    playbackTimeRef.current += delta;

    // 현재 시간에 연주해야 할 음이 있는지 체크
    sampleScore.forEach((item) => {
      // 대략적인 타임 매칭 (이미 연주한 음은 스킵하는 로직을 고도화할 수 있음)
      if (playbackTimeRef.current >= item.time && playbackTimeRef.current < item.time + 0.05) {
        // 여기에 중복 재생 방지 로직을 추가하거나 index 기반으로 처리
        const freq = NOTE_FREQS[item.note];
        createMusicBoxSound(freq, audioCtxRef.current);
      }
    });

    // 루프 반복
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>React 감성 오르골</h2>
      <button onClick={handlePlayToggle} style={{ padding: '10px 20px', fontSize: '16px' }}>
        {isPlaying ? '일시정지' : '오르골 태엽 감기 (재생)'}
      </button>
      <div style={{ marginTop: '20px', color: '#666' }}>
        현재 재생 시간: {playbackTimeRef.current.toFixed(2)}초
      </div>
    </div>
  );
}