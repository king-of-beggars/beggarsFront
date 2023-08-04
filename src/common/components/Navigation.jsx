import React from 'react';
import { style } from 'styles';
import { useNavigate } from 'react-router-dom';
import chkLoggedIn from 'common/utils/chkLoggedIn';

function Navigation({ selected, ratio }) {
  const isLoggedIn = chkLoggedIn();
  const navigate = useNavigate();

  // main으로 이동
  const onClickHome = () => {
    navigate('/');
  };

  // 가계부로 이동
  const onClickMoney = () => {
    navigate('/cash-book');
  };

  // 게시판으로 이동
  const onClickBoard = () => {
    navigate('/board');
  };

  // 프로필로 이동
  const onClickProfile = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };

  return (
    <style.NavWrap ratio={ratio}>
      {selected === 'main' ? (
        <style.NavBtn isSelected={true} ratio={ratio}>
          홈
        </style.NavBtn>
      ) : (
        <style.NavBtn onClick={onClickHome} isSelected={false} ratio={ratio}>
          홈
        </style.NavBtn>
      )}
      {selected === 'money' ? (
        <style.NavBtn isSelected={true} ratio={ratio}>
          가계부
        </style.NavBtn>
      ) : (
        <style.NavBtn onClick={onClickMoney} isSelected={false} ratio={ratio}>
          가계부
        </style.NavBtn>
      )}
      {selected === 'board' ? (
        <style.NavBtn isSelected={true} ratio={ratio}>
          게시판
        </style.NavBtn>
      ) : (
        <style.NavBtn onClick={onClickBoard} isSelected={false} ratio={ratio}>
          게시판
        </style.NavBtn>
      )}
      {selected === 'profile' ? (
        <style.NavBtn isSelected={true} ratio={ratio}>
          프로필
        </style.NavBtn>
      ) : (
        <style.NavBtn onClick={onClickProfile} isSelected={false} ratio={ratio}>
          프로필
        </style.NavBtn>
      )}
    </style.NavWrap>
  );
}

export default Navigation;
