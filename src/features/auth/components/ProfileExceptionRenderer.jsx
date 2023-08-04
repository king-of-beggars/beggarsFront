import React from 'react';

import { bgCloud70, bgSky70, bgMountain70 } from 'assets';
import { layout, style } from 'styles';
import * as sVar from 'common/constants/styleVariables';
import Navigation from 'common/components/Navigation';
import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';
import BlurOverlay from 'common/components/effect/BlurOverlay';

function ProfileExceptionRenderer({ comment, addComponent }) {
  const {
    isMobile,
    widthRatio,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
  } = useGlobalVariables();
  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${bgSky70})`}
      backPngMiddle={`url(${bgCloud70})`}
      backPngTail={`url(${bgMountain70})`}
      style={{ fontFamily: 'DOSIyagiMedium' }}
    >
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div
          className="statusBarHeight"
          style={{ width: 'inherit', height: '50px' }}
        ></div>
        <layout.HeaderContent ratio={widthRatio}>프로필</layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
        style={{ fontFamily: 'DOSIyagiMedium' }}
      >
        <BlurOverlay comment={comment} addComponent={addComponent}>
          <layout.MainContent>
            <layout.FlexCenterColumn100
              style={{ height: '100%', justifyContent: 'space-around' }}
            >
              <layout.FlexCenterColumn100 style={{ gap: '1em' }}>
                <style.ProfilePicWrap ratio={widthRatio} />
                <div style={{ fontSize: `${widthRatio * 20}px` }}>sample</div>
                <div
                  style={{
                    boxSizing: 'content-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3px 8px 3px 4px',
                    gap: `${widthRatio * 6}px`,
                    backgroundColor: `${sVar.black3C3C3C}`,
                    borderRadius: `${widthRatio * 100}px`,
                    width: 'auto',
                    height: `${widthRatio * 27}px`,
                  }}
                >
                  <div
                    style={{
                      fontSize: `${widthRatio * 14}px`,
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: `${widthRatio * 21}px`,
                      height: `${widthRatio * 21}px`,
                    }}
                  >
                    P
                  </div>
                  <div
                    style={{ fontSize: `${widthRatio * 14}px`, color: '#fff' }}
                  >
                    3,000
                  </div>
                </div>
                {/* <div style={{ fontSize: "1em", color: "#858585" }}>
                이메일 정보 출력
              </div> */}
              </layout.FlexCenterColumn100>
              <layout.FlexCenterColumn100 style={{ gap: '1em' }}>
                <style.MidBlackBtn ratio={widthRatio}>
                  정보수정
                </style.MidBlackBtn>
                <span
                  style={{
                    fontSize: `${widthRatio * 14}px`,
                    textDecoration: 'underline',
                  }}
                >
                  로그아웃
                </span>
              </layout.FlexCenterColumn100>
            </layout.FlexCenterColumn100>
          </layout.MainContent>
        </BlurOverlay>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Navigation ratio={widthRatio} selected="profile" />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default ProfileExceptionRenderer;
