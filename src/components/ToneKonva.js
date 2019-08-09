import React from "react";
import "../styles/index.css";
import { Circle } from "react-konva";
import { connect } from "react-redux";
import Konva from "konva";
import { updateLoop } from "../actions/loops";
import { playTone } from "../actions/cord";
import { updateTone, replaceTone } from "../actions/tones";

/*
ToneKonva - Each tone on the loop is instantiated on load with no color and sound

The ToneKonva class consists of a Konva Circle that passes sounds to the cord to be played
Each ToneKonva component handles its own timing, rotation, repositioning, and deleting
*/

class ToneKonva extends React.Component {
  constructor(props) {
    super(props);

    this.cx = this.props.center.x;
    this.cy = this.props.center.y;
    // angular speed measured in degrees/ms
    this.angularSpeed = 0;

    // because frame.time does not reset on tempo changes, trueTime is used to keep track
    this.trueTime = 0;
    // lastTrueTime is used at check for tempo change
    this.lastTrueTime = 0;
    // lastTime is subtracted from frame.time to give trueTime
    this.lastTime = 0;

    this.getAngle = this.getAngle.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.snap = this.snap.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
    this.findTrueOffset = this.findTrueOffset.bind(this);
  }

  // uses radius of attachedLoop, x, y, and offset to find the angle of the ToneKonva component from center
  getAngle() {
    var radius = this.props.loops[this.props.attachedLoop].radius;
    var x1 = this.props.x - this.props.offset.x;
    var x2 = this.props.x;
    var y1 = (this.props.y + this.props.offset.y);
    var y2 = (this.props.y + radius);

    var cos = (2 * (radius * radius) -
    Math.abs((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) /
    (2 * (radius * radius))

    // there are some instances where tones at at 0, 90, 180, 270 degree points on the loop
    // gave undefined results from the acos() calculation because float values made result > 1 or < -1 by small amounts
    // this check corrects those by setting any values > 1 to 1 and any values < -1 to 1
    if (cos < -1){
      cos = -1;
    } else if (cos > 1) {
      cos = 1;
    }

    // calculate angle in radians
    var rad = Math.acos(cos);
    // convert to degrees
    var deg = rad * (180 / Math.PI);

    if (this.props.offset.x > 0) {
      return 360 - deg;
    } else return deg;
  }

  componentDidMount() {
    // get angularSpeed from attachedLoop
    this.angularSpeed=this.props.loops[this.props.attachedLoop].speed

    // get angle
    this.angle = this.getAngle();

    // using angle and angularSpeed, calculate the frame.time in milliseconds of when the tone should play
    this.timerInit = ((360 - (this.angle % 360)) / this.angularSpeed) * 1000;
    // using angularSpeed calculate the time it takes to complete a single full loop
    this.timerLoop = (360 / this.angularSpeed) * 1000;

    // create animation
    this.anim = new Konva.Animation(frame => {
      // using angularSpeed, calculate angle displacement for the current frame.timeDiff
      var angleDiff = (frame.timeDiff * this.angularSpeed) / 1000;

      // rotate by angleDiff
      this.circle.rotate(angleDiff);

      // trueTime
      this.trueTime = frame.time - this.lastTime;

      // checks for when tone should play
      // if trueTime is within 10 ms range of timerInit and sound is not null
      // (this check is just for the initial rotation around the loop)
      if (
        this.timerInit - 10 < this.trueTime &&
        this.trueTime < this.timerInit + 10 &&
        this.props.sound !== null
      ) {
        // dispatch playTone() to store with relevant information for cord to play sound
        this.props.dispatch(playTone(this.props.sound, this.props.duration));
      // else if trueTime % timerLoop is within 20 ms range of timerInit and sound is not null
      // (this check is for all subsequent rotations around the loop)
      } else if (
        this.trueTime % this.timerLoop < this.timerInit + 20 &&
        this.trueTime % this.timerLoop > this.timerInit - 20 &&
        this.props.sound !== null
      ) {
        // dispatch playTone() to store with relevant information for cord to play sound
        this.props.dispatch(playTone(this.props.sound, this.props.duration));
      }
    }, this.circle.getLayer());

  }

  componentDidUpdate(prevProps) {
    // on delete, (when previous color != current color and current sound == null), 
    // move circle back to original position and offset, keeping rotation
    if (prevProps.color !== this.props.color && this.props.sound === null) {
      this.circle.x(this.props.x);
      this.circle.y(this.props.y);
      this.circle.offset({ x: this.props.offset.x, y: this.props.offset.y });
    }

    // if speed of attachedLoop changes
    if (prevProps.loops[this.props.attachedLoop].speed !== this.props.loops[this.props.attachedLoop].speed) {
      // do not change lastTime unless the lastTrueTime != trueTime
      // this prevents compounding the lastTime value when changing tempo multiple times while paused
      if (this.lastTrueTime !== this.trueTime) {
        this.lastTime += this.trueTime;
        this.lastTrueTime = this.trueTime;
      }

      this.angle = this.getAngle();
      // calculate the angle by adding the original angle and rotation that has happened from that angle
      // this is necessary because getAngle() always returns the original angle 
      // (since x and y position of the Konva Circle do not technically change on rotation)
      var newAngle = (this.angle + this.circle.rotation()) % 360
      this.angle = newAngle;
      this.angularSpeed = this.props.loops[this.props.attachedLoop].speed;

      // recalculate timerInit and timerLoop value given the new angle and modified angularSpeed
      this.timerInit = ((360 - (this.angle % 360)) / this.angularSpeed) * 1000;
      this.timerLoop = (360 / this.angularSpeed) * 1000;
    }

    if (prevProps.playing !== this.props.playing) {
      // on play
      if (this.props.playing) {
        // start animation
        this.anim.start();
      } else {
        // else pause
        this.anim.isRunning() && this.anim.stop(); 
        // on pause, update the rotation value of the loop in the store
        // !!! this is definitely not optimal, since every single ToneKonva is updating their respective loops in the store
        // the reason for this is snap in ToneKonva and ToneButton need to know the angle of the closest loop to work properly 
        // once rotation has changed from the initial position
        this.props.dispatch(
          updateLoop(this.props.attachedLoop, this.circle.rotation())
        );
      }
    }
  }

  // iterate through loops array and compare radii to find the closest loop
  findClosestLoop(distToCenter) {
    var acceptableRange = 50;
    var loopArray = this.props.loops;
    var id = 0;
    var curr = loopArray[id].radius;
    var diff = Math.abs(distToCenter - curr);

    for (var i = 0; i < loopArray.length; i++) {
      if (loopArray[i].active) {
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
    var originalAngle = Math.atan2(y1, x1);
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

    if (loopToSnap) {
      var angle = this.props.loops[loopToSnap.index].rotation;
      var trueCoords = this.findTrueCoordinates(b, a, angle, distToCenter);
      var closestTone = this.findClosestTone(
        trueCoords.x,
        trueCoords.y,
        loopToSnap.index
      );
      // if paused, dispatch updateTone() on closest tone
      if (!this.props.playing) {
        this.props.dispatch(
          updateTone(
            closestTone,
            this.props.color,
            this.props.sound,
            this.props.radius,
            this.props.duration
          )
        );
      }
    }
  }

  handleDragStart() {
    if (this.props.playing === false) {
      // move current tone above all of the others
      this.circle.zIndex(this.props.tones.length);
      // for all tones, if sound null make them visible on drag
      var radius = this.props.screenHeight / 350;
      for (var i = 0; i < this.props.tones.length; i++) {
        if (
          this.props.tones[i].sound === null &&
          this.props.loops[this.props.tones[i].attachedLoop].active === true
        ) {
          this.props.dispatch(updateTone(i, "#692D55", null, radius));
        }
      }
    }
  }

  // because x and y offsets of each ToneKonva component do not change on rotation,
  // this function finds the true offset of the ToneKonva component 
  // in relation to their absolute position on the canvas
  findTrueOffset(offX, offY, angle) {
    var originalAngle = Math.atan2(offX, offY);
    var angleRad = angle * (Math.PI / 180);
    var newAngle = originalAngle - angleRad;
    var dist = Math.sqrt(offX * offX + offY * offY);
    const offX2 = Math.sin(newAngle) * dist;
    const offY2 = Math.cos(newAngle) * dist;
    return { x: offX2, y: offY2 };
  }

  handleDragEnd() {
    var loopRotation = this.props.loops[this.props.attachedLoop].rotation;
    var circX = this.circle.x();
    var circY = this.circle.y();
    var offsetX = this.circle.offsetX();
    var offsetY = this.circle.offsetY();
    var trueOff = this.findTrueOffset(offsetX, offsetY, this.circle.rotation());

    // new x and y are coord at original
    var newX = circX - trueOff.x;
    var newY = circY - trueOff.y;

    this.snap(newX, newY);
    // make the tones transparent on drag end
    for (var i = 0; i < this.props.tones.length; i++) {
      if (
        this.props.tones[i].sound === null &&
        this.props.loops[this.props.tones[i].attachedLoop].active === true
      ) {
        this.props.dispatch(updateTone(i, "transparent", null, 1.5));
      }
    }

    // delete tone 
    this.props.dispatch(
      replaceTone(
        this.props.id,
        this.cx,
        this.cy,
        "transparent",
        "#fff",
        1.5,
        this.props.offset.x,
        this.props.offset.y,
        this.props.attachedLoop,
        this.props.screenHeight / 50,
        null,
        loopRotation
      )
    );
  }

  render() {
    var color = "transparent";
    if (this.props.loops[this.props.attachedLoop].active === true) {
      color = this.props.color;
    }
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        fill={color}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        radius={this.props.radius}
        offset={this.props.offset}
        ref={node => {
          this.circle = node;
        }}
        draggable={true}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    playing: state.shared.playing,
    loops: state.loops,
    rot: state.shared.rotation,
    tones: state.tones,
    center: state.shared.center,
    mode: state.shared.mode,
    screenHeight: state.shared.screenHeight,
    tempo: state.shared.tempo
  };
}

export default connect(mapStateToProps)(ToneKonva);
