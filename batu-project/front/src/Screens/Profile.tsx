import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { instance } from "../api";
import { toast } from "react-toastify";

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
const carSchema = Yup.object({
  uye_id: Yup.string(),
  marka: Yup.string(),
  model: Yup.string(),
  yil: Yup.string(),
  kilometre: Yup.string(),
  fiyat: Yup.string(),
  durum: Yup.string(),
  aciklama: Yup.string(),
});

export function Profile() {
  const [user, setUser] = useState<TUserData | undefined>();
  const [token, setToken] = useState("");

  const [cars, setCars] = useState<TCarData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (!token) return navigate("/login");
    setToken(token);

    instance.post("/auth/profile", { token }).then(async ({ data }) => {
      setUser(data);
      const { data: carsData } = await instance.post("/car/cars", { token });
      setCars(carsData.data);
    });
  }, [navigate]);

  return (
    <div className="flex-1 flex justify-center flex-col gap-3 h-[100vh] items-center">
      <div>
        {user?.uye_adi} {user?.uye_soyadi}
      </div>
      <div className="flex flex-row gap-2 bg-gray-100">
        <div className="flex flex-col gap-1">
          <div>Arabaların</div>

          <div>
            <div className="flex flex-col gap-2 bg-gray-600 h-full p-2">
              {cars.map(({ model, marka, yil, _id }, i) => (
                <div className="bg-gray-500">
                  <div
                    className=" text-white flex justify-center items-center gap-1  rounded p-1"
                    key={i}
                  >
                    <span>{marka}</span>
                    <span>{model}</span>
                    <span>{yil}</span>
                  </div>
                  <button
                    onClick={() => {
                      instance
                        .post("/car/cardelete", { id: _id })
                        .then(({ data }) => {
                          toast(data.message, { type: "success" });
                          setCars((cars) =>
                            cars.filter((car) => car._id !== _id)
                          );
                        });
                    }}
                    key={i}
                    className="bg-red-600 rounded text-white justify-center items-center w-full"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Formik
            validationSchema={carSchema}
            enableReinitialize
            onSubmit={(val) => {
              const carData = { ...val, uye_id: user?.uye_id, token };

              instance
                .post("/car/create", carData)
                .then(({ data }) => {
                  setCars((carsx) => [...carsx, data.data]);

                  toast(data.message);
                })
                .catch(() => {
                  toast("Araba oluşturamadım", { type: "warning" });
                });
            }}
            initialValues={{
              uye_id: "",
              marka: "",
              model: "",
              yil: "",
              kilometre: "",
              fiyat: "",
              durum: "",
              aciklama: "",
            }}
          >
            {({ handleSubmit, values, handleChange, resetForm }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-1"
              >
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  onChange={handleChange}
                  name="marka"
                  type="marka"
                  value={values.marka || ""}
                  placeholder="marka"
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  onChange={handleChange}
                  name="model"
                  type="model"
                  value={values.model || ""}
                  placeholder="model"
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  onChange={handleChange}
                  name="yil"
                  type="yil"
                  value={values.yil || ""}
                  placeholder="yil"
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  onChange={handleChange}
                  name="kilometre"
                  type="kilometre"
                  value={values.kilometre || ""}
                  placeholder="kilometre"
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  onChange={handleChange}
                  name="fiyat"
                  type="fiyat"
                  value={values.fiyat || ""}
                  placeholder="fiyat"
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  onChange={handleChange}
                  name="durum"
                  type="durum"
                  value={values.durum || ""}
                  placeholder="durum"
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  onChange={handleChange}
                  name="aciklama"
                  type="aciklama"
                  value={values.aciklama || ""}
                  placeholder="aciklama"
                />

                <button
                  type="submit"
                  onClick={() => {
                    resetForm();
                  }}
                  className="flex justify-center items-center bg-blue-400 rounded p-2 text-white font-bold"
                >
                  Araba Kaydet
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
