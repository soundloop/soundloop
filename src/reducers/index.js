import loops from "./loops";
import tones from "./tones";
import shared from "./shared";
import cord from "./cord";
import file from "./file";
import { combineReducers } from "redux";

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
      mode: "angular",
      selectedSustain: "8n",
      fileName: action.data.shared.fileName,
      volume: 0,
      tempo: 1,
      toneSizes: {
        "32n": 10,
        "16n": 14,
        "8n": 16,
        "4n": 18,
        "2n": 20,
        "1m": 25,
        "2m": 30
      }
    };
    state.cord = {};
  }
  return appReducer(state, action);
}
