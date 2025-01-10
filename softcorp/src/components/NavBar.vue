<template>
    <div class="navbar">
        <div class="d-flex align-center">
            <v-text-field min="1" type="number" :value="currencyValue" dense outlined label="Kурс" prepend-inner-icon="₽" @input="onCurrencyValueChange" />
        </div>
        <div id="timer" class="d-flex align-center" >{{ counter }} <v-btn :disabled="countDown !== 0" icon color="primary" @click="triggerCountDownTimer"><v-icon>mdi-refresh</v-icon></v-btn></div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from '../store';

@Component
export default class NavBar extends Vue {
    public countDown = 15;
    public get counter(): string {
        return `Обновление через: ${this.countDown} секунд`
    }
    public get currencyValue() {
        return Math.abs(store.state.currencyExchangeValue);
    }

    public triggerCountDownTimer() {
        this.countDown = 15;
        this.$emit('refetchData');
        this.countDownTimer();
    }

    public countDownTimer(): void {
        const interval = setInterval(() => {
            this.countDown--;
            if(this.countDown === 0) {
                store.commit('updateCurrencyExchangeValue');
                clearInterval(interval);
            }
        }, 1000);
    }
    

    public mounted(): void {
        this.countDownTimer();
    }

    public onCurrencyValueChange(num: string) {
        const value = Math.abs(+num);
        const payload: number = value ?? 1;
        store.commit('updateCurrencyExchangeValue', payload);
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
