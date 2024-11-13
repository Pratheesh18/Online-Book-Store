<template>
    <div class="mb-4 d-flex justify-content-center">
        <select v-model="selectedOption" @change="handleSort" class="form-select w-auto">
            <option value="default"> Default </option>
            <option value="title"> Sort By Title </option>
            <option value="price"> Sort by Price </option>
        </select>
    </div>
</template>

<script>
export default{
    data(){
        return{
            selectedOption:"default",
        }
    },
    methods:{
        handleSort(){
            this.$emit("sort",this.selectedOption);
        }
    }
}
</script>

<style scoped>
.form-select {
  max-width: 200px;
}
</style>