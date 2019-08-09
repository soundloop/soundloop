import React from "react";
import { connect } from "react-redux";
import OctaveSlider from "./SoundLibrary/OctaveSlider";
import DurationSelector from "./SoundLibrary/DurationSelector";
import styles from "../LeftNav.module.css";
import NoteButton from "./SoundLibrary/NoteButton";
import {
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  yellow,
  amber,
  orange,
  deepOrange
} from "@material-ui/core/colors/";

//Colors of each note are imported from MaterialUI colors
//For example, colorHues[0] = red, which is a dictionary of red color hex values.
//The dictionary has keys 100,200,300 .. 900.
//100 would be a light red, 900 a dark red.
//https://material-ui.com/customization/color/

//import 12 color dicts to map to each note
const colorHues = [
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  yellow,
  amber,
  orange,
  deepOrange
];

//create a list lookup to find text color values to contrast the note's color.
//arranged by octave: 1 - 7 with 0 placeholder
const textLookup = [0, 600, 800, 800, 800, 200, 100, 50];

class SoundLibrary extends React.Component {
  constructor(props) {
    super(props);
    //a list of the colors to render for one specific octave
    this.buttons = [];

    // a list with each element being a list of colors for a specific octave
    this.buttonList = [];

    //Chromatic Scale
    this.sounds = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B"
    ];
    //Octave Options
    this.octaves = [1, 2, 3, 4, 5, 6, 7];

    //for each octave
    for (let j = 0; j < this.octaves.length; j++) {
      //get a color for each sound and push it to a list
      for (let i = 0; i < colorHues.length; i++) {
        this.buttons.push({
          color: colorHues[i][this.octaves[j] * 100],
          sound: this.sounds[i] + this.octaves[j],
          note: this.sounds[i],
          textColor: colorHues[i][textLookup[this.octaves[j]]]
        });
      }

      //if j = 0, i = 1
      // color: red[100]
      // sound: C1 (note C in 1st octave)
      // note: C
      // textColor: red[600]

      this.buttonList.push(this.buttons);

      //reset button list for next j loop
      this.buttons = [];
    }
    //on initial load, let octave be 4
    //store these colors to change on octave selection.
    this.state = { octave: 4, tones: this.buttonList, noteSelected: false };
    this.handleOctave = this.handleOctave.bind(this);
  }

  handleOctave(event, newValue) {
    this.setState({ octave: newValue });
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="light inl-blk"> NOTES</h3>
        <ul className={styles.LibListStyle}>
          {/* go through each note in list and render 
          its color and other properties to UI*/}
          {this.state.tones[this.state.octave - 1].map(item => (
            <li className={styles.LibListItemStyle} key={item.color}>
              <NoteButton
                color={item.color}
                sound={item.sound}
                note={item.note}
                textColor={item.textColor}
              />
            </li>
          ))}
        </ul>
        <br />
        {/* slider for changing octave and color of notes */}
        <OctaveSlider changeFunction={this.handleOctave} />

        <DurationSelector />
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

export default connect(mapStateToProps)(SoundLibrary);
