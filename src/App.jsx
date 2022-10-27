import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import Spinner from "./modules/Loader";
import { HomePage } from "./views/HomePage";
import { LibraryPage } from "./views/LibraryPage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/filmoteka"
          element={
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/library/*"
          element={
            <Suspense fallback={<Spinner />}>
              <LibraryPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;
