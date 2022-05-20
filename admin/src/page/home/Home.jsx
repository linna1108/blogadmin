import Chart from "../../components/chart/Chart";
import axios from "axios";
import "./home.css";
import { userData } from "../../dummyData";
import { useEffect, useMemo, useState } from "react";



export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGY4OTFjNjYwOWIzMzNhOGMzMzUzNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDc4NTI1NCwiZXhwIjoxNjUxMjE3MjU0fQ.Or1aAdh_-1NF8OGNEnOtPpLNPNfcYskKH0RN5QJKkRE",
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
       
      </div>
    </div>
  );
} 
