<template>
  <div class="newsfeed">
    <post v-for="(post, index) in posts" :key="index" :post="post" :comments="post.comments"></post>
  </div>
</template>
<script>
export default {
  name: 'Newsfeed',
  props: {
    posts: {
      type: Array, 
      required: true,
    },
  },
  data: function() {
    return {
      posts: [],
      comments: [],
    };
  },
  methods: {},
  components: {
    post: () => import('./../Post/Post'),
  },
};
</script>

<style lang="scss" scoped></style>
