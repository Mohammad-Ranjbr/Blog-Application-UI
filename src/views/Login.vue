<template>
  <div class="container auth-container">
    <div class="row">
      <left-auth></left-auth>

      <div class="right-col text-center">
        <div class="header">
          <a href="/" class="header__link">
            <h2 class="header__title">Blogino</h2>
          </a>

          <p class="header__info">
            Log in to <span>Blogino</span> to see photos and videos from your friends.
          </p>
        </div>

        <div class="alert alert-danger err-msg" role="alert" v-show="this.errMessage">
          {{ this.errMessage }}
        </div>

        <form>
          <div class="form-label-group">
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              
              placeholder="Enter Email ..."
              v-model="username"
            />
          </div>

          <div class="form-label-group">
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="Enter Password ..."
              v-model="password"
            />
          </div>

          <div class="options">
            <div class="options__first">
              <button
                type="submit"
                class="btn btn-primary btn-block auth-btn"
                @click.prevent="login"
              >
                Login
              </button>
            </div>

            <div class="options__second">
              <!-- <div class="forgot">
                <a href="./forget" class="forgot__link">
                  Forgot password?
                </a>
              </div> -->

              <div class="have-account">
                <span>Don't have an account?</span>
                <a href="./signup" class="have-account__link">Signup</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
        localStorage.setItem('user', JSON.stringify(user));

        window.location = '/';
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.errMessage = err.response.data.message;
        } else {
          this.errMessage = 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.';
        }
      }
    },
  },
};
</script>


<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.auth-container {
  margin-top: 20px;

  .right-col {
    background-color: $white;
    border: 1px solid $lighter-gray;
    width: 400px;
    float: right;
    margin: 20px 10px 0px 10px;
    padding: 120px 40px 40px 40px;

    @media (max-width: 992px) {
      margin: 20px auto;
    }
  }
}

.header {
  &__title {
    font-family: 'Pacifico', cursive;
    font-weight: 300;
  }

  &__link:hover {
    text-decoration: none;
    color: $main-color;
  }

  &__info {
    font-size: 17px;
    line-height: 25px;
    color: $dark-gray;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
}

.social {
  &__btn {
    padding: 5px;
  }
  &__logo {
    margin-right: 10px;
  }
}

.have-account {
  margin-top: 15px;

  &__link {
    padding: 5px;
  }
}

.options {
  &__first {
    .auth-btn {
      margin-top: 30px;
      margin-bottom: 30px;
      padding: 6px;
    }
  }
}

.form-control {
  background: $white-smoke;
  padding: 8px 10px 8px 10px;
  color: $darker-gray;
  font-size: $font-size-2x;
  line-height: 18px;
  min-height: 40px;
  margin-bottom: 1rem;
}

.err-msg {
  margin-bottom: 1rem;
  padding: 5px 10px;
}
</style>
