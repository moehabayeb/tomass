/**
 * VAD AudioWorklet Processor
 * Runs in AudioWorklet thread for optimal performance
 */
class VADProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];

    if (input && input.length > 0) {
      const inputChannel = input[0];

      if (inputChannel && inputChannel.length > 0) {
        // Calculate RMS
        let sum = 0;
        for (let i = 0; i < inputChannel.length; i++) {
          sum += inputChannel[i] * inputChannel[i];
        }
        const rms = Math.sqrt(sum / inputChannel.length);

        // Send data to main thread
        this.port.postMessage({
          rms: rms,
          samples: inputChannel.slice() // Copy the array
        });
      }
    }

    // Keep processor alive
    return true;
  }
}

registerProcessor('vad-processor', VADProcessor);