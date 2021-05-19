<template>
  <form class="row" @submit.prevent="saveProfile">
    <div class="input-field col s12">
      <input v-model="profileName" id="profile-name" type="text"
        placeholder="Placeholder" class="validate" required
      >
      <label for="profile-name">Name</label>
    </div>
    <div class="input-field col s12">
      <input v-model="accessKeyId" id="access-key-id" type="text"
        placeholder="Placeholder" class="validate" required
      >
      <label for="access-key-id">Access Key ID</label>
    </div>
    <div class="input-field col s12">
      <input v-model="accessKeySecret" id="access-key-secret" type="password"
        placeholder="Placeholder" class="validate" required
      >
      <label for="access-key-secret">Access Key Secret</label>
    </div>
    <div class="input-field col s12">
      <input v-model="region" id="region" type="text"
        placeholder="Placeholder" class="validate" required
      >
      <label for="region">Region</label>
    </div>
    <div class="col s12">
      <button class="waves-effect waves-light btn orange accent-4" type="submit">
        {{profile?._id ? 'Update' : 'Add'}}
      </button>
      &nbsp;
      <button class="waves-effect waves-light btn red"
        type="button"
        @click="deleteProfile"
        v-if="profile?._id"
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
      profileName: this.profile?.name,
      accessKeyId: this.profile?.accessKeyId,
      accessKeySecret: this.profile?.accessKeySecret,
      region: this.profile?.region,
    };
  },
  emits: ['getProfiles'],
  mounted(): void {
    M.updateTextFields();
  },
  methods: {
    async deleteProfile(): Promise<void> {
      if (this.profile?._id) {
        try {
          await api.deleteProfile(this.profile._id);
          M.toast({ html: 'Profile deleted' });
          this.$emit('getProfiles');
          this.$router.replace({ name: 'AddProfile' });
        }
        catch (error) {
          M.toast({
            html: 'Failed to delete profile',
            classes: 'error',
          });
        }
      }
    },
    async saveProfile(): Promise<void> {
      try {
        if (this.profile?._id) {
          await api.updateProfile(this.profile._id, {
            name: this.profileName,
            accessKeyId: this.accessKeyId,
            accessKeySecret: this.accessKeySecret,
            region: this.region,
            outputFormat: 'json',
          });
          M.toast({ html: 'Profile updated' });
        }
        else {
          const newProfile = await api.addProfile({
            name: this.profileName,
            accessKeyId: this.accessKeyId,
            accessKeySecret: this.accessKeySecret,
            region: this.region,
            outputFormat: 'json',
          });

          M.toast({ html: 'Profile added' });
          this.$router.push({ name: 'EditProfile', params: {
            profileId: newProfile._id,
          }});
        }

        this.$emit('getProfiles');
      }
      catch (error) {
        M.toast({
          html: 'Failed to save profile',
          classes: 'error',
        });
      }
    },
  },
  props: {
    profile: Object,
  },
  watch: {
    '$route.name'(): void {
      if (!this.$route.query.profileId) {
        this.profileName = '';
        this.accessKeyId = '';
        this.accessKeySecret = '';
        this.region = '';
      }
    },
    profile(): void {
      this.profileName = this.profile?.name;
      this.accessKeyId = this.profile?.accessKeyId;
      this.accessKeySecret = this.profile?.accessKeySecret;
      this.region = this.profile?.region;
    },
  },
});
</script>
