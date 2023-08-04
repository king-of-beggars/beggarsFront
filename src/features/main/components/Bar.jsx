import React from 'react';

import { ResponsiveBar } from '@nivo/bar';
import { patternSquaresDef } from '@nivo/core';

import 'styles/css/customBarGraph.css';
import commaOnThree from 'common/utils/commaOnThree';

function Bar({ data }) {
  return (
    <ResponsiveBar
      data={data}
      indexBy="cashbookCategory"
      keys={['cashbookNowValue']}
      colors={['#E7CC67', '#A5D7DB', '#FF8989', '#C0D1A0', '#BDA5DB']}
      colorBy="indexValue"
      borderRadius={1}
      borderWidth={1}
      borderColor={'#3c3c3c'}
      enableGridY={false}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      tooltip={({ id, value, color }) => (
        <div
          className={id}
          style={{
            color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            width: '140px',
            height: '50px',
            borderRadius: '4px',
          }}
        >
          {`${id}: ${commaOnThree(value)}원 지출`}
        </div>
      )}
      axisTop={null}
      axisRight={null}
      axisLeft={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
      defs={[
        patternSquaresDef('squares-pattern', {
          size: 1,
          padding: 2,
          stagger: false,
          background: 'inherit',
          color: '#f5f5f5',
        }),
      ]}
      fill={[{ match: '*', id: 'squares-pattern' }]}
      valueFormat={(value) => `${commaOnThree(value)}`}
    />
  );
}

export default Bar;
