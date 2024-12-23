<template>
  <div class="comment">
    <div class="comment_content" >
      <div class="comment_creator">{{ comment.user.userName }}</div>
      <div class="comment_message">{{ comment.content }}</div> 
    </div>
    
    <div class="comment__like-action">
      <a class="like-post">
        <img :src="likedImg" class="icon" @click="changeLikeState" draggable="false" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleComment',
  data: function() {
    return {
      liked: false,
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
  },
  methods: {
    changeLikeState: function() {
      this.liked = !this.liked;
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

  &__like-action {
    padding-left: 5px;
  }
 
  span {
    font-weight: 600;
    color: $black;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }
}
.comment_content{
    display: flex;
    flex-direction: row;
    align-Items:center
  }
  .comment_creator{
     font-weight: 600;
  }
  .comment_message{
    font-size: 15px;
     font-weight: 200;
     margin-left: 0.6rem;
  }

.icon {
  width: $font-size-3x;
  height: $font-size-3x;
}
</style>
