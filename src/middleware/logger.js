/*
Listens to every action made to the store,
and logs the action and the store's new state in the browser console.
*/

const logger = store => next => action => {
  console.group(action.type);
  console.log("The action: ", action);
  const returnValue = next(action);
  console.log("The new state is: ", store.getState());
  console.groupEnd();
  return returnValue;
};

export default logger;
