const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = process;

const url = path.join(__dirname, "text.txt");
const output = fs.createWriteStream(url, "utf-8");

stdout.write(
  "Enter any text to write it to file...(write 'exit' to stop, or press crtl+c)\n"
);

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") exit();
  output.write(data);
});

process.on("exit", () => stdout.write("Check text file!\n"));
process.on("SIGINT", exit);
