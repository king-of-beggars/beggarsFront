import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';

import { MainLogoText, bgSky100, bgCloud100, bgMountain100 } from 'assets';

import { COMMENT } from 'common/constants';
import { layout, style } from 'styles';
import Navigation from 'common/components/Navigation';
// import BlurOverlay from 'common/components/effect/BlurOverlay';
import ScreenBlur from 'common/components/effect/ScreenBlur';
import LoggedYet from 'common/components/effect/LoggedYet';
import MainExp from '../components/MainExp';
import MainRecordCard from '../components/MainRecordCard';
import MainJourney from '../components/MainJourney';
import Loader from 'common/components/effect/Loader';
import ErrorRefresher from 'common/components/effect/ErrorRefresher';

// 메인의 공통되는 레이아웃 요소
const MainLayout = ({ children }) => {
  // get globalVariables
  const {
    isMobile,
    widthRatio,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
  } = useGlobalVariables();

  // console.log("screenWidth: ", screenWidth)
  // console.log("headerHeight: ", headerHeight)
  // console.log("navHeight: ", navHeight)
  // console.log("mainHeight: ", mainHeight)
  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${bgSky100})`}
      backPngMiddle={`url(${bgCloud100})`}
      backPngTail={`url(${bgMountain100})`}
    >
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div
          className="statusBarHeight"
          style={{ width: 'inherit', height: '50px' }}
        ></div>
        <layout.HeaderContent>
          <layout.FlexCenter100>
            <MainLogoText />
          </layout.FlexCenter100>
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        {children}
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Navigation selected="main" ratio={widthRatio} />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
};

// 케이스에 따라 렌더링을 달리하는 메인 렌더러
export default function MainRenderer(caseStr, data, states = {}) {
  // get globalVariables
  switch (caseStr) {
    // default : 로그인되지 않은 경우
    default:
      return (
        <MainLayout>
          <ScreenBlur
            comment={COMMENT.ifNotLoggedIn}
            addComponent={<LoggedYet />}
          >
            <layout.MainContent>
              <layout.FlexCenterColumn100 style={{ gap: '25px' }}>
                {/* 메인: 가입한지 n일 & 레코드 카드 */}
                <layout.FlexCenterColumn100 style={{ gap: '5px' }}>
                  <MainExp dayCount={data.signupDay} />
                  <MainRecordCard
                    isLoggedIn={false}
                    data={data}
                    isToggleOnLeft={true}
                  />
                </layout.FlexCenterColumn100>
                {/* 메인: 여정 streak */}
                <layout.FlexCenterColumn>
                  <MainJourney twoWeeks={data.twoweek} />
                </layout.FlexCenterColumn>
              </layout.FlexCenterColumn100>
            </layout.MainContent>
          </ScreenBlur>
        </MainLayout>
      );
    case 'loading':
      return (
        <MainLayout>
          <ScreenBlur comment={<Loader>{COMMENT.ifLoading}</Loader>}>
            <layout.MainContent>
              <layout.FlexCenterColumn100 style={{ gap: '25px' }}>
                {/* 메인: 가입한지 n일 & 레코드 카드 */}
                <layout.FlexCenterColumn100 style={{ gap: '5px' }}>
                  <MainExp dayCount={data.signupDay} />
                  <MainRecordCard
                    isLoggedIn={false}
                    data={data}
                    isToggleOnLeft={true}
                  />
                </layout.FlexCenterColumn100>
                {/* 메인: 여정 streak */}
                <layout.FlexCenterColumn>
                  <MainJourney twoWeeks={data.twoweek} />
                </layout.FlexCenterColumn>
              </layout.FlexCenterColumn100>
            </layout.MainContent>
          </ScreenBlur>
        </MainLayout>
      );
    case 'error':
      return (
        <MainLayout>
          <ScreenBlur
            comment={COMMENT.ifError}
            addComponent={<ErrorRefresher />}
          >
            <layout.MainContent>
              <layout.FlexCenterColumn100 style={{ gap: '25px' }}>
                {/* 메인: 가입한지 n일 & 레코드 카드 */}
                <layout.FlexCenterColumn100 style={{ gap: '5px' }}>
                  <MainExp dayCount={data.signupDay} />
                  <MainRecordCard
                    isLoggedIn={false}
                    data={data}
                    isToggleOnLeft={true}
                  />
                </layout.FlexCenterColumn100>
                {/* 메인: 여정 streak */}
                <layout.FlexCenterColumn>
                  <MainJourney twoWeeks={data.twoweek} />
                </layout.FlexCenterColumn>
              </layout.FlexCenterColumn100>
            </layout.MainContent>
          </ScreenBlur>
        </MainLayout>
      );
    case 'login':
      return (
        <MainLayout>
          <layout.MainContent>
            <layout.FlexCenterColumn100 style={{ gap: '25px' }}>
              {/* 메인: 가입한지 n일 & 레코드 카드 */}
              <layout.FlexCenterColumn100 style={{ gap: '5px' }}>
                <MainExp dayCount={data.signupDay} />
                <MainRecordCard
                  dayCount={data.signupDay}
                  data={data}
                  isLoggedIn={true}
                  isToggleOnLeft={states.isToggleOnLeft}
                  toggleSetter={states.setIsToggleOnLeft}
                />
              </layout.FlexCenterColumn100>
              {/* 메인: 여정 streak */}
              <layout.FlexCenterColumn>
                <MainJourney twoWeeks={data.twoweek} />
              </layout.FlexCenterColumn>
            </layout.FlexCenterColumn100>
          </layout.MainContent>
          {/* { states.socialModalOn && <SocialLoginModal>회원가입</SocialLoginModal> } */}
        </MainLayout>
      );
  }
}
