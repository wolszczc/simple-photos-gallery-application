import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mapPhotos from './helpers'

Vue.use(Vuex)

// const apiKey = 'c52a3fa75dae2db2e42d116eb4ceaf71'
const apiKey = 'c52a3fa75dae2db2e42d116eb4ceaf71'
const apiUrl = `https://api.flickr.com/services/rest/?api_key=${apiKey}&format=json&nojsoncallback=1`
// const secret = '3ba73a30b2c47274'

export default new Vuex.Store({
  state: {
    photos: [],
    gallery: [],
    page: 1,
    pages: 0,
    total: 0,
    errors: {}
  },
  mutations: {
    SET_PHOTOS (state, photos) {
      state.photos = photos
    },
    SET_ERRORS (state, errors) {
      state.errors = errors
    },
    SET_GALLERY (state, photos) {
      state.gallery = [...state.gallery, ...photos]
    },
    SET_PAGINATION (state, {pages, total}) {
      state.pages = pages
      state.total = total
    },
    INCREMENT_PAGE (state) {
      state.page++
    }
  },
  getters: {
    GET_GALLERY (state) {
      return state.gallery
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
    GET_PHOTOS ({commit, getters}, {perPage, text, extras}) {
      return axios.get(`${apiUrl}&method=flickr.photos.search&page=${getters.GET_PAGE_NUMBER}&per_page=${perPage}&text=${text}&extras=${extras}`)
        .then(res => {
          if (res.data.stat === 'ok') {
            const photos = mapPhotos(res)
            commit('SET_PAGINATION', {
              pages: res.data.photos.pages,
              total: res.data.photos.total
            })
            commit('SET_PHOTOS', photos)
            commit('SET_GALLERY', photos)
          } else {
            commit('SET_ERRORS', res.data)
          }
        })
    }
  }
})
