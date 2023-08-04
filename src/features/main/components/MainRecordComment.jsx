import React from 'react';

import { style } from 'styles';
import { COMMENT } from 'common/constants';
import getRandomComment from '../utils/getRandomComment';

function MainRecordComment({ dayCount, weatherCode, ratio }) {
  const overallComment = getRandomComment(
    dayCount === 0
      ? COMMENT.welcomeComments
      : weatherCode > 0
      ? COMMENT.positiveComments
      : COMMENT.negativeComments
  );
  return (
    <style.MainRecordCardComment ratio={ratio}>
      {overallComment}
    </style.MainRecordCardComment>
  );
}

export default MainRecordComment;
