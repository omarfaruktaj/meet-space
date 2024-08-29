export interface Room {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  images: string[];
  isDeleted: boolean;
  _id: string;
  __v: number;
}

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
