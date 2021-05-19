import { createStore } from 'vuex';
import * as api from '@/services/api';

export default createStore({
  state: {
    profile: localStorage.getItem('profile') || null,
    profiles: [],
  },
  mutations: {
    setProfile(state, profile): void {
      profile ? localStorage.setItem('profile', profile) : localStorage.removeItem('profile');
      state.profile = profile;
    },
    setProfiles(state, profiles): void {
      state.profiles = profiles;
    },
  },
  actions: {
    async loadProfiles(context): Promise<void> {
      const profiles = await api.getProfiles();

      context.commit('setProfiles', profiles);
    },
  },
  modules: {
  }
});
