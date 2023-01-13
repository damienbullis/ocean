import styles from "./app.module.scss";

import { Route, Routes, Link } from "react-router-dom";

export function App() {
  return (
    <>
      <div role="navigation" className={styles.root}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-1">Page 1</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              Home Route
              <Link to="/page-1">Click here for page 1.</Link>
            </div>
          }
        />
        <Route
          path="/page-1"
          element={
            <div>
              Page 1 Route
              <Link to="/">Click here to go back to home.</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
