<template>
  <div class="links-list">
    <ul class="collapsible with-header">
      <li>
        <div class="collapsible-header" :class="classnames">
          <i class="material-icons">{{icon}}</i> {{title}}
          <span class="badge grey darken-2 grey-text text-lighten-1 right">
            {{links.length}}
          </span>
          <slot name="action-buttons"></slot>
        </div>
      </li>
    </ul>

    <div class="collection grey lighten-3">
      <router-link v-for="link in links"
        class="collection-item orange-text text-accent-4"
        :class="setActiveClass(link.route, 'active')"
        :key="link.id"
        :to="link.route"
      >
        {{link.name}}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    setActiveClass(route: any, className: string): string {
      if (route && route.query &&
        Object.keys(route.query).every((key: string) => this.$route.query && this.$route.query[key] === route.query[key])) {
        return 'active';
      }

      return '';
    },
  },
  props: {
    classnames: String,
    icon: String,
    links: Array,
    title: String,
  },
});
</script>

<style lang="scss">
.links-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .collection {
    border: none;

    &.with-header {
      border: none;
      border-radius: 0;
      margin: 0;
    }

    &:not(.with-header) {
      margin: 0;
      flex: 1;
      overflow: auto;
    }

    .collection-item {
      border-right: solid 1px #EDEDED;

      &.active {
        background-color: darken($color: #ddd, $amount: 5) !important;
        font-weight: bold;
      }
    }
  }
}
</style>
