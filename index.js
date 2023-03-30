#!/usr/bin/env node

const { program } = require('commander');
const { downloadVideo } = require('./download-video');
const { convertVideo } = require('./convert-video');
const { transcribeAudio } = require('./transcribe-audio');

// Define the CLI tool version
program.version('1.0.0');

// Example command
program
  .command('greet <name>')
  .option('-c, --capitalize', 'Capitalize the name')
  .description('Greets the user with their name')
  .action((name, options) => {
    let output = `Hello, ${options.capitalize ? name.toUpperCase() : name}!`;
    console.log(output);
  });

// Download YouTube Video To Folder Command
program
  .command('download <videoUrl> <folderName> <fileName>')
  .description('Downloads a YouTube video to a specified folder')
  .action((videoUrl, fileName, folderName,) => {
    if (!videoUrl || !fileName || !folderName) {
      console.error('Error: Missing one or more required arguments.');
      process.exit(1);
    }

    downloadVideo(videoUrl, fileName, folderName)
  });

// Convert Video To MP3 Command
program
  .command('convert <videoFilePath> <outputFilename> <outputFolder>')
  .description('Converts a video to an MP3 file')
  .action((videoFilePath, outputFilename, outputFolder) => {
    if (!videoFilePath || !outputFilename || !outputFolder) {
      console.error('Error: Missing one or more required arguments.');
      process.exit(1);
    }
    convertVideo(videoFilePath, outputFilename, outputFolder)
  });

// Transcribe Audio To Text Command
program
  .command('transcribe <fileLocation> <folderName> <fileName>')
  .description('Transcribes an audio file to text')
  .action((fileLocation, folderName, fileName) => {
    if (!fileLocation || !folderName || !fileName) {
      console.error('Error: Missing one or more required arguments.');
      process.exit(1);
    }
    transcribeAudio(fileLocation, folderName, fileName)
  });

program
  .command('transcribe-video <videoUrl> <Folder> <Filename>')
  .description('Transcribes a video from a URL to text')
  .action(async (videoUrl, Folder, Filename) => {
    
    if (!videoUrl || !Folder || !Filename) {
      console.error('Error: Missing one or more required arguments.');
      process.exit(1);
    }

    console.log('Downloading video...')
    await downloadVideo(videoUrl, Filename, Folder);
    const videoFilePath = `${Folder}/${Filename}.mp4`;
    console.log('Video downloaded', videoFilePath);

    console.log('Converting video to audio...')
    await convertVideo(videoFilePath, Filename, Folder);
    const audioFilePath = `${Folder}/${Filename}.mp3`;
    console.log('Video converted to audio', audioFilePath);

    // Transcribe audio to text
    console.log('Transcribing audio to text...')
    await transcribeAudio(audioFilePath, Folder, Filename);
    console.log('Audio transcribed to text');
  });


// Parse command line arguments
program.parse(process.argv);