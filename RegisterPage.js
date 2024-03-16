import "./RegisterPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "./constants";

const FormRow = ({ labelText, type = "text", value, handleChange, name }) => {
  return (
    <div className="form-row">
      <label className="form-label">{labelText}</label>
      <input
        type={type}
        value={value}
        required={true}
        name={name}
        onChange={handleChange}
        className="form-input"
      ></input>
    </div>
  );
};

const initialState = {
  name: "",
  email: "",
  password: "",
  cnf_password: "",
};

function RegisterPage() {
  const [isMember, setIsMember] = useState(false);
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  
  
  const registerUser = async (currentUser) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/register`,
        currentUser
      );
      console.log(response);

      const { user, token } = response.data;
      addUserToLocalStorage({ user, token });
      if (user) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      setError(e.response?.data);
    }
  };

  const loginUser = async (currentUser) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/login`, currentUser);
      console.log(response);
      const { user, token } = response.data;
      addUserToLocalStorage({ user, token });
      if (user) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      setError(e.response?.data);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, cnf_password } = values;
    console.log(name);
    const currentUser = { name, email, password, cnf_password };
    console.log(name, email, password, cnf_password);
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  return (
    <div className="register-page">
      <div className="container page">
        <form class="form" onSubmit={onSubmit}>
          <h3>{isMember ? "Login" : "Register"}</h3>

          {!isMember && (
            <FormRow
              labelText="Name"
              name="name"
              required={true}
              value={values.name}
              handleChange={onHandleChange}
            />
          )}
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            required={true}
            value={values.email}
            handleChange={onHandleChange}
          />
          <FormRow
            type="password"
            labelText="Password"
            name="password"
            required={true}
            value={values.password}
            handleChange={onHandleChange}
          />
          {!isMember && (
            <FormRow
              type="password"
              name="cnf_password"
              labelText="Confirm Password"
              required={true}
              value={values.cnf_password}
              handleChange={onHandleChange}
            />
          )}
          <button className="btn-register">Submit</button>
          {!isMember && (
            <p className="login-register-text">
              Already have an account? Please
              <span
                className="login-register-link"
                onClick={() => setIsMember(!isMember)}
              >
                Login
              </span>
            </p>
          )}
          {isMember && (
            <p className="login-register-text">
              Don't have an account? Please
              <span
                className="login-register-link"
                onClick={() => setIsMember(!isMember)}
              >
                Register
              </span>
            </p>
          )}

          <p className="error-text">{error}</p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
