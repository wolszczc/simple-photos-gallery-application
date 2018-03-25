<template>
  <div id="app">
    <errors/>
    <div class="c-app">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import Errors from '@/components/errors'

  export default {
    components: {
      Errors
    }
  }
</script>

<style src="./assets/scss/main.scss" lang="scss"></style>
