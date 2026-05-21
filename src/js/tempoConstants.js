// tempoConstants.js

export const TEMPO_PRESETS = {
    LARGO:      {term: "Largo",      kor: "매우 느리게",              minBpm: 40, maxBpm: 55, bpm: 46 },
    ADAGIO:     {term: "Adagio",     kor: "느리게 (침착하고 차분하게)", minBpm: 56, maxBpm: 72, bpm: 56 },
    ANDANTE:    {term: "Andante",    kor: "걸음걸이 속도로 느리게",     minBpm: 73, maxBpm: 77, bpm: 73 },
    ANDANTINO:  {term: "Andantino",  kor: "안단테보다 조금 빠르게",     minBpm: 78, maxBpm: 85, bpm: 78 },
    MODERATO:   {term: "Moderato",   kor: "보통 빠르게",               minBpm: 86, maxBpm: 97, bpm: 86 },
    ALLEGRETTO: {term: "Allegretto", kor: "조금 빠르게 (경쾌하게)",     minBpm: 98, maxBpm: 109, bpm: 98 },
    ALLEGRO:    {term: "Allegro",    kor: "빠르게 (신나고 활기차게)",   minBpm: 110, maxBpm: 131, bpm: 110 },
    VIVACE:     {term: "Vivace",     kor: "발랄하게 빠르게 (쾌활하게)", minBpm: 132, maxBpm: 139, bpm: 132 },
    PRESTO:     {term: "Presto",     kor: "매우 빠르게 (성급하게)",     minBpm: 140, maxBpm: 200, bpm: 140 }
};

/**
 * 특정 BPM 값을 넣으면 가장 가까운 템포 용어를 반환하는 헬퍼 함수
 * (악보 에디터에서 BPM을 바꿨을 때 상단에 'Adagio' 등을 동적으로 띄워주기 위함)
 */
export const getTempoByBpm = (bpm) => {
    const presets = Object.values(TEMPO_PRESETS);

    // 범위 내에 만족하는 프리셋 찾기
    const matched = presets.find(p => bpm >= p.minBpm && bpm <= p.maxBpm);

    // 만약 범위를 벗어나면 기본값 처리
    if (!matched) {
        return bpm < 40 ? TEMPO_PRESETS.LARGO : TEMPO_PRESETS.PRESTO;
    }

    return matched;
};