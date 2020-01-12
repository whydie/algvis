import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import "./InputData.scss";

class InputData extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.playing !== nextProps.playing ||
      this.props.building !== nextProps.building
    );
  }

  render() {
    return (
      <div className="input-data">
        <button
          disabled={this.props.building}
          onClick={() => this.props.handleBuildCode(this.refs.ace)}
        >
          Build
        </button>
        <button disabled={this.props.playing} onClick={this.props.resume}>
          Start
        </button>
        <button onClick={this.props.prev}>Prev</button>
        <AceEditor
          ref="ace"
          placeholder="Write your code here"
          mode="javascript"
          theme="terminal"
          name="blah2"
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
