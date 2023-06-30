import React, { useRef, useEffect } from 'react'
import ProgressBar from "progressbar.js"
import * as sVar from "constants/styleVariables"

function ProgressBarSemiCircle( { budget, spend, ratio, isDefault }) {
    const progressBarRef = useRef(null)

    useEffect(() => {
        const graphValue = (Math.round((spend / budget) * 10)) / 10 * 100
        console.log("origin:::", Math.round((spend / budget) * 10) / 10)
        const semiCircle = new ProgressBar.SemiCircle(progressBarRef.current, {
          strokeWidth: 6,
          color: `${sVar.textGray}`,
          trailColor: `${sVar.lightGray}`,
          trailWidth: 8,
          easing: 'easeInOut',
          duration: 1400,
          svgStyle: null,
          text: {
            value: "0%",
            alignToBottom: false,
          },
          from: { color: isDefault ? `${sVar.lightYellow}` : "#ffffff"},
          to: { color: isDefault ? `${sVar.strongYellow}` : `${sVar.darkGray}`},
          step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            const value = graphValue;
            // console.log("value::", graphValue)
            if (value === 0) {
              bar.setText("0%");
              // bar.animate(0)
              bar.text.style.color = `${sVar.lightGray}`;
            } else if (value > 100 ){
              bar.setText(`${value}%`);
              // bar.animate(graphValue / 100)
              bar.text.style.color = "tomato";
              bar.path.setAttribute('stroke', "tomato");
              { isDefault ? bar.trail.setAttribute("stroke", `${sVar.middleYellow}`) : bar.trail.setAttribute("stroke", `${sVar.textGray}`) }
            } else {
              bar.setText(`${value}%`);
              { isDefault ? bar.text.style.color = `${sVar.middleYellow}` : bar.text.style.color = "#ffffff" }
            }
          //   bar.text.style.color = `${sVar.middleYellow}`;
          },
        });
        semiCircle.text.style.fontFamily = '"DOSGothic", Helvetica, sans-serif';
        semiCircle.text.style.fontSize = `1em`;
        
        if (graphValue > 100) {
          console.log(graphValue / 100)
          semiCircle.animate((graphValue / 100) - 1);
        } else {
          semiCircle.animate(graphValue / 100);
        }


        return () => {
          semiCircle.destroy();
        };
        }, [isDefault]);

        return <div ref={progressBarRef} />;
      };

export default ProgressBarSemiCircle