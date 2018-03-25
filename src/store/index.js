import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import mapPhotos from './helpers'

Vue.use(Vuex)

const apiKey = 'c52a3fa75dae2db2e42d116eb4ceaf71'
const defaultOptions = `?api_key=${apiKey}&format=json&nojsoncallback=1&safe_search=1`
const apiUrl = `https://api.flickr.com/services/rest/${defaultOptions}`

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    photos: [],
    gallery: [],
    userGallery: [],
    page: 1,
    pages: 0,
    total: 0,
    errors: {},
    author: ''
  },
  mutations: {
    SET_PHOTOS (state, photos) {
      state.photos = photos
    },
    SET_AUTHOR (state, author) {
      state.author = author
    },
    SET_ERRORS (state, errors) {
      state.errors = errors
    },
    SET_GALLERY (state, photos) {
      state.gallery = [...state.gallery, ...photos]
    },
    INIT_GALLERY (state) {
      state.gallery = state.photos
      state.page = 1
    },
    INIT_USER_GALLERY (state) {
      state.userGallery = state.photos
      state.page = 1
    },
    SET_PAGINATION (state, {pages, total}) {
      state.pages = pages
      state.total = total
    },
    INCREMENT_PAGE (state) {
      state.page++
    },
    RESET_ERRORS (state) {
      state.errors = {}
    }
  },
  getters: {
    GET_PHOTOS (state) {
      return state.photos
    },
    GET_GALLERY (state) {
      return state.gallery
    },
    GET_USER_GALLERY (state) {
      return state.userGallery
    },
    GET_AUTHOR (state) {
      return state.author
    },
    GET_ERRORS (state) {
      return state.errors
    },
    GET_PAGE_NUMBER (state) {
      return state.page
    },
    GET_TOTAL (state) {
      return state.total
    }
  },
  actions: {
    GET_PHOTOS ({commit, getters}, {perPage, text, extras, userId}) {
      return axios.get(`${apiUrl}&method=flickr.photos.search&page=${getters.GET_PAGE_NUMBER}&per_page=${perPage}&text=${text}&extras=${extras}tag_mode=dogs&user_id=${userId}`)
        .then(res => {
          if (res.data.stat === 'ok') {
            const photos = mapPhotos(res)
            commit('SET_PAGINATION', {
              pages: res.data.photos.pages,
              total: res.data.photos.total
            })
            commit('RESET_ERRORS')
            commit('SET_PHOTOS', photos)
          } else {
            commit('SET_ERRORS', res.data)
          }
        })
    },
    GET_AUTHOR ({commit}, id) {
      return axios.get(`${apiUrl}&method=flickr.people.getInfo&user_id=${id}`)
        .then(res => {
          if (res.data.stat === 'ok') {
            commit('RESET_ERRORS')
            commit('SET_AUTHOR', res.data.person.username._content)
          } else {
            commit('SET_ERRORS', res.data)
          }
        })
    }
  }
})
