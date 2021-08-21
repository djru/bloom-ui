import { userContext } from "../../context/context";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(userContext);
  if (!user?.email) {
    return <h1>Not Logged In</h1>;
  }
  return <h2>Hello {user.email}</h2>;
}
