<template>
  <div class="login">
    <div class="container auth-container">
      <div class="row">
        <left-auth></left-auth>

        <div class="right-col text-center">
          <div class="header">
            <a href="/" class="header__link">
              <h2 class="header__title">Blogino</h2>
            </a>

            <p class="header__info">
              Sign up to <span>Blogino</span> and connect with your friends.
            </p>
          </div>

          <div class="alert alert-danger err-msg" role="alert" v-show="this.errMessage">
            {{ this.errMessage }}
          </div>

          <form>
            <div class="form-label-group">
              <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                placeholder="Full Name ..."
                v-model="name"
              />
            </div>

            <div class="form-label-group">
              <input
                type="text"
                name="userName"
                id="userName"
                class="form-control"
                placeholder="Username ..."
                v-model="userName"
              />
            </div>

            <div class="form-label-group">
              <input
                type="email"
                name="email"
                id="email"
                class="form-control"
                placeholder="Email ..."
                v-model="email"
              />
            </div>

            <div class="form-label-group">
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                class="form-control"
                placeholder="Phone Number ..."
                v-model="phoneNumber"
              />
            </div>

            <div class="form-label-group">
              <input
                type="password"
                name="password"
                id="password"
                class="form-control"
                placeholder="Password ..."
                v-model="password"
              />
            </div>

            <div class="form-label-group">
              <textarea
                name="about"
                id="about"
                class="form-control"
                placeholder="About You ..."
                v-model="about"
              ></textarea>
            </div>

            <div class="options">
              <div class="options__first">
                <button type="button" class="btn btn-primary btn-block auth-btn" @click="signup">
                  Signup
                </button>
              </div>

              <div class="options__second">
                <p class="conditions">
                  By signing up, you agree to <span>our Terms</span>, <span>Data Policy</span> and
                  <span>Cookies Policy</span>
                </p>

                <div class="have-account">
                  <span>Already have an account?</span>
                  <a href="./login" class="have-account__link">Login</a>
                </div>
              </div>
            </div>
          </form>
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
* {
  padding: 0;
  margin: 0;
}

.auth-container {
  margin-top: 0px;

  .right-col {
    background-color: $white;
    border: 1px solid $lighter-gray;
    width: 400px;
    float: right;
    margin: -20px 10px 0px 10px;
    padding: 80px 40px 40px 40px;

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

.options {
  .options__first {
    .auth-btn {
      margin-top: 30px;
      margin-bottom: 30px;
      padding: 6px;
    }
  }

  .options__second {
    .have-account {
      margin-top: 15px;

      &__link {
        padding: 5px;
      }
    }

    .conditions {
      color: $dark-gray;

      span {
        font-weight: 600;
      }
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
