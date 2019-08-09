import React from "react";
import { connect } from "react-redux";
import { updateTempo } from "../../../actions/shared";
import SoundLibrary from "./SoundLibrary";
import NewLoop from "./NewLoop";
import ToggleMode from "./ToggleMode";
import ResetButton from "./ResetButton";

class CreateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleTempoChange = this.handleTempoChange.bind(this);
  }

  handleTempoChange(event, newValue) {
    this.props.dispatch(updateTempo(newValue));
  }

  render() {
    return (
      <React.Fragment>
        <SoundLibrary />
        <hr />
        <NewLoop />
        <ToggleMode />
        <ResetButton />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.shared.fileName,
    tempo: state.shared.tempo,
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(CreateMenu);
