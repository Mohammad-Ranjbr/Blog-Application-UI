<template>
  <div class="comments">
    <comment v-for="(comment, index) in comments" :key="index" :comment="comment" @commentDeleted="handleCommentDeleted"></comment>
    <section>
      <form class="comments__leave-comment" @submit.prevent="postComment">
        <textarea
          name="comment"
          placeholder="Add a comment ..."
          class="comments__comment-area"
          v-model="commentMessage"
        ></textarea>
        <button type="submit" class="comments__post-btn" :disabled="!commentTyped">Post</button>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Comments',
  components: {
    comment: () => import('./../SingleComment/SingleComment'),
  },
  data: function() {
    return {
      commentMessage: '',
      comments: []
    };
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    commentTyped: function() {
      return this.commentMessage.length ? true : false;
    },
  },
  methods: {
    postComment() {
      if (!this.commentMessage.trim()) return;

      const commentData = {
      content: this.commentMessage,
      parent: null,
    };

      axios
        .post(`http://localhost:8082/api/v1/comments/post/${this.postId}/user/${this.userId}`, commentData, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          const newComment = response.data;
          this.comments.unshift(newComment);
          this.comments.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
          this.commentMessage = '';
        })
        .catch((error) => {
          console.error('Error posting comment:', error);
        });
    },
    handleCommentDeleted(commentId) {
      this.comments = this.comments.filter((comment) => comment.id !== commentId);
    },
    mounted() {
    axios
      .get('http://localhost:8082/api/v1/comments/${this.postId}', {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        this.comments = response.data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  },
  }
};
</script>

<style lang="scss" scoped>
.comments {
  padding-left: 1rem;

  &__leave-comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid $lighter-gray;
    color: $dark-gray;
    line-height: 18px;
    min-height: 56px;
  }

  &__comment-area {
    width: 100%;
    border: none;
    padding-top: 24px;
    resize: none;

    &:focus {
      outline: none;
    }

    &::-webkit-input-placeholder {
      color: $dark-gray;
    }

    &:-moz-placeholder {
      /* Firefox 18- */
      color: $dark-gray;
    }

    &::-moz-placeholder {
      /* Firefox 19+ */
      color: $dark-gray;
    }

    &:-ms-input-placeholder {
      color: $dark-gray;
    }
  }

  &__post-btn {
    border: none;
    color: $main-color;
    background-color: transparent;
    font-size: $font-size-3x;
    padding-right: 10px;
    font-weight: 500;

    &:disabled {
      color: rgba(0, 123, 255, 0.4);
    }
  }
}
</style>
