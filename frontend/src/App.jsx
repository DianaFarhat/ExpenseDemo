import { Outlet, useLocation } from "react-router-dom";



function App() {


 

  return (
    <>
      
      <main className="container-fluid px-0">
        <Outlet />
      </main>
    </>
  );
}

export default App;
