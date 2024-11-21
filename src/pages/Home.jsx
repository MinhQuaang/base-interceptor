import { useEffect, useState } from "react";
import { getUserInfo } from "../requests/authRequests";

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUserInfo().then((response) => {
      if (response?.status == 200) {
        setUserInfo(response?.data);
        setIsLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>{userInfo?.email}</h1>
          <h1>{userInfo?.name}</h1>
        </>
      )}
    </>
  );
}

export default Home;
