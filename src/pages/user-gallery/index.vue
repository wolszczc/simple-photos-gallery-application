<template>
  <div class="c-user-gallery">
    <h1>
      {{author}}'s gallery
    </h1>
    <div class="row">
      <div class="column small-12 medium-6 large-3 c-user-gallery__wrapper"
           v-for="(photo, index) in photos"
           v-bind:key="index">
        <image-loader alt="Nice dog"
                      :src="photo.url">
        </image-loader>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageLoader from '@/components/imageLoader'

  export default {
    computed: {
      author () {
        return this.$store.getters.GET_AUTHOR
      },
      photos () {
        return this.$store.getters.GET_USER_GALLERY
      }
    },
    data () {
      return {
        searchConfig: {
          perPage: 100,
          text: '',
          extras: '',
          userId: this.$route.params.id
        }
      }
    },
    created () {
      this.$store.dispatch('GET_PHOTOS', this.searchConfig)
        .then(() => {
          this.$store.commit('INIT_USER_GALLERY')
        })
    },
    components: {
      ImageLoader
    }
  }
</script>

<style lang="scss" src="./style.scss"></style>
