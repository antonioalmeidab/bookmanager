<template>
  <ul class="booklist">
    <BookCard
      v-for="book in books"
      v-bind:book="book"
      v-bind:key="book.id"
    />
  </ul>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import api from '@/services/api';

export default {
  name: 'home',

  components: {
    BookCard,
  },

  data() {
    return {
      userBooks: [],
      books: [],
    };
  },
  beforeMount() {
    this.getUser()
      .then(() => {
        this.getBooks();
      })
      .catch(err => err);
  },

  methods: {
    async getUser() {
      const response = await api.get('users/5d560c8cecb4aa55ea7e1261');
      this.userBooks = response.data.books;
    },
    async getBooks() {
      const response = await api.post('user/myBooks', this.userBooks);
      this.books = response.data;
    },
  },
};
</script>

<style>
.booklist {
  padding: 0;
}
</style>
