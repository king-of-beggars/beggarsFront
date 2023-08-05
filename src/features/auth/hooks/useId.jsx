import { useEffect, useState } from "react";

const useId = (inputValue) => { // id 상태 및 id setter, id의 valid 상태를 관리하는 custom hook
  const [id, setId] = useState(inputValue);
  const [isIdValid, setIsIdValid] = useState({
    isValidLen: null,
    isValidRegex: null,
  });

  const _chkIdLen = (id) => {
    if (id === "") {
     setIsIdValid((latestState) => ({ ...latestState, isValidLen: null }));
    } else if (id.length > 3 && id.length < 13) {
     setIsIdValid((latestState) => ({ ...latestState, isValidLen: true }));
    } else {
     setIsIdValid((latestState) => ({ ...latestState, isValidLen: false }));
    }
  };

  const _chkIdRegex = (id) => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (id === "") {
     setIsIdValid((latestState) => ({ ...latestState, isValidRegex: null }));
    } else {
     setIsIdValid((latestState) => ({ ...latestState, isValidRegex: regex.test(id) }));
    }
  };

  useEffect(() => {
    _chkIdLen(id);
    _chkIdRegex(id);
  }, [id])

  return [id, setId, isIdValid];
};

export default useId;
