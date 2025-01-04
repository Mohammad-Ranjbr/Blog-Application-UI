<template>
  <div>
    <nav :key="navbarKey" class="navbar navbar-expand-lg fixed-top navbar-light bg-white custom-nav">
      <div class="container">
        <a class="navbar-brand brand-name" href="/">Blogino</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>
          <form @submit.prevent="handleSearchSubmit" class="form-inline my-2 my-lg-0 mr-auto">
            <input v-model="searchQuery" class="custom-nav__search" type="search" placeholder="Search Blogino ... "
              aria-label="Search" />
          </form>

          <div class="right-part custom-nav__options-list">
            <a class="custom-nav__icon" v-for="(feature, index) in features" :key="index" :href="feature.href"
              :title="feature.title">
              <img :src="feature.imgSrc" :alt="feature.title" />
            </a>

            <notification-dropdown></notification-dropdown>
            <profile-dropdown></profile-dropdown>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="showModal" class="modal show" tabindex="-1" role="dialog" style="display: block;"
      @click.self="closeModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Search Results</h5>
          </div>
          <div class="modal-body">
            <div v-if="suggestions.length > 0">
              <search-item v-for="(user, index) in suggestions" :key="index" :user="user"></search-item>
            </div>
            <div v-else>
              No results found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/router/event-bus.js';

export default {
  data: function () {
    return {
      navbarKey: 0,
      searchQuery: '',
      suggestions: [],
      showModal: false,
      debounceTimeout: null,
      features: [
        {
          href: '/',
          title: 'Home',
          imgSrc: 'https://img.icons8.com/ios/30/000000/home.png',
        },
        {
          href: '/explore',
          title: 'Explore',
          imgSrc: 'https://img.icons8.com/ios/30/000000/compass.png',
        },
        // {
        //   href: '/inbox',
        //   title: 'Chat',
        //   imgSrc: 'https://img.icons8.com/ios/30/000000/sent.png',
        // },
      ],
    };
  },
  components: {
    'notification-dropdown': () => import('./../NotificationsDropdown/NotificationsDropdown'),
    'profile-dropdown': () => import('./../ProfileDropdown/ProfileDropdown'),
    'search-item': () => import('./../SearchItem/SearchItem'),
  },
  mounted() {
    EventBus.$on('profile-updated', this.refreshNavbar);
  },
  beforeDestroy() {
    EventBus.$off('profile-updated', this.refreshNavbar);
  },
  watch: {
    searchQuery(newQuery) {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      if (newQuery.trim() === '') {
        this.suggestions = [];
        this.showModal = false;
        return;
      }
      this.debounceTimeout = setTimeout(() => {
        this.fetchSearchResults(newQuery);
      }, 300);
    }
  },
  methods: {
    async fetchSearchResults() {
      if (this.searchQuery.trim() === '') return;

      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch(`http://localhost:8082/api/v1/users/search/${this.searchQuery}`, {
          method: 'GET',
          headers: {
            'Authorization': `${accessToken}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          this.suggestions = data;
          this.showModal = true;

        } else {
          console.error('Failed to fetch search results');
        }
      } catch (error) {
        console.error('Error during search:', error);
      }
    },
    closeModal() {
      this.showModal = false;
      this.searchQuery = '';  
    }
  }
};
</script>

<style lang="scss" scoped>
@import './Navbar.scss';
</style>
