
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './component/Layout/Layout';
import Home from './component/Home/Home';
import { Provider } from "react-redux";
import myStore from './Redux/MyStore';
import Radio from "./component/Radio/Radio";
import Tafser from './component/Tafser/Tafser';
import Alsalah from './component/Alsalah/Alsalah';



const App = () => {




  const routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "radio", element: <Radio /> },
        { path: "tafser", element: <Tafser /> },
        { path: "alsalah", element: <Alsalah /> },
      ]
    }
  ])

  
  
  
  
  return <>
    <Provider store={myStore}>
      <RouterProvider router={routers} />

    </Provider>
  </>



}
export default App;