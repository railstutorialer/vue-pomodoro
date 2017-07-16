import * as mutationTypes from './mutationTypes'

export default {
    start(state) {
        state.commit(mutationTypes.START)
    },
    pause(state) {
        state.commit(mutationTypes.PAUSE)
    },
    stop(state) {
        state.commit(mutationTypes.STOP)
    },
    toggleSound(state) {
        state.commit(mutationTypes.TOGGLE_SOUND)
    },
    chooseMusic(state, music) {
        state.commit(mutationTypes.CHOOSE_MUSIC, music)
    }
}