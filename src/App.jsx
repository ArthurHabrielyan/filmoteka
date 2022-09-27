import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AppBar } from "./modules/AppBar";
import Spinner from "./modules/Loader";
import { HomePage } from "./views/HomePage";
import { LibraryPage } from "./views/LibraryPage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route path="/filmoteka" element={<Navigate to="/" />} />
          <Route
            index
            path="home"
            element={
              <Suspense fallback={<Spinner />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="library"
            element={
              <Suspense fallback={<Spinner />}>
                <LibraryPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
