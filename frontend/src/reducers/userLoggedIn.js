const userLoggedInReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return false;
    case 'LOG_IN':
      return true;
    default:
      return state;
  }
};

export default userLoggedInReducer;
