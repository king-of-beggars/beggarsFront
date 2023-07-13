import React from 'react'

import { Textfit } from 'react-textfit'

class AutoResizedText extends React.Component {
    render() {
        const { children } = this.props;
      return (
        <Textfit
          mode="single"
          max={100}
          forceSingleModeWidth={true}>
          { children }
        </Textfit>
      );
    }
  }

export default AutoResizedText