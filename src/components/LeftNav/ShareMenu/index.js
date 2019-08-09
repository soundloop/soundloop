import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { updateFilename } from "../../../actions/shared";
import Download from "./Download";
import Upload from "./Upload";

//styles for project name
const ProjectField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#692D54"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#692D54"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#692D54"
      }
    }
  }
})(TextField);

class ShareMenuUnconnected extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.dispatch(updateFilename(event.target.value));
  }
  render() {
    return (
      <React.Fragment>
        <ProjectField
          id="standard-name"
          label="Project Name"
          defaultValue={this.props.name}
          value={this.props.name}
          onChange={this.handleChange}
          margin="normal"
        />
        <Download name={this.props.name} />
        <Upload />
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

export default connect(mapStateToProps)(ShareMenuUnconnected);
