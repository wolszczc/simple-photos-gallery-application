<template>
  <div v-if="errors"
       class="c-errors">
    Error: {{errors.message}}
  </div>
</template>

<script>
  export default {
    computed: {
      errors () {
        const error = this.$store.getters.GET_ERRORS
        if (error.stat === 'fail') {
          console.error({error})
          return error
        }
        return false
      }
    }
  }
</script>

<style lang="scss">
  .c-errors {
    background: red;
    text-align: center;
    padding: 10px;
    color: #fff;
    font-weight: 700;
  }
</style>
