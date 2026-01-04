# Mini Jet Engine Simulator

제트 엔진 시뮬레이터 웹 애플리케이션입니다. 실시간 물리 시뮬레이션, 오디오 피드백, 그리고 인터랙티브한 UI를 제공합니다.

## 주요 기능

- **실시간 엔진 시뮬레이션**: RPM, EGT(배기 가스 온도), 연료 소비 등 실시간 모니터링
- **상태 머신**: OFF → READY → GLOW → START → IGNITION → RAMP → RUNNING → COOLING 상태 전이
- **안전 시스템**: 저전압, 플레임아웃, 핫 스타트 등 실패 모드 시뮬레이션
- **애프터버너**: 고출력 모드 지원
- **환경 조건**: 온도 및 고도 변화에 따른 엔진 성능 변화
- **오디오 피드백**: Tone.js를 사용한 실시간 엔진 사운드
- **시각화**: Canvas 기반 입자 효과 및 그래프 모니터링

## 실행 방법

### GitHub Pages

현재 리포지토리의 GitHub Pages에서 바로 실행합니다:

1. `https://jtech-co.github.io/Mini-Jet-Engine-Sim/index.html` 접속 → [링크](<https://jtech-co.github.io/Mini-Jet-Engine-Sim/index.html>)

### 로컬 실행

로컬에서 테스트하려면 간단한 HTTP 서버가 필요합니다:

```bash
# Python 3
cd public
python -m http.server 8000

# Node.js (http-server)
npx http-server public -p 8000

# VS Code Live Server 확장 사용
```

그 후 브라우저에서 `http://localhost:8000` 접속

## 프로젝트 구조

```
public/
├── index.html              # 메인 HTML 파일
├── src/
│   ├── main.js            # 엔트리 포인트
│   ├── bootstrap/         # 초기화 모듈
│   ├── config/            # 설정 파일 (CFG, ST, DOM IDs 등)
│   ├── state/             # 상태 관리 (store, selectors, actions)
│   ├── sim/               # 시뮬레이션 로직
│   │   ├── environment/   # 환경 조건 (density, envRules)
│   │   ├── fsm/          # 상태 머신 (stateMachine, stateNames)
│   │   ├── dynamics/     # 동역학 (spool, thermal, fuel)
│   │   └── safety/       # 안전 시스템 (failures, afterburner)
│   ├── audio/            # 오디오 시스템
│   │   ├── audioEngine.js
│   │   ├── synths/       # 각종 사운드 신시사이저
│   │   └── audioUpdate.js
│   ├── render/           # 렌더링 시스템
│   │   ├── canvas/       # Canvas 렌더링 (particles, graph)
│   │   ├── svg/         # SVG 렌더링 (wiring)
│   │   └── rafLoop.js   # 애니메이션 루프
│   ├── ui/              # UI 관련
│   │   ├── dom.js       # DOM 요소 캐시
│   │   ├── update/      # UI 업데이트 함수들
│   │   └── events/      # 이벤트 핸들러들
│   ├── styles/          # CSS 파일들
│   │   ├── main.css     # 진입점
│   │   ├── base.css
│   │   ├── animations.css
│   │   ├── env.css
│   │   └── components/  # 컴포넌트별 스타일
│   └── utils/           # 유틸리티 함수들
```

## 사용 방법

### 기본 조작

1. **MASTER 버튼**: 시스템 전원 켜기 (오디오 권한 필요)
2. **TRIM UP**: 엔진 준비 상태로 전환
3. **THROTTLE**: 스로틀 레버 조작 (0-100%)
4. **TRIM DOWN**: 엔진 정지 및 냉각

### 고급 기능

- **애프터버너**: A/B ARM 버튼으로 활성화 (RPM 95% 이상에서 작동)
- **연료 탱크 클릭**: 연료 탱크를 흔들어 버블 생성 (엔진 불안정 시뮬레이션)
- **배터리 클릭**: 전압 고장 시뮬레이션 (6.4V로 떨어짐)
- **TEST PUMP**: 수동 연료 펌프 테스트
- **GRAPH 버튼**: GSU 터미널에서 그래프 모드 전환

### 환경 조건

- **Basic**: 정상 조건
- **Low/High Temp**: 온도 변화 (밀도 영향)
- **Low/High Altitude**: 고도 변화 (밀도 영향)

### 실패 모드 (Failure Modes)

시뮬레이터는 여러 가지 실패 상황을 시뮬레이션합니다. 각 실패 모드는 특정 조건에서 발동되며, 화면 상단에 빨간색 경고 알림이 표시됩니다.

#### 1. LOW BATTERY (저전압)

- **발동 조건**: 
  - 배터리 전압이 6.5V 이하로 떨어질 때
  - 배터리를 클릭하여 수동으로 전압을 6.4V로 떨어뜨릴 수 있음
- **알림 메시지**: 
  - 제목: "LOW BATTERY"
  - 내용: "Voltage below 6.5V. ECU Lockout."
  - 조치: "Click Battery to Reconnect"
- **영향**: 
  - 엔진이 LOCKOUT 상태로 전환되어 모든 기능이 정지됨
  - ECU가 차단되어 엔진 제어 불가
- **해결 방법**: 
  - 배터리 팩을 클릭하여 전압을 7.6V로 복구
  - 전압이 7.0V 이상이 되면 자동으로 LOCKOUT 해제 및 OFF 상태로 전환

#### 2. FLAMEOUT (화염 소멸)

- **발동 조건**: 
  - 엔진이 RUN 상태일 때
  - RPM이 80,000 이상일 때
  - 스로틀을 급격히 내릴 때 (40% 이상 감소)
  - 발동 확률: 30% (정상 밀도), 50% (저밀도 환경)
- **알림 메시지**: 
  - 제목: "FLAMEOUT"
  - 내용: "Rapid Throttle Drop Detected"
  - 조치: "Stick Down & Trim Down to Reset"
- **영향**: 
  - 엔진이 COOL 상태로 전환됨
  - EGT가 100°C 감소
- **해결 방법**: 
  - 스로틀을 5% 이하로 낮춤
  - TRIM DOWN 버튼을 눌러 알림 해제
  - 엔진을 다시 시동해야 함

#### 3. HOT START (과열 시동)

- **발동 조건**: 
  - 엔진이 IGN (점화) 상태일 때
  - EGT가 700°C 이상일 때
  - 랜덤 확률로 EGT가 50°C 추가 상승 (약 10% 확률)
  - EGT가 850°C를 초과하면 발동
- **알림 메시지**: 
  - 제목: "HOT START"
  - 내용: "EGT Exceeded 850°C"
  - 조치: "TRIM DOWN IMMEDIATELY"
- **영향**: 
  - 엔진이 COOL 상태로 강제 전환됨
  - 과열로 인한 엔진 손상 방지를 위한 자동 정지
- **해결 방법**: 
  - 즉시 TRIM DOWN 버튼을 눌러 알림 해제
  - 엔진이 냉각될 때까지 대기
  - 냉각 후 다시 시동 절차 진행

#### 4. 연료 부족 (Fuel Depletion)

- **발동 조건**: 
  - 연료량이 0%에 도달할 때
  - 엔진이 IGN 이상 상태에서 연료가 소진될 때
- **알림 메시지**: 없음 (자동 처리)
- **영향**: 
  - 엔진이 자동으로 COOL 상태로 전환됨
  - 연료가 없으면 엔진 작동 불가
- **참고 사항**: 
  - 연료가 20% 이하로 떨어지면 버블 팩터가 증가하여 엔진 불안정도 증가
  - 애프터버너 사용 시 연료 소비가 3배 증가

## 커스터마이징

### 엔진 설정 변경

`src/config/simConfig.js`에서 엔진 파라미터를 수정할 수 있습니다:

```javascript
export const CFG = { 
    idle: 35000,      // 유휴 RPM
    max: 140000,      // 최대 RPM
    startRpm: 25000,  // 시동 RPM
    ignTemp: 400,     // 점화 온도 (°C)
    maxEgt: 850       // 최대 배기 온도 (°C)
};
```

### 상태 머신 수정

`src/sim/fsm/stateMachine.js`에서 상태 전이 로직을 수정할 수 있습니다.

### 오디오 조정

`src/audio/audioUpdate.js`에서 오디오 파라미터를 조정할 수 있습니다.

### 스타일 변경

`src/styles/` 폴더의 CSS 파일들을 수정하여 UI를 커스터마이징할 수 있습니다.

## 기술 스택

- **HTML5/CSS3**: 구조 및 스타일링
- **JavaScript (ES6 Modules)**: 모듈화된 코드 구조
- **Tone.js**: 웹 오디오 API 래퍼
- **Tailwind CSS**: 유틸리티 CSS 프레임워크 (CDN)
- **Font Awesome**: 아이콘 (CDN)

## 브라우저 호환성

- Chrome/Edge/Brave (권장)
- Firefox
- Safari

**참고**: 오디오 기능을 사용하려면 사용자 인터랙션 후 오디오 컨텍스트를 시작해야 합니다 (MASTER 버튼 클릭).

## 라이선스

이 프로젝트는 교육 및 시뮬레이션 목적으로 제작되었습니다.

## 버전

- **현재 버전**: V11
- **GSU 버전**: V4.5

## 문제 해결

### 오디오가 작동하지 않음
- 브라우저가 오디오 자동 재생을 차단할 수 있습니다. MASTER 버튼을 클릭하여 수동으로 시작하세요.
- HTTPS 또는 localhost에서만 오디오가 작동할 수 있습니다.

### 그래프가 표시되지 않음
- GRAPH 버튼을 클릭하여 그래프 모드를 활성화하세요.
- 브라우저 콘솔에서 오류를 확인하세요.

### 모듈 로드 오류
- 모든 파일이 올바른 경로에 있는지 확인하세요.
- ES6 모듈을 지원하는 브라우저인지 확인하세요.
- HTTP 서버를 통해 실행 중인지 확인하세요 (file:// 프로토콜은 작동하지 않을 수 있음).

