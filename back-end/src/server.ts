import app, { init } from "./app";

const port = 8080;

init().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
});