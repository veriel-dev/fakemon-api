import chalk from "chalk";
import cors from "cors";
import express, { Express } from "express";
import path from "path";
import { conenctDB } from "../config/database";
import AppRouter from "../routes/fakemon.routes";

class Server {
  private app: Express;
  private port: number;
  private rootDir: string;
  constructor() {
    this.app = express();
    this.rootDir = path.resolve(__dirname, "../..");
    this.middleware();
    this.initializeDatabase();
    this.routes();
    this.static();
    this.port = Number(process.env.PORT) || 3000;
  }
  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private static(): void {
    // configureImageHandling("/api/v1/fakemons/assets", this.app);

    this.app.use(
      "/api/v1/fakemons/assets",
      express.static(path.join(this.rootDir, "public"), {
        maxAge: "7d",
        immutable: true,
        index: false,
        etag: true,
        lastModified: true,
        extensions: ["webp"],
        setHeaders: (res, path) => {
          if (path.endsWith(".webp")) {
            res.set("Content-Type", "image/webp");
          }
          res.set("Cache-Control", "public, max-age=604800, immutable");
        },
      })
    );
  }
  private routes(): void {
    this.app.use("/api/v1/fakemons", AppRouter);
  }
  private async initializeDatabase(): Promise<void> {
    await conenctDB();
  }
  public start(): void {
    this.app.listen(this.port, () => {
      console.log("=".repeat(50));
      console.log(chalk.cyan("➜") + chalk.green(" SERVER STATUS"));
      console.log(
        chalk.yellow("📡") +
          chalk.green(
            ` http://localhost:${chalk.blue(this.port)}/api/v1/fakemons`
          )
      );
      console.log(chalk.yellow("🚀") + chalk.green(" Server is ready"));
      console.log("=".repeat(50));
      console.log(
        chalk.yellow("📡 Las imágenes estáticas están disponibles en ") +
          chalk.green(
            ` http://localhost:${chalk.blue(
              this.port
            )}/api/v1/fakemons/assets/images/`
          )
      );
    });
  }
}
export default Server;
