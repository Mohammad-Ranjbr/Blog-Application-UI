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
            برای مشاهده عکس‌ها و ویدیوهای دوستانتان وارد Blogino شوید.
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
              
              placeholder="ایمیل"
              v-model="email"
            />
          </div>

          <div class="form-label-group">
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="رمز عبور"
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
                ورود
              </button>
            </div>

            <div class="options__second">
              <!-- <div class="forgot">
                <a href="./forget" class="forgot__link">
                  Forgot password?
                </a>
              </div> -->

              <div class="have-account">
                <span>حساب کاربری ندارید ؟ </span>
                <a href="./signup" class="have-account__link">ایجاد حساب کاربری</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // برای ارسال درخواست به API از axios استفاده می‌کنیم

export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
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
        const response = await axios.post('https://your-api-endpoint.com/login', {
          email: this.email,
          password: this.password,
        });

        // فرض می‌کنیم پاسخ شامل توکن و اطلاعات کاربر است
        const { token, user } = response.data;

        // ذخیره اطلاعات توکن در localStorage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        // هدایت به صفحه اصلی
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
