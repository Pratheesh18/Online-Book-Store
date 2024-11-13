<template>
    <div class="mb-4">
        <input type="text" v-model="query" @input="handleSearch" class="form-control" placeholder="Search by book title ..."/>
    </div>
</template>

<script>
export default {
    data(){
        return{
            query:"",
        }
    },
    methods:{
        handleSearch(){
            this.$emit("search",this.query);
        }
    }
}

</script>

<style scoped>
.form-control{
    max-width: 400px;
    margin: 0 auto;
}
</style>