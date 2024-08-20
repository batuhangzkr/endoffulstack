import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TUserData, userModel } from "../../db/schemas";

const router = Router();

router.post("/profile", (req, res) => {
  const token = req.body.token;
  const data = jwt.verify(token, process.env.SECRET as any) as TUserData;

  res.send(data);
});

router.post("/signup", async (req, res) => {
  const { uye_sifre, ...userData } = req.body as TUserData;

  const jsonData = {
    ...userData,
    uye_sifre: bcrypt.hashSync(uye_sifre, 10),
  };

  const token = jwt.sign(jsonData, process.env.SECRET as any);

  const user = new userModel(jsonData);
  await user.save();

  res.send({ token });
});

router.post("/login", async (req, res) => {
  const { uye_email, uye_sifre } = req.body as TUserData;

  console.log(uye_email);

  const user = await userModel.findOne({ uye_email }).exec();

  if (!user)
    return res.send({ message: "Üye bulunamadı", status: 404, data: "" });

  const comp = await bcrypt.compareSync(uye_sifre, user.uye_sifre);

  if (!comp)
    return res.send({ message: "Şifre hatalı", status: 404, data: "" });

  const token = jwt.sign(
    {
      uye_adi: user.uye_adi,
      uye_email: user.uye_email,
      uye_kayit_tarihi: user.uye_kayit_tarihi,
      uye_sehir: user.uye_sehir,
      uye_sifre: user.uye_sifre,
      uye_soyadi: user.uye_soyadi,
      uye_tel_no: user.uye_tel_no,
      uye_id: user._id,
    },
    process.env.SECRET as any
  );

  res.send({
    data: user,
    status: 200,
    message: "Helal len giriş yaptın",
    token,
  });
});

export const authRouter = router;
