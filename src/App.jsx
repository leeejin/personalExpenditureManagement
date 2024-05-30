import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailRecords from "./components/DetailRecord/DetailRecord";
import HomeRecords from "./components/HomeRecords/HomeRecords";
import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeRecords />} />
          <Route path="/records/:recordId" element={<DetailRecords />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
