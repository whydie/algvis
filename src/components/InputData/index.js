import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "./InputData.scss";

class InputData extends React.Component {
  shouldComponentUpdate(nextProps) {
    return false;
  }

  render() {
    return (
      <div className="input-data">
        <AceEditor
          ref={el => window.AceEditor = el}
          placeholder="Write your code here"
          mode="javascript"
          theme="twilight"
          name="blah2"
          fontSize={14}
          width="100%"
          height="100vh"
          onChange={this.props.handleEditorChange}
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
