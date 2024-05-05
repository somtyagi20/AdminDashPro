import connectDB from "./DB/config.js";
import app from "./app.js";
import "dotenv/config";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Server Error: ", error);
      process.exit(1);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Server Error: ", error);
    process.exit(1);
  });
