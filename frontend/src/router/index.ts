import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/groups/editor',
    name: 'AddGroup',
    component: () => import('../views/group-editor.vue'),
  },
  {
    path: '/groups/:groupId/editor',
    name: 'EditGroup',
    component: () => import('../views/group-editor.vue'),
  },
  {
    path: '/services/editor',
    name: 'AddService',
    component: () => import('../views/service-editor.vue'),
  },
  {
    path: '/services/:serviceId/editor',
    name: 'EditService',
    component: () => import('../views/service-editor.vue'),
  },
  {
    path: '/queries',
    name: 'Queries',
    component: () => import('../views/queries.vue'),
  },
  {
    path: '/profiles/editor',
    name: 'AddProfile',
    component: () => import('../views/profile-editor.vue'),
  },
  {
    path: '/profiles/:profileId/editor',
    name: 'EditProfile',
    component: () => import('../views/profile-editor.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
