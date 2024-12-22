<template>
  <div class="gallery-container">
    <div class="gallery" v-if="items">
      <gallery-item v-for="(item, index) in items" :key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileGallery',
  data: function() {
    return {
      items: []
    };
  },
  methods: {
    fetchExplorePosts() {
    axios
      .get(`http://localhost:8082/api/v1/posts/explore-posts`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
      });
  }
  },
  components: {
    'gallery-item': () => import('./../components/ProfileGalleryItem/ProfileGalleryItem'),
  },
  mounted() {
    this.fetchExplorePosts();
  },
};
</script>

<style lang="scss" scoped>
@import './../components/ProfileGallery/ProfileGallery.scss';

.footer {
  text-align: center;
  margin: 1rem 0 4rem;
}
</style>
