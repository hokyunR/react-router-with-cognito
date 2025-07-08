# React Router with AWS Cognito

완전한 인증 시스템을 갖춘 React Router 애플리케이션과 AWS CDK 인프라 구성

## 프로젝트 구조

이 프로젝트는 두 개의 주요 부분으로 구성되어 있습니다:

### 📁 `/web` - React Router 애플리케이션

- React Router 7 기반의 전체 스택 웹 애플리케이션
- AWS Cognito OAuth2 인증 구현
- TypeScript + TailwindCSS
- 서버 사이드 렌더링 지원

### 📁 `/infra` - AWS CDK 인프라

- AWS CDK를 사용한 Cognito User Pool 설정
- TypeScript로 작성된 인프라 코드
- 관리형 로그인 UI 구성

## 빠른 시작

### 1. 의존성 설치

```bash
# 루트에서 모든 의존성 설치
pnpm install
```

### 2. 인프라 배포 (AWS CDK)

```bash
cd infra

# CDK 부트스트랩 (최초 1회만)
npx cdk bootstrap

# 인프라 배포
npx cdk deploy
```

배포가 완료되면 Cognito 설정 정보 (Client ID, Domain 등)를 출력합니다.

### 3. 웹 애플리케이션 설정

```bash
cd web

# 환경 변수 파일 생성
cp .env.example .env
```

`.env` 파일에 CDK 배포 결과로 얻은 값들을 설정:

```bash
CLIENT_ID=your_cognito_client_id
DOMAIN=https://your-cognito-domain.auth.region.amazoncognito.com
REDIRECT_URI=http://localhost:5173/auth/callback
SESSION_SECRET=your-random-session-secret
```

### 4. 웹 애플리케이션 실행

```bash
cd web
pnpm dev
```

애플리케이션이 `http://localhost:5173`에서 실행됩니다.

## 기능

### 🔐 인증 기능

- **로그인**: Cognito Hosted UI를 통한 OAuth2 로그인
- **로그아웃**: 토큰 취소와 함께 안전한 로그아웃
- **세션 관리**: HTTP-only 쿠키를 사용한 안전한 토큰 저장
- **사용자 정보**: Cognito에서 제공하는 사용자 프로필 정보 표시

### 🛡️ 보안 기능

- CSRF 보호 (SameSite 쿠키)
- HTTP-only 쿠키로 XSS 방지
- 자동 토큰 만료 처리
- 프로덕션 환경에서 강제 HTTPS

### 🎯 라우트 보호

- 인증이 필요한 보호된 라우트
- 비인증 사용자 자동 리다이렉트
- 인증 상태에 따른 조건부 UI

### 💅 사용자 경험

- 반응형 디자인 (TailwindCSS)
- 로딩 상태 표시
- 직관적인 네비게이션
- 에러 처리

## 개발 명령어

### 웹 애플리케이션

```bash
cd web

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 타입 체크
pnpm typecheck
```

### 인프라

```bash
cd infra

# 인프라 배포
pnpm deploy

# 변경사항 미리보기
pnpm diff

# 인프라 삭제
pnpm destroy
```

## 배포

### 인프라 배포 (AWS)

```bash
cd infra
npx cdk deploy
```

### 웹 애플리케이션 배포

#### Docker

```bash
cd web
docker build -t react-router-cognito .
docker run -p 3000:3000 \
  -e CLIENT_ID=your_client_id \
  -e DOMAIN=your_domain \
  -e REDIRECT_URI=your_redirect_uri \
  -e SESSION_SECRET=your_secret \
  react-router-cognito
```

#### Serverless 플랫폼

- Vercel
- Netlify
- AWS Amplify
- Railway
- Fly.io

## 환경 변수

### 필수 환경 변수

- `CLIENT_ID`: Cognito App Client ID
- `DOMAIN`: Cognito Domain URL
- `REDIRECT_URI`: OAuth Callback URL
- `SESSION_SECRET`: 세션 쿠키 암호화 키 (프로덕션에서 필수)

### 선택적 환경 변수

- `NODE_ENV`: 실행 환경 (development/production)

## 기술 스택

### Frontend

- **React Router 7**: 풀스택 React 프레임워크
- **TypeScript**: 타입 안전성
- **TailwindCSS**: 유틸리티 우선 CSS 프레임워크
- **Vite**: 빠른 개발 서버와 빌드 도구

### Backend

- **React Router**: 서버 사이드 렌더링
- **Remix Auth**: 인증 라이브러리
- **OAuth2 Strategy**: Cognito 연동

### Infrastructure

- **AWS CDK**: 인프라스트럭처 as 코드
- **AWS Cognito**: 사용자 인증 및 관리
- **TypeScript**: 인프라 코드 타입 안전성

## 라이센스

MIT License

## 기여

이슈 및 풀 리퀘스트를 환영합니다!

---

Built with ❤️ using React Router, AWS Cognito, and AWS CDK
