import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { instance } from "../api";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  uye_adi: Yup.string(),
  uye_soyadi: Yup.string(),
  uye_tel_no: Yup.string(),
  uye_sehir: Yup.string(),
  uye_email: Yup.string(),
  uye_sifre: Yup.string(),
  uye_kayit_tarihi: Yup.string(),
});

export function Signup() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-red-50 flex-col">
      <div>Kayıt Ol</div>

      <Formik
        enableReinitialize
        initialValues={{
          uye_adi: "",
          uye_soyadi: "",
          uye_tel_no: "",
          uye_sehir: "",
          uye_email: "",
          uye_sifre: "",
          uye_kayit_tarihi: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(userData) => {
          const data = {
            ...userData,
            uye_kayit_tarihi: new Date().toLocaleDateString(),
          };
          toast("Helal len kayıt oldun", { type: "success" });
          instance.post("/auth/signup", data);
        }}
      >
        {({ handleChange, values, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-40">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={handleChange}
              name="uye_adi"
              type="uye_adi"
              value={values.uye_adi || ""}
              placeholder="uye_adi"
            />

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={handleChange}
              name="uye_soyadi"
              type="uye_soyadi"
              value={values.uye_soyadi || ""}
              placeholder="uye_soyadi"
            />

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={handleChange}
              name="uye_tel_no"
              type="uye_tel_no"
              value={values.uye_tel_no || ""}
              placeholder="uye_tel_no"
            />

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={handleChange}
              name="uye_sehir"
              type="uye_sehir"
              value={values.uye_sehir || ""}
              placeholder="uye_sehir"
            />

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={handleChange}
              name="uye_email"
              type="uye_email"
              value={values.uye_email || ""}
              placeholder="uye_email"
            />

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={handleChange}
              name="uye_sifre"
              type="password"
              value={values.uye_sifre || ""}
              placeholder="uye_sifre"
            />
            <button
              type="submit"
              className="flex justify-center items-center bg-blue-400 rounded p-2 text-white font-bold"
            >
              Kayıt ol
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
