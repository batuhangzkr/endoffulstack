import React, { useEffect, useState } from "react";
import { instance } from "../api";

export function Cars() {
  const [cars, setCars] = useState<any[]>([]);

  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    instance.get("/car/searchall").then(({ data }) => {
      setCars(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col bg-blue-300 gap-1 p-3 w-fit">
        <input
          type="text"
          className="w-80 p-5 outline-none rounded"
          placeholder="Marka ara"
          value={marka}
          onChange={(e) => setMarka(e.target.value)}
        />
        <input
          type="text"
          className="w-80 p-5 outline-none rounded"
          placeholder="model ara"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <button
          className="flex justify-center items-center bg-blue-400 rounded p-2 text-white font-bold"
          onClick={() => {
            setMarka("");
            setModel("");
          }}
        >
          Sıfırla
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {cars
          .filter((t) => t.marka.toLocaleLowerCase().includes(marka.toLocaleLowerCase()))
          .filter((t) => t.model.toLocaleLowerCase().includes(model.toLocaleLowerCase()))
          .map((val, i) => (
            <div
              key={i}
              className="flex flex-col bg-gray-700 rounded p-2 text-white font-bold"
            >
              <div>Marka: {val.marka}</div>
              <div>Model: {val.model}</div>
              <div>Yıl: {val.yil}</div>
              <div>Fiyat: {val.fiyat}</div>
              <div>Durum: {val.durum}</div>
              <div>Kilometre: {val.kilometre}</div>
              <div>Açıklama: {val.aciklama}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
