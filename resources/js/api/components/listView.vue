<template>
    <div class="items-list">
        <div v-for="(item, index) in items" :key="index">
            <Item :item="item" v-on:item-changed="$emit('reloadlist')"
                @new-path="$emit('new-path', { imagePath: item.image, uploaded: 'false' })"
                @default-path="$emit('default-path')" @show-editform="$emit('show-editform', item)" />
        </div>
    </div>
</template>

<script>

import Item from "./listItem.vue"

export default {
    name: 'List',

    props: ['items'],

    components: {
        Item
    },
}

</script>

<style scoped>
.items-list {
    position: relative;
    padding: 1rem 0.5rem;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.items-list:before {
    content: '';
    position: absolute;
    display: block;
    top: 0px;
    bottom: 0px;
    left: 34px;
    right: 464px;
    background: pink;
    z-index: 1;
}
</style>