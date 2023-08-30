<template>
    <ul v-for="item in results" :key="item.id">
        <li>{{ item.name }}</li>
        <li>{{ item.premiered }}</li>
        <li>{{ item.language }}</li>
        <li>{{ item.summary }}</li>
        <li>{{ item.rating }}</li>
    </ul>
</template>

<script lang="ts">
import { Show } from '@/domain/Show';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "SearchResults",
    props: {
        results: {
            type: Array as () => Show[],
            required: true,
        }
    },
});
</script>