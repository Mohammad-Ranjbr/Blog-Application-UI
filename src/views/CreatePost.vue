<template>
    <div class="create-post-page">
        <div class="create-post-container">
            <div class="header">
                <h1 class="header__title">Create New Post</h1>
            </div>

            <div v-if="errMessage" class="alert err-msg">
                {{ errMessage }}
            </div>

            <form class="create-post-form" @submit.prevent="createPost">
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

                <button type="submit" class="btn-primary">Create Post</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'CreatePost',
    data() {
        return {
            title: '',
            content: '',
            selectedCategory: '',
            imageData: {
                format: '',
                base64Content: '',
            },
            categories: [],
            errMessage: '',
        };
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await axios.get('http://localhost:8082/api/v1/categories/basic-info/', {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                });
                this.categories = response.data.content;
            } catch (err) {
                this.errMessage = 'Failed to fetch categories.';
            }
        },
        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.imageData = {
                        format: file.type,
                        base64Content: reader.result.split(',')[1],
                    };
                };
                reader.readAsDataURL(file);
            }
        },
        async createPost() {
            if (!this.selectedCategory) {
                this.errMessage = 'Please select a category.';
                return;
            }

            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.post(
                    `http://localhost:8082/api/v1/posts/user/${userId}/category/${this.selectedCategory}`,
                    {
                        title: this.title,
                        content: this.content,
                        scheduledTime: null,
                        imageData: this.imageData,
                    },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem('accessToken')}`,
                        },
                    }
                );
                Swal.fire({
                    title: 'Post Created!',
                    text: 'Your post has been successfully created.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    this.$router.push(`/profile/${userId}`);
                });
            } catch (err) {
                this.errMessage = 'Failed to create post. Please try again.';
            }
        },

    },
    mounted() {
        this.fetchCategories();
    },
};
</script>
  
<style scoped>
.create-post-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.header__title {
    font-size: 2rem;
    color: #007bff;
}


.create-post-container {
    background: #ffffff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    margin-top: -150px;
}

.header {
    text-align: center;
    margin-bottom: 20px;

    &__title {
        font-size: 2rem;
        color: #333333;
    }
}

.err-msg {
    background-color: #ffebee;
    color: #d32f2f;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.create-post-form .form-group {
    margin-bottom: 20px;
}

.create-post-form .form-control {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

.create-post-form .btn-primary {
    width: 100%;
    background-color: #1976d2;
    color: white;
    border: none;
    padding: 12px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
}

.create-post-form .large-input select,
.create-post-form .large-input input {
    height: 45px;
    font-size: 1rem;
    padding: 10px;
}

.create-post-form .large-input input {
    background-color: #fff;
}
</style>
  