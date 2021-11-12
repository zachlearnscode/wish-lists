<template>
	<v-dialog v-model="dialog" fullscreen>
		<template v-slot:activator="{ on, attrs }">
			<v-btn fab small v-bind="attrs" v-on="on" @click="$emit('action-button-click')">
			  <v-icon>mdi-{{icon}}</v-icon>
			</v-btn>
		</template>
		
		<slot></slot>
	</v-dialog>
</template>

<script>
export default {
	props: ["dialog", "icon"]
}
</script>