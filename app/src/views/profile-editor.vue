<template>
  <layout-aside-content>
    <template v-slot:aside>
      <links-list
        title="Profiles"
        icon="person"
        classnames="grey darken-3 white-text"
        :links="profiles"
      >
        <template v-slot:action-buttons>
          <router-link :to="{ name: 'AddProfile' }" class="white-text tooltipped"
            data-tooltip="Add a profile"
          >
            <i class="material-icons right">add</i>
          </router-link>
        </template>
      </links-list>
    </template>
    <template v-slot:content>
      <h4>Profile Editor</h4>
      <profile-form :profile="profile"
        @getProfiles="getProfiles"
      />
    </template>
  </layout-aside-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileForm from '@/components/profiles/profile-form.vue';
import LayoutAsideContent from '@/components/layout/layout-aside-content.vue';
import LinksList from '@/components/common/links-list.vue';
import * as api from '@/services/api';

export default defineComponent({
  components: {
    ProfileForm,
    LayoutAsideContent,
    LinksList,
  },
  data(): any {
    return {
      profiles: [],
      profile: null,
    };
  },
  methods: {
    async getProfile(): Promise<void> {
      this.profile = await api.getProfile(this.$route.params.profileId);
    },
    async getProfiles(): Promise<void> {
      try {
        const profiles: Profile[] = await api.getProfiles();

        this.profiles = profiles.map((profile: Profile) => ({
          id: profile._id,
          name: profile.name,
          route: {
            name: 'EditProfile',
            params: {
              profileId: profile._id,
            },
          },
        }));
      }
      catch (error) {
        M.toast({
          html: 'Failed to load profiles',
          classes: 'error',
        });
      }
    },
  },
  mounted(): void {
    M.Tooltip.init(this.$el.querySelectorAll('.tooltipped'), {});
    this.getProfiles();

    if (this.$route.params.profileId) {
      this.getProfile();
    }
  },
  watch: {
    '$route.params.profileId'() {
      if (this.$route.params.profileId) {
        this.getProfile();
      }
    },
  },
});
</script>
