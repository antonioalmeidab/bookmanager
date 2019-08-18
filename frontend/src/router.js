import Vue from 'vue';
import Router from 'vue-router';
import MyBooks from '@/views/MyBooks.vue';
import Search from '@/views/Search.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'my-books',
      component: MyBooks,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
  ],
});
