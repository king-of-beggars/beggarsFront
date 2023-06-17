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

export const FlexCenter = styled(FlexDefault)`
    justify-content: center;
    align-items: center;
`

export const FlexCenter100 = styled(FlexCenter)`
    width: 100%;
`

export const FlexColumnCenter = styled(FlexColumn)`
    justify-content: center;
    align-items: center;
`

export const FlexColumnCenter100 = styled(FlexColumnCenter)`
    width: 100%;
`

export const PageLayout = styled(FlexColumnCenter)`
    width: ${props => props.isMobile ? `99vw` : `500px`};
    height: 99vh;
    border: 2px solid lightgray;
    margin: 0 auto;
    position: relative;
`