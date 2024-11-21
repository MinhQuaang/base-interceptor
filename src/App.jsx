import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const ProtectedRoutes = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return <Navigate to="/login" />;
    return <Outlet />;
  };
  const UnauthorizedRoute = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) return <Navigate to="/" />;
    return <Outlet />;
  };
  return (
    // <>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <input type="text" name="email" placeholder="Email..." />
    //     </div>
    //     <div>
    //       <input type="password" name="password" placeholder="Password..." />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    //   <button onClick={handleGetInfo}>Get info</button>

    //   <div>
    //     <h1>User info</h1>
    //     <p>
    //       <strong>Email: </strong>
    //       {user?.email}
    //     </p>
    //     <p>
    //       <strong>Name: </strong>
    //       {user?.name}
    //     </p>
    //   </div>
    // </>
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />}></Route>
      </Route>
      <Route element={<UnauthorizedRoute />}>
        <Route path="/login" element={<Login />}></Route>
      </Route>
      <Route path="*" element={<h1>Not found</h1>}></Route>
    </Routes>
  );
}

export default App;
