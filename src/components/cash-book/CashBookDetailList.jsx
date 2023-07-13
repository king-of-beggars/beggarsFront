import React,{ useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { layout, style } from "styles";
import { DeleteDetail } from "assets";
import { CashBookAPI } from "api/api";
import { CashDetailModal, AutoResizedText } from "components";
import { commentDetailDelete } from 'constants';
import { commaOnThree } from 'functions';

function CashBookDetailList({ cardId, cashDetailId, expendName, expendMoney }) {
  console.log(cardId);
  // 지출 항목 삭제 API
  const queryClient = useQueryClient();
  const mutationDeleteDetail = useMutation(CashBookAPI.deleteCashDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cashDetail']);
      changeDeleteModal();
    },
    onError: () => alert("상세 항목 삭제에 실패하였습니다."),
  });

  // 무지출 전환 API
  const mutationNone = useMutation(CashBookAPI.putCashNone, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cashDetail']);
      changeDeleteModal();
    },
    onError: () => alert("상세 항목 삭제에 실패하였습니다."),
  });

  const onClickDelete = () => {
    if (expendMoney === 0) {
      mutationNone.mutate({cardId});
    } else {
      mutationDeleteDetail.mutate(cashDetailId);
    }
  }

  // 삭제 Modal
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const changeDeleteModal = () => {
    const newIsDelete = !isDeleteModal;
    setIsDeleteModal(newIsDelete);
  };

  const punctuatedExpend = commaOnThree(expendMoney)
  console.log("punc:::", punctuatedExpend)

  return (
    <style.CashBookDetailBox>
      <layout.FlexCenter100>
        <DeleteDetail style={{marginLeft:"1em"}} onClick={changeDeleteModal}/>
        { isDeleteModal && (<CashDetailModal setClose={changeDeleteModal} onClickHandler={onClickDelete}>{commentDetailDelete}</CashDetailModal> )}
      </layout.FlexCenter100>
      <style.CashBookDetailTextBox>{expendName}</style.CashBookDetailTextBox>
      { cashDetailId !== 0 
        && <style.CashBookDetailNumBox>
            <AutoResizedText>{punctuatedExpend}원</AutoResizedText>
           </style.CashBookDetailNumBox> }
    </style.CashBookDetailBox>
  );
}

export default CashBookDetailList;
