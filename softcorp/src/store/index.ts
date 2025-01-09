import { IAdaptedData } from "@/adapters/dataAdapter";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataJson: null,
    currencyExchangeValue: 90,
    shoppingCart: [],
    shoppingCartIdStack: [],
  },
  mutations: {
    setData(state, payload): void {
      state.dataJson = payload.dataJson.Value.Goods;
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
          console.log(state.shoppingCart[index].itemNumber);
          state.shoppingCart[index].itemNumber++;
          Vue.set(state.shoppingCart, index, {
            ...state.shoppingCart[index],
            itemNumber: state.shoppingCart[index].itemNumber++,
          });
          console.log(state.shoppingCart[index].itemNumber);
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
  },
  actions: {
    fetchDataJSON(state): void {
      //state.commit("setData", { dataJson });
    },
  },
});
