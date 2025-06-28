import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./routes/App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";

// Buat instance QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
  </QueryClientProvider>
  // </StrictMode>
);
