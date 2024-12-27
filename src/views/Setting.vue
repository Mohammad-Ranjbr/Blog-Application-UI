<template>
    <div class="update-profile container">

        <h2>Update Profile</h2>
        <img :src="userProfile.image ? `data:image/jpeg;base64,${userProfile.image}` : 'default-image.jpg'"
            alt="profile image" class="profile-img" />

        <form @submit.prevent="updateProfile">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" v-model="userProfile.name" id="name" class="form-control" />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="userProfile.email" id="email" class="form-control" />
            </div>

            <div class="form-group">
                <label for="about">About:</label>
                <textarea v-model="userProfile.about" id="about" class="form-control"></textarea>
            </div>

            <div class="form-group">
                <label for="userName">Username:</label>
                <input type="text" v-model="userProfile.userName" id="userName" class="form-control" />
            </div>

            <div class="form-group">
                <label for="phoneNumber">Phone Number:</label>
                <input type="text" v-model="userProfile.phoneNumber" id="phoneNumber" class="form-control" />
            </div>

            <button type="submit" class="btn btn-primary">Update</button>
        </form>

        <button @click="deleteAccount" class="btn btn-danger mt-3">Delete Account</button>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'UpdateProfile',
    data() {
        return {
            userProfile: {
                image: '',
                name: '',
                email: '',
                about: '',
                userName: '',
                phoneNumber: '',
            },
        };
    },
    mounted() {
        const userId = localStorage.getItem('userId');
        if (userId) {
            this.fetchUserProfile(userId);
        }
    },
    methods: {
        fetchUserProfile(userId) {
            axios
                .get(`http://localhost:8082/api/v1/users/${userId}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((response) => {
                    const userProfile = response.data;
                    this.userProfile = {
                        image: userProfile.image,
                        name: userProfile.name,
                        email: userProfile.email,
                        about: userProfile.about,
                        userName: userProfile.userName,
                        phoneNumber: userProfile.phoneNumber,
                    };
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        },
        updateProfile() {
            const userId = localStorage.getItem('userId');
            axios
                .put(`http://localhost:8082/api/v1/users/${userId}`, this.userProfile, {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((response) => {
                    Swal.fire({
                        title: 'Profile Updated!',
                        text: 'Your profile has been successfully updated.',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    }).then(() => {
                        this.$router.push(`/profile/${userId}`); 
                    });
                })
                .catch((error) => {
                    console.error('Error updating profile:', error);
                });
        },
        deleteAccount() {
            const userId = localStorage.getItem('userId');
            axios
                .delete(`http://localhost:8082/api/v1/users/${userId}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((response) => {
                    alert('Account deleted successfully');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userId');
                    this.$router.push('/login');
                })
                .catch((error) => {
                    console.error('Error deleting account:', error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.profile-img {
    width: 168px;
    height: 168px;
    border-radius: 50%;
    background-color: $white;
    border: 2px solid $light-gray;
    padding: 4px;
}

.update-profile {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;

    .form-group {
        margin-bottom: 15px;
    }

    button {
        margin-top: 20px;
    }
}
</style>
