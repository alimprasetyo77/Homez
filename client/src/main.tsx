import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./routes/App.tsx";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "sonner";

// Buat instance QueryClient
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      const isValidShape = toast.error(err.message); // the shape of the errors should be as errors DTO: [key : string]
      if (typeof isValidShape !== "undefined") {
        toast.error(err.message); // shows API validation messages as a toast
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
  </QueryClientProvider>
  // </StrictMode>
);
