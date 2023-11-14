export const inisialState = {
  coins: [],
  addAll: () => {}
};

const marketReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_ALL":
      return {
        ...state,
        coins: payload.coins
      };

    default:
      throw new Error(`No case for type ${type} found in marketReducer.`);
  }
};

export default marketReducer;
