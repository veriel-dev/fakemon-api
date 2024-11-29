import chalk from "chalk";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { generateDescription } from "../generators/descriptionGenerator";
import { generateFakemon } from "../generators/fakemonGenerator";
import { Fakemon } from "../models/Fakemon";
import { Type } from "../models/Type";

dotenv.config();

const types = ["fire", "water", "grass", "electric", "rock"];
const environment = process.env.NODE_ENV || "development";
const baseUrl = process.env.BASE_URL;

export const seedFakemon = async () => {
  if (environment !== "development") {
    console.error(
      chalk.red(
        "❌ Error: El seeder solo puede ejecutarse en entorno de desarrollo"
      )
    );
    console.error(chalk.yellow('   NODE_ENV debe ser "development"'));
    process.exit(1);
  }

  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI!!);

    console.log(chalk.green("✓ Conexión a MongoDB establecida"));

    const typeDocuments = await Promise.all(
      types.map(async (typeName) => {
        const existingType = await Type.findOne({ name: typeName });
        if (existingType) return existingType;

        const newType = new Type({
          name: typeName,
          weaknesses: [],
          resistances: [],
        });
        return await newType.save();
      })
    );

    await Fakemon.deleteMany({});
    console.log(chalk.yellow("✓ Colección de Fakemon limpiada"));

    const fakemonToCreate = 50;
    const createdFakemon = [];
    for (let i = 0; i < fakemonToCreate; i++) {
      const randomType = types[Math.floor(Math.random() * types.length)];
      const typeDoc = typeDocuments.find((t) => t.name === randomType);
      if (!typeDoc) {
        throw new Error(`Tipo no encontrado: ${randomType}`);
      }
      const fakemonData = generateFakemon(randomType);
      const description = generateDescription(randomType, fakemonData.name!);
      const newFakemon = new Fakemon({
        ...fakemonData,
        types: [typeDoc._id],
        description,
        imageUrl: `${baseUrl}${i + 1}.webp`,
      });
      const savedFakemon = await newFakemon.save();
      createdFakemon.push(savedFakemon);
    }
    console.log(chalk.green(`\n✓ Seeding completado.`));
  } catch (error) {
    console.error(chalk.red("✗ Error durante el seeding:"), error);
    await mongoose.connection.close();
    console.log(chalk.green("✓ Conexión a MongoDB cerrada"));
  }
};

seedFakemon()
  .then(() => {
    console.log(chalk.green("\n✓ Proceso de seeding finalizado"));
    process.exit(0);
  })
  .catch((error) => {
    console.error(chalk.red("\n✗ Error en el proceso de seeding:"), error);
    process.exit(1);
  });
