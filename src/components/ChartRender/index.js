import React from "react";
import { CHART_SETTINGS } from "common/settings";
import { getTextWidth } from "common/utils";
import { Stage, Layer, Rect, Text } from "react-konva";
import FontFaceObserver from "fontfaceobserver";

import "./ChartRender.scss";

class ChartRender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    };

    let font = new FontFaceObserver("PFDinMono");
    font.load().then(
      function() {
        this.setState({ fontLoaded: true });
      }.bind(this)
    );

    this.barPieceHeight = Math.floor(
      (CHART_SETTINGS.height / this.props.currentStep.length) * 0.8
    );

    this.stageRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.currentStepIndex !== nextProps.currentStepIndex ||
      this.props.playing !== nextProps.playing ||
      this.props.builded !== nextProps.builded ||
      this.props.currentStepIndex !== nextProps.currentStepIndex ||
      this.props.speed !== nextProps.speed ||
      this.state.fontLoaded !== nextState.fontLoaded
    );
  }

  render() {
    return (
      <div className="charts">
        <div className="charts-convas">
          <Stage
            ref={this.stageRef}
            width={CHART_SETTINGS.width}
            height={CHART_SETTINGS.height}
          >
            <Layer>
              {this.props.currentStep.map((item, curr) => {
                let barHeight = item.value * this.barPieceHeight;
                return [
                  <Rect
                    key={item.value.toString() + "~" + curr.toString()}
                    x={
                      CHART_SETTINGS.offsetX + curr * CHART_SETTINGS.barPadding
                    }
                    y={CHART_SETTINGS.height - barHeight - 23}
                    width={CHART_SETTINGS.barWidth}
                    height={barHeight}
                    fill={
                      item.patched
                        ? "#FF417B"
                        : item.selected
                        ? "#6641FF"
                        : "white"
                    }
                    item={item.value}
                    onMouseOver={this.handleBarOver}
                    onMouseOut={this.handleBarOut}
                    cornerRadius={CHART_SETTINGS.barRadius}
                  ></Rect>,
                  <Text
                    text={item.value}
                    fill={"#7E7E7E"}
                    x={
                      CHART_SETTINGS.offsetX +
                      curr * CHART_SETTINGS.barPadding -
                      (Math.floor(
                        getTextWidth(
                          item.value,
                          "normal normal 12px PFDinMono"
                        ) / 2
                      ) -
                        Math.floor(CHART_SETTINGS.barWidth / 2))
                    }
                    y={CHART_SETTINGS.height - 12}
                    fontSize={12}
                    fontFamily={this.state.fontLoaded ? "PFDinMono" : "Arial"}
                  />
                ];
              })}
            </Layer>
          </Stage>
        </div>

        <div className="charts-btns-wrapper">
          <div className="charts-btns">
            <button
              disabled={!this.props.builded}
              onClick={
                this.props.playing ? this.props.pause : this.props.resume
              }
              className={
                this.props.playing
                  ? "charts-btns__btn charts-btns__btn_pause"
                  : "charts-btns__btn charts-btns__btn_start"
              }
            >
              {this.props.playing ? "Pause" : "Start"}
            </button>
            <button
              disabled={this.props.builded}
              onClick={this.props.handleBuildCode}
              className={
                this.props.builded
                  ? "charts-btns__btn charts-btns__btn_checkmark"
                  : "charts-btns__btn charts-btns__btn_stop"
              }
            >
              {this.props.builded ? "Builded" : "Build"}
            </button>

            <div className="charts-btns__longrangewrap">
              <span className="charts-btns__longrangetitle">
                {this.props.currentStepIndex + 1}/{this.props.stepsCount}
              </span>
              <input
                type="range"
                className="charts-btns__longrange"
                onChange={e =>
                  this.props.setStep(Number.parseInt(e.target.value) - 1)
                }
                value={this.props.currentStepIndex + 1}
                min="1"
                max={this.props.stepsCount}
              ></input>
            </div>

            <div className="charts-btns__rangewrap">
              <span className="charts-btns__rangelbl">Speed</span>
              <div className="charts-btns__rangeinnerwrap">
                <input
                  type="range"
                  className="charts-btns__range"
                  onChange={e => this.props.setSpeed(e.target.value)}
                  value={this.props.speed}
                  min="1"
                  max="10"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartRender;
