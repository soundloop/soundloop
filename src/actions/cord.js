export const PLAY_TONE = "PLAY_TONE";

/*
The cord action sends data pertaining to the cord in the store to the cord reducer.
 
playTone() sends sound and duration to the cord reducer which then updates the values in the store
*/

export function playTone(sound, sustain) {
  return {
    type: PLAY_TONE,
    sound: sound,
    duration: sustain
  };
}
