import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import "./components/user/register.css";

function App() {
  return (
    <>
      <div className="register-container">
        <Register />
      </div>
      <Login />
    </>
  );
}

export default App;
