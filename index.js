
'use strict';

const GoogleCloudSpeech = require('@google-cloud/speech');

/**
 * Wrapper for Google Speech API to send raw buffered audio to recognize.
 * @example
 * const Speech = require('../google-speech-from-buffer');
 * let speech = new Speech({
 *   sampleRateHertz: 16000,  // default
 *   encoding: 'LINEAR16',    // default
 *   languageCode: 'en-US,    // default
 *   }
 * );
 * speech.recognize(buffer).then((statement) => {
 *   console.log(statement);
 * });
 */
class Speech {
  /**
   * @param       {Object} config
   * @param       {number} config.sampleRateHertz - Sample rate (default: 16000)
   * @param       {string} config.encoding - Encoding type (default: LINEAR16)
   * @param       {string} config.languageCode - Language code (default:en-US)
   * @constructor Speech
   */
  constructor(config) {
    let defaults = {
      sampleRateHertz: 16000,
      encoding: 'LINEAR16',
      languageCode: 'en-US',
    };

    // extend defaults
    this.config = Object.assign({}, defaults, config);

    // make sure a service key is there, bail if not
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS === undefined) {
      console.log('Your google service account key and project environment ');
      console.log('variables are required. Create it here within your GCP');
      console.log('project: https://console.cloud.google.com/apis/credentials');
      console.log('Then export it so the app can use it like this:');
      console.log('> export GOOGLE_APPLICATION_CREDENTIALS=[json file]');
      process.exit(0);
    }
  }

  /**
   * A promise when speech recognition is complete
   *
   * @promise speechRecognitionPromise
   * @fulfill {string} The translated response from speech recognition
   * @reject {Error} Google API did not return a valid response
   */

  /**
   * Send buffer to Google Speech APIs
   * @param  {Buffer} buffer - Raw audio data from file or stream
   * @return {speechRecognitionPromise} A promise when recognition is complete
   */
  recognize(buffer) {
    let self = this;
    return new Promise(function(resolve, reject) {
      const audio = {
        content: buffer.toString('base64'),
      };
      const request = {
        audio: audio,
        config: self.config,
      };

      // Detects speech in the audio file
      let speechClient = new GoogleCloudSpeech();
      speechClient.recognize(request)
        .then((results) => {
          if (typeof(results[0]) !== 'undefined' &&
              typeof(results[0].results[0]) !== 'undefined') {
            return resolve(results[0].results[0].alternatives[0].transcript);
          } else {
            return resolve('');
          }
        }).catch((err) => {
          return reject(err);
        });
    });
  }
}

module.exports = Speech;
