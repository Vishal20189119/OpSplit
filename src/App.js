import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import styles from './App.module.css';
import Home from './Home';
import Transactions from './Transaction';
import OptimalSplit from './OptimalSplit';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Home/>,
      errorElement: <h2>OOPS! error</h2>
    },
    {path: 'transaction', element: <Transactions/>},
    {path: "opsplit", element: <OptimalSplit/>}
  ])

  return (
    <>
      <div className={styles.App}>
        <RouterProvider router={router}/>
      </div>
      {/* <div style={{textAlign: "center"}}>Note: Do not referesh to prevent data loss</div> */}
    </>
  );
}

export default App;
