# google-speech-from-buffer

Wrapper for Google Speech API designed to pass in a buffer and return a recognized text.

## Google API Service key
To use Google Speech APIs you must have your api turned on with billing enabled.  Walking through the quick start and running example code is the best way to make sure this is set up properly

https://cloud.google.com/speech/docs/getting-started

Once you have competed this, you can create your Service Account Key JSON file default credentials with the appropriate access here:

https://console.cloud.google.com/apis/credentials

Once you save your JSON file to disk, you then must export it so your application can use it.

```sh
export GOOGLE_APPLICATION_CREDENTIALS=/whereEver/yourKeyFile.json
```

## Usage

```javascript
const Speech = require('google-speech-from-buffer');

let speech = new Speech({
  sampleRateHertz: 16000,  // default
  encoding: 'LINEAR16',    // default
  languageCode: 'en-US',    // default
  }
);

speech.recognize(buffer).then((statement) => {
  console.log(statement);
}).catch((error) => {
  console.log(error);
});
```
