import { useEffect, useState } from "react";

const useNickname = (inputValue) => { // nickname 상태 및 nickname setter, nickname의 valid 상태를 관리하는 custom hook
  const [nickname, setNickname] = useState(inputValue);
  const [isNickValid, setIsNickValid] = useState({
    isValidLen: null,
    isValidRegex: null,
  });

  const _chkNicknameLen = (nickname) => {
    if (nickname === "") {
     setIsNickValid((latestState) => ({ ...latestState, isValidLen: null }));
    } else if (nickname.length > 1 && nickname.length < 13) {
     setIsNickValid((latestState) => ({ ...latestState, isValidLen: true }));
    } else {
     setIsNickValid((latestState) => ({ ...latestState, isValidLen: false }));
    }
  };

  const _chkNicknameRegex = (nickname) => {
    const regex = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9]+$/;
    if (nickname === "") {
     setIsNickValid((latestState) => ({ ...latestState, isValidRegex: null }));
    } else {
     setIsNickValid((latestState) => ({ ...latestState, isValidRegex: regex.test(nickname) }));
    }
  };

  useEffect(() => {
    _chkNicknameLen(nickname);
    _chkNicknameRegex(nickname);
  }, [nickname])

  return [nickname, setNickname, isNickValid];
};

export default useNickname;
