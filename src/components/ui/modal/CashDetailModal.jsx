import React, { useState } from "react";
import { style, layout } from "styles"

function CashDetailModal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  return (
    <style.ModalOverlay>
      <style.ModalDefault style={{width: "90%"}}>

      </style.ModalDefault>
    </style.ModalOverlay>
  )
}

export default CashDetailModal;
