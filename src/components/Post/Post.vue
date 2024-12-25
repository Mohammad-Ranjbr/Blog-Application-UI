<template>
  <div class="post">
    <div class="post__upper">
      <img :src="post.user.image ? `data:image/jpeg;base64,${post.user.image}` : 'default-image.jpg'"
       alt="owner" class="post__owner-img" draggable="false" />
      <a :href="`/profile/${post.user.id}`" class="post__owner align-middle">
        <span>{{ post.user.name }}</span>
      </a>

      <button class="post__options-menu" data-toggle="modal" data-target="#exampleModalCenter">
        <span class="dots">●●●</span>
      </button>

      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <button class="post-modal-choice danger-choice">Unfollow</button>
              <button class="post-modal-choice lst-choice" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-img">
      <img
        class="post__main-img"
        alt="main post"
        draggable="false"
        :src="post.image ? `data:image/jpeg;base64,${post.image}` : 'default-image.jpg'"
        onDoubleClick="{this.handleLikePost}"
      />
    </div>

    <post-action :post="post" :userId="userId" @updateLikes="updatePostLikes"></post-action>
    <div class="post__action-box">
      <div class="post__likes">{{ post.likes }} likes</div>
      <div class="post__category">{{ post.category.title }}</div>
    </div>
    <post-description :title="post.title" :content="post.content" :created_at="post.creationDate"
    ></post-description>
    <post-comments :comments="comments" :post-id="post.id" :user-id="userId"></post-comments>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data: function() {
    userId: null;
  },
  methods: {},
  props: {
    post: {
      type: Object,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  created() {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      console.error('User ID not found in localStorage');
    }
  },
  components: {
    'post-action': () => import('./../PostAction/PostAction'),
    'post-description': () => import('./../PostDescription/PostDescription'),
    'post-comments': () => import('./../Comments/Comments'),
  },
  methods: {
    updatePostLikes(newLikes) {
      this.post.likes = newLikes; 
    },
  }
};
</script>

<style lang="scss" scoped>

.post {
  background: $white;
  margin-bottom: 60px;
  border: 1px solid $lighter-gray;
  border-radius: 10px;
  overflow: hidden;

  
  &__upper {
    padding: 10px 15px;
    border-bottom: 1px solid $lighter-gray;
  }
  
  &__owner-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgb(80, 141, 233);
    background-color: $white;
    padding: 1px;
  }
  
  &__owner {
    margin-left: 10px;
    color: black;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0px;
    
    &:hover {
      text-decoration: none;
      color: $main-color;
    }
  }
  
  &__options-menu {
    border: none;
    background: transparent;
    float: right;
    margin-top: 5px;
    
    &:focus {
      outline: 0;
    }
  }
  &__action-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
  }
  &__category {
    display: inline-block;
    background-color: #6bd5ee59; 
    color: #333;
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0.3rem 0.7rem;
    border-radius: 20px; 
    margin-bottom: 0.5rem;
  }
  &__likes {
    padding-left: 1rem;
    font-weight: 600;
  }

  &__main-img {
    width: 100%;
    height: auto;
  }
}

.post-modal-choice {
  width: 100%;
  border: none;
  border-bottom: 1px solid $lighter-gray;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: transparent;
  font-size: 1rem;

  &:hover {
    outline: none;
  }

  &:active {
    outline: none;
  }
}

.modal-content {
  border-radius: 20px;
  width: 85%;
  margin: auto;
}

.danger-choice {
  color: red;
  font-weight: 700;
}

.lst-choice {
  border-bottom: none;
}

.dots {
  font-size: 10px;
  margin-top: 5px;
}
</style>
