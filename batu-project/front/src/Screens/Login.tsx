import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api";

import Cookies from "universal-cookie";
import { toast } from "react-toastify";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const token = cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  return (
    <div className="flex-1 flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-2 w-40">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          type="text"
          placeholder="şifre"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className="flex justify-center items-center bg-blue-400 rounded p-2 text-white font-bold"
          onClick={() => {
            instance
              .post("/auth/login", {
                uye_email: email,
                uye_sifre: password,
              })
              .then(({ data }) => {
                if (data.status === 404) {
                  toast(data.message);
                  return;
                }

                toast(data.message);
                const token = data.token;
                cookies.set("token", token);
                navigate("/profile");
              });
          }}
        >
          tıkla
        </button>
      </div>
    </div>
  );
}
