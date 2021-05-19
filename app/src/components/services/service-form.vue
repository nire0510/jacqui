<template>
  <form class="row" @submit.prevent="saveService">
    <div class="input-field col s12">
      <input v-model="serviceName" id="service-name" type="text"
        placeholder="Placeholder" class="validate" required
      >
      <label for="service-name">Name</label>
    </div>
    <div class="input-field col s12">
      <select v-model="groupId" required>
        <option v-for="group in groups"
          :key="group._id"
          :value="group._id"
        >
          {{group.name}}
        </option>
      </select>
      <label>Service Group</label>
    </div>
    <div class="col s12">
      <button class="waves-effect waves-light btn orange accent-4" type="submit">Save</button>
      &nbsp;
      <button class="waves-effect waves-light btn red"
        type="button"
        @click="deleteService"
        v-if="service?._id"
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
      groups: [],
      groupId: this.service?.groupId,
      serviceName: this.service?.name,
    };
  },
  emits: ['getServices'],
  mounted(): void {
    M.updateTextFields();
    this.getGroups();
  },
  methods: {
    async getGroups(): Promise<void> {
      try {
        this.groups = await api.getGroups();
        this.$nextTick(() => {
          M.FormSelect.init(this.$el.querySelectorAll('select'), {});
        });
      }
      catch (error) {
        M.toast({
          html: 'Failed to load groups',
          classes: 'error',
        });
      }
    },
    async deleteService(): Promise<void> {
      if (this.service?._id) {
        try {
          await api.deleteService(this.service._id);
          M.toast({ html: 'Service deleted' });
          this.$emit('getServices');
          this.$router.replace({ name: 'AddService' });
        }
        catch (error) {
          M.toast({
            html: 'Failed to delete service',
            classes: 'error',
          });
        }
      }
    },
    async saveService(): Promise<void> {
      try {
        if (this.service?._id) {
          await api.updateService(this.service._id, {
            _id: this.service._id,
            name: this.serviceName,
            groupId: this.groupId,
          });
          M.toast({ html: 'Service updated' });
        }
        else {
          const newService = await api.addService(this.groupId, {
            name: this.serviceName,
            groupId: this.groupId,
          });

          M.toast({ html: 'Service added' });
          this.$router.push({ name: 'EditService', params: {
            serviceId: newService._id,
          }});
        }

        this.$emit('getServices');
      }
      catch (error) {
        M.toast({
          html: 'Failed to save service',
          classes: 'error',
        });
      }
    },
  },
  props: {
    service: Object,
  },
  watch: {
    '$route.name'(): void {
      if (!this.$route.query.serviceId) {
        this.groupId = null;
        this.serviceName = '';
      }
    },
    service(): void {
      this.groupId = this.service?.groupId;
      this.serviceName = this.service?.name;
      this.$nextTick(() => {
        M.FormSelect.init(this.$el.querySelectorAll('select'), {});
      });
    },
  },
});
</script>
