const fs = require("fs");
const path = require("path");

const url = path.join(__dirname, "secret-folder");

fs.promises
  .readdir(url, { withFileTypes: true })
  .then((files) => {
    for (let file of files) {
      if (file.isFile()) {
        let fileName = file.name.split(".")[0];
        let fileExt = path.extname(file.name).slice(1);
        fs.stat(path.join(url, file.name), (error, stats) => {
          if (!error) {
            let fileSize = stats.size;
            console.log(`${fileName} - ${fileExt} - ${fileSize} bytes`);
          } else {
            console.log(error);
          }
        });
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });
