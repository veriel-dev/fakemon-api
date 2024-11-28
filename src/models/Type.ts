import { Schema, model } from "mongoose";

const typeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    weaknesses: [
      {
        type: String,
        required: true,
      },
    ],
    resistances: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      transform: (_, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

export const Type = model("Type", typeSchema);
