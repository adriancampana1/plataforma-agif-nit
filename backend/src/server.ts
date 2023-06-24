import app from "./app";
import { connectToDataBase } from "./services/database.service";

const PORT: Number = 5050;

connectToDataBase()
  .then(():void => {app.listen(PORT, (): void => console.log(`running on port ${PORT}`))})
  .catch((error: Error): void => console.log(error));