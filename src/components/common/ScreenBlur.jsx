import React from 'react'
import { styled } from 'styled-components'

// 기본 스크린을 블러하고 그 위에 원하는 문구를 띄울 수 있는 컴포넌트
function ScreenBlur({ comment, children, addComponent=null }) {
  const Comment = styled.div`
    position: absolute;
    z-index: 1;
  `
  const BackBlur = styled.div`
    width: inherit;
    height: inherit;
    /* background-color: rgba(0, 0, 0, 0.1); */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    filter: blur(5px);
  `
  const Vignette = styled.div`
    width: 100%;
    height: 100%;
    /* background: radial-gradient(circle at center, transparent 50%, rgba(255, 255, 255, 0.5)); */
    position: absolute;
    top: 0;
    left: 0;
  `
  return (
    <>
      <Comment>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", position: "relative"}}>
          {comment}
          {addComponent}
        </div>
      </Comment>
      <BackBlur>
        <Vignette />
          {children}
      </BackBlur>
    </>

  )
}

export default ScreenBlur