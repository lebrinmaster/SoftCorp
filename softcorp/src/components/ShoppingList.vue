<template>
    <v-card class="pa-2" outlined tile>
        <v-expansion-panels>
            <v-expansion-panel v-for="(item, i) in 5" :key="i">
                <v-expansion-panel-header>
                    Item
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <ShoppingListItem v-for="(subItem, index) in 5" :key="index"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ShoppingListItem from "./ShoppingListItem.vue";

@Component({
    components: {
        ShoppingListItem
    }
})
export default class ShoppingList extends Vue {

}
</script>