import styled from "styled-components";

export const FlexDefault = styled.div`
    display: flex;
`

export const Flex100 = styled(FlexDefault)`
    width: 100%;
`

export const FlexColumn100 = styled(Flex100)`
    flex-direction: column;
`

export const FlexColumn = styled(FlexDefault)`
    flex-direction: column;
`

export const FlexCenterRow = styled(FlexDefault)`
    justify-content: center;
`

export const FlexCenterRow100 = styled(Flex100)`
    justify-content: center;
`

export const FlexCenter = styled(FlexDefault)`
    justify-content: center;
    align-items: center;
`

export const FlexCenter100 = styled(FlexCenter)`
    width: 100%;
`

export const FlexCenterEven100 = styled(FlexCenter100)`
    justify-content: space-evenly;
`

export const FlexCenterColumn = styled(FlexColumn)`
    justify-content: center;
    align-items: center;
`

export const FlexCenterColumn100 = styled(FlexCenterColumn)`
    width: 100%;
`

export const PageLayout = styled(FlexCenterColumn)`
    width: ${props => props.isMobile ? `99vw` : `500px`};
    height: 99vh;
    border: 2px solid lightgray;
    margin: 0 auto;
    position: relative;
`

export const PageLayoutTemp = styled.div`
    width: ${props => props.isMobile ? `100vw` : `393px`};
    height: 100%;

`

export const HeaderTemp = styled(FlexCenter)`
    height: ${props => props.headerHeight};
    position: fixed;
    top: 0;
    width: inherit;
    background: lightblue;
`

export const HeaderContent = styled.div`
    width: 85%;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    background: royalblue;
`

export const NavTemp = styled.nav`
    height: ${props => props.navHeight};
    position: fixed;
    width: inherit;
    background: tomato;
    padding: 1em 0;
`

export const MainTemp = styled.main`
    margin-top: ${props => props.headerHeight};
    height: ${props => props.mainHeight};
    background: lightgray;
    width: inherit;
    max-height: ${props => props.mainHeight};
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MainContent = styled.div`
    width: 85%;
    height: inherit;
    background: yellowgreen;
`

export const CashBookMainContent = styled.div`
    width: inherit;
    height: inherit;
    background: yellowgreen;
`

export const SwiperWrap = styled(FlexCenterRow)`
    width: auto;
    background: yellow;
    height: calc(${props => props.mainHeight} - 24px - ${props => props.dateBoxHeight});
    min-height: calc(${props => props.cardHeight} + 50px);
    overflow-y: hidden;
    /* height: ${props => props.mainHeight} */
`