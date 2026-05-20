// songsData.js
export const BUILTIN_SONGS = {
  airplane: {
    title: "비행기 (전곡)",
    bpm: 110,                // 조금 더 경쾌하게 속도를 올렸습니다.
    timeSignature: "4/4",
    totalMeasures: 8,        // 총 8소절 전곡 플레이
    // 소절(Measure) 단위 배열 구조 유지
    measures: [
      // 1 소절: 미-레-도-레
      [
        { tick: 0, note: "E5" },
        { tick: 4, note: "D5" },
        { tick: 8, note: "C5" },
        { tick: 12, note: "D5" }
      ],
      // 2 소절: 미-미-미
      [
        { tick: 0, note: "E5" },
        { tick: 4, note: "E5" },
        { tick: 8, note: "E5" }
      ],
      // 3 소절: 레-레-레
      [
        { tick: 0, note: "D5" },
        { tick: 4, note: "D5" },
        { tick: 8, note: "D5" }
      ],
      // 4 소절: 미-솔-솔
      [
        { tick: 0, note: "E5" },
        { tick: 4, note: "G5" },
        { tick: 8, note: "G5" }
      ],
      // 5 소절: 미-레-도-레 (2절 시작)
      [
        { tick: 0, note: "E5" },
        { tick: 4, note: "D5" },
        { tick: 8, note: "C5" },
        { tick: 12, note: "D5" }
      ],
      // 6 소절: 미-미-미-미
      [
        { tick: 0, note: "E5" },
        { tick: 4, note: "E5" },
        { tick: 8, note: "E5" },
        { tick: 12, note: "E5" }
      ],
      // 7 소절: 레-레-미-레
      [
        { tick: 0, note: "D5" },
        { tick: 4, note: "D5" },
        { tick: 8, note: "E5" },
        { tick: 12, note: "D5" }
      ],
      // 8 소절: 도--- (마무리)
      [
        { tick: 0, note: "C5" }
      ]
    ]
  }
};