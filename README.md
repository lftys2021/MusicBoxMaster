# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


+-----------------------------------------------------------------------+
|  [상단 타임라인/헤더] 오르골 제목 & 재생 컨트롤 (BPM, 재생/정지 버튼)        |
+-----------------------------------------------------------------------+
|                                                                       |
|  ■ 중앙 악보 영역 (Main Canvas / Grid)                                 |
|    - 왼쪽에서 오른쪽으로 (혹은 위에서 아래로) 흘러가는 긴 종이 테이프          |
|    - 가로줄: 음계 (도, 레, 미...) / 세로줄: 박자 (Tick)                   |
|    - 테이프 위에 펀칭된 점(●)들이 실린더를 향해 부드럽게 이동             |
|                                                                       |
+-----------------------------------------------------------------------+
|  ■ 하단 영역 (기계 및 서브 컨트롤)                                      |
|  +---------------------------+  +----------------------------------+  |
|  | [하단 왼쪽: 오르골 본체]     |  | [하단 오른쪽: 악보 편집/유틸]     |  |
|  | - 회전하는 황동 실린더       |  | - 악보 지우기, 샘플 곡 불러오기  |  |
|  | - 팅기는 금속 빗(Comb)      |  | - 점 찍기 가이드 툴팁            |  |
|  | - 종이가 맞물려 들어가는 입구 |  |                                  |  |
|  +---------------------------+  +----------------------------------+  |
+-----------------------------------------------------------------------+

src/
├── components/
│   ├── MusicBoxApp.jsx         # 전체 레이아웃을 잡는 메인 부모 컴포넌트
│   ├── HeaderControl.jsx       # 상단 재생/정지, BPM 조절 바
│   ├── PaperTapeCanvas.jsx     # [1, 3번] 중앙에서 흘러가는 점 박힌 종이 테이프 (Canvas)
│   ├── MechanicalView.jsx      # [2번] 하단 왼쪽의 회전하는 실린더와 본체 그래픽
│   └── EditorTools.jsx         # 하단 오른쪽의 샘플 곡 선택 및 편집 도구
├── hooks/
│   └── useMusicBoxLoop.js      # 정밀 타이머 및 재생 위치(Tick) 관리 커스텀 훅
├── utils/
│  └── audioEngine.js          # Web Audio API 오르골 소리 합성 함수
└── css/
│   ├── MusicBoxApp.css          # 전체 레이아웃을 잡는 메인 부모 컴포넌트 css
│   ├── HeaderControl.css       # 상단 재생/정지, BPM 조절 바 css
│   ├── PaperTapeCanvas.css     # [1, 3번] 중앙에서 흘러가는 점 박힌 종이 테이프 (Canvas) css
│   ├── MechanicalView.css      # [2번] 하단 왼쪽의 회전하는 실린더와 본체 그래픽 css
│   ├── EditorTools.css         # 하단 오른쪽의 샘플 곡 선택 및 편집 도구 css
│   ├── useMusicBoxLoop.css      # 정밀 타이머 및 재생 위치(Tick) 관리 커스텀 훅 css
│   └── audioEngine.css          # Web Audio API 오르골 소리 합성 함수 css

"# MusicBoxMaster" 



음표 종류 | 음표 길이 | 오르골 틱(Tick) 수 |
16분 음표 | 0.25 박자 | 1 틱 | 
8분 음표  | 0.5 박자 | 2 틱 |
점 8분 음표 | 0.25 박자 | 3 틱 | 
4분 음표  | 1 박자 | 4 틱 | 
점 4분 음표  | 1 박자 | 6 틱 |
2분 음표  | 2 박자 | 8 틱 |
점 2분 음표  | 2 박자 | 12 틱 |
온 음표  | 4 박자 | 16 틱 |

16분 쉼표 | 0.25 박자 | 1 틱 | 
8분 쉼표  | 0.5 박자 | 2 틱 |
점 8분 쉼표 | 0.25 박자 | 3 틱 | 
4분 쉼표  | 1 박자 | 4 틱 | 
점 4분 쉼표  | 1 박자 | 6 틱 |
2분 쉼표  | 2 박자 | 8 틱 |
점 2분 쉼표  | 2 박자 | 12 틱 |
온 쉼표  | 4 박자 | 16 틱 |