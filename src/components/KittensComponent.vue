<template>
    <div class="well">
      <img :src="catImgSrc" />
    </div>
</template>

<script>
export default {
  data() {
    return {
      catImgSrc: `http://thecatapi.com/api/images/get?size=med&ts=${this.$store.getters.getTimestamp}`
    }
  }
}
</script>

<style>

</style>
