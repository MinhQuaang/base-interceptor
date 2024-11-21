import { useState } from "react";
import { login } from "../requests/authRequests";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(userInfo);
    if (res?.status === 200) {
      localStorage.setItem("accessToken", res?.data?.access_token);
      localStorage.setItem("refreshToken", res?.data?.refresh_token);
      toast.success("Login successfully");
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Enter your email..."
        style={{
          display: "block",
        }}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password..."
        style={{
          display: "block",
        }}
        onChange={handleChange}
      />
      <button>Login</button>
    </form>
  );
}

export default Login;
