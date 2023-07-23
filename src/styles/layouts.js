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

export const PageLayoutTemp = styled(FlexCenterColumn)`
    width: ${props => props.isMobile ? `99vw` : `500px`};
    height: 99vh;
    border: 2px solid lightgray;
    margin: 0 auto;
    position: relative;
`

export const PageLayout = styled.div`
    width: ${props => props.isMobile ? `100vw` : `393px`};
    height: 100%;

`

export const Header = styled(FlexCenterColumn)`
    height: ${props => props.headerHeight};
    position: fixed;
    top: 0;
    width: inherit;
    /* margin-top: 53px; */
`

export const HeaderContent = styled.div`
    width: 85%;
    height: calc(100% - 53px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(25px * ${props => props.ratio});
    background-color: ${props => props.background};
`

export const Nav = styled.nav`
    height: ${props => props.navHeight};
    position: fixed;
    width: inherit;
    /* padding: calc(${props => props.ratio} * 17px) calc(${props => props.ratio} * 43px) calc(${props => props.ratio} * 25px) calc(${props => props.ratio} * 43px); */
`

export const Main = styled.main`
    margin-top: ${props => props.headerHeight};
    height: ${props => props.mainHeight};
    width: inherit;
    max-height: ${props => props.mainHeight};
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: calc(${props => props.ratio} * 25px);
`

export const MainContent = styled.div`
    width: 85%;
    height: inherit;
    overflow-y: scroll;
    margin-top: 20px;
`

export const CashBookMainContent = styled.div`
    width: inherit;
    height: inherit;
`

export const SwiperWrap = styled(FlexCenterRow)`
    width: auto;
    /* width: inherit; */
    /* height: calc(${props => props.mainHeight} - ${props => props.dateBoxHeight}); */
    height: ${props => props.mainHeight};
    min-height: calc(${props => props.cardHeight});
    /* height: calc(${props => props.mainHeight} - 24px - ${props => props.dateBoxHeight});
    min-height: calc(${props => props.cardHeight} + 50px); */
    overflow-y: hidden;
    /* height: ${props => props.mainHeight} */
`

// login 페이지의 메인 내부 전체를 감싸는 wrap입니다.
export const LoginWrap = styled.div`
    width: 100%;
    height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

`

// login의 아이디 및 비밀번호 input을 감싸는 wrap입니다.
export const LoginInputWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
`

// login의 로그인 및 회원가입 버튼을 감싸는 wrap입니다.
export const LoginBtnWrap = styled(FlexCenterColumn)`
    width: 100%;
    gap: 1em;
    padding: 0 0 3em 0;
    border-bottom: 0.5px solid #9D9D9D;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

// 소셜 로그인 버튼을 감싸는 wrap입니다.
export const SocialBtnWrap = styled(FlexCenterColumn)`
    width: 100%;
    gap: 1em;
    margin: 3em 0;
`

// 식비 지출 카드 목록을 감싸는 wrap입니다.
export const SpendingListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4em;
`

export const Grid2Row = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: calc(20px * ${props => props.ratio});
`

export const Grid1Row = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0.8em;
`