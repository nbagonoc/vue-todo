<template>
    <div class="filter">
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" :class="{ active:filter=='all'}" @click="changeFilter('all')">All</button>
            <button type="button" class="btn btn-secondary" :class="{ active:filter=='active'}" @click="changeFilter('active')">Active</button>
            <button type="button" class="btn btn-secondary" :class="{ active:filter=='completed'}" @click="changeFilter('completed')">Completed</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "todo-filter",
    data(){
        return {
            "filter":"all"
        }
    },
    computed: {
        filter(){
            return this.$store.state.filter
        }
    },
    methods: {
        changeFilter(filter){
            this.$store.state.filter = filter;
            // eventBus.$emit('eventChangeFilter',filter);
        }
    }
}
</script>