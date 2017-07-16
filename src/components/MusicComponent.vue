<template>
  
</template>

<script>
export default {
    created () {
        this.audio = new Audio()
        this.$store.watch((state) => state.music,
            () => {
                console.log(this.$store.state.music)
                this.audio.src = this.$store.state.music
            }
        )
        this.$store.watch((state) => state.soundEnabled && !state.isWorking && state.started && !state.paused,
            () => {
                var state = this.$store.state
                if (state.soundEnabled && !state.isWorking && state.started && ! state.paused) {
                    this.audio.play()
                } else {
                    this.audio.pause()
                }
            })
    }
}
</script>

<style>
  
</style>
