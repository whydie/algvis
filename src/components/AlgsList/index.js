import React from "react";
import { DEFAULT_ALGS } from "common/settings";
import "./AlgsList.scss";

class AlgsList extends React.Component {
  constructor(props) {
    super(props);

    this.algs = DEFAULT_ALGS;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.currentAlgTitle !== nextProps.currentAlgTitle;
  }

  render() {
    const algsList = Object.keys(this.algs).map(item => (
      <li
        key={item}
        onClick={() => this.props.handleSetAlg(item)}
        className={
          item === this.props.currentAlgTitle
            ? "algs-list__item algs-list__item_active"
            : "algs-list__item"
        }
      >
        {item}
      </li>
    ));

    return (
      <section className="algs">
        <ul className="algs-list">{algsList}</ul>
      </section>
    );
  }
}

export default AlgsList;
