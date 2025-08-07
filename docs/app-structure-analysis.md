# Next.js Project App Structure Analysis

## 프로젝트 개요
DevForum - 개발자 커뮤니티 웹 애플리케이션  
Next.js 14 App Router를 사용한 개발자 질문/답변 플랫폼

## App 폴더 구조

```
app/
├── api/
│   └── check-id/
│       └── route.ts                # API 라우트: 사용자 ID 중복 확인
├── ask-question/
│   └── page.tsx                    # 질문 작성 페이지
├── auth/
│   ├── login/
│   │   ├── layout.tsx              # 로그인 레이아웃
│   │   ├── loading.tsx             # 로그인 로딩 컴포넌트
│   │   └── page.tsx                # 로그인 페이지
│   └── signup/
│       ├── layout.tsx              # 회원가입 레이아웃
│       └── page.tsx                # 회원가입 페이지
├── questions/
│   └── [id]/
│       └── page.tsx                # 동적 라우팅: 개별 질문 상세 페이지
├── globals.css                     # 전역 CSS (Tailwind + shadcn/ui)
├── layout.tsx                      # Root 레이아웃
└── page.tsx                        # 홈페이지 (메인 페이지)
```

## 파일별 상세 분석

### 1. Root Layout (`app/layout.tsx`)
**목적**: 애플리케이션의 최상위 레이아웃 정의  
**주요 기능**:
- Inter 폰트 적용
- ThemeProvider (다크/라이트 모드)
- AuthProvider (인증 상태 관리)
- Header, Sidebar, Footer 컴포넌트 배치
- 반응형 레이아웃 구조

**의존성**:
- `@/components/theme-provider`
- `@/contexts/auth-context`
- `@/components/header`
- `@/components/sidebar`
- `@/components/footer`

**필요성**: ✅ **필수** - 애플리케이션의 기본 구조와 전역 상태 관리

### 2. Home Page (`app/page.tsx`)
**목적**: 메인 페이지 - 최신 질문 목록 표시  
**주요 기능**:
- 질문 목록 표시 (QuestionList 컴포넌트)
- 질문 필터링 탭 (Newest, Active, Bountied, Unanswered)
- 우측 사이드바 (RightSidebar)
- "Ask Question" 버튼으로 질문 작성 페이지 연결

**의존성**:
- `@/components/question-list`
- `@/components/right-sidebar`
- `@/components/ui/*` (Button, Badge, Tabs)

**필요성**: ✅ **필수** - 서비스의 메인 페이지

### 3. Global Styles (`app/globals.css`)
**목적**: 전역 스타일 정의  
**주요 기능**:
- Tailwind CSS 설정
- 라이트/다크 테마 CSS 변수 정의
- shadcn/ui 디자인 시스템 기본 스타일

**의존성**: 없음  
**필요성**: ✅ **필수** - UI 스타일링 기반

### 4. API Route (`app/api/check-id/route.ts`)
**목적**: 사용자 ID 중복 확인 API  
**주요 기능**:
- POST 요청 처리
- 백엔드 서버(`localhost:3001`)로 프록시 역할
- 에러 처리 및 로깅
- JSON 응답 파싱 및 전달

**의존성**:
- Next.js `NextResponse`
- 외부 백엔드 서버 (`http://localhost:3001/register/CheckId`)

**필요성**: ✅ **필수** - 회원가입 프로세스의 핵심 기능

### 5. Ask Question Page (`app/ask-question/page.tsx`)
**목적**: 질문 작성 페이지  
**주요 기능**:
- 질문 제목, 본문, 태그 입력 폼
- 마크다운 미리보기 기능
- 폼 유효성 검사
- 질문 작성 가이드라인 표시

**의존성**:
- `@/types` (QuestionFormData, QuestionPreview 인터페이스)
- `@/components/ui/*` (Button, Input, Textarea, Tabs, Label)

**필요성**: ✅ **필수** - 핵심 비즈니스 로직 (질문 작성)

### 6. Authentication Pages

#### Login Layout (`app/auth/login/layout.tsx`)
**목적**: 로그인 페이지 전용 레이아웃  
**주요 기능**:
- 간소화된 레이아웃 (Header/Footer 없음)
- ThemeProvider만 적용
- Inter 폰트 적용

**의존성**: `@/components/theme-provider`  
**필요성**: ⚠️ **선택적** - Root Layout과 중복, 통합 가능

#### Login Loading (`app/auth/login/loading.tsx`)
**목적**: 로그인 페이지 로딩 상태  
**주요 기능**: 현재 null 반환 (실제 로딩 UI 없음)

**필요성**: ❌ **불필요** - 실제 기능 없음, 제거 가능

#### Login Page (`app/auth/login/page.tsx`)
**목적**: 로그인 페이지  
**주요 기능**:
- 사용자 ID/비밀번호 입력 폼
- 소셜 로그인 버튼 (Google, GitHub, Facebook) - UI만 구현
- 백엔드 로그인 API 호출
- 로그인 성공 시 AuthContext에 사용자 정보 저장
- 비밀번호 표시/숨김 토글

**의존성**:
- `@/contexts/auth-context`
- `@/components/ui/*`
- 외부 백엔드 서버 (`http://localhost:3001/login/loginProcess`)

**필요성**: ✅ **필수** - 인증 시스템의 핵심

#### Signup Layout (`app/auth/signup/layout.tsx`)
**목적**: 회원가입 페이지 전용 레이아웃  
**특징**: 로그인 레이아웃과 거의 동일, metadata만 다름

**필요성**: ⚠️ **선택적** - Login Layout과 통합 가능

#### Signup Page (`app/auth/signup/page.tsx`)
**목적**: 회원가입 페이지  
**주요 기능**:
- 사용자 정보 입력 폼 (ID, 비밀번호, 이름, 이메일, 전화번호)
- 실시간 폼 유효성 검사
- ID 중복 확인 기능 (API 연동)
- 전화번호 자동 포맷팅
- 비밀번호 확인 일치 검사
- 백엔드 회원가입 API 호출

**의존성**:
- `/api/check-id` (자체 API 라우트)
- `@/components/ui/*`
- 외부 백엔드 서버 (`http://localhost:3001/register/registerProcess`)

**필요성**: ✅ **필수** - 사용자 등록 시스템

### 7. Question Detail Page (`app/questions/[id]/page.tsx`)
**목적**: 개별 질문 상세 페이지 (동적 라우팅)  
**주요 기능**:
- 질문 상세 내용 표시
- 투표 시스템 UI (업/다운보트, 북마크)
- 답변 목록 표시
- 코드 블록 렌더링
- 답변 작성 폼
- 관련 질문 목록
- 사용자 정보 표시 (아바타, 평판)

**의존성**:
- `@/components/answer-form`
- `@/components/code-block`
- `@/components/ui/*` (Avatar, Badge, Button)
- `date-fns` (날짜 포맷팅)

**현재 상태**: 하드코딩된 샘플 데이터 사용  
**필요성**: ✅ **필수** - 핵심 비즈니스 로직 (질문/답변 시스템)

## 파일 간 연결성 및 의존성 맵

### 1. 인증 플로우
```
app/auth/signup/page.tsx → app/api/check-id/route.ts → 백엔드 서버
app/auth/login/page.tsx → 백엔드 서버 → contexts/auth-context
```

### 2. 질문/답변 플로우
```
app/page.tsx → components/question-list → app/questions/[id]/page.tsx
app/ask-question/page.tsx → (미래: 백엔드 API)
```

### 3. 레이아웃 및 테마
```
app/layout.tsx → components/theme-provider → 모든 페이지
app/layout.tsx → contexts/auth-context → components/header
```

## 개선 권장사항

### 1. 불필요한 파일 정리
- `app/auth/login/loading.tsx` - 실제 기능 없음, 제거 권장
- 중복된 레이아웃 파일들 통합 고려

### 2. 하드코딩된 데이터 개선
- `app/questions/[id]/page.tsx`의 샘플 데이터를 실제 API 연동으로 변경
- `app/ask-question/page.tsx`의 질문 제출 로직을 실제 API 연동으로 변경

### 3. 타입 안전성 강화
- `@/types` 모듈의 인터페이스 정의 확장
- API 응답 타입 정의 추가

### 4. 에러 처리 개선
- 전역 에러 바운더리 추가 (`error.tsx`, `not-found.tsx`)
- API 에러 처리 표준화

### 5. 성능 최적화
- 동적 임포트를 통한 코드 스플리팅
- 이미지 최적화
- 메타데이터 SEO 최적화

## 결론

현재 앱 구조는 Next.js 14 App Router의 모범 사례를 잘 따르고 있으며, 기본적인 인증 시스템과 질문/답변 기능이 구현되어 있습니다. 대부분의 파일이 필수적이며, 몇 가지 정리와 개선을 통해 더욱 견고한 구조로 발전시킬 수 있습니다.