<template>
    <div class="show-post container">
        <div class="show-post__left">
            <div v-if="post">
                <post :post="post" :comments="comments" :userId="userId"></post>
            </div>
            <div v-else>
                <p>Post not found or error occurred.</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import Post from './../components/Post/Post';

export default {
    name: 'ShowPost',
    data() {
        return {
            post: null, 
            comments: [], 
            userId: null, 
        };
    },
    created() {
        this.fetchPost();
    },
    beforeRouteUpdate(to, from, next) {
        if (to.params.id !== from.params.id) {
            this.fetchPost();
        }
        next();
    },
    methods: {
        async fetchPost() {
            const postId = this.$route.params.id;
            const accessToken = localStorage.getItem('accessToken'); 

            try {
                const response = await axios.get(`http://localhost:8082/api/v1/posts/${postId}`, {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                });
                if (response.data) {
                    this.post = response.data;
                    this.comments = response.data.comments || []; 
                }
            } catch (error) {
                console.error('Error fetching post:', error); 
            }
        },
    },
    components: {
        Post,
    },
};
</script>
  
<style lang="scss" scoped>
.show-post {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;

    &__left {
        float: left;
        width: 60%;
        margin-bottom: 30px;
    }

    &__right {
        display: none;
    }

    @media (max-width: 768px) {
        flex-direction: column;

        &__left {
            width: 100%;
        }

        &__right {
            display: none;
        }
    }
}
</style>
