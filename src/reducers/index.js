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
      selectedSustain: "8n",
      fileName: action.data.shared.fileName,
      volume: 0,
      tempo: action.data.shared.tempo,
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
    state.cord = { sounds: [] };
  }
  return appReducer(state, action);
}
