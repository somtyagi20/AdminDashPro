import ApiError from "../Utils/apiError.js";
import ApiResponse from "../Utils/apiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { ShippingInfo } from "../Models/shippingInfo.js";

const createShippingInfo = asyncHandler(async (req, res, next) => {
  const { order, address, city, pincode, customer } = req.body;
  if (
    [order, address, city, customer, pincode].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const shippingInfo = await ShippingInfo.create({
    order,
    address,
    city,
    customer,
    pincode,
  });

  if (!shippingInfo) {
    throw new ApiError(500, "Failed to create shipping info");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Shipping info created successfully", null));
});

const getShippingInfos = asyncHandler(async (req, res, next) => {
  const shippingInfos = await ShippingInfo.find();
  res
    .status(200)
    .json(new ApiResponse(200, "Shipping infos fetched", shippingInfos));
});

const getShippingInfo = asyncHandler(async (req, res, next) => {
  const shippingInfo = await ShippingInfo.findById(req.query.id);
  if (!shippingInfo) {
    throw new ApiError(404, "Shipping info not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Shipping info fetched", shippingInfo));
});

const updateShippingInfo = asyncHandler(async (req, res, next) => {
  const { order, address, city, customer, pincode } = req.body;
  if (
    [order, address, city, customer, pincode].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const shippingInfo = await ShippingInfo.findByIdAndUpdate(
    req.query.id,
    {
      order,
      address,
      city,
      customer,
      pincode,
    },
    {
      new: true,
    }
  );

  if (!shippingInfo) {
    throw new ApiError(500, "Failed to update shipping info");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Shipping info updated", shippingInfo));
});

export {
  createShippingInfo,
  getShippingInfos,
  getShippingInfo,
  updateShippingInfo,
};
