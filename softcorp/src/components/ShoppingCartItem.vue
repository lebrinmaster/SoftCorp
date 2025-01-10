<template>
    <div class="shopping-cart__item">
        <div style="gap: 0 16px;" class="d-flex">
            <v-chip class="shopping-cart__item--chip" label outlined color="orange" dense>{{data.G}}</v-chip>
            <span class="d-flex align-center"> {{data.T}} </span>
        </div>
        <div class="d-flex align-center shopping-cart__item--action">
            <v-text-field min="1" :max="data.P" type="number" style="max-width: 80px;" class="d-block" :value="itemQuantity" solo dense hide-details @input="onItemQuantityChange" />
            <v-divider vertical class="ml-4 mr-2" />
            <v-btn :color="priceTrend" outlined raised text x-small>{{currencyExchangedValue}}</v-btn>
            <v-divider vertical class="ml-4 mr-2" />
            <v-btn elevation="2" color="error" @click="onShoppingCartItemDelete">
                <v-icon error> mdi-delete </v-icon>
            </v-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import store from '../store';

@Component
export default class ShoppingCartItem extends Vue {
    @Prop() public data;

    public get priceTrend(): string {
        if(store.state.priceGoUp == null) return '';
        return store.state.priceGoUp ? 'error' : 'success' ;
    }

    public get itemQuantity():number {
        return this.data.itemNumber;
    }

    public get currencyExchangedValue(): string {
        return `₽ ${store.state.currencyExchangeValue * this.data.P * this.itemQuantity}`;
    }

    public onItemQuantityChange(value: number):void {
        const num: number = Math.abs(value);
        if(num <= this.data.P) {
            store.commit('changeShoppingCartItemQuantity', {id: this.data.T, num})
        } else {
            store.commit('changeShoppingCartItemQuantity', {id: this.data.T, num: this.data.P})
        }
    }

    public onShoppingCartItemDelete():void {
        store.commit('deleteShoppingCartItem', this.data.T)
    }
}
</script>
<style lang="less" scoped>
.shopping-cart__item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding: 4px 0;
    gap: 0 16px;

    &--chip,
    &--action {
        display: flex;
        flex-shrink: 0;
    }
}
</style>