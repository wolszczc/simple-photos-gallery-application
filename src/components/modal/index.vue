<template>
  <div v-if="!modal.isHidden"
       class="c-modal">
    <div @click="closeModal"
         class="c-modal__close">
      <img src="../../assets/img/close.png"
           class="c-modal__close__btn"
           alt="close"/>
    </div>
    <div class="c-modal__wrapper">
      <image-loader alt="Nice photo"
                    :src="modal.url">
      </image-loader>
      <div class="c-modal__description">
        <div class="c-modal__description__title">
          Author:
        </div>
        <img v-if="isLoading"
             src="../../assets/img/loading.gif"
             class="c-modal__loading"
             alt="Loading...">
        <div v-if="!isLoading"
             class="c-modal__description__context">
          {{author}}
        </div>
        <div class="c-modal__description__title">
          Date:
        </div>
        <div class="c-modal__description__context">
          {{modal.date}}
        </div>
        <div class="c-modal__description__title">
          Description:
        </div>
        <div class="c-modal__description__context">
          {{modal.description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageLoader from '../../components/imageLoader'
  import AuthorBus from '../../buses/author'

  export default {
    components: {
      ImageLoader
    },
    data () {
      return {
        isLoading: true
      }
    },
    props: {
      modal: {
        type: Object
      }
    },
    mounted () {
      AuthorBus.$on('get-author', this.getAuthor)
    },
    computed: {
      author () {
        return this.$store.getters.GET_AUTHOR
      }
    },
    methods: {
      closeModal () {
        this.modal.isHidden = !this.modal.isHidden
        this.isLoading = true
      },
      getAuthor () {
        this.$store.dispatch('GET_AUTHOR', this.modal.author)
          .then(() => {
            this.isLoading = false
          })
      }
    }
  }
</script>

<style lang="scss" src="./style.scss"></style>
