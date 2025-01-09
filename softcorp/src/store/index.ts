import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataJson: null,
    currencyExchangeValue: 90
  },
  mutations: {
    setData(state, payload): void {
      state.dataJson = payload.dataJson.Value.Goods;
    },
    setCurrencyValue(state, payload): void {
      state.currencyExchangeValue = Number(payload);
    }
  },
  actions: {
    fetchDataJSON(state): void {
      //state.commit("setData", { dataJson });
    },
  },
});
