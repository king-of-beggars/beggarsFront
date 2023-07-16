import { useGlobalVariables } from 'providers';
import { MainLogoText, mainBackgroundTop, mainBackgroundMiddle, mainBackgroundTail } from 'assets';
import { SocialLoginModal, MainExp, MainRecordCard, MainJourney, Nav, ScreenBlur, Loader, LoggedYet, ErrorRefresher } from 'components';
import { ifNotLoggedIn, ifLoading, ifError } from 'constants';
import { layout, style } from 'styles';

// 메인의 공통되는 레이아웃 요소
const MainLayout = ({children}) => {
    // get globalVariables
    const { isMobile, frameSize, headerHeight, navHeight, mainHeight, screenWidth } = useGlobalVariables();
    const ratio = screenWidth / frameSize.width;

    return (
        <style.BackgroundPageLayout
            screenWidth={`${screenWidth}px`}
            isMobile={isMobile}
            backPngTop={`url(${mainBackgroundTop})`}
            backPngMiddle={`url(${mainBackgroundMiddle})`}
            backPngTail={`url(${mainBackgroundTail})`}
        >
            <layout.Header headerHeight={`${headerHeight}px`}>
                <div className="statusBarHeight" style={{width: "inherit", height: "50px"}}></div>
                <layout.HeaderContent>
                    <layout.FlexCenter100>
                    <MainLogoText />
                    </layout.FlexCenter100>
                </layout.HeaderContent>
            </layout.Header>
            <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
                {children}
            </layout.Main>
            <layout.Nav navHeight={`${navHeight}px`}>
                <Nav selected="main" ratio={ratio} />
            </layout.Nav>
      </style.BackgroundPageLayout>
    )

}

// 케이스에 따라 렌더링을 달리하는 메인 렌더러
export default function mainRenderer (caseStr, data, states={}) {
    // get globalVariables
    switch (caseStr) {
        // default : 로그인되지 않은 경우
        default:
            return (
                <MainLayout>
                    <ScreenBlur comment={ifNotLoggedIn} addComponent={<LoggedYet />}>
                        <layout.MainContent>
                            <layout.FlexCenterColumn100 style={{gap: "25px"}}>
                            { /* 메인: 가입한지 n일 & 레코드 카드 */}
                            <layout.FlexCenterColumn100 style={{gap: "5px"}}>
                                <MainExp dayCount={data.signupDay} />
                                <MainRecordCard isLoggedIn={false} data={data} isToggleOnLeft={true}/>
                            </layout.FlexCenterColumn100>
                            { /* 메인: 여정 streak */}
                            <layout.FlexCenterColumn>
                                <MainJourney twoWeeks={data.twoweek}/>
                            </layout.FlexCenterColumn>
                            </layout.FlexCenterColumn100>
                        </layout.MainContent>
                    </ScreenBlur>
                </MainLayout>
            )
        case "loading":
            return (
                <MainLayout>
                    <ScreenBlur comment={<Loader>{ifLoading}</Loader>}>
                        <layout.MainContent>
                            <layout.FlexCenterColumn100 style={{gap: "25px"}}>
                            { /* 메인: 가입한지 n일 & 레코드 카드 */}
                            <layout.FlexCenterColumn100 style={{gap: "5px"}}>
                                <MainExp dayCount={data.signupDay} />
                                <MainRecordCard isLoggedIn={false} data={data} isToggleOnLeft={true}/>
                            </layout.FlexCenterColumn100>
                            { /* 메인: 여정 streak */}
                            <layout.FlexCenterColumn>
                                <MainJourney twoWeeks={data.twoweek}/>
                            </layout.FlexCenterColumn>
                            </layout.FlexCenterColumn100>
                        </layout.MainContent>
                    </ScreenBlur>
                </MainLayout>
            )
        case "error":
            return (
                <MainLayout>
                    <ScreenBlur comment={ifError} addComponent={<ErrorRefresher />}>
                        <layout.MainContent>
                            <layout.FlexCenterColumn100 style={{gap: "25px"}}>
                            { /* 메인: 가입한지 n일 & 레코드 카드 */}
                            <layout.FlexCenterColumn100 style={{gap: "5px"}}>
                                <MainExp dayCount={data.signupDay} />
                                <MainRecordCard isLoggedIn={false} data={data} isToggleOnLeft={true}/>
                            </layout.FlexCenterColumn100>
                            { /* 메인: 여정 streak */}
                            <layout.FlexCenterColumn>
                                <MainJourney twoWeeks={data.twoweek}/>
                            </layout.FlexCenterColumn>
                            </layout.FlexCenterColumn100>
                        </layout.MainContent>
                    </ScreenBlur>
                </MainLayout>
            )
        case "login":
            return (
                <MainLayout>
                    <layout.MainContent>
                        <layout.FlexCenterColumn100 style={{gap: "25px"}}>
                            { /* 메인: 가입한지 n일 & 레코드 카드 */}
                            <layout.FlexCenterColumn100 style={{gap: "5px"}}>
                                <MainExp dayCount={data.signupDay} />
                                <MainRecordCard data={data} isLoggedIn={true} isToggleOnLeft={states.isToggleOnLeft} toggleSetter={states.setIsToggleOnLeft}/>
                            </layout.FlexCenterColumn100>
                            { /* 메인: 여정 streak */}
                            <layout.FlexCenterColumn>
                                <MainJourney twoWeeks={data.twoweek}/>
                            </layout.FlexCenterColumn>
                        </layout.FlexCenterColumn100>
                    </layout.MainContent>
                    {/* { states.socialModalOn && <SocialLoginModal>회원가입</SocialLoginModal> } */}
                </MainLayout>
            )
    }
}