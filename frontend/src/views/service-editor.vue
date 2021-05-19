<template>
  <layout-aside-content>
    <template v-slot:aside>
      <links-list
        title="Services"
        icon="widgets"
        classnames="grey darken-3 white-text"
        :links="services"
      >
        <template v-slot:action-buttons>
          <router-link :to="{ name: 'AddService' }" class="white-text tooltipped"
            data-tooltip="Add a service"
          >
            <i class="material-icons right">add</i>
          </router-link>
        </template>
      </links-list>
    </template>
    <template v-slot:content>
      <h4>Service Editor</h4>
      <service-form :service="service"
        @getServices="getServices"
      />
    </template>
  </layout-aside-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ServiceForm from '@/components/services/service-form.vue';
import LayoutAsideContent from '@/components/layout/layout-aside-content.vue';
import LinksList from '@/components/common/links-list.vue';
import * as api from '@/services/api';

export default defineComponent({
  components: {
    ServiceForm,
    LayoutAsideContent,
    LinksList,
  },
  data(): any {
    return {
      services: [],
      service: null,
    };
  },
  methods: {
    async getService(): Promise<void> {
      this.service = await api.getService(this.$route.params.serviceId);
    },
    async getServices(): Promise<void> {
      try {
        const services: Service[] = await api.getServices();

        this.services = services.map((service: Service) => ({
          id: service._id,
          name: service.name,
          route: {
            name: 'EditService',
            params: {
              serviceId: service._id,
            },
          },
        }));
      }
      catch (error) {
        M.toast({
          html: 'Failed to load services',
          classes: 'error',
        });
      }
    },
  },
  mounted(): void {
    M.Tooltip.init(this.$el.querySelectorAll('.tooltipped'), {});
    this.getServices();

    if (this.$route.params.serviceId) {
      this.getService();
    }
  },
  watch: {
    '$route.params.serviceId'() {
      if (this.$route.params.serviceId) {
        this.getService();
      }
    },
  },
});
</script>
