<template>
    <div class="navbar">
        <div class="d-flex align-center">
            <v-text-field type="number" :value="currencyValue" dense outlined label="Kурс" prepend-inner-icon="₽" @input="onCurrencyValueChange" />
        </div>
        <div class="d-flex align-center">Обновление через: {{ counter }} <v-btn icon color="primary"><v-icon>mdi-refresh</v-icon></v-btn></div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from '../store';

@Component
export default class NavBar extends Vue {
    public counter = 1245;
    public currencyValue = store.state.currencyExchangeValue;

    public onCurrencyValueChange(payload: string) {
        if(!payload) {
            store.commit('setCurrencyValue', 1);
        }
        if(Number(payload)) {
            store.commit('setCurrencyValue', payload);
        }
    }
}
</script>
<style lang="less" scoped>
.navbar {
    margin-top: 16px;
    display: flex;
    justify-content: space-around;
    width: 100%;
}
</style>
