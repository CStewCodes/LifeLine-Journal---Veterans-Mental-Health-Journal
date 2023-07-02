import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import "./components/user/register.css";
import Journal from "./components/journal/Journal";

function App() {
  return (
    <>
      <div className="register-container">
        <Register />
      </div>
      <Login />
      <Journal />
    </>
  );
}

export default App;
