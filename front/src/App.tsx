import { Route, Routes } from "react-router";
import { Paths } from "./Paths";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="relative h-screen overflow-y-scroll rounded-lg bg-black text-white shadow-lg">
      <Routes>
        {Paths.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.element />}
            ></Route>
          );
        })}
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
