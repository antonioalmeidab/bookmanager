<template>
  <div>
    <b-card
      :img-src="thumbnail"
      img-alt="Cover"
      img-left
      :title="title"
      :sub-title="author"
      class="book-card">
      <b-card-text>{{description}}</b-card-text>
      <div class="footer">
        <b-button
          @click="onClick()"
          v-if="addButton"
          variant="primary"
          class="add-button">
          Adicionar
        </b-button>
        <span class="readers">
          <p>LEITORES:</p>
          <img
            v-for="user in usersReading"
            v-bind:key="user.id"
            v-bind:src="`http://localhost:8000/files/${user.avatar}`"
            v-b-tooltip.hover :title="user.name"
            class="reader-avatar" />
        </span>
      </div>
    </b-card>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'HelloWorld',
  props: {
    book: Object,
    addButton: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  data() {
    return {
      book_id: this.book.id,
      thumbnail: this.book.volumeInfo.imageLinks.thumbnail,
      title: this.book.volumeInfo.title,
      author: this.book.volumeInfo.authors[0],
      description: this.shortDescription(this.book.volumeInfo.description),
      usersReading: [],
    };
  },

  beforeMount() {
    this.getReaders();
  },

  methods: {
    shortDescription(description) {
      const shortened = description.replace(/(([^\s]+\s\s*){30})(.*)/, '$1…');
      return shortened;
    },

    getReaders() {
      api.get(`/books/${this.book.id}/usersReading`)
        .then((response) => {
          this.usersReading = response.data;
        })
        .catch(err => err);
    },

    onClick() {
      api.post(`users/5d560c8cecb4aa55ea7e1261/books/${this.book_id}`)
        .then(() => {
          alert('Adicionado!');
        })
        .catch(err => err);
    },
  },
};
</script>

<style scoped>
.book-card {
  text-align: left;
  margin-bottom: 20px;
  width: 800px;
  height: 190px;
  border: 1px solid #d3d3d3;
}

.card-body {
  padding: 15px;
}

.card-body p {
  font-size: 14px;
}

.reader-avatar {
  width: 40px;
  margin-right: 4px;
}

.footer {
  display: flex;
  justify-content: space-between;
}

.readers {
  display: flex;
  align-items: center;
}

.readers p {
  font-weight: 600;
  margin: 0;
  margin-right: 10px;
}
</style>
