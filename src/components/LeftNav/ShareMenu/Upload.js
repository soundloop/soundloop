import Dropzone from "react-dropzone";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { importFile } from "../../../actions/shared";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onDrop = this.onDrop.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  //code below is from React Dropzone docs
  //https://github.com/react-dropzone/react-dropzone

  onDrop(acceptedFiles) {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      var importedLoop = JSON.parse(binaryStr);
      this.props.dispatch(importFile(importedLoop));
    };

    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
    this.handleClose();
  }

  render() {
    return (
      <React.Fragment>
        <div className="tone-add" onClick={this.handleClickOpen}>
          <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="no-dec">
                <input {...getInputProps()} />
                <FontAwesomeIcon
                  className="plus-icon inl-blk fa-lg"
                  icon={faPlusCircle}
                />

                <h3 className="light inl-blk">IMPORT</h3>
              </div>
            )}
          </Dropzone>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(Upload);
