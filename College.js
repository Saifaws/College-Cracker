import "./College.css";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { GiProgression } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "./constants";

function College({ name, branch, location, status, date, _id }) {
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/college/delete-college?id=${_id}`
      );
      navigate("/");
    } catch (error) {}
  };

  const updateCollege = async () => {
    navigate("/update-college?id=" + _id);
  };

  return (
    <div className="college">
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="college-name">
          <h5>{name}</h5>
          <p>{branch}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <div className="college-info">
            <span className="icon">
              <BsFillCalendarDateFill color="grey" />
            </span>
            <span className="text">{"Date: " + date}</span>
          </div>
          <div className="college-info">
            <span className="icon">
              <CiLocationOn color="grey" />
            </span>
            <span className="text">{"Location: " + location}</span>
          </div>

          <div className="college-info">
            <span className="icon">
              <GiProgression color="grey" />
            </span>
            <span className="status">{"Status: " + status}</span>
          </div>
        </div>

        <footer>
          <div className="actions">
            <button onClick={updateCollege} type="button" className="edit-btn">
              Edit
            </button>
            <button onClick={onSubmit} type="button" className="delete-btn">
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default College;
