import { useContext } from "react";
import { useRouter } from "next/router";

export const useLogin = () => {
  const { user } = useContext(userContext);
  const router = useRouter();
  if (user === false) {
    router.push("/?msg=" + encodeURIComponent("Please log in"));
  } else {
    return user;
  }
};

export default useLogin;
