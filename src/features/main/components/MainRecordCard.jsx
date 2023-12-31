import React from 'react';

import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';

import { layout, style } from 'styles';
import getKrDate from 'common/utils/getKrDate';
import { getAssetSize } from 'common/utils/getAssetSize';
import MainRecordCardTag from './MainRecordCardTag';
import MainRecordComment from './MainRecordComment';
import MainWeather from './MainWeather';
import MainRecordStatus from './MainRecordStatus';
import Bar from './Bar';
import MainToggle from './MainToggle';

function MainRecordCard({
  dayCount,
  isLoggedIn,
  isToggleOnLeft,
  toggleSetter,
  data,
}) {
  // 마지막 streak를 판별하여 weatherCode를 결정하는 함수
  const getWeatherCode = () => {
    const substracted =
      data.total.cashbookGoalValue - data.total.cashbookNowValue;
    if (substracted > 0) {
      return 2;
    } else if (substracted === 0) {
      return 1;
    } else {
      const yesterday = getKrDate(false);
      // 3일 이상 streak가 깨졌을 경우를 탐색
      const twoWeeks = Object.keys(data.twoweek);
      const yesterdayIdx = twoWeeks.indexOf(yesterday);
      const lastThreeDays = twoWeeks.slice(yesterdayIdx - 2, yesterdayIdx + 1);
      const filteredStreak = lastThreeDays
        .map((day) => data.twoweek[day])
        .filter((code) => code !== 1 && code !== 2);
      return filteredStreak.length === 3 ? -1 : 0;
    }
  };

  const { frameSize, screenWidth, mainRecordCard } = useGlobalVariables();
  const { width, height } = getAssetSize(
    frameSize,
    screenWidth,
    mainRecordCard
  );
  const ratio = width / mainRecordCard.width;

  const weatherCode = getWeatherCode();
  const isSaved = weatherCode > 0;

  const groupByCategory = data.groupByCategory;

  const barData = data.groupByCategory.map((entry) => {
    const keysToKeep = ['cashbookCategory', 'cashbookNowValue'];
    const newObj = Object.fromEntries(
      Object.entries(entry).filter(([key, value]) => keysToKeep.includes(key))
    );
    return newObj;
  });

  // const barData = data.groupByCategory.reduce((result, entry) => {
  //   if (entry.cashbookNowValue === 0) {
  //     return result;
  //   }

  //   const keysToKeep = ['cashbookCategory', 'cashbookNowValue']
  //   const newObj = Object.fromEntries(
  //     Object.entries(entry).filter(([key, value]) => keysToKeep.includes(key))
  //   )

  //   result.push(newObj);
  //   return result;
  // }, []);

  // const budget = data.total.cashbookGoalValue
  // const spend = data.total.cashbookNowValue

  // console.log("mainRecordCardData:::", data)
  // console.log("groupByCategory:::", groupByCategory)
  // console.log("barData:::", barData)

  return (
    <style.MainRecordCardBox
      width={`${width}px`}
      height={`${height}px`}
      ratio={ratio}
    >
      <layout.FlexColumn100 style={{ gap: '5px', marginBottom: '20px' }}>
        <MainRecordCardTag dayCount={dayCount} weatherCode={weatherCode} />
        <MainRecordComment
          dayCount={dayCount}
          weatherCode={weatherCode}
          ratio={ratio}
        />
      </layout.FlexColumn100>
      {isToggleOnLeft ? (
        <layout.Grid2Row style={{ gridTemplateColumns: '1fr 2fr' }}>
          <MainWeather weatherCode={weatherCode} />
          <MainRecordStatus
            ratio={ratio}
            isSaved={isSaved}
            budget={data.total.cashbookGoalValue}
            spend={data.total.cashbookNowValue}
          />
        </layout.Grid2Row>
      ) : barData.length > 0 ? (
        <>
          {/* <div style={{height: "40%", width: `${90 / groupByCategory.length}%`}}> */}
          <div style={{ height: '40%', width: '90%' }}>
            <Bar data={barData} />
          </div>
          <style.Divider
            borderSize="1px"
            color={'#3c3c3c'}
            style={{ width: '100%' }}
          ></style.Divider>
          <layout.FlexDefault
            style={{
              width: '90%',
              justifyContent: 'space-around',
              padding: '5px 6px 0 6px',
            }}
          >
            {barData.length > 0
              ? barData.map((item, idx) => {
                  return (
                    <style.MainGraphSection key={idx} ratio={ratio}>
                      {item.cashbookCategory}
                    </style.MainGraphSection>
                  );
                })
              : null}
          </layout.FlexDefault>
        </>
      ) : (
        <>
          <div
            style={{
              height: 'inherit',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '40px',
              fontSize: `${ratio * 14}px`,
              fontFamily: 'DOSGothic',
            }}
          >
            표시할 소비 데이터가 없다네!
          </div>
        </>
      )}

      {/* <layout.FlexCenter> */}
      <MainToggle
        isLoggedIn={isLoggedIn}
        isToggleOnLeft={isToggleOnLeft}
        toggleSetter={toggleSetter}
      />
      {/* </layout.FlexCenter> */}
    </style.MainRecordCardBox>
  );
}

export default MainRecordCard;
