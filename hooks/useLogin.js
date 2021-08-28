import { useContext } from "react";
import { useRouter } from "next/router";

export const useLogin = () => {
  const { user, setAlert } = useContext(userContext);
  const router = useRouter();
  if (user === false) {
    setAlert("Please log in");
    router.push("/");
  } else {
    return user;
  }
};

export default useLogin;
