<template>
  <div class="search-page">
    <b-form class="search-form" @submit.prevent="onSubmit" inline>
      <label class="sr-only" for="inline-form-input-search">Search</label>
      <b-input
        v-model="form.search"
        id="inline-form-input-search"
        class="mb-2 mr-sm-3 mb-sm-0 search-input"
        required
        placeholder="Busque por um livro"
      ></b-input>
      <b-button type="submit" variant="primary">Buscar</b-button>
    </b-form>
    <ul>
      <BookCard
        v-for="book in books"
        v-bind:book="book"
        v-bind:addButton="true"
        v-bind:key="book.id"/>
    </ul>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import api from '@/services/api';

export default {
  name: 'search',

  components: {
    BookCard,
  },

  data() {
    return {
      form: {
        search: '',
      },
      books: [],
    };
  },

  methods: {
    onSubmit() {
      api.get(`books/${this.form.search}`)
        .then((response) => {
          this.books = response.data;
        })
        .catch(err => err);
    },
  },
};
</script>

<style scoped>
.form-control {
  height: 40px;
  width: 400px;
}

.search-form {
  margin-bottom: 20px;
}

.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
