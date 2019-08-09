import { ADD_TONE, UPDATE_TONE, REPLACE_TONE } from "../actions/tones";
import { TRASH_ALL_LINEAR, TRASH_ALL_ANGULAR } from "../actions/shared";

/*
The tones reducer updates the store for all tone-related state, including adding a new tone to the store, 
updating the values of a tone in the store, and replacing a tone on delete
*/

let nextToneId = 0;
export default function tones(state = [], action) {
  switch (action.type) {
    case ADD_TONE:
      return [
        ...state,
        {
          id: nextToneId++,
          color: action.color,
          attachedLoop: action.attachedLoop,
          radius: action.radius,
          sound: action.sound,
          offset: action.offset,
          rotation: action.rotation
        }
      ];

    // UPDATE_TONE returns new state with modified tone color, sound, and stroke with all else the same
    case UPDATE_TONE:
      var id = action.id;

      return [
        ...state.slice(0, id),
        {
          ...state[id],
          color: action.color,
          sound: action.sound,
          radius: action.radius,
          duration: action.duration
        },
        ...state.slice(id + 1)
      ];

    case REPLACE_TONE:
      var id = action.id;
      return [
        ...state.slice(0, id),
        {
          id: id,
          color: action.color,
          stroke: action.stroke,
          strokeWidth: action.strokeWidth,
          attachedLoop: action.attachedLoop,
          radius: action.radius,
          sound: action.sound,
          position: action.position,
          offset: action.offset,
          rotation: action.rotation,
          duration: action.duration
        },
        ...state.slice(id + 1)
      ];

    case TRASH_ALL_LINEAR:
      nextToneId = 0;

      return [];

    case TRASH_ALL_ANGULAR:
      nextToneId = 0;

      return [];

    default:
      return state;
  }
}
