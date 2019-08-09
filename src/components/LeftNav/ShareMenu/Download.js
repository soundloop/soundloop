import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

//Take the store as a Json file and download it.
//Appends an invisible element with the JSON data, automatically clicks it to download
class Download extends React.Component {
  downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.props.data)], {
      type: "json"
    });
    element.href = URL.createObjectURL(file);
    element.download = this.props.name + ".json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  render() {
    return (
      <React.Fragment>
        <div className="tone-add" onClick={() => this.downloadFile()}>
          <FontAwesomeIcon
            className="plus-icon inl-blk fa-lg"
            icon={faArrowCircleDown}
          />
          <h3 className="light inl-blk">SAVE</h3>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state
  };
}

export default connect(mapStateToProps)(Download);
