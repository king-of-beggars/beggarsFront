function getKrDate(isToday = true) {
    const date = new Date();
    if (!isToday) {
      date.setDate(date.getDate() - 1);
    }
    const koreanDate = new Date(date.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));

    const year = koreanDate.getFullYear();
    // JavaScript의 getMonth() 메서드는 0부터 시작
    const month = String(koreanDate.getMonth() + 1).padStart(2, '0');
    const day = String(koreanDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

export default getKrDate