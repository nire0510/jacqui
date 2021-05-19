<template>
  <layout-aside-content>
    <template v-slot:aside>
      <links-list
        title="Groups"
        icon="folder"
        classnames="grey darken-3 white-text groups-list"
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
    </template>
    <template v-slot:content>
      <h4>Group Editor</h4>
      <group-form :group="group"
        @getGroups="getGroups"
      />
    </template>
  </layout-aside-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GroupForm from '@/components/groups/group-form.vue';
import LayoutAsideContent from '@/components/layout/layout-aside-content.vue';
import LinksList from '@/components/common/links-list.vue';
import * as api from '@/services/api';

export default defineComponent({
  components: {
    GroupForm,
    LayoutAsideContent,
    LinksList,
  },
  data(): any {
    return {
      groups: [],
      group: null,
    };
  },
  methods: {
    async getGroup(): Promise<void> {
      this.group = await api.getGroup(this.$route.params.groupId);
    },
    async getGroups(): Promise<void> {
      try {
        const groups: Group[] = await api.getGroups();

        this.groups = groups.map((group: Group) => ({
          id: group._id,
          name: group.name,
          route: {
            name: 'EditGroup',
            params: {
              groupId: group._id,
            },
          },
        }));
      }
      catch (error) {
        M.toast({
          html: 'Failed to load groups',
          classes: 'error',
        });
      }
    },
  },
  mounted(): void {
    M.Tooltip.init(this.$el.querySelectorAll('.tooltipped'), {});
    this.getGroups();

    if (this.$route.params.groupId) {
      this.getGroup();
    }
  },
  watch: {
    '$route.params.groupId'() {
      if (this.$route.params.groupId) {
        this.getGroup();
      }
    },
  },
});
</script>
