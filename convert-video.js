const path = require('path');
const fs = require('fs');
const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

async function convertVideo(videoFilePath, outputFilename, outputFolder) {
  const outputFile = path.join(outputFolder, `${outputFilename}.mp3`);

  if (fs.existsSync(outputFile)) {
    console.log('Video already downloaded');
    return outputFile;
  }

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  return new Promise((resolve, reject) => {
    ffmpeg(videoFilePath)
      .outputOptions([
        '-vn',
        '-acodec', 'libmp3lame',
        '-ac', '2',
        '-ab', '160k',
        '-ar', '48000'
      ])
      .save(outputFile)
      .on('error', (error) => {
        console.error('FFmpeg error:', error);
        reject(error);
      })
      .on('end', () => {
        console.log('FFmpeg process completed');
        fs.unlinkSync(videoFilePath); // remove the temporary video file
        resolve(outputFile);
      });
  });
}

module.exports = {
  convertVideo,
}; 