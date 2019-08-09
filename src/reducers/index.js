import loops from "./loops";
import tones from "./tones";
import shared from "./shared";
import cord from "./cord";
import file from "./file";
import { combineReducers } from "redux";

//  The index reducer combines all of the other reducers to form our store.
//  We pass it into a higher-order function, appReducer,
//  so that we can overwrite the overall state on file import.

const appReducer = combineReducers({
  loops,
  tones,
  cord,
  shared,
  file
});

export default function(state, action) {
  if (action.type === "IMPORT_FILE") {
    state.tones = action.data.tones;
    state.loops = action.data.loops;
    state.shared = {
      playing: false,
      center: {
        x: 380 + (window.innerWidth - 380) / 2,
        y: window.innerHeight / 2
      },
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      loopCount: 1,
      muted: false,
      mode: action.data.shared.mode,
      selectedDuration: "8n",
      fileName: action.data.shared.fileName,
      volume: 0,
      tempo: action.data.shared.tempo,
      toneSizes: {
        "32n": Math.round(window.innerHeight / 92),
        "16n": Math.round(window.innerHeight / 70),
        "8n": Math.round(window.innerHeight / 60),
        "4n": Math.round(window.innerHeight / 52),
        "2n": Math.round(window.innerHeight / 43),
        "1m": Math.round(window.innerHeight / 35)
      }
    };
    state.cord = { sounds: [] };
  }
  return appReducer(state, action);
}
