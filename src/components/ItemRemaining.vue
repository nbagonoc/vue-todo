<template>
    <div class="counter text-left">
        Items left: {{remaining}}
    </div>
</template>

<script>
export default {
    name: 'item-remaining',
    // props: {
    //     remaining: {
    //         type: Number,
    //     }
    // }
    computed: {
        remaining(){
            return this.$store.getters.remaining
        }
    }
}
</script>