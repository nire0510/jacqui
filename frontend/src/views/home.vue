<template>
  <main>
    <h4>My Favorite Queries</h4>
    <queries-list
      :queries="queries"
      v-if="queries.length"
    />
    <p v-else>Favorite queries list is empty</p>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as api from '@/services/api';
import QueriesList from '@/components/queries/queries-list.vue';

export default defineComponent({
  components: {
    QueriesList,
  },
  data(): any {
    return {
      queries: [],
    };
  },
  methods: {
    async getFavoriteQueries(): Promise<void> {
      try {
        const queries = await api.getQueries({
          favorite: true,
        });

        this.queries = queries;
      }
      catch (error) {
        M.toast({
          html: 'Failed to load favorite queries. Check DB connection.',
          classes: 'error',
        });
      }
    },
  },
  mounted(): void {
    this.getFavoriteQueries();
  },
});
</script>

<style lang="scss" scoped>
main {
  margin: 1rem;
}
</style>
