const ffmpeg = require("fluent-ffmpeg");
const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  req.pipe(req.busboy); // Pipe the request to busboy

  let audioFile, videoFile;

  req.busboy.on("file", (fieldname, file, filename) => {
    if (fieldname === "audio") audioFile = file;
    if (fieldname === "video") videoFile = file;
  });

  req.busboy.on("finish", () => {
    // Process the video and audio here using ffmpeg
    const processedVideo = ffmpeg()
      .input(videoFile)
      .input(audioFile)
      .outputOptions([
        // Add options to loop the video and match audio length
      ])
      .format("mp4");

    res.setHeader("Content-Type", "video/mp4");
    processedVideo.pipe(res);
  });
});

module.exports = router;
