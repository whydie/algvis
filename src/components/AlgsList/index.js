import React from "react";
import "./AlgsList.scss";

class AlgsList extends React.Component {
  constructor(props) {
    super(props);

    this.algs = {
      "Bubble Sort": null,
      "Insertion Sort": null,
      "Quick Sort": null
    };
  }

  shouldComponentUpdate(nextProps) {
    // TODO: add current alg
    return this.props.changeAlg !== nextProps.changeAlg;
  }

  render() {
    const algsList = Object.keys(this.algs).map(item => (
      <li
        key={item}
        onClick={() => this.props.changeAlg(item)}
        className="algs-list__item"
      >
        {item}
      </li>
    ));

    return <ul className="algs-list">{algsList}</ul>;
  }
}

export default AlgsList;
