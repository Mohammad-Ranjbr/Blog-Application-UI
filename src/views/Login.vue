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
            Log in to <span>Blogino</span> to see photos and videos from your friends.
          </p>
        </div>

        <div v-if="errMessage" class="alert err-msg">
          {{ errMessage }}
        </div>

        <form class="login-form" @submit.prevent="login">
          <div class="form-group">
            <input
              type="email"
              id="email"
              v-model="username"
              class="form-control"
              placeholder="Enter your email"
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

          <button type="submit" class="btn-primary">
            Login
          </button>
        </form>

        <div class="footer">
          <p>
            Don’t have an account? 
            <a href="./signup" class="signup-link">Signup</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';

export default {
  name: 'Login',
  data: function() {
    return {
      username: '',
      password: '',
      errMessage: '',
    };
  },
  components: {
    'left-auth': () => import('./../components/LeftAuth/LeftAuth'),
    'or-divider': () => import('./../components/OrDivider/OrDivider'),
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8082/api/v1/auth/login', {
          username: this.username,
          password: this.password,
        });

        const { access_token, user } = response.data;

        localStorage.setItem('accessToken', access_token);

        let decoded = VueJwtDecode.decode(access_token);
        localStorage.setItem('userId', decoded.id);

        window.location = '/';
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.errMessage = err.response.data.message;
        } else {
          this.errMessage = error.response?.data?.message || "An error occurred. Please try again.";
        }
      }
    }
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
