import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailRecords from "./components/DetailRecords";
import HomeRecords from "./components/HomeRecords";
import Layout from "./layouts/home";
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
