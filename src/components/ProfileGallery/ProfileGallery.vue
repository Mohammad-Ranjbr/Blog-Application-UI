<template>
  <div class="gallery-container">
    <div class="gallery" v-if="items && items.length > 0">
      <gallery-item v-for="(item, index) in items" :key="index" :item="item" />
    </div>
    <div v-else class="no-posts-message">
      <div class="no-posts-content">
        <div class="no-posts-icon">
          <img src="./../../assets/svgs/icons8-camera.svg" alt="No posts" class="camera-icon" />
        </div>
        <div>No posts here</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileGallery',
  data: function() {
    return {};
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    'gallery-item': () => import('./../ProfileGalleryItem/ProfileGalleryItem'),
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
@import './ProfileGallery.scss';

.no-posts-message {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.8rem;
  margin-top: 2rem;
  font-weight: 500;
}

.no-posts-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-posts-icon {
  margin-bottom: 1rem;
}

.camera-icon {
  width: 8rem; 
  height: auto;
}

</style>
