import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global.css";
import { Auth, Home } from "./pages/index";
import { UserStorage } from "./UserContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
