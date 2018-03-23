<template>
  <div class="c-loader" :class="className">
    <img ref="image"
         :class="{'js-loading': isLoading}"
         class="c-loader__loaded"
         :src="src"
         :alt="alt"/>
    <img v-if="isLoading"
         class="c-loader__spinner"
         src="../../assets/img/loading.gif"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isLoading: true
      }
    },
    props: {
      src: {
        type: String
      },
      alt: {
        type: String
      },
      className: {
        type: String
      }
    },
    mounted () {
      this.$refs.image.onload = () => {
        this.isLoading = !this.isLoading
      }
    }
  }
</script>

<style lang="scss" src="./style.scss"></style>
