import {
  TOGGLE_PLAY,
  TOGGLE_STOP,
  TOGGLE_RESTART,
  TOGGLE_MUTE,
  TOGGLE_UNMUTE,
  TRASH_ALL_LINEAR,
  TRASH_ALL_ANGULAR,
  ADD_LOOP_COUNT,
  RESET_LOOP_COUNT,
  SCREEN_RESIZE,
  UPDATE_FILENAME,
  UPDATE_VOLUME,
  TOGGLE_MODE,
  UPDATE_TEMPO,
  UPDATE_DURATION
} from "../actions/shared";

/*
The shared reducer updates the store for globally relevant state, using data from the shared actions
*/

export default function shared(
  state = {
    playing: false,
    center: {
      x: 380 + (window.innerWidth - 380) / 2,
      y: window.innerHeight / 2
    },
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    loopCount: 2,
    muted: false,
    mode: "linear",
    selectedDuration: "8n",
    fileName: "MyProject",
    volume: 0,
    tempo: 110,
    toneSizes: {
      "32n": Math.round(window.innerHeight / 92),
      "16n": Math.round(window.innerHeight / 70),
      "8n": Math.round(window.innerHeight / 60),
      "4n": Math.round(window.innerHeight / 52),
      "2n": Math.round(window.innerHeight / 43),
      "1m": Math.round(window.innerHeight / 35)
    }
  },
  action
) {
  switch (action.type) {
    case TOGGLE_PLAY:
      return Object.assign({}, state, {
        playing: true
      });
    case TOGGLE_STOP:
      return Object.assign({}, state, {
        playing: false
      });
    case TOGGLE_MODE:
      return Object.assign({}, state, {
        mode: action.mode
      });

    case UPDATE_FILENAME:
      return Object.assign({}, state, {
        fileName: action.fileName
      });
    case UPDATE_DURATION:
      return Object.assign({}, state, {
        selectedDuration: action.selectedDuration
      });
    case UPDATE_VOLUME:
      return Object.assign({}, state, {
        volume: action.volume
      });

    case UPDATE_TEMPO:
      return Object.assign({}, state, {
        tempo: action.tempo
      });

    case SCREEN_RESIZE:
      return Object.assign({}, state, {
        screenWidth: action.screenWidth,
        screenHeight: action.screenHeight,
        center: {
          x: 380 + (action.screenWidth - 380) / 2,
          y: action.screenHeight / 2
        }
      });

    case ADD_LOOP_COUNT:
      return {
        ...state,
        loopCount: action.loopCount
      };

    case RESET_LOOP_COUNT:
      return {
        ...state,
        loopCount: action.loopCount
      };

    case TOGGLE_MUTE:
      return Object.assign({}, state, {
        muted: true
      });
    case TOGGLE_UNMUTE:
      return Object.assign({}, state, {
        muted: false
      });
    case TRASH_ALL_LINEAR:
      return state;
    case TRASH_ALL_ANGULAR:
      return state;
    default:
      return state;
  }
}
