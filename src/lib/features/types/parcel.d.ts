import { IUser } from './auth';

export interface Parcel {
  _id: string;
  trackingId: string;
  receiverName: string;
  receiverPhone: string;
  pickupAddress: string;
  pickupLocation: {
    lat: number;
    lng: number;
  };
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
  customer: IUser;
  agent: IUser;
}
