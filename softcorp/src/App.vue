<template>
  <v-app>
    <NavBar @refetchData="fetchData"/>

    <v-main>
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col cols="12" sm="6">
            <ShoppingList :data="data" />
          </v-col>
          <v-col cols="12" sm="6">
            <ShoppingCart />
            <span v-show="overallPrice">Общая стоимость: ₽ {{ overallPrice }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import ShoppingList from "./components/ShoppingList.vue";
import store from "./store";
import rawDataJson from '../data.json' assert { type: 'json' };
import rawNamesJson from "../names.json" assert { type: 'json' };

@Component({
  components: {
    NavBar,
    ShoppingCart,
    ShoppingList
  }
})


export default class App extends Vue {
  public data = null;

  public created(): void {
    this.fetchData();
    this.data = store.state.adaptedData;
  }

  public fetchData() {
    store.commit('fetchData', { data: rawDataJson.Value.Goods, names: rawNamesJson })
  }

  public get overallPrice(): number {
    return store.getters.getShoppingCartOverallPrice;
  }
}
</script>
