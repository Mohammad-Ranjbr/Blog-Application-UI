<template>
  <div class="post-actions">
    <div class="post-actions__left">
      <a class="post-actions__like">
        <img
          :src="likedImg"
          class="post-actions__icon"
          @click="changeLikeState"
          draggable="false"
        />
      </a>

      <a class="post-actions__comment">
        <img
          src="./../../assets/svgs/comment.svg"
          alt="comment"
          class="post-actions__icon"
          draggable="false"
        />
      </a>

      <!-- <a class="post-actions__share">
        <img
          src="./../../assets/svgs/share.svg"
          alt="share"
          class="post-actions__icon"
          draggable="false"
        />
      </a> -->
    </div>

    <div class="post-actions__right">
      <a class="post-actions__save" @click="changeSaveState">
        <img :src="savedImg" alt="saved" class="post-actions__icon" draggable="false" />
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostAction',
  props: {
    post: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {
      liked: this.post.likedByCurrentUser || false,
      saved: this.post.savedByCurrentUser || false, 
    };
  },
  computed: {
    likedImg: function() {
      let liked = require('./../../assets/svgs/liked.svg');
      let unLiked = require('./../../assets/svgs/unliked.svg');
      return this.liked ? liked : unLiked;
    },
    savedImg: function() {
      let saved = require('./../../assets/svgs/saved.svg');
      let unSaved = require('./../../assets/svgs/unsaved.svg');
      return this.saved ? saved : unSaved;
    },
  },
  methods: {
    changeLikeState: function() {
      const likeData = {
        userId: this.userId,
        postId: this.post.id,
        like: true,
      };

      axios
      .post('http://localhost:8082/api/v1/posts/like', likeData, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        this.liked = !this.liked;
        const updatedLikes = response.data.likes;
        this.$emit('updateLikes', updatedLikes); 
      })
      .catch((error) => {
        console.error('Error liking the post:', error);
      });
    },
    changeSaveState: function() {
      if (this.saved) {
        axios
          .delete(`http://localhost:8082/api/v1/users/${this.userId}/unsave_post/${this.post.id}`, {
            headers: {
              Authorization: `${localStorage.getItem('accessToken')}`,
            },
          })
          .then(() => {
            this.saved = false; 
            this.$emit('updateSavedState', this.saved); 
          })
          .catch((error) => {
            console.error('Error unsaving the post:', error);
          });
      } else {
        axios
          .post(`http://localhost:8082/api/v1/users/${this.userId}/save_post/${this.post.id}`, {}, {
            headers: {
              Authorization: `${localStorage.getItem('accessToken')}`,
            },
          })
          .then(() => {
            this.saved = true; 
            this.$emit('updateSavedState', this.saved); 
          })
          .catch((error) => {
            console.error('Error saving the post:', error);
          });
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.post-actions {
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;

  &__left > a {
    padding: 0.5rem;
    cursor: pointer;
  }

  &__right > a {
    padding: 0.5rem;
    cursor: pointer;
  }

  &__icon {
    width: 25px;
    height: 25px;
  }
}
</style>
