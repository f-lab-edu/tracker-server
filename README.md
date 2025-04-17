# 🛠️ Tracker Server

> **방문자 데이터 수집 및 API 서버**
> Tracker SDK 를 통해 수집한 데이터를 저장하고, Tracker Dashboard 에서 사용할 수 있도록 API 를 제공합니다.
> 실시간 사용자 분석 및 트래픽 통계를 지원하는 서버입니다.

---

## 인증 및 데이터 흐름

![auth_data](https://github.com/user-attachments/assets/1456bf4b-6f3d-4488-b378-61680a3de8aa)

---

## 🍀 배포링크

- [SDK](https://www.npmjs.com/package/tracker-sdk-nemo?activeTab=readme)
- [Dashboard](https://tracker-dashboard.site/login)
- [Server](https://tracker-server.site) _(서버 상태에 따라 접근이 제한될 수 있습니다.)_

---

## 🛠️ 요구 사항

- Node.js >= 18.x
- Tracker SDK 연동 필요

## 🛠️ 기술 스택

### 🚀 Backend (핵심 스택)

- **TypeScript** — 정적 타입 언어
- **Node.js** — JavaScript 런타임
- **Express** — 웹 프레임워크
- **MySQL** — 관계형 데이터베이스
- **Sequelize** — ORM (MySQL 연동)

### 🧩 사용 라이브러리

- **dotenv** — 환경 변수 관리
- **uuid** — 고유 식별자 생성
- **bcryptjs** — 비밀번호 암호화
- **cookie-parser** — 쿠키 파서
- **cors** — CORS 허용

### ☁️ 배포

- **AWS EC2 — 서버 배포**

## 💡 주요 기능

- Tracker SDK 를 통한 방문자 데이터 수집
- 방문자 정보 저장 (국가, 언어, 해상도, 브라우저, OS, 디바이스)
- 유입 경로 / 이탈 위치 기록
- 실시간 사용자 수 관리
- 날짜별 방문 통계 저장
- 재방문률 제공
- Tracker Dashboard 에 API 제공
- API Key 기반 인증 처리
- 로그인 / 회원가입

---
