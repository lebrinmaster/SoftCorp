import { adaptData, IAdaptedData } from "@/adapters/dataAdapter";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adaptedData: null,
    currencyExchangeValue: 90,
    shoppingCart: [],
    shoppingCartIdStack: [],
    shoppingCartOverallPrice: 0,
    priceGoUp: null,
  },
  mutations: {
    fetchData(state, { data, names }): void {
      state.adaptedData = adaptData(data, names);
    },
    setCurrencyValue(state, payload: number): void {
      state.currencyExchangeValue = Number(payload);
    },
    addToShoppingCart(state, payload: IAdaptedData): void {
      if (!state.shoppingCart) {
        state.shoppingCart = [{ ...payload, itemNumber: 1 }];
        state.shoppingCartIdStack = [payload.T];
      } else {
        if (state.shoppingCartIdStack.includes(payload.T)) {
          const index = state.shoppingCart.findIndex(
            (item) => item.T === payload.T
          );
          state.shoppingCart[index].itemNumber++;
          Vue.set(state.shoppingCart, index, {
            ...state.shoppingCart[index],
            itemNumber: state.shoppingCart[index].itemNumber++,
          });
        } else {
          state.shoppingCartIdStack.push(payload.T);
          state.shoppingCart.push({ ...payload, itemNumber: 1 });
        }
      }
    },
    changeShoppingCartItemQuantity(
      state,
      payload: { id: string; num: number }
    ) {
      const index = state.shoppingCart.findIndex(
        (item) => item.T === payload.id
      );
      Vue.set(state.shoppingCart, index, {
        ...state.shoppingCart[index],
        itemNumber: Number(payload.num),
      });
    },
    deleteShoppingCartItem(state, payload) {
      state.shoppingCart = state.shoppingCart.filter(
        (item) => item.T !== payload
      );
      state.shoppingCartIdStack = state.shoppingCartIdStack.filter(
        (item) => item !== payload
      );
    },
    updateCurrencyExchangeValue(state, value?: number) {
      const number = value ?? Math.floor(Math.random() * (80 - 20) + 20);
      if (number === state.currencyExchangeValue) {
        state.priceGoUp = null;
      } else if (number > state.currencyExchangeValue) {
        state.priceGoUp = true;
      } else {
        state.priceGoUp = false;
      }
      this.commit("setCurrencyValue", number);
    },
  },
  getters: {
    getShoppingCartOverallPrice(state) {
      if (!state.shoppingCart.length) {
        return 0;
      } else if (state.shoppingCart.length === 1) {
        return (
          state.currencyExchangeValue *
          (state.shoppingCart[0].P * state.shoppingCart[0].itemNumber)
        );
      }
      const sum = state.shoppingCart.reduce(
        (a, b) => a.P * a.itemNumber + b.P * b.itemNumber
      );
      return state.currencyExchangeValue * sum;
    },
  },
});
