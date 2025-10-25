# 프론트엔드 API 경로 업데이트 완료

## 수정 개요
백엔드 API에 `/api` prefix가 추가됨에 따라 프론트엔드의 모든 API 호출 경로를 업데이트했습니다.

## 수정된 파일 (총 4개)

### 1. 환경변수 파일
**파일**: `.env.local`

```env
# 변경 전
NEXT_PUBLIC_API_URL=http://localhost:3001

# 변경 후
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

### 2. 사용자 페이지
**파일**: `app/users/page.tsx`

**변경 내용**:
- Line 53: `http://localhost:3001/users` → `${process.env.NEXT_PUBLIC_API_URL}/users`
- Line 73: `http://localhost:3001/users/search` → `${process.env.NEXT_PUBLIC_API_URL}/users/search`

**변경 이유**: 하드코딩된 URL을 환경변수로 변경하여 유연성 향상

---

### 3. 질문 목록 컴포넌트
**파일**: `components/question-list.tsx`

**변경 내용**:
- Line 19: `http://localhost:3001/questions/${questionId}/answers` → `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}/answers`

**변경 이유**: 하드코딩된 URL을 환경변수로 변경

---

### 4. 답변 작성 폼 컴포넌트
**파일**: `components/answer-form.tsx`

**변경 내용**:
- Line 45: `http://localhost:3001/questions/${questionId}/answers` → `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}/answers`

**변경 이유**: 하드코딩된 URL을 환경변수로 변경

---

## 이미 환경변수를 사용하던 파일 (수정 불필요)

다음 파일들은 이미 `process.env.NEXT_PUBLIC_API_URL`을 사용하고 있어서 환경변수만 수정하면 자동으로 반영됩니다:

1. ✅ `app/ask-question/page.tsx` (Line 101)
2. ✅ `app/questions/[id]/page.tsx` (Line 35, 43, 64, 92)
3. ✅ `app/questions/[id]/edit/page.tsx` (Line 40, 102)
4. ✅ `app/auth/login/page.tsx` (Line 28)
5. ✅ `app/api/check-id/route.ts` (Line 15)
6. ✅ `components/question-list.tsx` (Line 37)

---

## API 엔드포인트 변경 사항

### Before (기존)
```
http://localhost:3001/questions
http://localhost:3001/users
http://localhost:3001/login
http://localhost:3001/register
```

### After (변경 후)
```
http://localhost:3001/api/questions
http://localhost:3001/api/users
http://localhost:3001/api/login
http://localhost:3001/api/register
```

---

## 테스트 방법

### 1. 개발 서버 재시작
```bash
# 백엔드 (Rocky OS - 192.168.60.138)
npm run start:dev

# 프론트엔드 (Ubuntu - 192.168.60.135)
npm run dev
```

### 2. 기능 테스트 체크리스트

#### 질문 관련
- [ ] 질문 목록 조회 (`/questions`)
- [ ] 질문 상세 조회 (`/questions/[id]`)
- [ ] 질문 작성 (`/ask-question`)
- [ ] 질문 수정 (`/questions/[id]/edit`)
- [ ] 질문 삭제

#### 답변 관련
- [ ] 답변 목록 조회
- [ ] 답변 작성
- [ ] 답변 삭제

#### 사용자 관련
- [ ] 사용자 목록 조회 (`/users`)
- [ ] 사용자 검색 기능
- [ ] 로그인 (`/auth/login`)
- [ ] 회원가입 (`/auth/signup`)
- [ ] 아이디 중복 체크

#### 포인트샵
- [ ] 포인트 조회
- [ ] 쿠폰 사용

### 3. 브라우저 개발자 도구 확인
```javascript
// F12 → Network 탭에서 확인
// 모든 API 요청이 /api로 시작하는지 확인
// 예: http://localhost:3001/api/questions
```

### 4. CORS 에러 체크
```bash
# 브라우저 콘솔에 CORS 에러가 없는지 확인
# 백엔드 CORS 설정이 올바른지 확인
```

---

## 환경별 설정

### 로컬 개발 환경
`.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 프로덕션 환경 (VMware)
`.env.production` 또는 `.env.local`:
```env
# 프론트엔드에서 백엔드로 직접 호출
NEXT_PUBLIC_API_URL=http://192.168.60.138:3001/api

# 또는 Nginx 프록시 사용 시
NEXT_PUBLIC_API_URL=/api
```

---

## Nginx 프록시 설정 (선택사항)

프론트엔드 서버 (Ubuntu)의 Nginx에서 `/api`를 백엔드로 프록시하는 경우:

```nginx
server {
    listen 80;
    server_name 192.168.60.135;

    # Next.js 프론트엔드
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 백엔드 API 프록시
    location /api/ {
        proxy_pass http://192.168.60.138:3001/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

이 경우 환경변수를:
```env
NEXT_PUBLIC_API_URL=/api
```

---

## 문제 해결

### 1. "Failed to fetch" 에러
**원인**: 백엔드 서버가 실행되지 않음

**해결**:
```bash
# 백엔드 서버 시작
cd C:\Users\K1240365\Desktop\Nestjs_Back-main
npm run start:dev
```

### 2. CORS 에러
**원인**: 백엔드 CORS 설정 문제

**확인**: `Nestjs_Back-main/src/main.ts`
```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://192.168.60.135',
    'http://192.168.60.135:3000',
  ],
  credentials: true,
});
```

### 3. 404 Not Found
**원인**: API 경로가 잘못됨

**확인**:
- `.env.local`이 `/api` suffix를 포함하는지 확인
- 브라우저 Network 탭에서 실제 요청 URL 확인

### 4. 환경변수가 반영되지 않음
**해결**:
```bash
# Next.js 개발 서버 재시작
# Ctrl+C로 중지 후
npm run dev
```

---

## 추가 참고 자료

- 백엔드 변경 사항: `Nestjs_Back-main/API_PREFIX_CHANGES.md`
- 서버 설정 가이드: `Nestjs_Back-main/SERVER_SETUP_GUIDE.md`
- 백엔드 API 명세: `Nestjs_Back-main/doc/API_SPECIFICATION.md`

---

## 변경 이력

- **2025-10-26**: 백엔드 `/api` prefix 추가에 따른 프론트엔드 업데이트
  - 환경변수 수정: `.env.local`
  - 하드코딩 URL 수정: `app/users/page.tsx`, `components/question-list.tsx`, `components/answer-form.tsx`
