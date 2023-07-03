function setKrTime(timeStr) {
    const date = new Date(timeStr);
    const ktc = date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + (-540));
    return ktc
}

export default setKrTime