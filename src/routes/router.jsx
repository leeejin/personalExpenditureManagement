import { createBrowserRouter } from "react-router-dom";
import DetailRecords from "../components/DetailRecord/DetailRecord";
import HomeRecords from "../components/HomeRecords/HomeRecords";
import DefaultLayout from "../layouts/DefaultLayout";
const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomeRecords />,
      },
      {
        path: "/records/:recordsId",
        element: <DetailRecords />,
      },
    ],
  },
]);
export default router;
