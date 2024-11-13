<template>
    <div class="mb-4">
        <input type="text" v-model="query" @input="debouncedSearch" class="form-control" placeholder="Search by book title ..."/>
    </div>
</template>

<script>
import { debounce } from '../utils/debounce';

export default {
    data(){
        return{
            query:"",
            debouncedSearch : null,
        }
    },
    created(){
        this.debouncedSearch = debounce(this.handleSearch,400);
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