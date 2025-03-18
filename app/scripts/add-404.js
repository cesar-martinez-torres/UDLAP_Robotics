const fs = require("fs-extra");

// Path to 404.html file and the build directory
const source = "./public/404.html";
const destination = "./build/404.html";

fs.copy(source, destination, (err) => {
  if (err) {
    console.error("Error copying 404.html:", err);
  } else {
    console.log("404.html copied to build directory!");
  }
});
