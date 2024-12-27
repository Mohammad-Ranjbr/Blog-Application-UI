<template>
    <div class="settings-page">
      <div class="settings-header">
        <h2>Update Your Profile</h2>
        <p>Manage your account details and preferences</p>
      </div>
  
      <div class="settings-card">
        <div class="profile-section">
          <div class="profile-img-wrapper">
            <img :src="userProfile.image ? `data:image/jpeg;base64,${userProfile.image}` : 'default-image.jpg'" 
            alt="Profile" @click="openFileSelector"/>
          </div>
        </div>

        <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" accept="image/*" />
  
        <form class="settings-form" @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="userProfile.name" id="name" placeholder="Your full name" />
          </div>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="userProfile.email" id="email" placeholder="Your email address" />
          </div>
  
          <div class="form-group">
            <label for="about">About</label>
            <textarea v-model="userProfile.about" id="about" placeholder="A short bio about yourself"></textarea>
          </div>
  
          <div class="form-group">
            <label for="userName">Username</label>
            <input type="text" v-model="userProfile.userName" id="userName" placeholder="Your username" />
          </div>
  
          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input type="text" v-model="userProfile.phoneNumber" id="phoneNumber" placeholder="Your phone number" />
          </div>
  
          <button type="submit" class="btn-primary">Save Changes</button>
        </form>
  
        <button class="btn-danger delete-account-btn" @click="deleteAccount">Delete Account</button>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import EventBus from '@/router/event-bus.js';

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
            selectedFile: null,
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
        openFileSelector() {
            this.$refs.fileInput.click();
        },

        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.userProfile.image = reader.result.split(',')[1];
                    this.uploadProfileImage();
                };
                reader.readAsDataURL(file);
            }
        },
        uploadProfileImage() {
            const userId = localStorage.getItem('userId');
            if (this.selectedFile) {
                axios
                    .patch(
                        `http://localhost:8082/api/v1/users/${userId}/profile-image`,
                        {
                            format: 'jpg',
                            base64Content: this.userProfile.image,
                        },
                        {
                            headers: {
                                Authorization: `${localStorage.getItem('accessToken')}`,
                            },
                        }
                    )
                    .then((response) => {
                        Swal.fire({
                            title: 'Profile Image Updated!',
                            text: 'Your profile image has been successfully updated.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            EventBus.$emit('profile-updated');
                        });
                    })
                    .catch((error) => {
                        console.error('Error uploading profile image:', error);
                    });
            }
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
            Swal.fire({
                title: 'Are you sure you want to delete your account?',
                text: 'This action is irreversible.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(`http://localhost:8082/api/v1/users/${userId}`, {
                            headers: {
                                Authorization: `${localStorage.getItem('accessToken')}`,
                            },
                        })
                        .then((response) => {
                            Swal.fire({
                                title: 'Account Deleted',
                                text: 'Your account has been successfully deleted.',
                                icon: 'success',
                                confirmButtonText: 'OK',
                            }).then(() => {
                                localStorage.removeItem('accessToken');
                                localStorage.removeItem('userId');
                                this.$router.push('/login');
                            });
                        })
                        .catch((error) => {
                            console.error('Error deleting account:', error);
                        });
                }
            });
        }
    },
};
</script>

<style lang="scss" scoped>
.settings-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
  color: #333;

  .settings-header {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      font-size: 2rem;
      color: #007bff;
    }

    p {
      font-size: 1rem;
      color: #555;
    }
  }

  .settings-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 30px;

    .profile-section {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .profile-img-wrapper {
        position: relative;
        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #007bff;
          margin-bottom: 10px;
        }

        .btn-upload {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 5px 15px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: #0056b3;
          }
        }
      }
    }

    .settings-form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      margin-top: 20px;

      .form-group {
        label {
          font-weight: 600;
          margin-bottom: 5px;
          display: inline-block;
        }

        input,
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s;

          &:focus {
            border-color: #007bff;
          }
        }

        textarea {
          min-height: 100px;
          resize: none;
        }
      }

      .btn-primary {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #0056b3;
        }
      }
    }

    .delete-account-btn {
      display: block;
      width: 100%;
      text-align: center;
      background-color: #dc3545;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 20px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #a71d2a;
      }
    }
  }
}
</style>