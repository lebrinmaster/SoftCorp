<template>
    <v-card class="pa-2" outlined tile>
        <v-expansion-panels>
            <v-expansion-panel v-for="(item, i) in data" :key="i">
                <v-expansion-panel-header>
                    {{item[0].G}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <ShoppingListItem v-for="(subItem, index) in item" :key="index+97" :data="subItem"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ShoppingListItem from "./ShoppingListItem.vue";

@Component({
    components: {
        ShoppingListItem
    }
})
export default class ShoppingList extends Vue {
    @Prop() public data;
}
</script>