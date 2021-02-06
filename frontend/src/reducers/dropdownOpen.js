const dropdownOpenReducer = (state = false, action) => {
  switch (action.type) {
    case 'CLOSE':
      return false;
    case 'OPEN':
      return true;
    default:
      return state;
  }
};

export default dropdownOpenReducer;
