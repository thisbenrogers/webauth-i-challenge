const server = require("./API/server.js");

const port = 6000;

server.listen(port, () => {
  console.log(`\n <<< Running on localhost:${port} >>> \n`);
});
