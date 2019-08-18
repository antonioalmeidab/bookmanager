<template>
  <header class="sidebar">
    <h2><strong>Total de livros: </strong>{{ totalBooks }}</h2>
    <h1>{{ name }}</h1>
    <img :src="avatar"/>
  </header>
</template>

<script>

export default {
  name: 'Sidebar',

  props: {
    userId: String,
    name: String,
    avatar: String,
    totalBooks: Number,
  },
};
</script>

<style>
.sidebar {
  width: 100%;
  padding: 0 30px;
  background-color: #d3d3d3;
  border-bottom: 1px solid #D3D3D3;
  height: 80px;
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  justify-content: space-between;
  align-items: center;
}

.sidebar h1 {
  font-size: 26px;
  font-weight: 500;
}

.sidebar h2 {
  font-size: 20px;
  font-weight: 300;
}

.sidebar img {
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
