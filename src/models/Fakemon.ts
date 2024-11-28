import { Schema, model } from "mongoose";
import { Type } from "./Type";

const statsSchema = new Schema(
  {
    hp: {
      type: Number,
      required: true,
      min: 1,
      max: 255,
    },
    attack: {
      type: Number,
      required: true,
      min: 1,
      max: 255,
    },
    defense: {
      type: Number,
      required: true,
      min: 1,
      max: 255,
    },
    spAtk: {
      type: Number,
      required: true,
      min: 1,
      max: 255,
    },
    spDef: {
      type: Number,
      required: true,
      min: 1,
      max: 255,
    },
    speed: {
      type: Number,
      required: true,
      min: 1,
      max: 255,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      transform: (_, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

const fakemonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    types: [
      {
        type: Schema.Types.ObjectId,
        ref: Type,
        required: true,
      },
    ],
    stats: {
      type: statsSchema,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    abilities: [
      {
        type: String,
        required: true,
      },
    ],
    imageUrl: {
      type: String,
    },
    generation: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: (_, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

fakemonSchema.index({ name: 1 });
fakemonSchema.index({ generation: 1 });
fakemonSchema.index({ "stats.hp": 1 });

export const Fakemon = model("Fakemon", fakemonSchema);
