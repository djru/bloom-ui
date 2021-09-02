import styles from "../../styles/Readings.module.css";
import Link from "next/link";
import useLogin from "../../hooks/useLogin";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../../context/context";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatXAxis = (date) => {
  return date.toString().slice(0, 16);
};

export default function Me() {
  const user = useLogin();
  const { setErr, setAlert } = useContext(userContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "\readings")
      .then((r) => r.json())
      .then((r) => {
        if (r.succeeded) {
          const convertedData = r.data.map((d) => {
            return { ...d, CreatedAt: new Date(d.CreatedAt) };
          });
          console.log(convertedData);
          setData(convertedData);
        } else {
          setAlert(r.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(err.toString());
      });
  });

  if (!user) {
    return null;
  }

  if (data.length === 0) {
    return (
      <h2 className={styles.noData}>
        {"You don't have any data yet."} <br />
        {"Click 'Add BP' in the top right corner to add your first reading..."}
      </h2>
    );
  }
  return (
    <>
      <h2>Your Readings</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="CreatedAt" tickFormatter={formatXAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="Top" stroke="#8884d8" />
          <Line type="monotone" dataKey="Bottom" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <Link href={process.env.NEXT_PUBLIC_BACKEND_URL + "/readings.csv"}>
        <a className={styles.downloadCSV}>Download as CSV</a>
      </Link>
    </>
  );
}
