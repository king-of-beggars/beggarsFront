import { useEffect, useState } from "react";

const usePassword = (inputValue) => { // password 상태 및 password setter, password의 valid 상태를 관리하는 custom hook
  const [password, setPassword] = useState(inputValue);
  const [isValid, setIsValid] = useState({
    isValidLen: null,
    isValidRegex: null,
  });

  const _chkPasswordLen = (pw) => {
    if (pw === "") {
      setIsValid((latestState) => ({ ...latestState, isValidLen: null }));
    } else if (pw.length > 5 && pw.length < 21) {
      setIsValid((latestState) => ({ ...latestState, isValidLen: true }));
    } else {
      setIsValid((latestState) => ({ ...latestState, isValidLen: false }));
    }
  };

  const _chkPasswordRegex = (pw) => {
    const regex = /[^A-Za-z0-9]/;
    if (pw === "") {
      setIsValid((latestState) => ({ ...latestState, isValidRegex: null }));
    } else {
      setIsValid((latestState) => ({ ...latestState, isValidRegex: regex.test(pw) }));
    }
  };

  useEffect(() => {
    _chkPasswordLen(password);
    _chkPasswordRegex(password);
  }, [password])

  return [password, setPassword, isValid];
};

export default usePassword;
