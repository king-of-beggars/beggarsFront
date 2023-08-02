import React from 'react'
import styled, { keyframes } from 'styled-components'

const loading = keyframes`
    0% { content: ""; }
    25% { content: ".";}
    50% { content: ".."; }
    75% { content: "..."; }
    100% { content: ""; }
`

const LoadingText = styled.div`
    &:after {
        content: "";
        animation-name: ${loading};
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

`

function Loader({children}) {

  return (
    <LoadingText>{children}</LoadingText>
  )
}

export default Loader