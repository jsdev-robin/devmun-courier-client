import { IUser } from './auth';

export interface ParcelAssginRequest {
  parcelId: string;
  agentId: string;
  priority: string;
  notes?: string;
}

export interface ParcelStatusUpdateRequest {
  parcelId: string;
  status: string;
  notes?: string;
}

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

export interface ParcelStatusStat {
  count: number;
  status: 'booked' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  fill: string;
}

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
