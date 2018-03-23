<template>
  <div id="app">
    <errors/>
    <gallery/>
  </div>
</template>

<script>
  import Gallery from './sections/gallery'
  import Errors from './components/errors'

  export default {
    components: {
      Gallery,
      Errors
    }
  }
</script>

<style src="./assets/scss/main.scss" lang="scss"></style>
