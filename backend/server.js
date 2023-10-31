const app = require("./controllers");
const PORT = 3003;

app.listen(PORT, function () {
  "use strict";
  console.log(`Server running on port ${PORT}`);
});
