import express from "express";
import router from "./apiRoutes.js";
import sequelize from "./apiDatabase.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych zsynchronizowana!");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
