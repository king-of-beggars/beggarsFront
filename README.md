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
- 모바일 뒤로가기시 기존 상태 유지 : stackflow
- 무한 스크롤
- 사진 업로드
### 2) ui 관련
- swiper
- 캘린더 : react-dates
- 가계부 및 게시판 차트 : ProgressBar.js
- 메인 바 그래프 : nivo
- 글자 렌더링 : auto-text-size

## 3. 폴더구조
- api
- assets
    + icons
    + pixels (픽셀아트 모음)
    + sounds
- components
    + board
    + cash-book
    + common
    + provider
    + ui
        * box
        * button
        * input
        * modal
        * progress
        * select-box
- constants (상수 관리)
- functions
- hooks
- pages
- router
- styles
    + css
    + styled-components


## 4. 발생 Issue / 챌린지 및 해결방법
### 1) nested swiper (양방향 스와이퍼) 적용
- swiper 라이브러리의 nested 기능을 이용하여 양방향 스와이프를 적용하되 화면상에 있는 첫번째 카드만 양방향 스와이프가 가능, 왼쪽으로 일정 정도 이상 스와이프시 신규 카드 추가되도록 기획
- nested 기능 구현에 있어서 중요했던 사항
  1. swiper의 구조 파악 : Swiper 컴포넌트 안에 실제 스와이프 되는 개체로서의 SwiperSlide 컴포넌트들이 포함되는 구조
  2. swiper의 스타일 지정 : Swiper 컴포넌트에 width와 height를 지정해주지 않을 경우 스와이퍼가 나타나지 않거나 의도와 다르게 동작
  3. nested 되는 요소의 지정 : nested 해줄 SwiperSlide는 상위 Swiper에서 한 번은 등장해야 하며, 해당 SwiperSlide 등장 이후 하위 Swiper 컴포넌트 작성
- 첫번째 카드에만 양방향 스와이프 적용시 중요했던 사항
  1. slidesPerView의 특성 파악 : 기본값은 Swiper 컴포넌트의 스타일링에 1개의 SwiperSlide 노출, slidesPerView 지정시 해당 값만큼 slide 노출 (소수점 적용 가능)
  2. swiper 객체와 activeIndex의 이해 : swiper 객체는 Swiper 컴포넌트가 가진 여러 특성을 담고 있으며, 활성화된 슬라이드의 인덱스를 activeIndex 속성으로 받아올 수 있음. 다만, swiper 객체는 Swiper 컴포넌트 안에서만 살아있으므로 해당 객체를 바깥에서 읽어오기 위해 swiper 상태를 추가해주었으며, 현재 활성화된 슬라이드의 인덱스를 저장하기 위한 목적으로 activeSlide 상태를 추가하여 관리함.
  4. allowSlideNext, allowSlidePrev, allowTouchMove prop 파악 : 앞 / 뒤 슬라이드로 이동하거나 터치하여 이동시키는 동작을 가능/불가능하게 하는 옵션으로, swiper 객체로부터 데이터를 받아와 지정한 activeSlide와 현재 카드의 인덱스가 같을 경우에만 해당 속성이 활성화 되도록 설정함
- 왼쪽으로 일정 정도 이상 스와이프시 특정 동작 트리거 : Swiper 컴포넌트의 onTouchMove prop과 스와이퍼가 터치되어 이동한 정도(swiper.touches.diff)를 이용해 구현
### 2) 픽셀아트 렌더링 관리
- 픽셀아트가 ui 컨셉에 있어 중요한 부분을 차지, 고정된 크기의 픽셀아트가 유저에게 보여졌을 때 비율이 깨지거나 화면에서 벗어나지 않도록 동적 스타일링 & 최적화
  - 화면 크기(리사이즈 케이스 포함) 및 모바일 여부에 따라 그려주는 렌더링되는 페이지 사이즈 및 픽셀아트 에셋 사이즈를 자동으로 변경
    1. react의 context를 이용한 전역 상수 및 변수 전달
       - 피그마 프레임 및 각 에셋의 크기를 하나의 객체 안에 저장하고(contextValue.js) context에서 불러와 활용
       - 리사이즈시마다 windowSize와 isMobile이 업데이트되도록 구현(useEffect), 해당 업데이트에는 debounce 함수 구현 및 적용하여 최적화
       - 각 header, nav, main 섹션의 크기와 실제 렌더링해줄 화면의 크기인 screenWidth는 windowSize에 따라 변화하며 각각의 값을 구하기 위한 수식 및 조건 연산 존재, windowSize가 동일할 경우 연산이 일어나지 않도록 useMemo 활용
    2. 각 픽셀아트 에셋 사이즈를 구하는 함수를 작성하여 필요한 페이지 및 컴포넌트에서 활용 및 렌더링 (getAssetSize.js)
    3. ratio prop 따른 컴포넌트 크기 자동 조정 (cardBox.jsx)
