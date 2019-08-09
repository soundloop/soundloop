import React from "react";
import { connect } from "react-redux";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  toggleMode,
  trashAllLinear,
  trashAllAngular
} from "../../../actions/shared";

class ToggleMode extends React.Component {
  //switch to Angular or Linear Mode on button click
  handleClick = (event, newVal) => {
    if (newVal !== null && !this.props.playing) {
      if (newVal !== this.props.mode) {
        if (newVal === "angular") {
          this.props.dispatch(toggleMode(newVal));
          this.props.dispatch(trashAllAngular());
        } else {
          this.props.dispatch(toggleMode(newVal));
          this.props.dispatch(trashAllLinear());
        }
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <br />
        <ToggleButtonGroup
          value={this.props.mode}
          exclusive
          onChange={this.handleClick}
        >
          <ToggleButton value="linear">Linear</ToggleButton>
          <ToggleButton value="angular">Angular</ToggleButton>
        </ToggleButtonGroup>
        <h3 className="light inl-blk desc">
          Switching modes will reset your SoundLoop!{" "}
        </h3>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.shared.mode,
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(ToggleMode);
