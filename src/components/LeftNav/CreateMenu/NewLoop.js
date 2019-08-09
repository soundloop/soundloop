import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { activateLoop } from "../../../actions/loops";

class NewLoop extends React.Component {
  handleClick = () => {
    // if loopCount is less than length of loops
    if (this.props.loopCount < this.props.loops.length) {
      this.props.dispatch(activateLoop(this.props.loopCount));
    }
  };
  render() {
    return (
      <React.Fragment>
        <br />

        <div className="tone-add" onClick={this.handleClick}>
          <FontAwesomeIcon
            className="plus-icon inl-blk fa-lg"
            icon={faPlusCircle}
          />

          <h3 className="light inl-blk">ADD LOOP</h3>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loops: state.loops,
    loopCount: state.shared.loopCount
  };
}

export default connect(mapStateToProps)(NewLoop);
