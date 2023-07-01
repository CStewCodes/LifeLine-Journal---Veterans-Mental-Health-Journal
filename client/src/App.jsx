import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Register from "./components/user/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div> Hello World!</div>
      <div> test </div>
      <Register />
    </>
  );
}

export default App;
