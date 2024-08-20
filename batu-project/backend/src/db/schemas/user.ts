import { model, Schema } from "mongoose";

export type TUserData = {
  uye_adi: string;
  uye_soyadi: string;
  uye_tel_no: string;
  uye_sehir: string;
  uye_email: string;
  uye_sifre: string;
  uye_kayit_tarihi: string;
  uye_id: string;
};

const userSchema = new Schema<TUserData>({
  uye_adi: String,
  uye_soyadi: String,
  uye_tel_no: String,
  uye_sehir: String,
  uye_email: String,
  uye_sifre: String,
  uye_kayit_tarihi: String,
});

export const userModel = model("user", userSchema);
