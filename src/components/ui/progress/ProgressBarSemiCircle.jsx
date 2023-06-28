import React, { useRef, useEffect } from 'react'
import ProgressBar from "progressbar.js"
import * as sVar from "constants/styleVariables"

function ProgressBarSemiCircle( { type, budget, spend, ratio }) {
    const progressBarRef = useRef(null)

    useEffect(() => {
        const graphValue = (Math.round((spend / budget) * 10)) / 10 * 100
        console.log("origin:::", Math.round((spend / budget) * 10) / 10)
        if (type === "semiCircle") {
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
            from: { color: `${sVar.lightYellow}` },
            to: { color: `${sVar.strongYellow}` },
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
                bar.text.style.color = `tomato`;
                bar.path.setAttribute('stroke', "tomato");
                bar.trail.setAttribute("stroke", `${sVar.middleYellow}`)
              } else {
                bar.setText(`${value}%`);
                bar.text.style.color = `${sVar.middleYellow}`;
              }
            //   bar.text.style.color = `${sVar.middleYellow}`;
            },
          });
          semiCircle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
          semiCircle.text.style.fontSize = `${1 * ratio}em`;
          
          if (graphValue > 100) {
            console.log(graphValue / 100)
            semiCircle.animate((graphValue / 100) - 1);
          } else {
            semiCircle.animate(graphValue / 100);
          }


            return () => {
                semiCircle.destroy();
              };
        } else if (type === "bar") {
            const bar = new ProgressBar.Line(progressBarRef.current, {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: '#FFEA82',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {width: '100%', height: '100%'},
                text: {
                  style: {
                    // Text color.
                    // Default: same as stroke color (options.color)
                    color: '#999',
                    position: 'absolute',
                    right: '0',
                    top: '30px',
                    padding: 0,
                    margin: 0,
                    transform: null
                  },
                  autoStyleContainer: false
                },
                from: {color: '#FFEA82'},
                to: {color: '#ED6A5A'},
                step: (state, bar) => {
                  bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            });
            
            bar.animate(1.0)

            return () => {
                bar.destroy();
              };
        } else if (type === "circle") {
            const circle = new ProgressBar.Circle(progressBarRef.current, {
                color: '#FFEA82',
                trailColor: '#eee',
                trailWidth: 1,
                duration: 1400,
                easing: 'bounce',
                strokeWidth: 6,
                from: {color: '#FFEA82', a:0},
                to: {color: '#ED6A5A', a:1},
                // Set default step function for all animate calls
                step: function(state, circle) {
                  circle.path.setAttribute('stroke', state.color);
                  var value = Math.round(circle.value() * 100);
                  if (value === 0) {
                    circle.setText('');
                  } else {
                    circle.setText(value);
                  }
                }
            });
            circle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
            circle.text.style.fontSize = '2rem';

            circle.animate(1.0);
            return () => {
                circle.destroy();
              };
            }
        }, []);

        return <div ref={progressBarRef} />;
      };

export default ProgressBarSemiCircle