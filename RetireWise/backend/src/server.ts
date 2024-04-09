import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { userRouter } from "./routes/user.routes";
import { moduleRouter } from "./routes/module.routes";
import { termRouter } from "./routes/terms.routes";
import { definitionRouter } from "./routes/definitions.routes";
import { videoRouter } from "./routes/video.routes";
import { quizRouter } from "./routes/quiz.routes";
import { expenseRouter } from "./routes/expense.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/users", userRouter);
    app.use("/modules", moduleRouter);
    app.use("/terms", termRouter);
    app.use("/definitions", definitionRouter)
    app.use("/videos", videoRouter);
    app.use("/quiz", quizRouter);
    app.use("/expense", expenseRouter)

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));
