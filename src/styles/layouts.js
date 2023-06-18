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