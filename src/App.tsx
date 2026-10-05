import { BrowserRouter } from "react-router-dom";
import { AppProviders, AppRoutes } from "./AppRoutes";

// Must render the same tree as src/entry-server.tsx so the prerendered HTML hydrates cleanly.
const App = () => (
  <AppProviders>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
