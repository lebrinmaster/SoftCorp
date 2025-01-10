<template>
  <v-app>
    <NavBar />

    <v-main>
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col cols="12" sm="6">
            <ShoppingList :data="data"/>
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
import { initFetch } from "./adapters/dataAdapter";
import store from "./store";

@Component({
  components: {
    NavBar,
    ShoppingCart,
    ShoppingList
  }
})


export default class App extends Vue {
  public data = null;
  public mounted(): void {
    this.data = initFetch();
  }

  public get overallPrice(): number {
    return store.getters.getShoppingCartOverallPrice;
  }
}
</script>
