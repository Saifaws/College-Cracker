import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Feed.css";
import College from "./College";
import BACKEND_URL from "./constants";

function Feed() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get(
        `${BACKEND_URL}/api/college/colleges?createdBy=${
          JSON.parse(localStorage.getItem("user"))._id
        }`
      );
      console.log(response.data);
      setColleges(response.data);
      // ...
    }
    fetchData();
  }, []);

  return colleges ? (
    <div className="feeds">
      <div className="colleges">
        {colleges.length == 0 && (
          <p>No Colleges Found. Please add some colleges.</p>
        )}
        {colleges.map((college, indx) => {
          return <College key={indx} {...college} />;
        })}
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default Feed;
