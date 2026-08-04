import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Sau này sẽ gọi API đăng nhập ở đây
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#F8FBFF] to-[#EEF5FF]">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center">
          <h1 className="text-[60px] font-extrabold text-[#4A86E8] tracking-tight">
            LingoVerse
          </h1>

          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center rounded-full bg-[#EAF2FF] px-5 py-2">
              <span className="bg-[#4A86E8] text-white text-xs font-bold px-3 py-1 rounded-full">
                shield
              </span>

              <span className="ml-3 text-[12px] tracking-wide text-[#4B5563] font-semibold">
                DÀNH CHO QUẢN TRỊ VIÊN HỆ THỐNG
              </span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-white rounded-3xl shadow-[0_20px_60px_rgba(37,99,235,0.12)] border border-[#EEF2FF] p-8">

          <h2 className="text-[22px] font-bold text-[#1F2937]">
            Đăng nhập hệ thống
          </h2>

          <p className="mt-2 text-sm text-[#6B7280]">
            Vui lòng đăng nhập để truy cập trang quản trị.
          </p>

          {/* Form */}
          <div className="mt-8 space-y-6">

            {/* Email */}
            <div>
              <label className="block text-[14px] font-semibold text-[#374151] mb-2">
                Email / Tên đăng nhập
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />

                <input
                  type="email"
                  placeholder="admin@lingoverse.com"
                  className="w-full h-12 rounded-xl border border-[#D7DCE5] pl-11 pr-4 outline-none focus:border-[#4A86E8] focus:ring-2 focus:ring-[#DCEBFF]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[14px] font-semibold text-[#374151] mb-2">
                Mật khẩu
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl border border-[#D7DCE5] pl-11 pr-12 outline-none focus:border-[#4A86E8] focus:ring-2 focus:ring-[#DCEBFF]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4A86E8]"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

          </div>

          {/* Remember */}
          <div className="mt-6 flex items-center justify-between">

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded"
              />

              <span className="text-sm text-[#4B5563]">
                Ghi nhớ đăng nhập
              </span>
            </label>

            <a
              href="#"
              className="text-sm font-semibold text-[#4A86E8] hover:underline"
            >
              Quên mật khẩu?
            </a>

          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="mt-8 w-full h-12 rounded-xl bg-[#4A86E8] hover:bg-[#3C78D8] duration-200 text-white font-semibold flex items-center justify-center gap-2"
          >
            <FaSignInAlt />
            Đăng nhập
          </button>

          {/* Footer */}
          <p className="text-center text-[13px] text-[#6B7280] mt-6">
            Truy cập trái phép vào hệ thống này bị nghiêm cấm.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;