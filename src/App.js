import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global.css";
import { Auth } from "./pages/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
