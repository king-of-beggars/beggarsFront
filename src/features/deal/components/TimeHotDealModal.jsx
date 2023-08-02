import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { styled } from 'styled-components'

import { useGlobalVariables } from 'providers'
import { LabeledInput } from 'components'
import { BackCramps,} from 'assets'
import { layout, style } from 'styles'
import * as sVar from 'constants/styleVariables'


function TimeHotDealModal({ children }) {
    const { widthRatio } = useGlobalVariables();
    const HotDealBtn = styled.button`
      padding: calc(${props => props.ratio} * 6px) 0;
      color: ${props => props.color};
      background-color: ${props => props.bgColor};
      border-radius: calc(${props => props.ratio} * 5px);
    `

  return (
    <style.ModalOverlay>
      <style.ModalDefault style={{width: "90%", gap: "30px"}}>
        <layout.FlexCenter100 style={{ position: "relative" }}>
          <BackCramps
            style={{ position: "absolute", left: "0" }}
          />
          <div style={{ fontSize: "25px" }}>{children}</div>
        </layout.FlexCenter100>
        <layout.FlexCenterColumn100 style={{fontFamily: "DOSGothic"}}>
            <layout.FlexCenter100>
                <layout.FlexCenter style={{textAlign: "center", width: `${78 * widthRatio}px`, height: `${78 * widthRatio}px`, fontSize: `${12 * widthRatio}px`, borderRadius: "50%", border: `1px solid ${sVar.grayAFAFAF}`}}>
                    이미지<br />미리보기
                </layout.FlexCenter>
                <layout.FlexCenter>
                    <button>이미지 첨부</button>
                    <button>삭제</button>
                </layout.FlexCenter>
            </layout.FlexCenter100>
            <layout.FlexCenterColumn100>
                <LabeledInput
                    title={"제목"}
                    placeholder={"제목을 입력해주세요 (최대 15자)"}
                    name="title"
                    type="text"
                    // value={title}
                    // onChange={onChangeInput}
                    height="3em"
                />
                <LabeledInput
                    title={"제목"}
                    placeholder={"제목을 입력해주세요 (최대 15자)"}
                    name="title"
                    type="text"
                    // value={title}
                    // onChange={onChangeInput}
                    height="3em"
                />
            </layout.FlexCenterColumn100>

        </layout.FlexCenterColumn100>
      </style.ModalDefault>
    </style.ModalOverlay>
  )
}

export default TimeHotDealModal