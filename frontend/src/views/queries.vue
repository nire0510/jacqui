<template>
  <layout-aside-content>
    <template v-slot:aside>
      <div id="queries-aside">
        <div class="groups-list z-depth-2">
          <links-list
            title="Groups"
            icon="folder"
            classnames="grey darken-3 white-text"
            :links="groups"
          >
            <template v-slot:action-buttons>
              <router-link :to="{ name: 'AddGroup' }" class="white-text tooltipped"
                data-tooltip="Add a group"
              >
                <i class="material-icons right">add</i>
              </router-link>
            </template>
          </links-list>
        </div>

        <div class="services-list z-depth-2">
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
        </div>
      </div>
    </template>
    <template v-slot:content>
      <h4 v-if="$route.query.serviceId">
        {{service?.name || "Service"}} Queries
        <a class="btn-flat black-text right tooltipped" @click="openEditorModal"
           data-tooltip="Add a query"
        >
          <i class="material-icons">add</i>
        </a>
      </h4>
      <h4 v-else>My Favorite Queries</h4>
      <queries-list
        :queries="queries"
        :serviceId="serviceId"
        v-if="queries.length"
        @getServiceQueries="getServiceQueries"
      />
      <p v-else>
        Queries list is empty,
        <a href="#" @click="openEditorModal" class="orange-text text-accent-4">
          add a new one.
        </a>
      </p>

      <!-- query-editor-modal -->
      <div id="add-query-modal" class="modal">
        <div class="modal-content">
          <h4>Query Editor</h4>
          <query-form
            :query="{}"
            :serviceId="serviceId"
            @getServiceQueries="getServiceQueries"
            @closeEditorModal="closeEditorModal"
          />
        </div>
      </div>
      <!-- /query-editor-modal -->
    </template>
  </layout-aside-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as api from '@/services/api';
import LayoutAsideContent from '@/components/layout/layout-aside-content.vue';
import LinksList from '@/components/common/links-list.vue';
import QueryForm from '@/components/queries/query-form.vue';
import QueriesList from '@/components/queries/queries-list.vue';

export default defineComponent({
  components: {
    LayoutAsideContent,
    LinksList,
    QueryForm,
    QueriesList,
  },
  data(): any {
    return {
      groupId: this.$route.query.groupId,
      serviceId: this.$route.query.serviceId,
      groups: [],
      service: null,
      services: [],
      queries: [],
    };
  },
  methods: {
    closeEditorModal(): void {
      const modal = M.Modal.getInstance(this.$el.querySelector('#add-query-modal'));

      modal.close();
    },
    openEditorModal(): void {
      const modal = M.Modal.getInstance(this.$el.querySelector('#add-query-modal'));

      modal.open();
    },
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
    async getGroups(): Promise<void> {
      try {
        const groups = await api.getGroups();

        this.groups = groups.map((group: Group) => ({
          ...group,
          route: {
            name: 'Queries',
            exact: true,
            exactPath: true,
            query: {
              groupId: group._id,
            },
          },
        }));
      }
      catch (error) {
        M.toast({
          html: 'Failed to load groups. Check DB connection.',
          classes: 'error',
        });
      }
    },
    async getServices(): Promise<void> {
      try {
        const services = this.$route.query.groupId ?
          await api.getGroupServices(this.$route.query.groupId) :
          await api.getServices();

        this.services = services.map((service: Service) => ({
          ...service,
          route: {
            name: 'Queries',
            exact: true,
            exactPath: true,
            query: {
              groupId: this.$route.query.groupId,
              serviceId: service._id,
            },
          },
        }));
      }
      catch (error) {
        M.toast({
          html: 'Failed to load services. Check DB connection.',
          classes: 'error',
        });
      }
    },
    async getService(): Promise<void> {
      if (this.$route.query.serviceId) {
        try {
          const service = await api.getService(this.$route.query.serviceId);

          this.service = service;
        }
        catch (error) {
          M.toast({
            html: 'Failed to load service. Check DB connection.',
            classes: 'error',
          });
        }
      }
    },
    async getServiceQueries(): Promise<void> {
      if (this.$route.query.serviceId) {
        try {
          const queries = await api.getServiceQueries(this.$route.query.serviceId);

          this.queries = queries;
        }
        catch (error) {
          M.toast({
            html: 'Failed to load queries. Check DB connection.',
            classes: 'error',
          });
        }
      }
    },
  },
  mounted(): void {
    M.Modal.init(this.$el.querySelector('#add-query-modal'), {});
    M.Tooltip.init(this.$el.querySelectorAll('.tooltipped'), {});

    this.getGroups();
    this.getServices();
    this.getFavoriteQueries();


    if (this.$route.query.serviceId) {
      this.getService();
      this.getServiceQueries();
    }
  },
  // beforeUnmount(): void {
  //   [...this.$el.querySelectorAll('.tooltipped')]
  //     .forEach((tooltip) => tooltip.close());
  // },
  watch: {
    '$route.query.groupId'() {
      this.getServices();
      this.getFavoriteQueries();
    },
    '$route.query.serviceId'() {
      this.getService();
      this.getServiceQueries();
    },
  },
});
</script>

<style lang="scss">
#queries-aside {
  display: flex;
  height: 100%;
  flex-direction: column;

  .groups-list {
    flex: 1;
    height: calc(50vh - 32px);
  }

  .services-list {
    flex: 1;
    height: calc(50vh - 32px);
    overflow: hidden;

    .collapsible {
      li:first-child,
      li:last-child {
        overflow: auto;
      }
    }
  }
}
</style>

