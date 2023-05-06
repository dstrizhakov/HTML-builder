const fs = require("fs");
const path = require("path");

const fromFolder = path.join(__dirname, "files");
const toFolder = path.join(__dirname, "files-copy");

fs.rm(toFolder, { recursive: true, force: true }, (error) => {
  !error ? console.log("Folder deleted successfully") : console.error(error);
  fs.mkdir(toFolder, { recursive: true }, (error) => {
    !error ? console.log("Folder created successfully") : console.error(error);
    fs.readdir(fromFolder, { withFileTypes: true }, (error, files) => {
      if (error) {
        console.error(error);
      } else {
        for (let file of files) {
          if (file.isFile()) {
            fs.copyFile(
              path.join(fromFolder, file.name),
              path.join(toFolder, file.name),
              (error) => {
                error
                  ? console.error(error)
                  : console.log(`File ${file.name} copied successfully`);
              }
            );
          }
        }
      }
    });
  });
});
