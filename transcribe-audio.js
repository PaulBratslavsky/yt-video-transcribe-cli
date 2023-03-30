const fs = require('fs');
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function transcribeAudio(fileLocation, folderName, fileName) {
  const audioFile = fs.createReadStream(fileLocation);

  console.log("Transcribing audio file...");
  const resp = await openai.createTranscription(audioFile, "whisper-1");

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  console.log(resp.data.text)

  fs.writeFile(`./${folderName}/${fileName}.txt`, resp.data.text, 'utf8',
    function (err) {
      if (err) {
        console.log("An error occurred while writing JSON Object to File.");
        return console.log(err);
      }
    });
}

module.exports = {
  transcribeAudio,
};
