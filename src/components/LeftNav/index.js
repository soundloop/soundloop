import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTerminal,
  faGlobeAmericas
} from "@fortawesome/free-solid-svg-icons";
import CreateMenu from "./CreateMenu";
import ShareMenu from "./ShareMenu";
import TerminalMenu from "./TerminalMenu";
import styles from "./LeftNav.module.css";
import "../../styles/index.css";

/* PRIMARY NAVIGATION EXPORT

This file determines which primary menu to toggle on, 
and handles the purple sidebar navigation.

It also renders the logo on each menu.

*/

const MenuItemStyle = {
  display: "block",
  margin: "0 auto",
  color: "#ab8fa2",
  paddingBottom: "2rem"
};
const MenuItemStyleActive = {
  display: "block",
  margin: " 0 auto",
  color: "#e6e6e6",
  paddingBottom: "2rem"
};

export default class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: "createMenu"
    };
    this.handleShare = this.handleShare.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleTerminal = this.handleTerminal.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  handleShare() {
    this.setState({ showing: "shareMenu" });
  }
  handleTerminal() {
    this.setState({ showing: "terminalMenu" });
  }
  handleCreate() {
    this.setState({ showing: "createMenu" });
  }

  //Show correct Menu depending on user selection
  showMenu() {
    switch (this.state.showing) {
      case "createMenu":
        return <CreateMenu />;
      case "shareMenu":
        return <ShareMenu />;
      case "terminalMenu":
        return <TerminalMenu />;
      default:
        return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.LeftNavStyle}>
          <div className={styles.LeftNavMenu}>
            {/* render the icons in left sidebar, pass in a highlighted 
            style if the icon is selected. */}
            <FontAwesomeIcon
              className="inl-blk fa-2x menu-item"
              style={
                this.state.showing === "createMenu"
                  ? MenuItemStyleActive
                  : MenuItemStyle
              }
              icon={faPlusCircle}
              onClick={() => this.handleCreate()}
            />
            <FontAwesomeIcon
              className="inl-blk fa-lg  menu-item"
              style={
                this.state.showing === "terminalMenu"
                  ? MenuItemStyleActive
                  : MenuItemStyle
              }
              icon={faTerminal}
              onClick={() => this.handleTerminal()}
            />
            <FontAwesomeIcon
              className="inl-blk fa-2x  menu-item"
              style={
                this.state.showing === "shareMenu"
                  ? MenuItemStyleActive
                  : MenuItemStyle
              }
              icon={faGlobeAmericas}
              onClick={() => this.handleShare()}
            />
          </div>
        </div>

        {/* render the correct menu with logo at top */}
        <div className={styles.CardStyle}>
          <div className={styles.contentContainer}>
            <img
              alt="logo"
              src={require("../../Logo.png")}
              style={{
                width: "7.5rem",
                margin: "0",
                display: "block",
                paddingBottom: "1.75rem"
              }}
            />

            <span className="logo-spacer" />

            <div>{this.showMenu()}</div>
            <div />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
