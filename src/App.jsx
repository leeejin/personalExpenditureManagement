import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DetailRecords from "./pages/DetailRecords_page";
import HomeRecords from "./pages/HomeRecords_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRecords />} />
        <Route path="/records/:recordId" element={<DetailRecords />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
