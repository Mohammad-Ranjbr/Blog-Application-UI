<template>
  <div class="gallery-item" tabindex="0">
    <router-link :to="{ name: 'ShowPost', params: { id: item.id } }" class="gallery-link">
      <img :src="item.image ? `data:image/jpeg;base64,${item.image}` : 'default-image.jpg'"
        class="gallery-image" :alt="item.alt" />

      <div class="gallery-item-type" v-if="item.hasType">
        <span class="visually-hidden">{{ item.type }}</span>
        <i :class="item.typeIcon" aria-hidden="true"></i>
      </div>

      <div class="gallery-item-info">
        <ul>
          <li class="gallery-item-likes">
            <span class="visually-hidden">Likes:</span><i class="fa fa-heart" aria-hidden="true"></i>
            {{ item.likes }}
          </li>

          <li class="gallery-item-comments">
            <span class="visually-hidden">Comments:</span>
            <i class="fa fa-comment" aria-hidden="true"></i> {{ item.comments.length }}
          </li>
        </ul>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: 'ProfileGalleryItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../ProfileGallery/ProfileGallery.scss';
</style>
