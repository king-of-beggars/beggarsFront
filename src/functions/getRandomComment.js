function getRandomComment(commentList) {
    const listLength = commentList.length;
    const idx = Math.floor(Math.random() * listLength);
    return commentList[idx];
}

export default getRandomComment;