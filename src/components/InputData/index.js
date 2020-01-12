import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import "./InputData.scss";

class InputData extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.playing !== nextProps.playing ||
      this.props.building !== nextProps.building ||
      this.props.currentStepIndex !== nextProps.currentStepIndex ||
      this.props.speed !== nextProps.speed
    );
  }

  render() {
    return (
      <div className="input-data">
        <button
          disabled={this.props.building}
          onClick={() => this.props.handleBuildCode(this.refs.ace)}
        >
          {"Build"}
        </button>
        <button
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

        <AceEditor
          ref="ace"
          placeholder="Write your code here"
          mode="javascript"
          theme="terminal"
          name="blah2"
          value="let N = D.length;
          let swapped;
            do {
              swapped = false;
              // visualize {
              tracer.select(N - 1);
              tracer.delay(D);
              // }
              for (let i = 1; i < N; i++) {
              // visualize {
              tracer.select(i);
              tracer.delay(D);
              // }
                if (D[i - 1] > D[i]) {
                  const temp = D[i - 1];
                  D[i - 1] = D[i];
                  D[i] = temp;
                  swapped = true;
                  // visualize {
                  tracer.patch(i - 1, D[i - 1]);
                  tracer.patch(i, D[i]);
                  tracer.delay(D);
                  tracer.depatch(i - 1);
                  tracer.depatch(i);
                  // }
                }
              // visualize {
              tracer.deselect(i);
              // }
              }
              // visualize {
              tracer.deselect(N - 1);
              // }
              N--;
           } while (swapped);"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </div>
    );
  }
}

export default InputData;
