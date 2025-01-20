import Feeds from "../models/userFeedModels.js";
import User from "../models/userModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "taskmanagement",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});
const upload = multer({ storage });
export { upload };

// Controller to Create User Feed
export const createUserFeed = async (req, res) => {
  const { description } = req.body;
  const userId = req.user?.id;

  if (!description || !req.file) {
    return res
      .status(400)
      .json({ error: "Description and image are required!" });
  }

  try {
    const myCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const newFeed = await Feeds.create({
      description,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      user: userId,
    });

    res.status(201).json({
      message: "Feed created successfully",
      feed: newFeed,
    });
  } catch (error) {
    console.error("Error creating feed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controllers to get All users created feeds

export const getAllUsersFeeds = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      message: "Invalid user, please login.",
    });
  }

  try {
    const feeds = await Feeds.find({}).populate("user", "name email").exec();

    const user = await User.findById(userId).select("name email");

    return res.status(200).json({
      message: "All feeds fetched successfully",
      feeds,
      user,
    });
  } catch (error) {
    console.error("Error fetching feeds:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
