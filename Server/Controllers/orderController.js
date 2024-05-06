import ApiError from "../Utils/apiError.js";
import ApiResponse from "../Utils/apiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { Order } from "../Models/order.js";

const createOrder = asyncHandler(async (req, res, next) => {
  const { customer, productName, quantity, pricing, MRP } = req.body;
  if (
    [customer, productName, quantity, pricing, MRP].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const order = await Order.create({
    customer,
    productName,
    quantity,
    pricing,
    MRP,
  });

  if (!order) {
    throw new ApiError(500, "Failed to create order");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Order created successfully", null));
});

const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json(new ApiResponse(200, "Orders fetched", orders));
});

const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.query.id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  res.status(200).json(new ApiResponse(200, "Order fetched", order));
});

const updateOrder = asyncHandler(async (req, res, next) => {
  const { customer, productName, quantity, pricing, MRP } = req.body;
  if (
    [customer, productName, quantity, pricing, MRP].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const order = await Order.findByIdAndUpdate(req.query.id, {
    customer,
    productName,
    quantity,
    pricing,
    MRP,
  });

  if (!order) {
    throw new ApiError(500, "Failed to update order");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Order updated successfully", null));
});

const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.query.id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  await order.deleteOne({ _id: order._id });
  res.status(200).json(new ApiResponse(200, "Order deleted", null));
});

export { createOrder, getOrders, getOrder, updateOrder, deleteOrder };
