<template>
  <form class="row" @submit.prevent="saveGroup">
    <div class="input-field col s12">
      <input v-model="groupName" id="group-name" type="text"
        placeholder="Placeholder" class="validate" required
      >
      <label for="group-name">Name</label>
    </div>
    <div class="col s12">
      <button class="waves-effect waves-light btn orange accent-4" type="submit">
        {{group?._id ? 'Update' : 'Add'}}
      </button>
      &nbsp;
      <button class="waves-effect waves-light btn red"
        type="button"
        @click="deleteGroup"
        v-if="group?._id"
      >
        Delete
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
      groupName: this.group?.name,
    };
  },
  emits: ['getGroups'],
  mounted(): void {
    this.groupName = '';
    M.updateTextFields();
  },
  methods: {
    async deleteGroup(): Promise<void> {
      if (this.group?._id) {
        try {
          await api.deleteGroup(this.group._id);
          M.toast({ html: 'Group deleted' });
          this.$emit('getGroups');
          this.$router.replace({ name: 'AddGroup' });
        }
        catch (error) {
          M.toast({
            html: 'Failed to delete group',
            classes: 'error',
          });
        }
      }
    },
    async saveGroup(): Promise<void> {
      try {
        if (this.group?._id) {
          await api.updateGroup(this.group._id, {
            name: this.groupName,
          });
          M.toast({ html: 'Group updated' });
        }
        else {
          const newGroup = await api.addGroup({
            name: this.groupName,
          });

          M.toast({ html: 'Group added' });
          this.$router.push({ name: 'EditGroup', params: {
            groupId: newGroup._id,
          }});
        }

        this.$emit('getGroups');
      }
      catch (error) {
        M.toast({
          html: 'Failed to save group',
          classes: 'error',
        });
      }
    },
  },
  props: {
    group: Object,
  },
  watch: {
    '$route.name'(): void {
      if (!this.$route.query.groupId) {
        this.groupName = '';
      }
    },
    group(): void {
      this.groupName = this.group?.name;
    },
  },
});
</script>

