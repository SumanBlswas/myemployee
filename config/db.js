import mongoose from "mongoose";

const connection = mongoose.connect(
  `mongodb+srv://suman:sumanbiswas@cluster0.5qhf5jb.mongodb.net/usermanage?retryWrites=true&w=majority`
);

export { connection };
