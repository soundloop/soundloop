import React from "react";
import UploadPopUp from "./UploadPopUp";
import { connect } from "react-redux";

class NewLoop extends React.Component {
  handleClick = () => {};
  render() {
    return (
      <React.Fragment>
        <div className="tone-add" onClick={this.handleClick}>
          <UploadPopUp />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loops: state.loops
  };
}

export default connect(mapStateToProps)(NewLoop);
