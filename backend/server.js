const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = require("./src/app");

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

