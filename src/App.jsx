import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
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
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
