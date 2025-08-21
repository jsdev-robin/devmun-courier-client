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
