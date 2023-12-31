import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';

import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';

import { BackCrampsBlack, bgCloud50, bgMountain50, bgSky50 } from 'assets';
import { layout, style } from 'styles';

import { CashBookAPI } from 'common/utils/api';
import { CATEGORY_LIST } from 'common/constants';
import Navigation from 'common/components/Navigation';
import CashAddSelect from '../components/CashAddSelect';
import CashBookInput from '../components/CashBookInput';

function CashBookAdd() {
  // function CashBookAdd({ isMobile, headerHeight, navHeight, mainHeight }) {
  // 만들어둔 context 사용하기
  const {
    widthRatio,
    isMobile,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
  } = useGlobalVariables();
  // console.log('CashBookAdd rendered:', windowSize, isMobile, headerHeight, navHeight, mainHeight)

  // 카테고리 정보
  const options = CATEGORY_LIST;
  // 카드 정보 state
  const [cardInfo, setCardInfo] = useState({
    category: '',
    subHead: '',
    budget: '',
  });
  const { category, subHead, budget } = cardInfo;

  // onChange 적용 함수
  const onChangeInput = (changeObj) => {
    let { name, value } = changeObj.target;

    // 가격일 경우 컴마 추가 및 숫자만 허용
    if (name === 'budget') {
      const onlyNumber = value.replace(/[^0-9]/g, '');

      const numValue = onlyNumber.replaceAll(',', '');
      value = numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const newCard = {
      ...cardInfo,
      [name]: value,
    };

    setCardInfo(newCard);
    // console.log(newCard);
  };

  // 뒤로가기
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };

  // 저장하기 버튼 클릭
  const queryClient = useQueryClient();
  const mutationAddCard = useMutation(CashBookAPI.postCardAdd, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        `cashCard${moment().format('YYYY-MM-DD')}`,
      ]);
      navigate('/cash-book');
    },
    onError: () => alert('장부 추가에 실패하였네.'),
  });

  const onClickSave = () => {
    // console.log(!category)
    if (!category | !budget) {
      alert('카테고리와 예산을 선택해주게.');
    } else {
      const newCard = {
        cashCategory: category,
        cashName: subHead,
        cashListGoalValue: Number(budget.replace(',', '')),
      };
      // console.log(newCard);
      mutationAddCard.mutate(newCard);
      navigate('/cash-book');
    }
  };

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${bgSky50})`}
      backPngMiddle={`url(${bgCloud50})`}
      backPngTail={`url(${bgMountain50})`}
    >
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div
          className="statusBarHeight"
          style={{ width: 'inherit', height: '50px' }}
        ></div>
        <layout.HeaderContent>
          <BackCrampsBlack
            onClick={onClickBack}
            style={{ position: 'absolute', left: '1em', float: 'left' }}
          />
          <div
            style={{
              fontSize: `${25 * widthRatio}px`,
              fontFamily: 'DOSIyagiMedium',
            }}
          >
            장부 추가
          </div>
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.MainContent>
          <CashAddSelect
            title={'카테고리'}
            options={options}
            placeholder={'카테고리 선택'}
            onChange={onChangeInput}
            name={'category'}
            value={category}
          />
          <CashBookInput
            title={'소제목'}
            placeholder={'소제목을 입력해주세요.(선택)'}
            onChange={onChangeInput}
            name={'subHead'}
            value={subHead}
            maxLen={15}
          />
          <CashBookInput
            title={'예산'}
            placeholder={'일 별 목표 예산을 입력해주세요.'}
            onChange={onChangeInput}
            name={'budget'}
            value={budget}
          />
          <style.CashBookBtn marginTop="50px" onClick={onClickSave}>
            {'저장'}
          </style.CashBookBtn>
        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Navigation ratio={widthRatio} selected="money" />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default CashBookAdd;
