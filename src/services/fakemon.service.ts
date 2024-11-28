import { Request, Response } from "express";
import { Fakemon } from "../models/Fakemon";

const getAllFakemon = async (req: Request, res: Response) => {
  try {
    const total = await Fakemon.countDocuments();

    const limit = parseInt(req.query.limit?.toString() || total.toString());

    const page = parseInt(req.query.page?.toString() || "1");
    const skip = (page - 1) * limit;

    const fakemons = await Fakemon.find()
      .populate("types")
      .skip(skip)
      .limit(limit);

    const response = {
      total,
      returned: fakemons.length,
      page,
      totalPages: Math.ceil(total / limit),
      results: fakemons,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { getAllFakemon };
