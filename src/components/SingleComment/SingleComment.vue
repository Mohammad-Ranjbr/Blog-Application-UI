<template>
  <div class="comment" @mouseenter="showOptions = true" @mouseleave="showOptions = false">
    <div class="comment_content">
      <div class="comment_creator">{{ comment.user.userName }}</div>
      <div class="comment_message">{{ comment.content }}</div>
    </div>
    
    <div class="comment__options">
          <div v-if="isCommentOwner && showOptions" class="comment__options">
            <button class="comment__edit" @click="editComment">
              <img src="./../../assets/svgs/icons8-edit.svg" class="icon" draggable="false" />
            </button>
            <button class="comment__delete" @click="deleteComment">
              <img src="./../../assets/svgs/icons8-delete.svg" class="icon" draggable="false" />
            </button>
          </div>
      <button  class="comment__like" >
        <img :src="likedImg" class="icon" @click="changeLikeState" draggable="false" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleComment',
  data: function() {
    return {
      liked: false,
      showOptions: false,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    likedImg: function() {
      let liked = require('./../../assets/svgs/liked.svg');
      let unLiked = require('./../../assets/svgs/unliked.svg');
      return this.liked ? liked : unLiked;
    },
    isCommentOwner: function () {
      const userId = localStorage.getItem('userId');
      console.log('Current User ID:', userId, 'Comment User ID:', this.comment.user.id);
      return userId && userId === this.comment.user.id.toString();
    },
  },
  methods: {
    changeLikeState: function() {
      this.liked = !this.liked;
    },
    editComment() {
      alert('Editing comment: ' + this.comment.id);
    },
    deleteComment() {
      if (confirm('Are you sure you want to delete this comment?')) {
        alert('Deleting comment: ' + this.comment.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  padding-bottom: 0.5rem;
  color: $black;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;

  &__options {
    display: flex;
    justify-content: start;
    align-items: start;
  }
  &__like,
  &__edit,
  &__delete {
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &__edit:hover img {
    fill: #007bff;
  }
  &__delete:hover img {
    fill: darkred; 
  }

  .comment__edit img,
  .comment__delete img {
    width: $font-size-3x;
    height: $font-size-3x;
    transition: transform 0.2s ease-in-out;
  }

  .comment__edit:hover img,
  .comment__delete:hover img {
    transform: scale(1.2);
  }

  .comment__like img {
    width: $font-size-3x;
    height: $font-size-3x;
  }

  .comment__like img {
    width: $font-size-3x;
    height: $font-size-3x;
    transition: transform 0.2s ease-in-out;
  }

  .comment__like:hover img {
    transform: scale(1.2);
  }
}
.comment_content{
    display: flex;
    flex-direction: row;
    align-Items:start
  }
  .comment_creator{
     font-weight: 600;
  }
  .comment_message{
    font-size: 15px;
    font-weight: 200;
    margin-left: 0.6rem;
    height: fit-content;
  }

.icon {
  width: $font-size-3x;
  height: $font-size-3x;
}
</style>
