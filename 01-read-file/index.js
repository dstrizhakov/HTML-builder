const fs = require("fs");
const path = require("path");

const url = path.join(__dirname, "text.txt");
const readStream = fs.createReadStream(url);

readStream.on("data", (chunk) => {
  process.stdout.write(chunk);
});
