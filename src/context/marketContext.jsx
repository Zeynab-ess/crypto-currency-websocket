import React, { createContext, useContext, useReducer } from "react";
import marketReducer, { inisialState } from "../reducer/marketReducer";

export const MarketContext = createContext(inisialState);

export const MarketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(marketReducer, inisialState);

  const addAll = (coins) => {
    dispatch({
      type: "ADD_ALL",
      payload: { coins: Object.entries(coins) },
    });
  };

  const value = {
    coins: state.coins,
    addAll,
  };

  return (
    <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
  );
};

const useMarket = () => {
  const context = useContext(MarketContext);

  if (context === undefined)
    throw new Error("useMarket must be used within MarketContext");

  return context;
};

export default useMarket;
