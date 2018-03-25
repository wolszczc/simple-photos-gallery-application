<template>
  <section class="c-gallery">
    <modal :modal="modal"></modal>
    <div class="row">
      <div class="column small-12">
        <h1 class="u-text--center c-gallery__header">
          Gallery
        </h1>
        <hr>
        <p class="c-gallery__total">
          All records: {{totalPhotos}}
        </p>
      </div>
      <div class="column small-12 medium-6 large-3 c-gallery__wrapper"
           v-for="(photo, index) in photos"
           @click="showModal(photo)"
           v-bind:key="index">
        <image-loader className="c-gallery__photo"
                      alt="Nice dog"
                      :src="photo.url">
        </image-loader>
        <div class="c-gallery__title">
          {{photo.title}}
        </div>
      </div>
      <div class="column small-12 c-gallery__loader">
        <img v-if="isLoading"
             class="c-gallery__loader__spinner"
             src="@/assets/img/loading.gif"/>
      </div>
    </div>
  </section>
</template>

<script>
  import ImageLoader from '@/components/imageLoader'
  import Modal from '@/components/modal'
  import throttle from 'lodash/throttle'
  import AuthorBus from '@/buses/author'

  export default {
    components: {
      Modal,
      ImageLoader
    },
    data () {
      return {
        modal: {
          isHidden: true
        },
        searchConfig: {
          perPage: 100,
          text: 'dog',
          extras: 'description, date_taken, owner_name',
          userId: ''
        },
        isLoading: false
      }
    },
    created () {
      this.$store.dispatch('GET_PHOTOS', this.searchConfig)
        .then(() => {
          this.$store.commit('INIT_GALLERY')
        })
    },
    mounted () {
      this.addDownloadPhotosEvent()
    },
    computed: {
      photos () {
        return this.$store.getters.GET_GALLERY
      },
      totalPhotos () {
        return this.$store.getters.GET_TOTAL
      }
    },
    methods: {
      getAuthor () {
        AuthorBus.$emit('get-author')
      },
      addDownloadPhotosEvent () {
        const eventHandler = throttle(() => {
          if (this.isEndOfPage()) {
            this.addPhotos()
            window.removeEventListener('scroll', eventHandler)
          }
        }, 500)
        window.addEventListener('scroll', eventHandler)
      },
      isEndOfPage () {
        const scrollDepth = window.innerHeight + window.scrollY + 100
        return scrollDepth >= this.getDocHeight()
      },
      addPhotos () {
        this.toggleSpinner(true)
        this.$store.commit('INCREMENT_PAGE')
        this.$store.dispatch('GET_PHOTOS', this.searchConfig)
          .then(() => {
            const photos = this.$store.getters.GET_PHOTOS
            this.$store.commit('SET_GALLERY', photos)
            this.toggleSpinner(false)
            this.addDownloadPhotosEvent()
          })
      },
      getDocHeight () {
        return Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
      },
      showModal (photo) {
        this.modal.url = photo.url
        this.modal.date = photo.date
        this.modal.author = photo.ownerName
        this.modal.title = photo.title || 'No title.'
        this.modal.description = photo.description._content || 'No description.'
        this.modal.isHidden = !this.modal.isHidden
        this.getAuthor()
      },
      toggleSpinner (isLoading) {
        this.isLoading = isLoading
      }
    }
  }
</script>

<style lang="scss" src="./style.scss"></style>
