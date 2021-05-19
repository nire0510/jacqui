<template>
  <nav class="orange accent-4">
    <div class="nav-wrapper">
      <router-link :to="{ name: 'Home' }" class="brand-logo">
        &nbsp;<code>{{title}}</code>
      </router-link>
      <ul class="right">
        <router-link
          :to="{ name: 'Queries'}"
          custom
          v-slot="{ href, navigate, isActive, isExactActive, route }"
        >
          <li :class="[isActive && 'active', isExactActive && 'active']">
            <a :href="href" @click="navigate">{{route.name}}</a>
          </li>
        </router-link>
        <li>
          <a class="dropdown-trigger" href="#!" data-target="manage-selector">
            Manage<i class="material-icons right">arrow_drop_down</i>
          </a>
        </li>
        <li>
          <a class="dropdown-trigger" href="#!" data-target="profiles-selector">
            {{profile || 'Default'}}<i class="material-icons right">arrow_drop_down</i>
          </a>
        </li>
      </ul>
    </div>

    <!-- manage-selector -->
    <ul id="manage-selector" class="dropdown-content">
      <router-link
        :to="{ name: 'AddGroup'}"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <li :class="[isActive && 'active', isExactActive && 'active']">
          <a class="orange-text text-accent-4" :href="href" @click="navigate">Groups</a>
        </li>
      </router-link>
      <router-link
        :to="{ name: 'AddProfile'}"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <li :class="[isActive && 'active', isExactActive && 'active']">
          <a class="orange-text text-accent-4" :href="href" @click="navigate">Profiles</a>
        </li>
      </router-link>
      <router-link
        :to="{ name: 'AddService'}"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <li :class="[isActive && 'active', isExactActive && 'active']">
          <a class="orange-text text-accent-4" :href="href" @click="navigate">Services</a>
        </li>
      </router-link>
    </ul>
    <!-- /manage-selector -->

    <!-- profiles-selector -->
    <ul id="profiles-selector" class="dropdown-content">
      <li>
        <a class="orange-text text-accent-4" @click.prevent="setProfile()">Default</a>
      </li>
      <li v-for="profile in profiles" :key="profile._id">
        <a class="orange-text text-accent-4" @click.prevent="setProfile(profile.name)">{{profile.name}}</a>
      </li>
      <li class="divider"></li>
      <li>
        <router-link :to="{ name: 'AddProfile' }"
           class="orange-text text-accent-4"
        >
          New...
        </router-link>
      </li>
    </ul>
    <!-- /profiles-selector -->
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import M from 'materialize-css';
// import * as api from '@/services/api';

export default defineComponent({
  computed: {
    ...mapState(['profile', 'profiles']),
  },
  methods: {
    setProfile(profile: string): void {
      this.$store.commit('setProfile', profile);
    },
  },
  mounted(): void {
    const dropdowns = this.$el.querySelectorAll('.dropdown-trigger');

    this.$store.dispatch('loadProfiles');
    M.Dropdown.init(dropdowns, {});
  },
  props: {
    title: String,
  },
});
</script>
