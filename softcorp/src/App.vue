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
            Общая стоимость: Р 12350.50
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
import { shoppingCarouselAdapter } from "./adapters/dataAdapter";

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
    this.data = shoppingCarouselAdapter();
  }
}
</script>
