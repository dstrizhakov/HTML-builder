const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "project-dist", "bundle.css");
const cssPath = path.join(__dirname, "styles");

let writeStream = fs.createWriteStream(bundlePath);

fs.readdir(cssPath, (error, files) => {
  error
    ? console.error(error)
    : files.forEach((file) => {
        if (path.parse(file).ext === ".css") {
          let readStrim = fs.createReadStream(path.join(cssPath, file));
          readStrim.pipe(writeStream);
        }
      });
});
