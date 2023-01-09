import {
  VIPCustomerModel,
  RegularCustomerModel,
  CustomerModel,
} from "./../models/customer.model";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const createCustomer = async (req: Request, res: Response) => {
  const { firstName, lastName, creditCard, phoneNumber } = req.body;
  let customer: mongoose.Document;
  if (creditCard) {
    customer = new VIPCustomerModel({ firstName, lastName, creditCard });
  } else if (phoneNumber) {
    customer = new RegularCustomerModel({ firstName, lastName, phoneNumber });
  } else {
    return res.status(400).send("Invalid customer data");
  }

  let findVip = await CustomerModel.find({ creditCard });
  let findRegular = await CustomerModel.find({ phoneNumber });

  if (findVip.length > 0 || findRegular.length > 0) {
    res.send("User already exists");
  } else {
    customer = await customer.save();
    res.send(customer);
  }
};

const getCustomers = async (req: Request, res: Response) => {
  const customers = await CustomerModel.find();
  res.send(customers);
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await CustomerModel.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      throw new Error(`Customer con ID ${customerId} no encontrado`);
    }
    return deletedCustomer;
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
  createCustomer,
  getCustomers,
  deleteCustomer,
};
