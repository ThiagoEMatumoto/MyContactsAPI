import express from "express";
import router from "./routes.js";

const app = express();
const PORT = 3000;

// app.use((request, response)=>{
//   response.send('vc foi pego')
// })

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
