const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Sucessful");
  }
});
