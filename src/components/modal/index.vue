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
        <div class="c-modal__description__context">
          {{modal.author}}
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

  export default {
    components: {
      ImageLoader
    },
    props: {
      modal: {
        type: Object
      }
    },
    methods: {
      closeModal () {
        this.modal.isHidden = !this.modal.isHidden
      }
    }
  }
</script>

<style lang="scss" src="./style.scss"></style>
