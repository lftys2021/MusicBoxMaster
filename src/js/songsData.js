// songsData.js
export const BUILTIN_SONGS = {
  airplane: {
    id: 'airplane',
    title: '비행기 (전곡)',
    bpm: 110,
    timeSignature: '4/4',
    totalMeasures: 8,
    measures: [
      // 1마디: 미(4) 레(4) 도(4) 레(4)
      [
        { tick: 0, note: 'E5' }, { tick: 4, note: 'D5' },
        { tick: 8, note: 'C5' }, { tick: 12, note: 'D5' }
      ],
      // 2마디: 미(4) 미(4) 미-(8) <- 마지막 미는 2박자 롱노트 공간 유지
      [
        { tick: 0, note: 'E5' }, { tick: 4, note: 'E5' },
        { tick: 8, note: 'E5' }
      ],
      // 3마디: 레(4) レ(4) 레-(8)
      [
        { tick: 0, note: 'D5' }, { tick: 4, note: 'D5' },
        { tick: 8, note: 'D5' }
      ],
      // 4마디: 미(4) 솔(4) 솔-(8)
      [
        { tick: 0, note: 'E5' }, { tick: 4, note: 'G5' },
        { tick: 8, note: 'G5' }
      ],
      // 5마디: 미(4) 레(4) 도(4) 레(4)
      [
        { tick: 0, note: 'E5' }, { tick: 4, note: 'D5' },
        { tick: 8, note: 'C5' }, { tick: 12, note: 'D5' }
      ],
      // 6마디: 미(4) 미(4) 미-(8)
      [
        { tick: 0, note: 'E5' }, { tick: 4, note: 'E5' },
        { tick: 8, note: 'E5' }
      ],
      // 7마디: 레(4) 레(4) 미(4) 레(4)
      [
        { tick: 0, note: 'D5' }, { tick: 4, note: 'D5' },
        { tick: 8, note: 'E5' }, { tick: 12, note: 'D5' }
      ],
      // 8마디: 도---(16) <- 대단원의 마지막 롱노트
      [
        { tick: 0, note: 'C5' }
      ]
    ]
  },

  twinkleStar: {
    id: 'twinkleStar',
    title: '작은 별',
    bpm: 96, // 조금 더 아늑하고 클래식한 오르골 템포
    timeSignature: '4/4',
    totalMeasures: 12,
    measures: [
      // 1마디: 도(4) 도(4) 솔(4) 솔(4) [반짝 반짝]
      [
        { tick: 0, note: 'C5' }, { tick: 4, note: 'C5' },
        { tick: 8, note: 'G5' }, { tick: 12, note: 'G5' }
      ],
      // 2마디: 라(4) 라(4) 솔-(8) [작은 별]
      [
        { tick: 0, note: 'A5' }, { tick: 4, note: 'A5' },
        { tick: 8, note: 'G5' }
      ],
      // 3마디: 파(4) 파(4) 미(4) 미(4) [아름답게]
      [
        { tick: 0, note: 'F5' }, { tick: 4, note: 'F5' },
        { tick: 8, note: 'E5' }, { tick: 12, note: 'E5' }
      ],
      // 4마디: 레(4) 레(4) 도-(8) [비치네]
      [
        { tick: 0, note: 'D5' }, { tick: 4, note: 'D5' },
        { tick: 8, note: 'C5' }
      ],
      // 5마디: 솔(4) 솔(4) 파(4) 파(4) [동쪽 하늘]
      [
        { tick: 0, note: 'G5' }, { tick: 4, note: 'G5' },
        { tick: 8, note: 'F5' }, { tick: 12, note: 'F5' }
      ],
      // 6마디: 미(4) 미(4) 레-(8) [에서도]
      [
        { tick: 0, note: 'E5' }, { tick: 4, note: 'E5' },
        { tick: 8, note: 'D5' }
      ],
      // 7마디: 솔(4) 솔(4) 파(4) 파(4) [서쪽 하늘]
      [
        { tick: 0, note: 'G5' }, { tick: 4, note: 'G5' },
        { tick: 8, note: 'F5' }, { tick: 12, note: 'F5' }
      ],
      // 8마디: 미(4) 미(4) 레-(8) [에서도]
      [
        { tick: 0, note: 'E5' }, { tick: 4, note: 'E5' },
        { tick: 8, note: 'D5' }
      ],
      // 9마디: 도(4) 도(4) 솔(4) 솔(4) [반짝 반짝]
      [
        { tick: 0, note: 'C5' }, { tick: 4, note: 'C5' },
        { tick: 8, note: 'G5' }, { tick: 12, note: 'G5' }
      ],
      // 10마디: 라(4) 라(4) 솔-(8) [작은 별]
      [
        { tick: 0, note: 'A5' }, { tick: 4, note: 'A5' },
        { tick: 8, note: 'G5' }
      ],
      // 11마디: 파(4) 파(4) 미(4) 미(4) [아름답게]
      [
        { tick: 0, note: 'F5' }, { tick: 4, note: 'F5' },
        { tick: 8, note: 'E5' }, { tick: 12, note: 'E5' }
      ],
      // 12마디: 레(4) 레(4) 도-(8) [비치네]
      [
        { tick: 0, note: 'D5' }, { tick: 4, note: 'D5' },
        { tick: 8, note: 'C5' }
      ]
    ]
  }
};