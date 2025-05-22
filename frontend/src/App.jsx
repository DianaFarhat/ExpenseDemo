import { Outlet } from "react-router-dom";

// This App component acts as a shared layout.
// It includes a main layout area and a footer.
// The <Outlet /> renders the child route's component dynamically.

function App() {
  return (
    <>
      {/* Main content area for all pages */}
      <main className="container-fluid px-0">
        <Outlet />
      </main>

      {/* Shared footer for all pages */}
      <footer className="text-center text-muted py-3 mt-4 border-top">
        <small>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</small>
      </footer>
    </>
  );
}

export default App;
