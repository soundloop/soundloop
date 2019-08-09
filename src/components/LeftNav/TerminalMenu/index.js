import React from "react";
import TextField from "@material-ui/core/TextField";

export default class TerminalMenu extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3> Welcome to the terminal.</h3>
        <p> This feature is still in development. Check back soon! </p>
        <TextField
          id="outlined-multiline-static"
          multiline
          label="Terminal"
          rows="20"
          defaultValue="Default Value"
          margin="normal"
          variant="filled"
        />
      </React.Fragment>
    );
  }
}
