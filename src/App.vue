<template>
  <div class="container" v-noise="'brown'">
    <h2>
      <span>{{'Pomodoro' | uppercase | addspace}}</span>
      <controls-component></controls-component>
    </h2>
    <state-title-component></state-title-component>
    <countdown-component v-show="isWorking"></countdown-component>
    <transition name="fade">
      <kittens-component v-show="!isWorking"></kittens-component>
    </transition>
    <music-component></music-component>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ControlsComponent from './components/ControlsComponent'
import CountdownComponent from './components/CountdownComponent'
import KittensComponent from './components/KittensComponent'
import StateTitleComponent from './components/StateTitleComponent'
import MusicComponent from './components/MusicComponent'
import store from './vuex/store'

export default {
  components: { ControlsComponent, CountdownComponent, KittensComponent, StateTitleComponent, MusicComponent },
  store: store,
  computed: mapGetters({
    isWorking: 'isWorking'
  })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
