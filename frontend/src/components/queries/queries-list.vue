<template>
  <div class="queries-list">
    <query-box v-for="query in queries"
      :key="query._id"
      :query="query"
      :serviceId="serviceId"
      @getServiceQueries="getServiceQueries"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import QueryBox from '@/components/queries/query-box.vue';

export default defineComponent({
  components: {
    QueryBox,
  },
  emits: ['getServiceQueries'],
  methods: {
    getServiceQueries(): void {
      this.$emit('getServiceQueries');
    }
  },
  props: {
    queries: Array,
    serviceId: String,
  },
});
</script>

<style lang="scss">
.queries-list {
  code {
    display: block;
    font-size: 0.75rem;
    padding: 0.5rem !important;
    width: 100%;

    .material-icons {
      font-size: 0.8rem;
      vertical-align: sub;
    }
  }

  .collapsible {
    &:first-child {
      margin-top: 0;
    }
  }

  .collapsible-header {
    justify-content: space-between;

    i {
      width: 1rem;
    }
  }

  .collapsible-body {
    padding: 1rem;
  }
}
</style>
