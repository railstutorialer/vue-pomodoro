import Vue from 'vue';
import * as mutationTypes from './mutationTypes'
import {WORKING_TIME, RESTING_TIME, KITTEN_TIME} from '../config'

export default {
    [mutationTypes.START](state) {
        state.started = true
        state.paused = false
        state.stopped = false
        state.interval = setInterval(() => tick(state), 1000)
        if (state.isWorking && state.soundEnabled) {
            Vue.noise.start()
        }
    },
    [mutationTypes.PAUSE](state) {
        state.paused = true
        clearInterval(state.interval)
        Vue.noise.pause()
    },
    [mutationTypes.STOP](state) {
        state.stopped = true
        state.started = false
        state.paused = false
        clearInterval(state.interval)
        togglePomodoro(state, true)
        Vue.noise.stop()
    },
    [mutationTypes.TOGGLE_SOUND](state) {
        state.soundEnabled = !state.soundEnabled
        if (state.soundEnabled) {
            Vue.noise.start()
        } else {
            Vue.noise.pause()
        }
    },
    [mutationTypes.CHOOSE_MUSIC](state, music) {
        state.music = music
    }
}

function togglePomodoro (state, ...toggle) {
    if (toggle.length === 0) {
        toggle = !state.isWorking
    } else {
        toggle = toggle[0]
    }
    state.isWorking = toggle
    if (state.isWorking) {
        Vue.noise.start()
    } else {
        Vue.noise.pause()
    }

    state.counter = state.isWorking ? WORKING_TIME : RESTING_TIME
}
function tick (state) {
    if (state.counter === 0) {
        togglePomodoro(state)
    }
    state.counter--
    if (state.counter % KITTEN_TIME === 0) {
        state.timestamp = new Date().getTime()
    }
}