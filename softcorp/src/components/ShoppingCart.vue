<template>
    <v-card class="pa-2" outlined tile>
        Shopping cart
        <ShoppingCartItem v-for="(item, i) in 5" :key="i"/>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ShoppingCartItem from "./ShoppingCartItem.vue";

@Component({
    components: {
        ShoppingCartItem,
    }
})
export default class ShoppingCart extends Vue {

}
</script>