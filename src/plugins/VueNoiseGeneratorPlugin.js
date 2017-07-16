var audioContext = new (window.AudioContext || window.webkitAudioContext)()
function generateWhiteNoise() {

    var bufferSize = 2 * audioContext.sampleRate
    var noiseBuffer = audioContext.createBuffer(1, 
        bufferSize, 
        audioContext.sampleRate)
    
    output = noiseBuffer.getChannelData(0)
    for (var i = 0; i < bufferSize; ++i) {
        output[i] = Math.random() * 2 - 1
    }

    noise = audioContext.createBufferSource()
    noise.buffer = noiseBuffer
    noise.loop = true
    noise.start(0)

    return noise
}

function generatePinkNoise() {
    var bufferSize = 4096

    var b0, b1, b2, b3, b4, b5, b6 = 0
    var node = audioContext.createScriptProcessor(bufferSize, 1, 1)
    node.onaudioprocess = function (e) {
        var output = e.outputBuffer.getChannelData(0)
        for (var i = 0; i < bufferSize; ++i) {
            var white = Math.random() * 2 - 1

            b0 = 0.99886 * b0 + white * 0.0555179
            b1 = 0.99332 * b1 + white * 0.0750759
            b2 = 0.96900 * b2 + white * 0.1538520
            b3 = 0.86650 * b3 + white * 0.3104856
            b4 = 0.55000 * b4 + white * 0.5329522
            b5 = -0.7616 * b5 - white * 0.0168980

            var result = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
            result = result * 0.11
            output[i] = result
            b6 = white * 0.115926
        }
    }

    return node
}

function generateBrownNoise() {
    var bufferSize = 4096
    
    var lastOut = 0.0
    var node = audioContext.createScriptProcessor(bufferSize, 1, 1)
    node.onaudioprocess = function (e) {
        var output = e.outputBuffer.getChannelData(0)
        for (var i = 0; i < bufferSize; ++i) {
            var white = Math.random() * 2 - 1
            output[i] = (lastOut + 0.02 * white) / 1.02
            lastOut = output[i]
            output[i] *= 3.5
        }
    }

    return node
}

export default {
    install: function (Vue) {
        Vue.directive('noise', (el, binding) => {
            var noise

            switch (binding.value) {
                case 'white':
                    noise = generateWhiteNoise()
                    break
                case 'pink':
                    noise = generatePinkNoise()
                    break
                case 'brown':
                    noise = generateBrownNoise()
                    break
            }

            noise.connect(audioContext.destination)
            audioContext.suspend()
        })

        Vue.noise = {
            start() {
                audioContext.resume()
            },
            pause() {
                audioContext.suspend()
            },
            stop() {
                audioContext.suspend()
            }
        }
    }
}