const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

async function downloadVideo(videoUrl, fileName, folderName, ) {
  const outputFile = path.join(folderName, `${fileName}.mp4`);

  if (fs.existsSync(outputFile)) {
    console.log('Video already downloaded');
    return outputFile;
  }

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  const videoStream = ytdl(videoUrl, { quality: 'highest' });
  const writeStream = fs.createWriteStream(outputFile);

  function resolve() {
    console.log('Video downloaded');
    resolve(outputFile);
  }

  function reject(err) {
    console.log('Error downloading video');
    reject(err);
  }

  return new Promise((resolve, reject) => {
    videoStream.pipe(writeStream);
    writeStream.on('finish', resolve);
    videoStream.on('error', reject);
  });
}

module.exports = {
  downloadVideo,
};