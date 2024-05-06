import ApiError from "../Utils/apiError.js";
import ApiResponse from "../Utils/apiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { Customer } from "../Models/customer.js";

const createCustomer = asyncHandler(async (req, res, next) => {
  const { name, email, phone, city } = req.body;
  if ([name, email, phone, city].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const customerExist = await Customer.findOne({
    email,
  });
  if (customerExist) {
    throw new ApiError(409, "Customer with this email already exist !");
  }

  const customer = await Customer.create({ name, email, phone, city });

  if (!customer) {
    throw new ApiError(500, "Failed to create customer");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Customer created successfully", null));
});

const getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json(new ApiResponse(200, "Customers fetched", customers));
});

const getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.query.id);
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  res.status(200).json(new ApiResponse(200, "Customer fetched", customer));
});

const updateCustomer = asyncHandler(async (req, res, next) => {
  const { name, email, phone, city } = req.body;
  if ([name, email, phone, city].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const customer = await Customer.findByIdAndUpdate(
    req.query.id,
    {
      name,
      email,
      phone,
      city,
    },
    { new: true }
  );

  if (!customer) {
    throw new ApiError(500, "Failed to update customer");
  }

  res.status(200).json(new ApiResponse(200, "Customer updated", customer));
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.query.id);
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  await Customer.deleteOne({ _id: customer._id });
  res.status(200).json(new ApiResponse(200, "Customer deleted", null));
});

export {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
