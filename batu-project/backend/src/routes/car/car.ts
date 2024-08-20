import jwt from "jsonwebtoken";
import { Router } from "express";
import { TUserData, TCarData, carModel } from "../../db/schemas";

const router = Router();

router.get("/searchall", async (__, res) => {
  const cars = await carModel.find({}).exec();

  res.send(cars);
});

router.post("/create", async (req, res) => {
  const token = req.body?.token;
  if (!token)
    return res.send({ data: null, status: 404, message: "Token bulunamadı" });

  const userData = jwt.verify(token, process.env.SECRET as any) as TUserData;

  if (!userData)
    return res.send({
      data: null,
      status: 404,
      message: "Kullanıcı bulunamadı",
    });

  console.log(userData);

  const { aciklama, durum, fiyat, kilometre, marka, model, yil } =
    req.body as TCarData;

  const carData = {
    aciklama,
    durum,
    fiyat,
    kilometre,
    marka,
    model,
    yil,
    uye_id: userData.uye_id,
  };

  const car = new carModel(carData);
  await car.save();

  res.send({ data: carData, status: 200, message: "Arabayı kaydettin len" });
});

router.post("/cars", async (req, res) => {
  const token = req.body?.token;

  if (!token)
    return res.send({ data: null, status: 404, message: "Token bulunamadı" });

  const userData = jwt.verify(token, process.env.SECRET as any) as TUserData;

  if (!userData)
    return res.send({
      data: null,
      status: 404,
      message: "Kullanıcı bulunamadı",
    });

  const cars = await carModel.find({ uye_id: userData.uye_id }).exec();

  if (!cars)
    return res.send({
      data: null,
      status: 404,
      message: "Araba bulunamadı",
    });

  res.send({ data: cars, status: 200, message: "Arabaların!" });
});

router.post("/cardelete", async (req, res) => {
  const id = req.body.id;

  await carModel.deleteOne({ _id: id });

  res.send({ status: 200, data: null, message: "Araç silindi." });
});

export const carRouter = router;
