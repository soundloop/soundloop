import { PLAY_TONE } from "../actions/cord";
import { TRASH_ALL_LINEAR, TRASH_ALL_ANGULAR } from "../actions/shared";

//The cord holds onto a list of sounds passed to it. 
//It pulls the last pushed sound when being asked to play something.

export default function cord(state = { sounds: [], index: 0 }, action) {
  switch (action.type) {
    case PLAY_TONE:
      return Object.assign({}, state, {
        index: state.index++,
        //color: action.color,
        sounds: sounds(state.sounds, action)
      });
    case TRASH_ALL_LINEAR:
      return Object.assign({}, state, {
        index: 0,
        sounds: []
      });
    case TRASH_ALL_ANGULAR:
      return Object.assign({}, state, {
        index: 0,
        sounds: []
      });
    default:
      return state;
  }
}

function sounds(state = [], action) {
  switch (action.type) {
    case PLAY_TONE:
      return [...state, { sound: action.sound, duration: action.duration }];
    default:
      return state;
  }
}
