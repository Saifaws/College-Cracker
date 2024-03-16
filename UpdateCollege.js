import "./AddCollegesPage.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import {useNavigate,} from "react-router-dom";
import BACKEND_URL from "./constants";

const FormRow = ({ labelText, type = "text", value, handleChange, name }) => {
  return (
    <div className="form-row">
      <label className="form-label">{labelText}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      ></input>
    </div>
  );
};

const initialState = {
  name: "",
  branch: "",
  location: "",
  status: "",
  date: "",
  createdBy: "",
};

function AddCollegesPage() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const id = window.location.href.split("=")[1];

  const onHandleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const college = {};

    values.name && (college.name = values.name);
    values.branch && (college.branch = values.branch);
    values.location && (college.location = values.location);
    values.status && (college.status = values.status);
    values.date && (college.date = values.date);
    college.createdBy = JSON.parse(localStorage.getItem("user"))._id;

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/college/update-college?id=${id}`,
        college
      );
      console.log(response);
      // const response = await apiConnector("POST", `${BACKEND_URL}/api/college/update-college?id=${id}`,college||NULL)
      navigate("/home");
    } catch (error) {}
  };

  return (
    <div>
      <Navbar />
      <div className="homepage-content">
        <Sidebar />
        <div className="settings-page">
          <form className="settings-page-form" onSubmit={onSubmit}>
            <div className="form-center">
              <FormRow
                handleChange={onHandleChange}
                value={values.name}
                name="name"
                type="string"
                labelText="College Name"
              />
              <FormRow
                handleChange={onHandleChange}
                value={values.branch}
                name="branch"
                type="string"
                labelText="Branch"
              />
              <FormRow
                handleChange={onHandleChange}
                value={values.location}
                name="location"
                type="string"
                labelText="Location"
              />
              <FormRow
                handleChange={onHandleChange}
                value={values.status}
                name="status"
                type="string"
                labelText="Application Status"
              />
              <FormRow
                handleChange={onHandleChange}
                value={values.date}
                name="date"
                type="string"
                labelText="Date Applied On"
              />

              <button type="submit" className="btn-settings">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCollegesPage;
