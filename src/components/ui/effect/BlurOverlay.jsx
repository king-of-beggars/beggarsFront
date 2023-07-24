import React from 'react'
import styled from 'styled-components'

function BlurOverlay({ children }) {
    const Overlay = styled.div`
        /* 화면 전체를 덮도록 설정 */
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        display: flex;
        justify-content: center;
        align-items: center;

        /* 투명도와 blur 효과 적용 */
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(5px);

        z-index: 999;
    `
  return (
    <Overlay>
        {children}
    </Overlay>
  )
}

export default BlurOverlay