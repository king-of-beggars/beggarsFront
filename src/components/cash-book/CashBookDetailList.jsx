import React,{ useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { style } from "styles";
import { DeleteDetail } from "assets";
import { CashBookAPI } from "api/api";
import { CashDetailModal } from "components";
import { deleteDetailMent } from "constants/comment";

function CashBookDetailList({ expendName, expendMoney, cashDetailId }) {
  // 지출 항목 삭제
  const queryClient = useQueryClient();
  const mutationDeleteDetail = useMutation(CashBookAPI.deleteCashDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cashDetail']);
      changeDeleteModal();
    },
    onError: () => alert("상세 항목 삭제에 실패하였습니다."),
  });

  const onClickDelete = () => {
    mutationDeleteDetail.mutate(cashDetailId);
  }

  // 삭제 Modal
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const changeDeleteModal = () => {
    const newIsDelete = !isDeleteModal;
    setIsDeleteModal(newIsDelete);
  };

  return (
    <style.CashBookDetailBox>
      <DeleteDetail style={{marginLeft:"1em", width:"8%"}} onClick={changeDeleteModal}/>
      { isDeleteModal && (<CashDetailModal setClose={changeDeleteModal} onClickHandler={onClickDelete}>{deleteDetailMent}</CashDetailModal> )}
      <div style={{width:"64%", marginLeft:"1em"}}>{expendName}</div>
      <div style={{width:"28%", display: "flex", justifyContent: "flex-end", marginRight:"1.5em"}}>{expendMoney}원</div>
    </style.CashBookDetailBox>
  );
}

export default CashBookDetailList;
