<template>
  <div id="app">
    <Sidebar :name="name" :avatar="avatar" :totalBooks="totalBooks"/>
    <div class="main-content">
      <div id="nav">
        <router-link to="/">Meus livros</router-link> |
        <router-link to="/search">Buscar livros</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import api from '@/services/api';

export default {
  components: {
    Sidebar,
  },

  data() {
    return {
      userID: '',
      name: '',
      avatar: '',
      totalBooks: 0,
      books: [],
      errors: [],
    };
  },

  beforeMount() {
    this.getUser();
  },

  methods: {
    getUser() {
      api.get('users/5d560c8cecb4aa55ea7e1261')
        .then((response) => {
          this.name = response.data.name;
          this.avatar = `http://localhost:8000/files/${response.data.avatar}`;
          this.totalBooks = response.data.totalBooks;
        })
        .catch((err) => {
          this.errors.push(err);
        });
    },
  },
};
</script>

<style>
*{
  margin: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #0068d9;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
