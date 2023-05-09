const fs = require("fs");
const path = require("path");

const fromFolder = path.join(__dirname, "files");
const toFolder = path.join(__dirname, "files-copy");

function copyFolders(fromPath, toPath) {
  fs.readdir(fromPath, { withFileTypes: true }, (error, items) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].isDirectory()) {
        fs.mkdir(
          path.join(toPath, items[i].name),
          { recursive: true },
          (error) => {
            if (error) {
              console.error(error);
            }
          }
        );
        copyFolders(
          path.join(fromPath, items[i].name),
          path.join(toPath, items[i].name),
          toPath + "/" + items[i].name
        );
      } else {
        fs.copyFile(
          path.join(fromPath, items[i].name),
          path.join(toPath, items[i].name),
          (error) => {
            if (error) {
              console.error(error);
            }
          }
        );
      }
    }
  });
}

fs.promises
  .rm(toFolder, {
    recursive: true,
    force: true,
  })
  .finally(function () {
    fs.promises
      .mkdir(path.join(__dirname, "files-copy"), {
        recursive: true,
      })
      .then(() => {
        copyFolders(fromFolder, toFolder);
      });
  });
