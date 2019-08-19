<template>
    <div class="counter text-left">
        Items left: {{remaining}}
    </div>
</template>

<script>
export default {
    name: 'item-remaining',
    props: {
        remaining: {
            type: Number,
        }
    }
}
</script>