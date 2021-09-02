import { useContext } from "react";
import { useRouter } from "next/router";
import userContext from "../context/context";

export const useLogin = () => {
  const { user, setAlert } = useContext(userContext);
  const router = useRouter();
  if (user === false) {
    // next complains if this is done in outside the timeout
    // it does not like setting shared state during a render
    // it actually behaves normally, but gives a fat error
    // so this is a workaround
    if (process.env.NEXT_PUBLIC_ENV !== "dev") {
      setTimeout(() => {
        setAlert("Please log in");
        router.replace("/");
      });
    }
  }
  return user;
};

export default useLogin;
