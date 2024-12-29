<template>
  <div class="gallery-item" tabindex="0">
    <router-link :to="{ name: 'ShowPost', params: { id: item.id } }" class="gallery-link">
      <img :src="item.image ? `data:image/jpeg;base64,${item.image}` : 'default-image.jpg'" class="gallery-image"
        :alt="item.alt" />

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

    <div v-if="isCurrentUser" class="item-actions">
      <button class="icon" @click="editItem">
        <img src="./../../assets/svgs/icons8-edit.svg" class="icon" draggable="false" />
      </button>
      <button class="icon" @click="deleteItem">
        <img src="./../../assets/svgs/icons8-delete.svg" class="icon" draggable="false" />
      </button>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'ProfileGalleryItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isCurrentUser() {
      const currentUserId = localStorage.getItem('userId');
      return currentUserId && currentUserId === String(this.item.user.id);
    },
  },
  created: {

  },
  methods: {
    editItem() {
      console.log('Edit item:', this.item.id);
    },
    async deleteItem() {
      const accessToken = localStorage.getItem('accessToken');

      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this post?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (confirmation.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8082/api/v1/posts/${this.item.id}`, {
            headers: {
              Authorization: `${accessToken}`,
            },
          });

          if (response.status === 200) {
            Swal.fire({
              title: 'Post Deleted!',
              text: 'The post has been successfully deleted.',
              icon: 'success',
              confirmButtonText: 'Ok',
            });

            this.$emit('postDeleted', this.item.id);
          } else {
            console.error('Failed to delete the post');
          }
        } catch (error) {
          console.error('Error deleting post:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error deleting the post.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.gallery-link {
  text-decoration: none;
  color: inherit;
}

.item-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  gap: 10px;
}

.gallery-item:hover .item-actions {
  display: flex;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.7;
}

.icon:hover {
  transform: scale(1.2);
  opacity: 1;
}

button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

@import './../ProfileGallery/ProfileGallery.scss';
</style>
