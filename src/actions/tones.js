export const ADD_TONE = "ADD_TONE";
export const UPDATE_TONE = "UPDATE_TONE";
export const REPLACE_TONE = "REPLACE_TONE";

/*
The tones actions send data pertaining to tones in the store to the reducers. For instance, addTone() sends
information such as offset, color, and sound to the tones reducer
*/

export function addTone(
  colorCode,
  stroke,
  strokeWidth,
  offsetx,
  offsety,
  attLoop,
  rad,
  sound,
  rotation
) {
  return {
    type: ADD_TONE,

    offset: {
      x: offsetx,
      y: offsety
    },
    color: colorCode,
    stroke: stroke,
    strokeWidth: strokeWidth,
    attachedLoop: attLoop,
    radius: rad,
    sound: sound,
    rotation: rotation
  };
}

export function updateTone(id, color, sound, size, sustain) {
  return {
    type: UPDATE_TONE,
    id: id,
    color: color,
    sound: sound,
    radius: size,
    duration: sustain
  };
}

export function replaceTone(
  id,
  xCoord,
  yCoord,
  colorCode,
  stroke,
  strokeWidth,
  offsetx,
  offsety,
  attLoop,
  rad,
  sound,
  rotation
) {
  return {
    type: REPLACE_TONE,
    id: id,
    position: {
      x: xCoord,
      y: yCoord
    },
    offset: {
      x: offsetx,
      y: offsety
    },
    color: colorCode,
    stroke: stroke,
    strokeWidth: strokeWidth,
    attachedLoop: attLoop,
    radius: rad,
    sound: sound,
    rotation: rotation
  };
}

