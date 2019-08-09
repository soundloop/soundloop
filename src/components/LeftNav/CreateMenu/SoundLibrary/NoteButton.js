import React from "react";
import Draggable from "react-draggable"; // The default
import { connect } from "react-redux";
import { updateTone } from "../../../../actions/tones";
import { playTone } from "../../../../actions/cord";

/*
NoteButton - A button that contains all of the infomation needed to update ToneKonva components

The NoteButton class consists of a draggable button that updates nearby ToneKonva components on drag end
*/

class NoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
    this.state = {
      deltaPosition: {
        x: 0,
        y: 0
      },
      snapped: false
    };
    this.cx = this.props.center.x;
    this.cy = this.props.center.y;
    this.handleStop = this.handleStop.bind(this);
    this.snap = this.snap.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  // iterate through loops array and compare radii to find the closest loop
  findClosestLoop(distToCenter) {
    var acceptableRange = 50;
    var loopArray = this.props.loops;

    var id = 0;
    var curr = loopArray[id].radius;
    var diff = Math.abs(distToCenter - curr);

    for (var i = 0; i < loopArray.length; i++) {
      if (this.props.loops[i].active) {
        var newdiff = Math.abs(distToCenter - loopArray[i].radius);
        if (newdiff < diff) {
          diff = newdiff;
          curr = loopArray[i].radius;
          id = i;
        }
      }
    }

    if (diff < acceptableRange) {
      return { index: id, value: curr };
    } else {
      return null;
    }
  }

  // finds closest tone and returns the index in the tones list
  findClosestTone(a, b, loop) {
    var min = 100;
    var ret = 0;
    for (var i = 0; i < this.props.tones.length; i++) {
      if (this.props.tones[i].attachedLoop === loop) {
        var x = this.cx - this.props.tones[i].offset.x;
        var y = this.cy - this.props.tones[i].offset.y;
        var diffX = x - a;
        var diffY = y - b;
        var dist = Math.sqrt(diffX * diffX + diffY * diffY);
        if (dist < min) {
          min = dist;
          ret = this.props.tones[i].id;
        }
      }
    }
    return ret;
  }

  // because x and y positions of each ToneKonva component do not change on rotation,
  // this function translates the given x1 and y1 from the cursor to the absolute position
  // as if it has been rotated with the ToneKonva components
  findTrueCoordinates(x1, y1, angle, distance) {
    // the current angle from center
    var originalAngle = Math.atan2(y1, x1);
    // original angle in radians
    var angleRad = angle * (Math.PI / 180);
    var newAngle = originalAngle - angleRad;
    const x2 = this.cx + Math.cos(newAngle) * distance;
    const y2 = this.cy + Math.sin(newAngle) * distance;
    return { x: x2, y: y2 };
  }

  // handles all functions related to finding closest tone and updating it with current value
  snap(x1, y1) {
    var a = y1 - this.cy;
    var b = x1 - this.cx;
    var distToCenter = Math.sqrt(a * a + b * b);
    var loopToSnap = this.findClosestLoop(distToCenter);

    // there is a loop to snap to
    if (loopToSnap) {
      var angle = this.props.loops[loopToSnap.index].rotation;
      var trueCoords = this.findTrueCoordinates(b, a, angle, distToCenter);

      var closestTone = this.findClosestTone(
        trueCoords.x,
        trueCoords.y,
        loopToSnap.index
      );
      // dispatch updateTone() with relevant information
      this.props.dispatch(
        updateTone(
          closestTone,
          this.props.color,
          this.props.sound,
          this.props.toneSizes[this.props.selectedDuration],
          this.props.selectedDuration
        )
      );
    }
  }

  // on drag stop, get x and y location of cursor and snap
  // make all tones with null sound transparent
  handleStop() {
    if (this.props.playing === false) {
      this.rect = this.selector.current.getBoundingClientRect();
      const x = this.rect.left;
      const y = this.rect.top;

      this.snap(x, y);

      for (var i = 0; i < this.props.tones.length; i++) {
        if (
          this.props.tones[i].sound === null &&
          this.props.loops[this.props.tones[i].attachedLoop].active === true
        ) {
          this.props.dispatch(updateTone(i, "transparent", null, 1.5));
        }
      }
    }
  }

  // play sound of note on click
  handleClick() {
    if (!this.props.playing) {
      this.props.dispatch(
        playTone(this.props.sound, this.props.selectedDuration)
      );
    }
  }

  // on drag start, make all tones with null sound visible
  handleDrag() {
    var radius = this.props.screenHeight / 350;
    for (var i = 0; i < this.props.tones.length; i++) {
      if (
        this.props.tones[i].sound === null &&
        !this.props.playing &&
        this.props.loops[this.props.tones[i].attachedLoop].active === true
      ) {
        this.props.dispatch(updateTone(i, "#692D55", null, radius));
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="hover-shadow"
          style={{
            borderRadius: "100%",
            border: "2px solid",
            borderColor: this.props.color,
            backgroundColor: "transparent",
            width: "2rem",
            height: "2rem",
            position: "absolute",
            outline: "none",
            pointerEvents: "none"
          }}
        />
        <Draggable
          position={this.state.deltaPosition}
          onStop={this.handleStop}
          onStart={this.handleDrag}
        >
          <div
            ref={this.selector}
            className="hover-shadow"
            onClick={this.handleClick}
            style={{
              borderRadius: "100%",
              backgroundColor: this.props.color,
              width: "2rem",
              zIndex: 1,
              height: "2rem",

              border: "none",
              outline: "none"
            }}
          >
            <div
              className="note-select"
              style={{ color: this.props.textColor }}
            >
              {this.props.note}
            </div>
          </div>
        </Draggable>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loops: state.loops,
    tones: state.tones,
    playing: state.shared.playing,
    center: state.shared.center,
    screenHeight: state.shared.screenHeight,
    selectedDuration: state.shared.selectedDuration,
    toneSizes: state.shared.toneSizes
  };
}

//

export default connect(mapStateToProps)(NoteButton);
