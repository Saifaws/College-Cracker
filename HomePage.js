import "./SettingsPage";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="homepage-content">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
}

export default HomePage;
