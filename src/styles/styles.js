import styled, { css } from "styled-components"
import { layout, } from "./index"
import { btn, pressedBtn } from '../pixels'

export const CanvasContainer = styled.div`
    width: 98vw;
    height: 98vh;
    border: 2px solid lightgray;
    border-radius: 10px;
`

export const Button = styled.button`
    color: white;
    width: 190px;
    height: 49px;
    border: none;
    background: ${props => (props.isPressed ? `url(${pressedBtn}) no-repeat` : `url(${btn}) no-repeat`)};
    /* background: url(${btn}) no-repeat; */

    /* ${props => {
        if (!!props.isPressed) {
            css`
                background: url(${pressedBtn}) no-repeat;
            `
        } else {
            css`
                background: url(${btn}) no-repeat;
            `
        } 
    }} */
`