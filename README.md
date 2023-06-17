# 내일은 거지왕!!
## 1. 프로젝트 개요
### 1) 프로젝트 소개
- 다른 사람들과 소통하면서 즐겁게 돈을 아껴봅시다! 
    - 카테고리에 따라 매일의 예산을 설정하고, 얼마나 아끼거나 추가 지출했는지 트래킹할 수 있어요.
    - 매일 목표를 달성했을 때는 다른 사람들에게 자랑하고, 목표 달성에 실패했을 때는 따끔한 훈수를 들을 수 있어요!
    - 목표 달성 관련 통계를 제공하여 내가 계획대로 돈을 잘 아끼고 있는지 한눈에 체크할 수 있어요.
    - 2주동안 지출 목표를 달성하여 거지왕이 되어보세요!

### 2) 기술 목표
- 모바일 사용을 위한 PWA 적용
    - 모바일 권장형 web에 알맞는 애니메이션, 사운드, 알림 등을 사용
- 가계부 통계를 보여주기 위해 그래프 라이브러리 사용
- 게시판에 무한 스크롤 적용
- 소셜 로그인
- 사용자의 흥미를 위한 다양한 효과
- 사용자 몰입을 위한 부드러운 인터랙션 전환
- 프로필 사진 업데이트 및 댓글에 이미지 적용

### 3) 프로젝트 참여 인원
- 백엔드 레포 주소 : https://github.com/king-of-beggars/beggarsBackend
- 박단이(프론트) : https://github.com/Danee12
- 진가형(프론트) : https://github.com/dev-deeplake
- 김승철(백엔드) : https://github.com/Seung-Cheol
- 김미정(백엔드) : https://github.com/comecomeDev

## 2. 사용 기술 및 라이브러리
### 1) 기능 관련
- SPA 설계 : React
- 모바일 최적화 및 테스트 : PWA, lighthouse
- 비동기 데이터 통신 : react-query, axios
- Design : styled-components
- 페이지 분할 : react-router-dom
- 전역 상태 관리 : recoil
- 모바일 뒤로가기시 기존 상태 유지 : stackflow
- 무한 스크롤
- 사진 업로드
### 2) ui 관련
- swiper
- 등등 적용한 ui 라이브러리 여기에 적기...

## 3. 폴더구조
- 기능별 분리

- assets
    * pixels
    * sound
- components (기능별)
    + ui
        * button
        * form
        * modal
        * ...
    + 
- pages
- store (전역 상태 관리)
- router
- styles
    + global-styles.js
    + layouts
    + styled-components
- constants
    + style-variables.js
    + ...
- hook
- api (기능별? 페이지별?)
    - api.js
    - 로그인, 회원가입.js
    - 메인.js
    - 게시판.js
    - 마이페이지.js
    - 핫딜.js
    - 가계부.js
- 


## 4. 발생 Issue 및 해결방법
