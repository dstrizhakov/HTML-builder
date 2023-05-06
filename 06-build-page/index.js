const fs = require("fs");
const path = require("path");

const distPath = path.join(__dirname, "project-dist");
const assetsPath = path.join(__dirname, "assets");
const cssPath = path.join(__dirname, "styles");

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

function buildCss(fromPath, toPath) {
  let writeStreamCss = fs.createWriteStream(path.join(toPath, "style.css"));
  fs.readdir(fromPath, (error, files) => {
    !error
      ? files.forEach((file) => {
          if (path.parse(file).ext === ".css") {
            let readStreamCss = fs.createReadStream(
              path.join(fromPath, file),
              "utf-8"
            );
            readStreamCss.pipe(writeStreamCss);
          }
        })
      : console.error(error);
  });
}

fs.mkdir(distPath, { recursive: true }, (error) => {
  if (!error) {
    // create css
    buildCss(cssPath, distPath);
    // copy assets
    fs.mkdir(path.join(distPath, "assets"), { recursive: true }, (error) => {
      if (!error) {
        copyFolders(assetsPath, path.join(distPath, "assets"));
      } else {
        console.error(error);
      }
    });
    // creat index.html
    fs.readFile(
      path.join(__dirname, "template.html"),
      "utf-8",
      (error, buffer) => {
        if (!error) {
          fs.readdir(path.join(__dirname, "components"), (error, files) => {
            if (!error) {
              files.forEach((file) => {
                fs.readFile(
                  path.join(__dirname, "components", file),
                  "utf-8",
                  (error, content) => {
                    if (!error) {
                      buffer = buffer.replace(
                        `{{${path.parse(file).name}}}`,
                        content
                      );
                      let indexWriteStream = fs.createWriteStream(
                        path.join(__dirname, "project-dist", "index.html")
                      );
                      indexWriteStream.write(buffer);
                    } else {
                      console.error(error);
                    }
                  }
                );
              });
            } else {
              console.error(error);
            }
          });
        } else {
          console.error(error);
        }
      }
    );
  } else {
    console.error(error);
  }
});
