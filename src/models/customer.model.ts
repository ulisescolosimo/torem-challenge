import mongoose, { Schema, Document } from "mongoose";
import { Customer, ChatModel } from "../interfaces/Interfaces";

const customerSchema = new Schema<Customer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const CustomerModel = mongoose.model<Customer>(
  "Customer",
  customerSchema
);

export interface VIPCustomer extends Customer {
  creditCard: string;
}

export const VIPCustomerModel = CustomerModel.discriminator<VIPCustomer>(
  "VIPCustomer",
  new Schema({
    creditCard: { type: String, required: true, unique: true },
  })
);

export interface RegularCustomer extends Customer {
  phoneNumber: string;
}

export const RegularCustomerModel =
  CustomerModel.discriminator<RegularCustomer>(
    "RegularCustomer",
    new Schema({
      phoneNumber: { type: String, required: true, unique: true },
    })
  );
