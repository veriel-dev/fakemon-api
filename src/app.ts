
import * as dotenv from "dotenv"
import Server from "./server"
dotenv.config()

const server = new Server()
server.start()