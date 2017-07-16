<template>
  <h3>{{isWorking ? "Work!": "Rest!"}}</h3>
</template>

<script>
import {mapGetters} from 'vuex'

export default {

  computed: mapGetters({
    isWorking: 'isWorking'
  })
}
</script>

<style>
  
</style>
