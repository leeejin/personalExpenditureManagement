import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailRecords from "./components/DetailRecord/DetailRecord";
import HomeRecords from "./components/HomeRecords/HomeRecords";
import Layout from "./layouts/DefaultRecord";
function Loading() {
  return (
    <div>
      <h3>Loading...</h3>
    </div>
  );
}
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeRecords />} />
            <Route path="/records/:recordId" element={<DetailRecords />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
