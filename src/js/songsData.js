// songsData.js
import { TEMPO_PRESETS } from './tempoConstants';

export const BUILTIN_SONGS = {
  airplane: {
    id: 'airplane',
    title: '비행기',
    bpm: TEMPO_PRESETS.MODERATO.bpm, // MODERATO = 108 BPM
    term: TEMPO_PRESETS.MODERATO.term, // MODERATO = 108 BPM
    timeSignature: '4/4',
    totalMeasures: 8,
    measures: [
      // 1마디: 미(4) 레(4) 도(4) 레(4)
      [
        { tick: 0, type: 'quarter', isDotted: true, note: 'E5' },
        { tick: 4, type: 'eighth', isDotted: false, note: 'D5' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'C5' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'D5' }
      ],
      // 2마디: 미(4) 미(4) 미-(8) [2분음표]
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'E5' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'E5' },
        { tick: 8, type: 'half', isDotted: false, note: 'E5' }
      ],
      // 3마디: 레(4) 레(4) 레-(8) [2분음표]
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'D5' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'D5' },
        { tick: 8, type: 'half', isDotted: false, note: 'D5' }
      ],
      // 4마디: 미(4) 솔(4) 솔-(8) [2분음표]
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'E5' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'G5' },
        { tick: 8, type: 'half', isDotted: false, note: 'G5' }
      ],
      // 5마디: 미(4) 레(4) 도(4) 레(4)
      [
        { tick: 0, type: 'quarter', isDotted: true, note: 'E5' },
        { tick: 4, type: 'eighth', isDotted: false, note: 'D5' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'C5' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'D5' }
      ],
      // 6마디: 미(4) 미(4) 미(4) 미(4)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'E5' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'E5' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'E5' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'E5' }
      ],
      // 7마디: 레(4) 레(4) 미(4) 레(4)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'D5' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'D5' },
        { tick: 8, type: 'quarter', isDotted: true, note: 'E5' },
        { tick: 12, type: 'eighth', isDotted: false, note: 'D5' }
      ],
      // 8마디: 도---(12) [점2분음표] + 4분쉼표(4) = 총 16틱
      [
        { tick: 0, type: 'half', isDotted: true, note: 'C5' },
        { tick: 12, type: 'quarterRest', isDotted: false }
      ]
    ]
  },

  twinkleStar: {
    id: 'twinkleStar',
    title: '작은 별',
    bpm: TEMPO_PRESETS.ANDANTE.bpm, // ANDANTE = 76 BPM
    term: TEMPO_PRESETS.ANDANTE.term, // MODERATO = 108 BPM
    timeSignature: '4/4',
    totalMeasures: 12,
    measures: [
      // 1마디: 도도솔솔
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'C4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'C4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'G4' }
      ],
      // 2마디: 라라솔- (2분음표)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'A4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'A4' },
        { tick: 8, type: 'half', isDotted: false, note: 'G4' }
      ],
      // 3마디: 파파미미
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'F4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'F4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'E4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'E4' }
      ],
      // 4마디: 레레도- (2분음표)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'D4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'D4' },
        { tick: 8, type: 'half', isDotted: false, note: 'C4' }
      ],
      // 5마디: 솔솔파파
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'F4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'F4' }
      ],
      // 6마디: 미미레- (2분음표)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'E4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'E4' },
        { tick: 8, type: 'half', isDotted: false, note: 'D4' }
      ],
      // 7마디: 솔솔파파
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'F4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'F4' }
      ],
      // 8마디: 미미레- (2분음표)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'E4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'E4' },
        { tick: 8, type: 'half', isDotted: false, note: 'D4' }
      ],
      // 9마디: 도도솔솔
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'C4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'C4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'G4' }
      ],
      // 10마디: 라라솔- (2분음표)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'A4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'A4' },
        { tick: 8, type: 'half', isDotted: false, note: 'G4' }
      ],
      // 11마디: 파파미미
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'F4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'F4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'E4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'E4' }
      ],
      // 12마디: 레레도- (2분음표)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'D4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'D4' },
        { tick: 8, type: 'half', isDotted: false, note: 'C4' }
      ]
    ]
  },

  doremi: {
    id: 'doremi',
    title: '도레미',
    bpm: TEMPO_PRESETS.ALLEGRETTO.bpm, // MODERATO = 108 BPM
    term: TEMPO_PRESETS.ALLEGRETTO.term, // MODERATO = 108 BPM
    timeSignature: '4/4',
    totalMeasures: 8,
    measures: [
      // 1마디: 도(1) 레(2) 미(3) 파(4), 쉼(2)
      [
        { tick: 0, type: 'sixteenth', isDotted: false, note: 'C4' },
        { tick: 1, type: 'eighth', isDotted: false, note: 'D4' },
        { tick: 3, type: 'eighth', isDotted: true, note: 'E4' },
        { tick: 6, type: 'quarter', isDotted: false, note: 'F4' },
        { tick: 10, type: 'eighthRest', isDotted: false }
      ],
      // 2마디: 솔(6) 라(8) 쉼(2) [점 4분음표][점 4분음표][8분쉼표]
      [
        { tick: 0, type: 'quarter', isDotted: true, note: 'G4' },
        { tick: 6, type: 'quarter', isDotted: true, note: 'A4' },
        { tick: 14, type: 'eighthRest', isDotted: false }
      ],
      // 3마디: 시(12) 쉼(4) [점 2분음표][4분쉼표]
      [
        { tick: 0, type: 'half', isDotted: true, note: 'B4' },
        { tick: 12, type: 'quarterRest', isDotted: false }
      ],
      // 4마디: 도(16) [온 음표]
      [
        { tick: 0, type: 'whole', isDotted: false, note: 'C5' }
      ],
      // 5마디: 도(1) 레(2) 미(3) 파(4), 쉼(2)
      [
        { tick: 0, type: 'sixteenth', isDotted: false, note: 'C5' },
        { tick: 1, type: 'eighth', isDotted: false, note: 'B4' },
        { tick: 3, type: 'eighth', isDotted: true, note: 'A4' },
        { tick: 6, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 10, type: 'eighthRest', isDotted: false }
      ],
      // 6마디: 솔(6) 라(8) 쉼(2) [점 4분음표][점 4분음표][8분쉼표]
      [
        { tick: 0, type: 'quarter', isDotted: true, note: 'F4' },
        { tick: 6, type: 'quarter', isDotted: true, note: 'E4' },
        { tick: 14, type: 'eighthRest', isDotted: false }
      ],
      // 7마디: 시(12) 쉼(4) [점 2분음표][4분쉼표]
      [
        { tick: 0, type: 'half', isDotted: true, note: 'D4' },
        { tick: 12, type: 'quarterRest', isDotted: false }
      ],
      // 8마디: 도(16) [온 음표]
      [
        { tick: 0, type: 'whole', isDotted: false, note: 'C4' }
      ]
    ]
  },

  schoolBell: {
    id: 'schoolBell',
    title: '학교종',
    bpm: TEMPO_PRESETS.MODERATO.bpm, // MODERATO = 108 BPM
    term: TEMPO_PRESETS.MODERATO.term, // MODERATO = 108 BPM
    timeSignature: '4/4',
    totalMeasures: 8,
    measures: [
      // 1마디: 솔(4) 솔(4) 라(4) 라(4)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'A4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'A4' }
      ],
      // 2마디: 솔(4) 솔(4) 미-(8) [2분음표]
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 8, type: 'half', isDotted: false, note: 'E4' }
      ],
      // 3마디: 솔(4) 솔(4) 미(4) 미(4)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'E4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'E4' }
      ],
      // 4마디: 레(12) 쉼(4) [점 2분음표]
      [
        { tick: 0, type: 'quarter', isDotted: true, note: 'D4' },
        { tick: 12, type: 'quarterRest', isDotted: false }
      ],
      // 5마디: 솔(4) 솔(4) 라(4) 라(4)
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'A4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'A4' }
      ],
      // 2마디: 솔(4) 솔(4) 미-(8) [2분음표]
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 8, type: 'half', isDotted: false, note: 'E4' }
      ],
      // 3마디: 솔(4) 레(4) 미(4) 레(8) [2분음표]
      [
        { tick: 0, type: 'quarter', isDotted: false, note: 'G4' },
        { tick: 4, type: 'quarter', isDotted: false, note: 'E4' },
        { tick: 8, type: 'quarter', isDotted: false, note: 'D4' },
        { tick: 12, type: 'quarter', isDotted: false, note: 'E4' }
      ],
      // 4마디: 도(12) 쉼(4) [점 2분음표]
      [
        { tick: 0, type: 'quarter', isDotted: true, note: 'C4' },
        { tick: 12, type: 'quarterRest', isDotted: false }
      ]
    ]
  }
};