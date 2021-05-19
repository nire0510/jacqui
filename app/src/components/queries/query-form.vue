<template>
  <form class="row" @submit.prevent="saveQuery">
    <div class="input-field col s12">
      <input v-model="title" :id="'query-name-' + query?._id" type="text"
        placeholder="Placeholder" class="validate" required
      >
      <label :for="'query-name-' + query?._id">Title</label>
    </div>
    <div class="input-field col s12">
      <textarea :id="'aws-command-' + query?._id" v-model="aws" class="materialize-textarea" rows="2" required></textarea>
      <label :for="'aws-command-' + query?._id">AWS Command</label>
    </div>
    <div class="input-field col s12">
      <textarea :id="'jq-filter-' + query?._id" v-model="jq" class="materialize-textarea" rows="2"></textarea>
      <label :for="'jq-filter-' + query?._id">jq Filter</label>
    </div>
    <div class="col s12">
      <button class="waves-effect waves-light btn orange accent-4" type="submit">
        {{query?._id ? "Save" : "Add"}}
      </button>
      &nbsp;
      <button class="waves-effect waves-light btn red"
        type="button"
        @click="deleteQuery"
        v-if="query?._id"
      >
        Delete
      </button>
      <button class="waves-effect waves-light btn white orange-text text-accent-4 right modal-close"
        type="button"
      >
        Close
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import M from 'materialize-css';
import * as api from '@/services/api';

export default defineComponent({
  data(): any {
    return {
      title: this.query?.title,
      aws: this.query?.aws,
      jq: this.query?.jq,
    };
  },
  emits: ['closeEditorModal', 'getServiceQueries'],
  mounted(): void {
    M.updateTextFields();
  },
  methods: {
    async deleteQuery(): Promise<void> {
      if (this.query?._id) {
        try {
          await api.deleteQuery(this.query._id);
          M.toast({ html: 'Query deleted' });
          this.$emit('getServiceQueries');
        }
        catch (error) {
          M.toast({
            html: 'Failed to delete query',
            classes: 'error',
          });
        }
      }
    },
    async saveQuery(): Promise<void> {
      try {
        if (this.query?._id) {
          await api.updateQuery(this.query._id, {
            _id: this.query._id,
            title: this.title,
            aws: this.aws,
            jq: this.jq,
            serviceId: this.serviceId,
          });
          M.toast({ html: 'Query updated' });
        }
        else {
          await api.addQuery(this.serviceId, {
            title: this.title,
            aws: this.aws,
            jq: this.jq,
            serviceId: this.serviceId,
          });

          M.toast({ html: 'Query added' });
        }

        this.$emit('getServiceQueries');
        this.$emit('closeEditorModal');
      }
      catch (error) {
        M.toast({
          html: 'Failed to save query',
          classes: 'error',
        });
      }
    },
  },
  props: {
    query: Object,
    serviceId: String,
  },
  watch: {
    query(): void {
      if (this.query?.title) {
        this.$nextTick(() => {
          [...this.$el.querySelectorAll('textarea')].forEach(M.textareaAutoResize);
        });
      }
    },
  },
});
</script>
