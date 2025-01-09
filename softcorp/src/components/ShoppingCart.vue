<template>
    <v-card class="pa-2" outlined tile >
        <ShoppingCartItem v-for="(item, i) of shoppingCart" :key="i" :data="item" />
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ShoppingCartItem from "./ShoppingCartItem.vue";
import store from "../store";

@Component({
    components: {
        ShoppingCartItem,
    } 
})
export default class ShoppingCart extends Vue {
    public get shoppingCart() {
        return store.state.shoppingCart;
    }
}
</script>