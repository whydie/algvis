import React from "react";
import "./App.scss";

import { AlgsList, ChartRender, InputData } from "components";
import { randomArr } from "common/utils";
import { PLAYER_SETTINGS } from "common/settings";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.randomArr1 = randomArr();
    this.randomArr2 = [...this.randomArr1];
    this.randomArr2[0] = 1;
    this.steps = [this.randomArr1, this.randomArr2];

    this.state = {
      currentStep: this.steps[0],
      currentStepIndex: 0,
      speed: PLAYER_SETTINGS.speed,
      playing: false,
      building: false
    };

    this.handleBuildCode = this.handleBuildCode.bind(this);
    this.handleStartCode = this.handleStartCode.bind(this);

    this.setStep = this.setStep.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.resume = this.resume.bind(this);
    this.pause = this.pause.bind(this);
  }

  handleBuildCode = ace => {
    let codeText = ace.editor.getValue();
    try {
      // eslint-disable-next-line no-new-func
      let funcFromCode = new Function("arrSorting", codeText);
      let newStepsArr = funcFromCode(this.steps[0]);
      if (!(Array.isArray(newStepsArr) && newStepsArr.length))
        throw Error("Invalid array");
      this.steps = newStepsArr;
      this.setState({ currentStepIndex: 0 });
    } catch (e) {
      console.error(e.message);
    }
  };

  handleStartCode = () => {};

  setStep(i) {
    this.setState({
      currentStep: this.steps[i],
      currentStepIndex: i
    });
  }

  setSpeed(speed) {
    this.setState({ speed: speed });
  }

  next() {
    this.pause();
    if (this.state.currentStepIndex >= this.steps.length - 1) return false;
    this.setStep(this.state.currentStepIndex + 1);
    return true;
  }

  prev() {
    this.pause();
    if (this.state.currentStepIndex <= 0) return false;
    this.setStep(this.state.currentStepIndex - 1);
    return true;
  }

  resume() {
    this.pause();
    if (this.next()) {
      const interval = PLAYER_SETTINGS.time / this.state.speed;
      this.timer = window.setTimeout(this.resume, interval);
      this.setState({ playing: true });
    }
  }

  pause() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = undefined;
      this.setState({ playing: false });
    }
  }

  render() {
    return (
      <div className="App">
        <AlgsList changeAlg={this.changeAlg} />
        <ChartRender
          playing={this.state.playing}
          building={this.state.building}
          currentStep={this.state.currentStep}
          currentStepIndex={this.state.currentStepIndex}
        />
        <InputData
          handleBuildCode={this.handleBuildCode}
          handleStartCode={this.handleStartCode}
          resume={this.resume}
          prev={this.prev}
          playing={this.state.playing}
          building={this.state.building}
        />
      </div>
    );
  }
}

export default App;
