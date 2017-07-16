<template>
    <div>
        <button :disabled="isStarted && !isPaused" @click="start">
            <i class="glyphicon glyphicon-play"></i>
        </button>
        <button :disabled="!isStarted || isPaused" @click="pause">
            <i class="glyphicon glyphicon-pause"></i>
        </button>
        <button :disabled="!isStarted" @click="stop">
            <i class="glyphicon glyphicon-stop"></i>
        </button>
        
        <div class="right-buttons">
            <i class="toggle-volume glyphicon" v-show="isStarted && !isPaused" 
                @click="toggleSound" :class="{ 'glyphicon-volume-up': isSoundEnabled, 
                'glyphicon-volume-off': !isSoundEnabled}" ></i>
            
            <div class="music-chooser" v-show="isStarted && !isPaused && !isWorking">
                <i class="choose-music glyphicon glyphicon-music"
                    @click="chooseMusic"></i>

                <input type="file" ref="file-chooser" class="file-chooser" @change="onMusicChosen($event.target.files)">
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: mapGetters(['isStarted', 'isPaused', 'isStopped', 'isSoundEnabled', 'isWorking']),
    methods: {
        start() {
            this.$store.dispatch('start')
        },
        stop() {
            this.$store.dispatch('stop')
        },
        pause() {
            this.$store.dispatch('pause')
        },
        toggleSound() {
            this.$store.dispatch('toggleSound')
        },
        chooseMusic() {
            console.log(this)
            this.$refs['file-chooser'].dispatchEvent(new Event('click'))
        },
        onMusicChosen(files) {
            var file = files[0]
            var music = URL.createObjectURL(file)
            this.$store.dispatch('chooseMusic', music)
        }
    }
}
</script>

<style scoped>
  button:disabled i {
      color: gray;
  }
  .right-buttons {
      float: right;
  }
  .toggle-volume {
      cursor: pointer;
  }
  .music-chooser {
      display: inline-block;
      cursor: pointer;
      position: relative;
  }
  .choose-music {
      position: absolute;
  }
  .file-chooser {
      opacity: 0;
      position: absolute;
  }
</style>
