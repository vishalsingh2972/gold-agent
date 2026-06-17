import ffmpeg from 'fluent-ffmpeg';

const FFMPEG_PATH = "PASTE_YOUR_FULL_PATH_HERE"; 
ffmpeg.setFfmpegPath(FFMPEG_PATH);

export function convertToOgg(input: string, output: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .toFormat('ogg')
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .save(output);
  });
}