<template>
    <div class="shopping-list__item">
        <span> {{data.T}} ({{data.P}})</span>
        <div class="d-flex align-center ml-8">
            <v-btn outlined raised text disabled x-small> {{currencyExchangedValue}}</v-btn>
            <v-divider vertical class="ml-4 mr-2"/>
            <v-btn elevation="2" color="primary" small @click="addToCart"> <v-icon>mdi-cart</v-icon> Купить</v-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import store from '../store';

@Component
export default class ShoppingListItem extends Vue {
    @Prop() public data;

    public get currencyExchangedValue(): string {
        return `₽ ${store.state.currencyExchangeValue * this.data.P}`;
    }

    public addToCart():void {
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