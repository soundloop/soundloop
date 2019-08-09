import { addLoopCount } from "./shared";

/*
The loops actions send data pertaining to loops in the store to the reducers. This includes addLoop(), which sends
information such as radius and rotation to the loops reducer

activateLoop() in particular also dispatches an action from shared that updates the loopCount
*/

export const ADD_LOOP = "ADD_LOOP";
export const UPDATE_LOOP = "UPDATE_LOOP";
export const RECEIVE_LOOPS = "RECEIVE_LOOPS";
export const ACTIVATE_LOOP = "ACTIVATE_LOOP";
export const UPDATE_LOOP_SPEED = "UPDATE_LOOP_SPEED";

let nextLoopId = 0;
export function addLoop(rad) {
  return {
    type: ADD_LOOP,
    id: nextLoopId++,
    radius: rad,
    rotation: 0,
    active: false
  };
}

export function updateLoop(id, rotation) {
  return {
    type: UPDATE_LOOP,
    id: id,
    rotation: rotation
  };
}

export function updateLoopSpeed(id, speed) {
  return {
    type: UPDATE_LOOP_SPEED,
    id: id,
    speed: speed
  };
}

export function activateLoop(id) {
  return dispatch => {
    dispatch({
      type: ACTIVATE_LOOP,
      id: id,
      active: true,
      stroke: "#ed1e79"
    });
    dispatch(addLoopCount());
  };
}
