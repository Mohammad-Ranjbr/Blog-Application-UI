<template>
    <div class="create-post-page">
        <div class="create-post-container">
            <div class="header">
                <h2 class="header__title">Edit Post</h2>
            </div>

            <div v-if="errMessage" class="alert err-msg">
                {{ errMessage }}
            </div>

            <form class="create-post-form" @submit.prevent="submitEditPost">
                <div class="form-group">
                    <input type="text" v-model="title" class="form-control" placeholder="Enter post title" required />
                </div>

                <div class="form-group category-select">
                    <textarea v-model="content" class="form-control" placeholder="Enter post content" rows="5"
                        required></textarea>
                </div>

                <div class="form-group category-select large-input">
                    <select v-model="selectedCategory" class="form-control" required>
                        <option value="" disabled>Select a category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.title }}
                        </option>
                    </select>
                </div>

                <div class="form-group large-input">
                    <label for="image">Upload Image</label>
                    <input type="file" id="image" class="form-control" @change="onImageChange" />
                </div>

                <button type="submit" class="btn-primary">Update Post</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditPost',
    data() {
        return {
            title: '',
            content: '',
            selectedCategory: '',
            categories: [],
            errMessage: '',
            imageData: {
                format: 'jpg',
                base64Content: '',
            },
        };
    },
    created() {
        this.fetchPost();
        this.fetchCategories();
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
                    this.title = response.data.title;
                    this.content = response.data.content;
                    this.selectedCategory = response.data.category.id;
                }
            } catch (error) {
                console.error('Error fetching post for editing:', error);
                this.errMessage = 'Error fetching the post data for editing.';
            }
        },

        async fetchCategories() {
            try {
                const response = await axios.get('http://localhost:8082/api/v1/categories/basic-info/', {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                });
                this.categories = response.data.content;
            } catch (err) {
                console.error('Failed to fetch categories.');
                this.errMessage = 'Failed to fetch categories.';
            }
        },
        async submitEditPost() {
            const postId = this.$route.params.id;
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.put(`http://localhost:8082/api/v1/posts/${postId}`, {
                    title: this.title,
                    content: this.content,
                    categoryId: this.selectedCategory,
                    scheduledTime: null,
                    imageData: this.imageData,
                }, {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    this.$router.push({ name: 'Profile', params: { id: localStorage.getItem('userId') } });
                }
            } catch (error) {
                console.error('Error updating post:', error);
                this.errMessage = 'Error updating the post. Please try again.';
            }
        },

        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.imageData.base64Content = reader.result.split(',')[1];
                };
                reader.readAsDataURL(file);
            }
        },
    },
};
</script>

<style scoped>
.create-post-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.create-post-container {
    background: #ffffff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 600px;
    margin-top: -150px;
    animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.header__title {
    font-size: 1.8rem;
    color: #007bff;
    font-weight: bold;
}

.err-msg {
    background-color: #ffebee;
    color: #d32f2f;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 1rem;
}

.create-post-form .form-group {
    margin-bottom: 25px;
}

.create-post-form .form-control {
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.create-post-form .form-control:focus {
    border-color: #1976d2;
    box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
    outline: none;
}

.create-post-form .btn-primary {
    width: 100%;
    background: linear-gradient(to right, #1976d2, #42a5f5);
    color: white;
    border: none;
    padding: 12px;
    font-size: 1.2rem;
    border-radius: 10px;
    cursor: pointer;
}

.create-post-form .btn-primary:hover {
    background: linear-gradient(to right, #1565c0, #1e88e5);
}

.create-post-form .large-input select,
.create-post-form .large-input input {
    height: 50px;
    font-size: 1.1rem;
    padding: 12px;
    border-radius: 10px;
}

.create-post-form .large-input input {
    background-color: #f9f9f9;
    transition: background-color 0.3s;
}

.create-post-form .large-input input:hover {
    background-color: #f1f1f1;
}
</style>
