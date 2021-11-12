<template>
  <v-container>
    <v-card class="elevation-5">
      <!-- Card Header -->
      <v-card-title class="green darken-2 white--text">
        My {{title}}
        <v-spacer></v-spacer>
        <v-card-actions class="pa-0">
			<dashboard-list-action-dialog :dialog="dialog" :icon="btnIcon" v-on="$listeners">
				<slot name="actionDialog"></slot>
			</dashboard-list-action-dialog>
          <!-- <v-btn @click="$emit('cardActionClick')" fab small>
            <v-icon>mdi-{{btnIcon}}</v-icon>
          </v-btn> -->
        </v-card-actions>
      </v-card-title>

      <!-- List Items  -->
      <v-list two-line>
        <template v-if="Object.keys(list).length">
          <v-list-item v-for="(item, i) in list" :key="i">
            <v-list-item-content>
              <v-list-item-title>{{ item.nickname }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.created }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <!-- <v-btn @click="$emit('itemActionClick', item.id)" small icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn> -->
            </v-list-item-action>
          </v-list-item>
        </template>
        <template v-else>
          <div class="text-center grey--text text--lighten-1">No {{ title }} to display.</div>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import DashboardListActionDialog from "./DashboardListActionDialog";

export default {
  props: ["title", "dialog", "btnIcon", "list"],
  
  components: {
	DashboardListActionDialog
  }
};
</script>

<style>
</style>