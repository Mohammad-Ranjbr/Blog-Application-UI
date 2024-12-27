<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Left Column -->
      <left-auth></left-auth>

      <!-- Right Column -->
      <div class="login-box">
        <div class="header">
          <a href="/" class="header__link">
            <h1 class="header__title">Blogino</h1>
          </a>
          <p class="header__subtitle">
            Sign up to <span>Blogino</span> and connect with your friends.
          </p>
        </div>

        <div v-if="errMessage" class="alert err-msg">
          {{ errMessage }}
        </div>

        <form class="login-form" @submit.prevent="signup">
          <div class="form-group">
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control"
              placeholder="Enter your full name"
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              id="username"
              v-model="userName"
              class="form-control"
              placeholder="Enter your username"
            />
          </div>

          <div class="form-group">
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              id="phoneNumber"
              v-model="phoneNumber"
              class="form-control"
              placeholder="Enter your phone number"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              placeholder="Enter your password"
            />
          </div>

          <div class="form-group">
            <textarea
              id="about"
              v-model="about"
              class="form-control"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>

          <button type="submit" class="btn-primary">
            Sign up
          </button>
        </form>

        <div class="footer">
          <p>
            Already have an account? 
            <a href="./login" class="signup-link">Login</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Signup',
  data: function() {
    return {
      name: '',
      userName: '',
      email: '',
      password: '',
      phoneNumber: '',
      about: '',
      imageData: {
        format: "",
        base64Content: ""
    },
      errMessage: '',
    };
  },
  components: {
    'left-auth': () => import('./../components/LeftAuth/LeftAuth'),
  },
  methods: {
    async signup() {
      // Check if form fields are filled correctly
      if (!this.userName) {
        this.errMessage = "Username can't be empty";
        return;
      }

      try {
        // Send signup data to the API
        const response = await axios.post('http://localhost:8082/api/v1/users/register', {
          name: this.name,
          userName: this.userName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          password: this.password,
          about: this.about,
          imageData: this.imageData
        });

        // Handle success (redirect to login page)
        this.$router.push('/login'); // Redirect to login page after successful signup
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.errMessage = err.response.data.message;
        } else {
          this.errMessage = 'An error occurred. Please try again.';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .login-container {
    display: flex;
    max-width: 900px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    overflow: hidden;

    margin-top: -200px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .login-box {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      text-align: center;
      margin-bottom: 30px;

      &__title {
        font-family: "Pacifico", cursive;
        font-size: 2.5rem;
        color: #1976d2;
      }

      &__subtitle {
        font-size: 1rem;
        color: #757575;
        margin-top: 20px;

        span {
          color: #1976d2;
          font-weight: bold;
        }
      }
    }

    .err-msg {
      background-color: #ffebee;
      color: #d32f2f;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 20px;
      width: 100%;
      text-align: center;
    }

    .login-form {
      width: 100%;

      .form-group {
        margin-bottom: 20px;

        .form-control {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          background-color: #fafafa;
          transition: border-color 0.3s ease;

          &:focus {
            border-color: #1976d2;
          }
        }
      }

      .btn-primary {
        width: 100%;
        background-color: #1976d2;
        color: white;
        border: none;
        padding: 12px;
        font-size: 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #0d47a1;
        }
      }
    }

    .footer {
      margin-top: 20px;
      font-size: 0.9rem;

      .signup-link {
        color: #1976d2;
        font-weight: bold;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

