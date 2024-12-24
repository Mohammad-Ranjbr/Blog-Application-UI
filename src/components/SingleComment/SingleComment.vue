<template>
  <div class="comment" @mouseenter="showOptions = true" @mouseleave="showOptions = false">
    <div class="comment_content">
      <div class="comment_creator">{{ comment.user.userName }}</div>

      <div v-if="isEditing">
        <textarea v-model="editedContent" class="comment__edit-textarea"></textarea>
        <button @click="saveEdit" class="comment__save-edit">Save</button>
        <button @click="cancelEdit" class="comment__cancel-edit">Cancel</button>
      </div>
      
      <div v-else class="comment_message">{{ comment.content }}</div>
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
import axios from 'axios';

export default {
  name: 'SingleComment',
  data: function() {
    return {
      liked: false,
      showOptions: false,
      isEditing: false,
      editedContent: '',
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
      return userId && userId === this.comment.user.id.toString();
    },
  },
  methods: {
    changeLikeState: function() {
      this.liked = !this.liked;
    },
    editComment() {
      this.isEditing = true;
      this.editedContent = this.comment.content;
    },
    saveEdit() {
      axios.put(`http://localhost:8082/api/v1/comments/${this.comment.id}`, {
          content: this.editedContent,
        }, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
      .then(response => {
        this.comment.content = this.editedContent; 
        this.isEditing = false; 
      })
      .catch(error => {
        console.error('There was an error updating the comment:', error);
        alert('Failed to update comment');
      });
    },
    cancelEdit() {
      this.isEditing = false;
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
    outline: none;
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

  .comment__edit-textarea {
    width: 100%;
    height: 100px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
  }

  .comment__save-edit,
  .comment__cancel-edit {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
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
