import { Request, Response } from "express";
import Work from "../Models/Work";
import User from "../Models/User";
import { WorkSchema, UserSchema } from "../interfaces/interfaces";

export const getWork = async (_req: Request, res: Response) => {
  try {
    const works = await Work.find();
    res.json(works);
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

export const getWorkById = async (req: Request, res: Response) => {
  try {
    const workById = await Work.findById(req.params.id);
    if (workById) {
      res.json(workById);
    } else {
      res.json({ msg: "Work not found" });
    }
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

export const postWork = async (req: Request, res: Response) => {
  const { projectName, description, gitHubUrl, image, pageUrl, userId } =
    req.body as WorkSchema;

  try {
    const saveWork = new Work({
      projectName,
      description,
      gitHubUrl,
      image,
      pageUrl,
      userId,
    });
    const workSaved = await saveWork.save();
    (await User.findByIdAndUpdate(userId, {
      $push: { works: workSaved._id },
    })) as UserSchema;
    res.status(200).json({ msg: "Work have been saved" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

export const updateWork = async (req: Request, res: Response) => {
  try {
    await Work.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ msg: "Work have been updated" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

export const deleteWork = async (req: Request, res: Response) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.json({ msg: "Work have been deleted" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};
