import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const SliderStyle = withStyles({
  root: {
    color: "#692D54",
    height: 2
  },
  thumb: {
    height: 28,
    width: 28,

    marginTop: -14,
    marginLeft: -14,
    "&:focus,&:hover,&$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.01),0 2px 4px rgba(0,0,0,0.1),0 0 0 1px rgba(0,0,0,0.001)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {}
    }
  },
  active: {},
  track: {
    height: 3,
    borderRadius: 4
  },
  mark: {
    height: 7,
    width: 2,
    marginTop: -2
  },
  markActive: {
    backgroundColor: "currentColor"
  },
  rail: {
    height: 3,
    borderRadius: 4
  },

  valueLabel: {
    left: "calc(-50% + 11px)",
    top: 8,

    "& *": {
      background: "transparent",
      color: "#fff"
    }
  }
})(Slider);

export default class OctaveSlider extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3 className="light inl-blk"> OCTAVE</h3>
        <SliderStyle
          onChange={this.props.changeFunction}
          defaultValue={4}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={1}
          max={7}
        />
      </React.Fragment>
    );
  }
}
