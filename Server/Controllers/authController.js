import ApiError from "../Utils/apiError.js";
import ApiResponse from "../Utils/apiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { Admin } from "../Models/admin.js";
import { UploadOnCloudinary } from "../Utils/cloudinary.js";
import JWT from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Admin.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const register = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  if ([email, password, name].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await Admin.findOne({
    email,
  });

  if (user) {
    throw new ApiError(409, "User with this email already exist !");
  }

  const admin = await Admin.create({ email, password, name });

  if (!admin) {
    throw new ApiError(500, "Failed to register user");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", null));
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "email and password are required");
  }

  const user = await Admin.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(401, "User with this email does not exist");
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await Admin.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: undefined },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logged Out", {}));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "refresh Token unavailable");
  }

  const decodedToken = JWT.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await Admin.findById(decodedToken._id).select("-password");

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "refresh token is expired or used");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "access token refreshed successfully", {
        accessToken,
        refreshToken,
      })
    );
});

const uploadProfilePic = asyncHandler(async (req, res, next) => {
  const file = req.file?.path;

  if (!file) {
    throw new ApiError(400, "Please upload an image file");
  }

  const response = await UploadOnCloudinary(file);
  if (!response) {
    throw new ApiError(500, "Failed to upload image");
  }

  const user = await Admin.findByIdAndUpdate(
    req.user._id,
    {
      profile_pic: response?.url,
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  res.status(200).json(
    new ApiResponse(200, "Image uploaded successfully", {
      user,
    })
  );
});

export { register, login, uploadProfilePic, logOutUser, refreshAccessToken };
