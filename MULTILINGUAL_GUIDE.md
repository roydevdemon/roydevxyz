# 다국어 블로그 사용 가이드 / Multilingual Blog Guide

## 개요 / Overview

이 블로그는 **하나의 파일에 여러 언어를 함께 작성**하는 방식으로 한국어와 영어를 지원합니다.
This blog supports Korean and English by **writing multiple languages in a single file**.

---

## 주요 특징 / Key Features

- ✅ 하나의 파일에 모든 언어 작성
- ✅ 언어 전환 시 페이지 리로드 없음
- ✅ 사용자 언어 선호도 저장 (localStorage)
- ✅ 부드러운 전환 애니메이션

---

## 포스트 작성 방법 / How to Write Posts

### 1. Front Matter 구조

```markdown
---
title:
  en: Your English Title
  ko: 한국어 제목
date: 2025-11-26 15:00:00
tags:
  - tag1
  - tag2
categories:
  - category-name
excerpt:
  en: English excerpt or summary
  ko: 한국어 요약 또는 발췌문
---
```

**주요 규칙:**
- `title`: 객체 형태로 언어별 제목 작성
- `excerpt`: 객체 형태로 언어별 요약 작성
- `tags`, `categories`: 일반 배열로 작성 (언어 구분 없음)

### 2. 본문 작성

본문은 `<div class="lang-content" data-lang="언어코드">` 태그로 감싸서 작성합니다:

```markdown
---
title:
  en: My Post Title
  ko: 나의 포스트 제목
---

<div class="lang-content" data-lang="en">

# English Content

This is the English version of your post...

</div>

<div class="lang-content" data-lang="ko">

# 한국어 컨텐츠

이것은 포스트의 한국어 버전입니다...

</div>
```

### 3. 완전한 예시

```markdown
---
title:
  en: Getting Started with Hexo
  ko: Hexo 시작하기
date: 2025-11-26 15:00:00
tags:
  - tutorial
  - hexo
categories:
  - Tutorials
excerpt:
  en: Learn how to get started with Hexo blogging platform
  ko: Hexo 블로깅 플랫폼 시작하는 방법 배우기
---

<div class="lang-content" data-lang="en">

## Introduction

Hexo is a fast, simple and powerful blog framework...

### Installation

```bash
npm install hexo-cli -g
```

</div>

<div class="lang-content" data-lang="ko">

## 소개

Hexo는 빠르고 간단하며 강력한 블로그 프레임워크입니다...

### 설치

```bash
npm install hexo-cli -g
```

</div>
```

---

## 새 포스트 생성 / Creating New Posts

```bash
hexo new post "your-post-title"
```

그 다음 생성된 파일을 위의 형식에 맞게 수정하세요.

---

## 언어 전환 작동 방식 / How Language Switching Works

1. **언어 버튼 클릭**: 헤더의 EN/KO 버튼 클릭
2. **localStorage 저장**: 선택한 언어가 브라우저에 저장됨
3. **컨텐츠 전환**: JavaScript가 해당 언어의 `data-lang` 섹션만 표시
4. **지속성**: 다음 방문 시에도 선택한 언어 유지

---

## URL 구조 / URL Structure

모든 언어가 같은 URL을 공유합니다:
- `https://roydev.xyz/2025/11/26/hello-world/` - 영어/한국어 모두

사용자가 선택한 언어는 페이지 내에서 JavaScript로 전환됩니다.

---

## 빌드 및 테스트 / Build and Test

```bash
# 기존 빌드 삭제
hexo clean

# 새로 빌드
hexo generate

# 로컬 서버 실행
hexo server
```

브라우저에서 `http://localhost:4000`에 접속하여:
1. EN/KO 버튼 클릭
2. 컨텐츠가 즉시 전환되는지 확인
3. 페이지 새로고침 후에도 선택한 언어 유지 확인

---

## 장점 / Advantages

### ✅ 단일 파일 관리
- 같은 내용의 포스트를 한 파일에서 관리
- 파일 구조가 간단함
- 번역 누락 방지

### ✅ 빠른 언어 전환
- 페이지 리로드 없음
- 부드러운 애니메이션
- 즉각적인 반응

### ✅ SEO 친화적
- 모든 언어가 하나의 URL에 포함
- 검색 엔진이 모든 언어 컨텐츠 인덱싱 가능

---

## 팁 / Tips

### 1. 마크다운 에디터 사용
VSCode 등의 에디터에서 미리보기를 보면서 작성하세요.

### 2. 일관된 구조 유지
모든 포스트에서 같은 섹션 순서를 유지하세요 (영어 → 한국어).

### 3. 코드 블록
코드 블록은 언어별로 다르게 작성할 수 있습니다:

```markdown
<div class="lang-content" data-lang="en">
\`\`\`javascript
// English comments
console.log('Hello');
\`\`\`
</div>

<div class="lang-content" data-lang="ko">
\`\`\`javascript
// 한국어 주석
console.log('안녕');
\`\`\`
</div>
```

### 4. 이미지
이미지는 공통으로 사용하거나 언어별로 다르게 사용할 수 있습니다:

```markdown
<div class="lang-content" data-lang="en">
![English Diagram](/images/diagram-en.png)
</div>

<div class="lang-content" data-lang="ko">
![한국어 다이어그램](/images/diagram-ko.png)
</div>
```

---

## 문제 해결 / Troubleshooting

### 언어 전환이 작동하지 않는 경우:
1. 브라우저 콘솔에서 JavaScript 에러 확인
2. `data-lang` 속성이 올바르게 설정되었는지 확인
3. 캐시 삭제 후 재시도:
   ```bash
   hexo clean && hexo generate
   ```

### 제목이나 요약이 표시되지 않는 경우:
- Front Matter의 `title`과 `excerpt`가 올바른 YAML 객체 형식인지 확인
- 들여쓰기가 정확한지 확인 (YAML은 들여쓰기에 민감함)

### 두 언어가 모두 표시되는 경우:
- `<div class="lang-content" data-lang="xx">` 태그가 올바르게 닫혔는지 확인
- JavaScript 파일(`script.js`)이 제대로 로드되었는지 확인

---

## 기술 스택 / Tech Stack

- **Hexo**: 정적 사이트 생성기
- **EJS**: 템플릿 엔진
- **JavaScript (ES5)**: 언어 전환 로직
- **CSS3**: 페이드 애니메이션
- **localStorage**: 언어 선호도 저장

---

## 참고 자료 / References

- [Hexo 공식 문서](https://hexo.io/docs/)
- [EJS 문서](https://ejs.co/)
- [MDN Web Docs - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 라이선스 / License

이 가이드는 자유롭게 수정하고 배포할 수 있습니다.
This guide can be freely modified and distributed.
