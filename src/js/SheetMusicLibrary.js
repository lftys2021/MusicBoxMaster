/**
 * SheetMusicLibrary.js
 * 부품 분리형(머리, 기둥, 꼬리) 전문 악보 드로잉 라이브러리
 */

const MUSIC_COLORS = {
  main: '#221100', // 고풍스러운 진한 브라운
};

const setupStyle = (ctx) => {
  ctx.fillStyle = MUSIC_COLORS.main;
  ctx.strokeStyle = MUSIC_COLORS.main;
  ctx.lineWidth = 1.5;
};

export const MusicDrawer = {
  // 1. 점(Dot) 그리기
  drawDot: (ctx, x, y, offsetX = 11, offsetY = -2) => {
    setupStyle(ctx);
    ctx.beginPath();
    ctx.arc(x + offsetX, y + offsetY, 1.8, 0, Math.PI * 2);
    ctx.fill();
  },

  // 2. 음표 머리 (Note Heads)
  drawNoteHead: (ctx, x, y, isFilled = true) => {
    setupStyle(ctx);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.25); // 악보 특유의 비스듬한 기울기
    ctx.beginPath();
    ctx.ellipse(0, 0, 6, 4.5, 0, 0, Math.PI * 2);
    if (isFilled) {
      ctx.fill();
    } else {
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
  },

  // 3. 🌟 [핵심 분리] 음표 기둥 (Note Stem)
  // 머리 중심(x, y)과 방향(isUp)을 받아 정확한 하모닉 비율로 기둥을 긋습니다.
  drawStem: (ctx, x, y, isUp = true) => {
    setupStyle(ctx);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (isUp) {
      // 기둥이 위로 갈 때: 머리 오른쪽 끝(x + 5)에서 위로 28px
      ctx.moveTo(x + 5, y);
      ctx.lineTo(x + 5, y - 28);
    } else {
      // 기둥이 아래로 갈 때: 머리 왼쪽 끝(x - 5)에서 아래로 28px
      ctx.moveTo(x - 5, y);
      ctx.lineTo(x - 5, y + 28);
    }
    ctx.stroke();
  },

  // 4. 🌟 [핵심 분리] 음표 꼬리 (Flags)
  // 기둥 끝 좌표를 기준으로 베지어 곡선을 그려 8분/16분 음표 꼬리를 결합합니다.
  drawFlag: (ctx, x, y, isUp = true, isSixteenth = false) => {
    setupStyle(ctx);
    ctx.lineWidth = 1.5;
    
    // 기둥 끝 지점 찾기
    const stemEndX = isUp ? x + 5 : x - 5;
    const stemEndY = isUp ? y - 28 : y + 28;
    const directionY = isUp ? 1 : -1; // 위/아래 곡률 반전 제어용

    ctx.beginPath();
    ctx.moveTo(stemEndX, stemEndY);
    // 첫 번째 꼬리 곡선
    ctx.bezierCurveTo(
      stemEndX + 7, stemEndY + (8 * directionY), 
      stemEndX + 9, stemEndY + (18 * directionY), 
      stemEndX + 5, stemEndY + (23 * directionY)
    );
    ctx.stroke();

    // 16분 음표일 경우 안쪽에 안테나 꼬리 하나 더 추가
    if (isSixteenth) {
      const innerY = stemEndY + (6 * directionY);
      ctx.beginPath();
      ctx.moveTo(stemEndX, innerY);
      ctx.bezierCurveTo(
        stemEndX + 7, innerY + (8 * directionY), 
        stemEndX + 9, innerY + (16 * directionY), 
        stemEndX + 5, innerY + (20 * directionY)
      );
      ctx.stroke();
    }
  },

  // --- 𝄀 마디선 및 고정 기호류 ---
  // 높은음자리표
  drawTrebleClef: (ctx, x, y) => { 
    ctx.fillStyle = '#221100';
    ctx.font = 'bold 38px Georgia';
    ctx.fillText('𝄞', x, y + 30);
  },

  // 낮은음자리표
  drawBassClef: (ctx, x, y) => { 
    ctx.fillStyle = '#221100';
    ctx.font = 'bold 38px Georgia';
    ctx.fillText('𝄢', x, y + 30);
  },

  // --- 𝄃𝄂 박자표 (Time Signatures) ---
  drawTimeSignature: (ctx, x, y, sigConfig) => {
    ctx.fillStyle = '#221100';
    ctx.font = 'bold 26px "Times New Roman", Times, serif';
    ctx.textAlign = 'center';
    ctx.fillText(sigConfig.textTop, x, y + 18);
    ctx.fillText(sigConfig.textBottom, x, y + 38);
    ctx.textAlign = 'left';
  },

  // 마디
  drawNormalBarline: (ctx, x, yTop, yBottom) => {
    ctx.strokeStyle = '#554433';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x, yTop);
    ctx.lineTo(x, yBottom);
    ctx.stroke();
  },

  // 끝마디
  drawFinalBarline: (ctx, x, yTop, yBottom) => {
    ctx.strokeStyle = '#221100';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x - 4, yTop); ctx.lineTo(x - 4, yBottom); ctx.stroke();
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x, yTop); ctx.lineTo(x, yBottom); ctx.stroke();
  },

  // --- 𝄾 쉼표류 ---
  // 온 쉼표
  drawWholeRest: (ctx, x, y) => {
    ctx.fillStyle = '#221100';
    ctx.font = '22px "Times New Roman", Times, serif';
    ctx.fillText('𝄻', x, y + 7); // 오선지 줄/칸에 맞추기 위해 Y축 보정
  },

  // 2분 쉼표
  drawHalfRest: (ctx, x, y) => {
    ctx.fillStyle = '#221100';
    ctx.font = '22px "Times New Roman", Times, serif';
    ctx.fillText('𝄼', x, y + 7); // 오선지 줄/칸에 맞추기 위해 Y축 보정
  },

  // 4분 쉼표
  drawQuarterRest: (ctx, x, y) => {
    ctx.fillStyle = '#221100';
    ctx.font = '22px "Times New Roman", Times, serif';
    ctx.fillText('𝄽', x, y + 7); // 오선지 줄/칸에 맞추기 위해 Y축 보정
  },

  // 8분 쉼표
  drawEighthRest: (ctx, x, y) => {
    ctx.fillStyle = '#221100';
    ctx.font = '22px "Times New Roman", Times, serif';
    ctx.fillText('𝄾', x, y + 7); // 오선지 줄/칸에 맞추기 위해 Y축 보정
  },

  // 16분 쉼표
  drawSixteenthRest: (ctx, x, y) => {
    ctx.fillStyle = '#221100';
    ctx.font = '22px "Times New Roman", Times, serif';
    ctx.fillText('𝄿', x, y + 7); // 오선지 줄/칸에 맞추기 위해 Y축 보정
  },

  // SheetMusicLibrary.js 내부 MusicDrawer 객체에 추가

  // --- ♯ ♭ 조표 및 임시표 (Accidentals) ---

  // # 샵
  drawSharp: (ctx, x, y) => {
    ctx.fillStyle = '#221100';
    ctx.font = '22px "Times New Roman", Times, serif';
    ctx.fillText('♯', x, y + 7); // 오선지 줄/칸에 맞추기 위해 Y축 보정
  },

  // ♭ 플랫
  drawFlat: (ctx, x, y) => {
    ctx.fillStyle = '#221100';
    ctx.font = '22px "Times New Roman", Times, serif';
    ctx.fillText('♭', x, y + 6); // 오선지 줄/칸에 맞추기 위해 Y축 보정
  },

  // ♮ 내추럴
  drawNatural: (ctx, x, y) => {
    ctx.fillStyle = '#221100';
    ctx.font = '22px "Times New Roman", Times, serif';
    ctx.fillText('♮', x, y + 6); // 오선지 줄/칸에 맞추기 위해 Y축 보정
  }
};