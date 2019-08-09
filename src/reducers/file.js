import { IMPORT_FILE } from "../actions/file";

// This part of our store isn't currently used. It saves the original copy of an imported file.
// This could be useful in the future for a feature to do a reset to the saved file state.

export default function file(state = {}, action) {
  switch (action.type) {
    case IMPORT_FILE:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
