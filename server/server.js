const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.use(express.json())

app.use("/", require("./routes/root"));

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`));
