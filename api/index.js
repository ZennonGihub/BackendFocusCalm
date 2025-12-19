import YAML from "yamljs";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import app from "../src/app.js";

const swaggerDocument = YAML.load("./openapi.yaml");

app.get("/", (req, res) => {
  res.json({ message: "API FOCUS CALM", version: "1.0.0" });
});
app.listen(3000, console.log("Server running on port 3000"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
