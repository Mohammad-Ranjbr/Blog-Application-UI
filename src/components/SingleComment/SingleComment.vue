<template>
  <div class="container">
    <div class="comment" @mouseenter="showOptions = true" @mouseleave="showOptions = false">
      <div class="comment_content">
        <div class="comment_creator">{{ comment.user.userName}} <span v-if="!isEditing" style="font-size: 14px; font-weight: 400;">{{ comment.content }}</span></div>

        <div v-if="isEditing">
          <textarea v-model="editedContent" class="comment__edit-textarea"></textarea>
          <button @click="saveEdit" class="comment__save-edit">Save</button>
          <button @click="cancelEdit" class="comment__cancel-edit">Cancel</button>
        </div>
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
    <div style="display: flex; gap: 10px; align-items: center;">
            <div class="comment__like-count">{{ comment.likes }} Likes</div>
            <div class="comment__like-count">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

export default {
  name: 'SingleComment',
  data: function() {
    return {
      liked: this.comment.likedByCurrentUser || false,
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
    formattedTime() {
      return moment(this.comment.creationDate).fromNow();
    },
  },
  methods: {
    changeLikeState: function() {
      const likeData = {
        userId: localStorage.getItem('userId'),
        commentId: this.comment.id,
        like: true,
      };

      axios
      .post('http://localhost:8082/api/v1/comments/like-dislike', likeData, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        this.liked = !this.liked;
        this.comment.likes = response.data.likes;
      })
      .catch((error) => {
        console.error('Error liking the comment:', error);
      });
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
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this comment?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8082/api/v1/comments/${this.comment.id}`, {
              headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
              },
            })
            .then(() => {
              this.$emit('commentDeleted', this.comment.id);

              Swal.fire({
                title: 'Deleted!',
                text: 'The comment has been deleted successfully.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
              });
            })
            .catch((error) => {
              console.error('Error deleting comment:', error);

              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete the comment.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 20px;
}
.comment {
  padding-bottom: 0rem;
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
    height: 80px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    margin-left: 10px;
    resize: none;
    box-sizing: border-box;
  }

  .comment__save-edit,
  .comment__cancel-edit {
    padding: 6px 9px;
    font-size: 12px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    margin-right: 10px;
    margin-left: 10px;
  }

  .comment__save-edit {
    background-color: #4caf50;
    color: white;
  }

  .comment__save-edit:hover {
    background-color: #45a049;
  }

  .comment__cancel-edit {
    background-color: #f44336;
    color: white;
  }

  .comment__cancel-edit:hover {
    background-color: #e53935;
  }

}
.comment_content{
    display: flex;
    flex-direction: row;
    align-Items:start
  }
  .comment_creator {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 5px;
  }

.comment_message {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-weight: 200;
  margin-left: 0.6rem;
  margin-bottom: 10px;
}

.comment__like-count {
  font-size: 12px;      
  color: #888;    
  margin-top: 5px;        
  display: block;        
  margin-left: 0.0rem;   
}

.icon {
  width: $font-size-3x;
  height: $font-size-3x;
}
</style>
