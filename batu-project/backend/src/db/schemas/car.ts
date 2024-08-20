import { model, Schema } from "mongoose";

export type TCarData = {
  uye_id: string;
  marka: string;
  model: string;
  yil: string;
  kilometre: string;
  fiyat: string;
  durum: string;
  aciklama: string;
  _id: string;
};

const carSchema = new Schema<TCarData>({
  uye_id: String,
  marka: String,
  model: String,
  yil: String,
  kilometre: String,
  fiyat: String,
  durum: String,
  aciklama: String,
});

export const carModel = model("cars", carSchema);
