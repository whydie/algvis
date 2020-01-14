import React from "react";
// import Konva from "konva";
import { CHART_SETTINGS } from "common/settings";
import { Stage, Layer, Rect } from "react-konva";

import "./ChartRender.scss";

class ChartRender extends React.Component {
  constructor(props) {
    super(props);

    this.barPieceHeight = Math.floor(
      CHART_SETTINGS.height / this.props.currentStep.length
    );

    this.stageRef = React.createRef();
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.currentStepIndex !== nextProps.currentStepIndex ||
      this.props.playing !== nextProps.playing ||
      this.props.builded !== nextProps.builded ||
      this.props.currentStepIndex !== nextProps.currentStepIndex ||
      this.props.speed !== nextProps.speed
    );
  }

  render() {
    return (
      <div className="charts">
        <Stage
          ref={this.stageRef}
          width={CHART_SETTINGS.width}
          height={CHART_SETTINGS.height}
        >
          <Layer>
            {this.props.currentStep.map((item, curr) => {
              let barHeight = item.value * this.barPieceHeight;
              return (
                <Rect
                  key={item.value.toString() + "~" + curr.toString()}
                  x={curr * (20)}
                  y={CHART_SETTINGS.height - barHeight}
                  width={5}
                  height={barHeight}
                  fill={item.patched ? "#FF417B" : item.selected ? "#6641FF" : "white"}
                  item={item.value}
                  onMouseOver={this.handleBarOver}
                  onMouseOut={this.handleBarOut}
                  cornerRadius={10}
                ></Rect>
              );
            })}
          </Layer>
        </Stage>
        <div className="charts-btns">
          <button
            disabled={this.props.builded}
            onClick={this.props.handleBuildCode}
          >
            {this.props.builded ? "Builded" : "Build"}
          </button>
          <button
            disabled={!this.props.builded}
            onClick={this.props.playing ? this.props.pause : this.props.resume}
          >
            {this.props.playing ? "Pause" : "Start"}
          </button>

          <input
            type="range"
            onChange={e => this.props.setSpeed(e.target.value)}
            value={this.props.speed}
            min="1"
            max="10"
          ></input>

          <input
            type="range"
            onChange={e =>
              this.props.setStep(Number.parseInt(e.target.value) - 1)
            }
            value={this.props.currentStepIndex}
            min="1"
            max={this.props.stepsCount}
          ></input>
        </div>
      </div>
    );
  }
}

export default ChartRender;
