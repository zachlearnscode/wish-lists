<template>
	<v-card>
		<v-card-title>Create a Wishlist</v-card-title>
		<v-card-text>
			<v-form @submit.prevent="$emit('wishlist-form-submitted', nickname)">
				<v-text-field v-model="nickname" autofocus label="Wishlist Nickname"></v-text-field>
				<v-card-actions class="pr-0">
					<v-spacer></v-spacer>
					<v-btn @click="$emit('wishlist-form-cancelled')">Cancel</v-btn>
					<v-btn type="submit">Create</v-btn>
				</v-card-actions>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			nickname: ""
		}
	}
}
</script>