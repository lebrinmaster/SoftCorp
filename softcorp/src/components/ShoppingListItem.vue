<template>
    <div class="shopping-list__item">
        <span> {{data.T}} ({{data.P}})</span>
        <div class="d-flex align-center ml-8">
            <v-btn outlined raised text disabled x-small> {{currencyExchangedValue}}</v-btn>
            <v-divider vertical class="ml-4 mr-2"/>
            <v-btn :disabled="isDisabled" elevation="2" color="primary" small @click="addToCart"> <v-icon>mdi-cart</v-icon> Купить</v-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import store from '../store';

@Component
export default class ShoppingListItem extends Vue {
    @Prop() public data;

    public get isDisabled(): boolean {
        if(!this.data || !store.state.shoppingCart.length) {
            return false;
        }
        const item = store.state.shoppingCart?.filter((item) => item.T === this.data.T) ?? [];
        if(item.length) {
            return item[0].itemNumber >= this.data.P;
        }
        return false;
    }

    public get currencyExchangedValue(): string {
        return `₽ ${store.state.currencyExchangeValue * this.data.P}`;
    }

    public addToCart(): void {
        store.commit('addToShoppingCart', this.data);
    }
}
</script>
<style lang="less" scoped>
.shopping-list__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
}
</style>