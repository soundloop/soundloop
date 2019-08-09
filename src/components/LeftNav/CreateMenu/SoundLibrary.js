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
const textLookup = [0, 600, 800, 800, 800, 200, 100, 50];

class SoundLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = [];
    this.buttonList = [];
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
    this.octaves = [1, 2, 3, 4, 5, 6, 7];
    for (let j = 0; j < this.octaves.length; j++) {
      for (let i = 0; i < colorHues.length; i++) {
        this.buttons.push({
          color: colorHues[i][this.octaves[j] * 100],
          sound: this.sounds[i] + this.octaves[j],
          note: this.sounds[i],
          textColor: colorHues[i][textLookup[this.octaves[j]]]
        });
      }

      this.buttonList.push(this.buttons);
      this.buttons = [];
    }
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
