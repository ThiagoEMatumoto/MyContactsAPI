import express from "express";
import router from "./routes.js";
import "express-async-errors";

const app = express();
const PORT = 3000;

// app.use((request, response)=>{
//   response.send('vc foi pego')
// })

app.use(express.json());

app.use("/api", router);

// Middleware de tratamento de erros
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Algo deu errado!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
