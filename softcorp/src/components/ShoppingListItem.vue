<template>
    <div class="shopping-list__item">
        <span> Htvtym rfrhjq-nj Htvtym rfrhjq-njHtvtym rfrhjq-njHtvtym rfrhjq-nj Htvtym rfrhjq-nj</span>
        <div class="d-flex align-center ml-8">
            <v-btn outlined raised text disabled x-small>P 12356</v-btn>
            <v-divider vertical class="ml-4 mr-2"/>
            <v-btn elevation="2" color="primary" small> <v-icon>mdi-cart</v-icon> Купить</v-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ShoppingListItem extends Vue {

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