import Layout from "../components/layout";
import { userContext } from "../context/context";
import { useContext } from "react";

export default function Home({ user }) {
  const { user } = useContext(userContext);
  if (!user.email) {
    return <h1>Not Logged In</h1>;
  }
  return (
    <Layout>
      <h2>Hello {user.email}</h2>
    </Layout>
  );
}
