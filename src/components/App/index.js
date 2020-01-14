import React from "react";
import "./App.scss";

import { Array1DTracer } from "apis";
import { AlgsList, ChartRender, InputData } from "components";
import { randomArr } from "common/utils";
import { PLAYER_SETTINGS, DEFAULT_ALGS, DEFAULT_ALG } from "common/settings";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.unsortedArr = randomArr();
    this.tracer = new Array1DTracer(this.unsortedArr);

    this.state = {
      currentStep: this.tracer.steps[0],
      currentStepIndex: 0,
      speed: PLAYER_SETTINGS.speed,
      playing: false,
      builded: false
    };

    this.handleBuildCode = this.handleBuildCode.bind(this);
    this.handleSetAlg = this.handleSetAlg.bind(this);

    this.setStep = this.setStep.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.resume = this.resume.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentDidMount() {
    this.handleSetAlg(DEFAULT_ALG);
  }

  handleBuildCode = () => {
    let codeText = window.AceEditor.editor.getValue();
    try {
      // eslint-disable-next-line no-new-func
      let funcFromCode = new Function("tracer", "arr", codeText);
      funcFromCode(this.tracer, this.unsortedArr);
      this.setState({ currentStepIndex: 0, builded: true });
    } catch (e) {
      console.error(e.message);
    }
  };

  handleSetAlg = alg => {
    window.AceEditor.editor.setValue(DEFAULT_ALGS[alg], 1);
    this.setState({ currentAlgTitle: alg });
    this.handleBuildCode();
  };

  handleEditorChange = () => {
    this.setState({ builded: false, playing: false });
  };

  setStep(i) {
    this.setState({
      currentStep: this.tracer.steps[i],
      currentStepIndex: i
    });
  }

  setSpeed(speed) {
    this.setState({ speed: speed });
  }

  next() {
    this.pause();
    if (this.state.currentStepIndex >= this.tracer.steps.length - 1)
      return false;
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
        <AlgsList
          currentAlgTitle={this.state.currentAlgTitle}
          handleSetAlg={this.handleSetAlg}
        />
        <ChartRender
          handleBuildCode={this.handleBuildCode}
          speed={this.state.speed}
          currentStepIndex={this.state.currentStepIndex}
          currentStep={this.state.currentStep}
          stepsCount={this.tracer.steps.length}
          setSpeed={this.setSpeed}
          setStep={this.setStep}
          resume={this.resume}
          pause={this.pause}
          prev={this.prev}
          playing={this.state.playing}
          builded={this.state.builded}
        />
        <InputData handleEditorChange={this.handleEditorChange} />
      </div>
    );
  }
}

export default App;
