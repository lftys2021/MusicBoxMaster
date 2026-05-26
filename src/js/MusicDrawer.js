// MusicDrawer.js 내부 예시
const MusicDrawer = {
  
    // 💡 drawTrebleClef 이름이 정확히 일치하나요? (대소문자 C 주의!)
    drawTrebleClef: function(ctx, x, y) {
      // 높은음자리표 그리는 로직 (또는 특수문자 𝄢 렌더링)
      ctx.font = '36px serif';
      ctx.fillText('𝄞', x, y);
    },
  
    // 💡 drawBassClef 이름도 함께 확인해 줍니다.
    drawBassClef: function(ctx, x, y) {
      // 낮은음자리표 그리는 로직
      ctx.font = '36px serif';
      ctx.fillText('𝄢', x, y);
    }
  };
  
  export default MusicDrawer;