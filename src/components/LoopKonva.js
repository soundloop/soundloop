import React from "react";
import { Circle } from "react-konva";
import { connect } from "react-redux";
import { addTone } from "../actions/tones";
import { throwStatement } from "@babel/types";
import { updateLoopSpeed } from "../actions/loops";

/*
LoopKonva - Loops are the circles which tones attach to

The LoopKonva class consists of a Konva Circle that has its own rotation and speed
*/

class LoopKonva extends React.Component {
  constructor(props) {
    super(props);

    this.numTones = 0;
  }

  // calculate the absolute coordinates for each tone on the loop that is being dispatched
  findAngleCoord(cx, cy, angle, distance) {
    const x2 = cx - Math.cos(angle) * distance;
    const y2 = cy + Math.sin(angle) * distance;
    return { x: x2, y: y2 };
  }

  componentDidMount() {
    // updateLoopSpeed on mount based on tempo in state.shared
    this.props.dispatch(updateLoopSpeed(this.props.id, this.calcTempo()));

    if (this.props.mode === "angular") {
      if (this.props.id < 2) {
        this.numTones = 16;
      } else {
        this.numTones = 16;
      }
    } else if (this.props.mode === "linear") {
      this.numTones = Math.pow(2, 5 - this.props.id);
    }
    var interval = (2 * Math.PI) / this.numTones;
    var currAngle = 0;

    // dispatch addTone() based on the number of 
    for (var i = 0; i < this.numTones; i++) {
      var coords = this.findAngleCoord(
        this.props.center.x,
        this.props.center.y,
        currAngle,
        this.props.radius
      );

      this.props.dispatch(
        addTone(
          "transparent",
          "#fff",
          1.5,
          coords.x - this.props.center.x,
          coords.y - this.props.center.y,
          this.props.id,
          this.props.screenHeight / 50,
          null,
          0
        )
      );
      currAngle = currAngle + interval;
    }
  }

  // translate tempo in BPM to angular speed
  calcTempo() {
    var baseTempo = this.props.tempo;
    if (this.props.mode === "linear") {
      var multiplier = window.innerHeight / 3 / this.props.radius;
      this.tempo = ((baseTempo * 2) / 60) * multiplier;
    } else if (this.props.mode === "angular") {
      this.tempo = (baseTempo * 2) / 60;
    }
    var toneRatio = this.tempo / 16;
    var loopRatio = toneRatio * 360;
    return loopRatio;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tempo !== this.props.tempo) {
      this.props.dispatch(updateLoopSpeed(this.props.id, this.calcTempo()));
    }
  }

  render() {
    return (
      <Circle
        x={this.props.center.x}
        y={this.props.center.y}
        radius={this.props.radius}
        fill={"transparent"}
        stroke={this.props.stroke}
        strokeWidth={1.5}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.shared.center,
    shared: state.shared,
    mode: state.shared.mode,
    screenHeight: state.shared.screenHeight,
    tempo: state.shared.tempo
  };
}

export default connect(mapStateToProps)(LoopKonva);
