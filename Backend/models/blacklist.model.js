import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

BlacklistSchema.index({ token: 1 });
BlacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const BlacklistModel = mongoose.model("Blacklist", BlacklistSchema);
export default BlacklistModel;
