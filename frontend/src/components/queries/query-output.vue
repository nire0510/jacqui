<template>
  <div class="table-wrapper">
    <table class="query-output display striped">
      <thead class="grey lighten-1">
        <tr>
          <th>#</th>
          <th v-for="(value, key) in (output ||[])[0]" :key="key">{{formatHeader(key)}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in (output ||[])" :key="index">
          <td>{{index + 1}}</td>
          <td v-for="(value, index) in row" :key="index">
            {{value}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data(): any {
    return {
    };
  },
  methods: {
    formatHeader(input: string): string {
      return input.replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .split(' ')
        .map((word) => {
          switch (word) {
            case 'ip':
            case 'id':
            case 'vpc':
            case 'cidr':
              return word.toUpperCase();
            default:
              return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
          }
        })
        .join(' ');
    },
  },
  props: {
    output: Array,
  },
});
</script>

<style lang="scss">
.table-wrapper {
  max-height: 40vh;
  max-width: 100%;
  overflow: auto;

  table {
    td, th {
      white-space: nowrap;
    }
    td:nth-child(1) {
      font-weight: bold;
    }
  }
}

.query-output {
  border: solid 1px #eee;
}
</style>
