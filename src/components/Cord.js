import React from "react";
import "../styles/index.css";
import { Line, Layer, Circle } from "react-konva";
import { connect } from "react-redux";
import Konva from "konva";
import Tone from "tone";

/*
CORD - The cord is the line from the center of the loop to the top of the window that plays sounds on tone hits

The Cord class contains a melodyPlayer, a PolySynth from tone.js that plays sounds on triggerAttackRelease()
It also contains a Konva Tween animation that animates between two states: 
  1. The inactive state. The cord is straight at a 90 degree angle
  2. The active state on tone hits. The cord is "plucked" in the direction of tone rotation
*/

class Cord extends React.Component {
  constructor(props){
    super(props)
    
    // initialize values for the cord drawing
    // this.max is the highest point of the cord on the page
    this.pts = [];
    
    this.max = this.props.height / 2 - 75;
    this.numIntervals = 2;
    this.interval = this.max / this.numIntervals;
    this.flux = 8;
  }

  componentDidMount() {
    // melodyPlayer construction and settings
    this.melodyPlayer = new Tone.PolySynth(3, Tone.SimpleSynth)
      .set({
        volume: 0,
        oscillator: {
          type: "triangle"
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.2,
          release: 1.7
        }
      })
      .toMaster();
    this.melodyPlayer.stealVoices = false;
    

    var x = this.props.center.x;
    var y = this.props.center.y;
    // for loop that adds point coordinates to this.pts, which is used in this.tween for the animation
    // originally, the cord had more than one point where x changed, which is why the for loop, this.flux, and this.numIntervals exists
    // to add more granularity to the cord animation (ex. "pluck" at specific y coordinate of tone or add more oscillation), increase numIntervals
    for (var i = 0; i < this.numIntervals + 1; i++) {
      this.pts.push(x);
      this.pts.push(y);
      x = x + this.flux;
      y = y - this.interval;
      this.flux = -this.flux;
    }
  }

  componentDidUpdate(prevProps) {
    // if window height changes, then recalculate the set of points for this.tween
    if (prevProps.height !== this.props.height){
      // reset pts to empty array
      this.pts = [];
      // recalculate max and interval based on current window height
      this.max = this.props.height / 2 - 75;
      this.interval = this.max / this.numIntervals;
      // reset this.x and this.y to center
      var x = this.props.center.x;
      var y = this.props.center.y;
      // add new point coordinates to this.pts
      for (var i = 0; i < this.numIntervals + 1; i++) {
        this.pts.push(x);
        this.pts.push(y);
        x = x + this.flux;
        y = y - this.interval;
        this.flux = -this.flux;
      }
    }

    // on play, create the Tween animation
    if (this.props.playing) {
      this.tween = new Konva.Tween({
        node: this.line,
        duration: 0.1,
        easing: Konva.Easings.EaseOut,
        points: this.pts,
        onFinish: function() {
          this.tween.reverse();
        }
      });
    }

    if (this.props.volume !== prevProps.volume) {
      Tone.Master.volume.value = this.props.volume;
    }

    // if this.props.sounds from state.shared is not empty and has changed
    if (
      this.props.sounds.length > 0 &&
      prevProps.sounds !== this.props.sounds
    ) {
      // if not muted
      if (!this.props.muted) {
        // play sound from length
        this.melodyPlayer.triggerAttackRelease(
          this.props.sounds[this.props.sounds.length - 1].sound,
          this.props.sounds[this.props.sounds.length - 1].duration,
          undefined,
          (Math.random() * 0.5 + 0.5) * 0.8
        );
      }
      
      // play Tween animation
      if (this.props.playing) {
        this.tween.play();
      }
    }
  }

  render() {
    // create points for inactive cord
    // unlike active cord, this cord has fixed x coordinates
    var inactivePts = [];
    this.max = this.props.height / 2 - 75;
    this.interval = this.max / this.numIntervals;
    var x = this.props.center.x;
    var y = this.props.center.y;
    for (var i = 0; i < this.numIntervals + 1; i++) {
      inactivePts.push(x);
      inactivePts.push(y);
      y = y - this.interval;
    }

    return (
      <Layer>
        <Line
          points={inactivePts}
          stroke="#692D55"
          strokeWidth={2}
          tension={0.5}
          ref={node => {
            this.line = node;
          }}
        />
        <Circle
          x={this.props.center.x}
          y={this.props.center.y - this.max}
          radius={4}
          fill="#692D55"
        />
        <Circle
          x={this.props.center.x}
          y={this.props.center.y}
          radius={11}
          fill="#692D55"
        />
      </Layer>
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.shared.center,
    playing: state.shared.playing,
    muted: state.shared.muted,
    sounds: state.cord.sounds,
    index: state.cord.index,
    height: state.shared.screenHeight,
    volume: state.shared.volume
  };
}

export default connect(mapStateToProps)(Cord);
