<template>
    <v-expansion-panel>
        <v-expansion-panel-header :expand-icon="expandIcon">{{user}}</v-expansion-panel-header>

        <v-expansion-panel-content>
            <v-list v-for="(item, i) in items" :key="i">
                <v-dialog>
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item v-bind="attrs" v-on="on">
                            <v-list-item-content>
                                <v-list-item-title>{{ item }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-dialog>
            </v-list>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
  data() {
    return {
        //TO-DO: All Data should be props.
        user: "User 1",
        items: ["Item 1", "Item 2", "Item 3"],
        expandIcon: "mdi-menu-down"
    };
  },
};
</script>

<style>
</style>