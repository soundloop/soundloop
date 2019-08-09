import React from "react";
import { connect } from "react-redux";
import { updateDuration } from "../../../../actions/shared";
const LibListStyle = {
  textAlign: "left",
  margin: 0,
  zIndex: 1,
  padding: 0,
  position: "relative"
};

const LibListItemStyle = {
  display: "inline-block",
  verticalAlign: "top",
  padding: ".25rem"
};

//A single button describing a single duration option
class DurationButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.dispatch(updateDuration(this.props.duration));
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        style={{
          borderRadius: "100%",
          border: "none",
          backgroundColor:
            //if not selected, render a lighter purple
            this.props.duration === this.props.selectedDuration
              ? "#692d54"
              : "#c4b2be",
          // get the radius of the tones from store, and * 2 to get width/height
          width: this.props.toneSizes[this.props.duration] * 2 + "px",
          height: this.props.toneSizes[this.props.duration] * 2 + "px",
          position: "relative",
          marginTop: 50 - this.props.toneSizes[this.props.duration] - 30 + "px",
          outline: "none"
        }}
      >
        <div className="sustain-select">{this.props.text}</div>
      </button>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedDuration: state.shared.selectedDuration,
    toneSizes: state.shared.toneSizes
  };
}

const ConnectedDurationButton = connect(mapStateToProps)(DurationButton);

export default class DurationMenu extends React.Component {
  render() {
    var durToPass = ["32n", "16n", "8n", "4n", "2n", "1m", "2m"];
    var durToShow = ["", "16", "1/8", "1/4", "1/2", "1"];

    return (
      <React.Fragment>
        <h3 className="light inl-blk"> DURATION</h3>
        <ul style={LibListStyle}>
          {/* render each duration option with custom text.
          pass text & duration value to each button.  */}
          {durToShow.map((item, i) => (
            <li style={LibListItemStyle} key={item.color}>
              <ConnectedDurationButton text={item} duration={durToPass[i]} />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
