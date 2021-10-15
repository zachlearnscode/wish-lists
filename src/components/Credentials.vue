<template>
    <v-form>
         <v-text-field v-model="username"></v-text-field>
        <v-text-field  v-model="password"></v-text-field>
    </v-form>
</template>

<script>
export default {
    props: ["signIn"],

    data() {
        return {
            username: "",
            password: ""
        }
    }

}
</script>

<style>

</style>