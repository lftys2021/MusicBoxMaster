// musicBoxAudio.js
export const createMusicBoxSound = (frequency, audioCtx) => {
    if (!audioCtx) return;
  
    // 1. 오실레이터(파형 발생기)와 게인(볼륨 조절기) 노드 생성
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
  
    osc.type = 'sine'; // 오르골에 어울리는 맑은 사인파
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  
    // 2. 오르골 특유의 팅~ 소리를 위한 볼륨 엔벨로프 설정
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    // 어택(Attack): 순식간에 소리가 커짐 (0.005초)
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.005);
    // 디케이/릴리즈(Decay/Release): 약 1.5초 동안 잔향이 사라짐
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
  
    // 3. 노드 연결 및 재생 후 자동 종료
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
  
    osc.start(now);
    osc.stop(now + 1.5); // 소리가 완전히 꺼진 후 노드 삭제
  };
  
  // 음계별 주파수 매핑 테이블 (예시: 5옥타브 도레미파솔라시도)
  export const NOTE_FREQS = {
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46,
    G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
  };