import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { trashAllLinear, trashAllAngular } from "../../../actions/shared";

//Reset Soundloop to a blank slate

class ResetButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          className="tone-add plus-icon"
          onClick={
            this.props.mode === "angular"
              ? () => this.props.dispatch(trashAllAngular())
              : () => this.props.dispatch(trashAllLinear())
          }
        >
          <FontAwesomeIcon className="inl-blk fa-lg" icon={faRedoAlt} />
          <h3 style={{ marginLeft: "1rem" }} className="inl-blk light  ">
            RESET
          </h3>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.shared.mode
  };
}

export default connect(mapStateToProps)(ResetButton);
