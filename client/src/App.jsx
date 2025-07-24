import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* Toast system */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <AppRoutes />
    </>
  );
}

export default App;
