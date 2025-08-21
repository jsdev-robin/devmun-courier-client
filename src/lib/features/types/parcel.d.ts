export interface Parcel {
  senderName: string;
  senderPhone: string;
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
