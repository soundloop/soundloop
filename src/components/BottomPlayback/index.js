import React from "react";
import "../../styles/index.css";
import PlayButton from "./PlayButton";
import VolumeOptions from "./VolumeOptions";
import TempoSlider from "./TempoSlider";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";

const NavStyleOuter = {
  position: "absolute",
  top: "auto",
  bottom: "2.5vh",
  height: "5rem",
  zIndex: 0,
  width: "100vw"
};

const ToolbarStyle = {
  top: "50%"
};

/* 
Renders the bottom playback container and its relevant features
*/
class BottomPlayback extends React.Component {
  render() {
    return (
      <div style={NavStyleOuter}>
        <div
          style={{
            width: "50vw",
            margin: `0 ${this.props.center - window.innerWidth / 4}px`,
            backgroundColor: "#fff",
            borderRadius: "100px",
            boxShadow:
              "0 20px 10px rgba(0,0,0,0.01), 0 6px 6px rgba(0,0,0,0.05)"
          }}
        >
          <Toolbar style={ToolbarStyle}>
            <PlayButton />
            <TempoSlider />
            <VolumeOptions />
          </Toolbar>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.shared.center.x
  };
}

export default connect(mapStateToProps)(BottomPlayback);
