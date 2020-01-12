import React from "react";
// import Konva from "konva";
import { CHART_SETTINGS } from "common/settings";
import { Stage, Layer, Rect } from "react-konva";

import "./ChartRender.scss";

class ChartRender extends React.Component {
  constructor(props) {
    super(props);

    this.barWidth = Math.floor(
      (CHART_SETTINGS.width -
        CHART_SETTINGS.barPadding * this.props.currentStep.length) /
        this.props.currentStep.length
    );
    this.barPieceHeight = Math.floor(
      CHART_SETTINGS.height / this.props.currentStep.length
    );

    this.barWidthHalf = Math.floor(this.barWidth / 2);
    this.barpopup = document.getElementById("barpopup");

    this.stageRef = React.createRef();

    this.handleBarOver = this.handleBarOver.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.currentStepIndex !== nextProps.currentStepIndex;
  }

  handleBarOver = e => {
    this.barpopup.innerHTML = e.target.attrs.item;
    this.barpopup.style.display = "block";

    var pophalf = Math.floor(this.barpopup.clientWidth / 2);
    this.barpopup.style.left =
      this.stageRef.current.content.offsetLeft +
      (e.target.attrs.x + this.barWidthHalf - pophalf) +
      "px";
    this.barpopup.style.top =
      this.stageRef.current.content.offsetTop +
      (e.target.attrs.y - this.barpopup.clientHeight) +
      "px";
  };

  handleBarOut = () => {
    this.barpopup.style.display = "none";
  };

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
                  x={curr * (this.barWidth + CHART_SETTINGS.barPadding)}
                  y={CHART_SETTINGS.height - barHeight}
                  width={this.barWidth}
                  height={barHeight}
                  fill={item.patched?"red":item.selected?"blue":"black"}
                  item={item.value}
                  onMouseOver={this.handleBarOver}
                  onMouseOut={this.handleBarOut}
                ></Rect>
              );
            })}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default ChartRender;
