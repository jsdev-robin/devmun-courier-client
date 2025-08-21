export interface Parcel {
  receiverName: string;
  receiverPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: string;
  parcelSize: string;
  paymentMethod: string;
  codAmount: string;
  pickupLocation?: {
    lat: number;
    lng: number;
  };
}

export interface IParcelResponse {
  trackingId: string;
  // customer: mongoose.Types.ObjectId;
  receiverName: string;
  receiverPhone: string;
  // agent?: mongoose.Types.ObjectId;
  pickupAddress: string;
  deliveryAddress: string;
  parcelSize: 'small' | 'medium' | 'large' | 'xlarge';
  parcelType: 'document' | 'package' | 'fragile' | 'electronics';
  paymentMethod: 'COD' | 'Prepaid';
  codAmount: number;
  status: 'booked' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  pickupLocation?: {
    lat: number;
    lng: number;
  };
  history: {
    status: string;
    location?: {
      lat: number;
      lng: number;
    };
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
