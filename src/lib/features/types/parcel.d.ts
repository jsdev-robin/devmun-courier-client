import { IAddress, IUser } from './auth';

export interface ParcelRequest {
  receiverName: string;
  receiverPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: string;
  parcelSize: string;
  paymentMethod: string;
  codAmount: string | number;
}

export interface Parcel {
  pickupLocation: IAddress;
  _id: string;
  trackingId: string;
  customer: IUser;
  receiverName: string;
  receiverPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  parcelSize: string;
  parcelType: string;
  paymentMethod: string;
  codAmount: number;
  status?: 'booked' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  history: unknown[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  agent: IUser;
}
