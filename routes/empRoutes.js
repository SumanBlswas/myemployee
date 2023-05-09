import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { empModel } from "../model/empModel.js";
import { userModel } from "../model/userModel.js";

const empRouter = express.Router();

empRouter.get("/", async (req, res) => {
  try {
    let emp = await empModel.find();
    res.status(200).send(emp);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

empRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    let emp = new empModel(payload);
    await emp.save();
    res.status(200).send({ msg: "A new employee added" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

empRouter.patch("/update/:userID", async (req, res) => {
  let { userID } = req.params;
  let payload = req.body;
  try {
    await empModel.findByIdAndUpdate({ _id: userID }, payload);
    res.status(200).send({ msg: `${userID} has been upadted` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

empRouter.delete("/delete/:userID", async (req, res) => {
  let { userID } = req.params;
  try {
    await userModel.findByIdAndDelete({ _id: userID });
    res.status(200).send({ msg: `${userID} has been deleted` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

empRouter.get("/query", async (req, res) => {
  const { department, fname, sort } = req.query;
  const query = {};

  if (department) {
    query.department = department;
  }

  if (fname) {
    query.fname = { $regex: new RegExp(fname), $options: "i" };
  }

  const sortOption = {};

  if (sort === "asc") {
    sortOption.salary = 1;
  } else if (sort === "desc") {
    sortOption.salary = -1;
  }

  try {
    const emp = await empModel.find(query).sort(sortOption);
    res.status(200).send(emp);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

export { empRouter };
