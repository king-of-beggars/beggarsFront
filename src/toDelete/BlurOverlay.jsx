import React from 'react';
import styled from 'styled-components';
import { useGlobalVariables } from '../provider/GlobalVariableProvider';

function BlurOverlay({
  children,
  addComponent,
  position = 'fixed',
  top = 0,
  left = 0,
  width = '100%',
  height = '100%',
}) {
  const { isMobile } = useGlobalVariables();
  const Overlay = styled.div`
    /* 화면 전체를 덮도록 설정 */
    position: ${(props) => props.position};
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    display: flex;
    justify-content: center;
    align-items: center;

    /* 투명도와 blur 효과 적용 */
    /* background-color: rgba(255, 255, 255, 0.5); */
    backdrop-filter: blur(5px);

    z-index: 999;
    ${isMobile &&
    `
            &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: inherit;
            filter: blur(10px);
            z-index: -1;
            }
        `}
  `;
  return (
    <Overlay
      position={position}
      top={top}
      left={left}
      width={width}
      height={height}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {children}
        {addComponent}
      </div>
    </Overlay>
  );
}

export default BlurOverlay;
