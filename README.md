## 🌊 FloodBarrier Monitoring System

| IoT 기반 지하주차장 침수 방지 물막이판 모니터링 및 제어 시스템  
🔗 https://flood-barrier-monitoring-system.vercel.app/

### 📋 프로젝트 개요

이 프로젝트는 지하주차장 침수 방지를 위해  
**실시간 수위 데이터 수집 → 임계값 방지 → 3D 모니터링 → 물막이판 동작 정보 제공을** 지원하는 웹 애플리케이션입니다.  
MQTT 기반 IoT 센서 데이터를 수신하고, 시각화하며, 3D 공간에서 관제 UI를 제공합니다.

---

### 🛠️ 기술 스택

| 카테고리                | 사용 기술                                                |
| ----------------------- | -------------------------------------------------------- |
| **Frontend**            | React.js, Vite, JavaScript (ES6+), CSS3                  |
| **Routing & UI**        | React Router DOM, React Icons                            |
| **State Management**    | React Context API                                        |
| **3D & Visualization**  | Three.js, @react-three/fiber, @react-three/drei, ECharts |
| **IoT & Communication** | paho-mqtt, EMQX Cloud                                    |
| **Deployment**          | Vercel, Node.js                                          |
| **Environment Config**  | .env (Environment Variables)                             |

---

### ✨ 주요 기능

#### 📡 1. 실시간 센서 데이터 수신 (MQTT)

• water/topic1, topic2, topic3 구독  
• MQTT 메시지를 실시간으로 수신 및 파싱  
• 브라우저 localStorage에 자동 저장

#### 📈 2. 차트 기반 데이터 시각화

• 시간대별 수위 변화 그래프  
• 날짜/시간/3시간 블록 단위로 데이터 누적  
• 임계값(Threshold) 이상일 경우 자동 상태 반영

#### 🧩 3. 3D 기반 관리 UI

• Three.js로 물막이판을 3D로 구현하고, 물막이판의 개폐 상태를 실시간으로 조작
• 수위 변화를 3D 수면 효과로 시각화하여 수위계 상태를 직관적으로 확인

#### 🔐 4. 로그인 요구 페이지

• 로그인 필요 페이지 접근 차단  
• 사용자 경험 기반 라우팅 설계

#### ⚙️ 5. 환경 변수 (.env) 기반 설정

• MQTT username/ password/ host 등 노출 방지

---

### 📁 프로젝트 구조

```
📦 project
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂pages
 ┃ ┃  ┣ home.js
 ┃ ┃  ┣ dashboard.jsx
 ┃ ┃  ┣ control.jsx
 ┃ ┣ 📂context
 ┃ ┣ 📂utils
 ┃ ┣ App.jsx
 ┃ ┗ main.jsx
 ┣ .env  (gitignore 처리됨)
 ┣ .gitignore
 ┣ package.json
 ┗ vite.config.js
```

---

### 🚀 실행 방법

#### 1️⃣ Install dependency

```
npm i
```

#### 2️⃣ Local run

```
npm run dev
```

---

### 📘 구현 페이지 구조

| 페이지           | 경로             | 주요 기능                        | 상세 설명                                                                                                                          |
| ---------------- | ---------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Home**         | `/`              | 로그인 / 시스템 소개             | - 사용자 로그인<br>- 물막이판 관제 시스템 소개<br>- 기능 안내 패널 제공                                                            |
| **Dashboard**    | `/dashboard`     | 실시간 수위 모니터링 / 주간 현황 | - ECharts 기반 실시간 수위 그래프<br>- 하루를 3시간 단위로 나눈 블록별 물막이판 상태 표시<br>- MQTT 센서 데이터 기반 자동 업데이트 |
| **Control**      | `/control`       | 물막이판/수위계 제어 UI          | - 3D 제어 패널(Three.js)<br>- 물막이판 개폐 제어<br>- 수위 조절 슬라이더<br>- 현재 상태 요약 패널                                  |
| **RequireLogin** | `/require-login` | 접근 제어                        | - 비로그인 사용자가 Dashboard/Control 접근 시 표시<br>- 로그인 요청 안내                                                           |
