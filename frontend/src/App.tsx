import { useEffect, useState } from "react";
import type { ApiResponse } from "@marvel-showcase/shared";

function App() {
  const [status, setStatus] = useState("...");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((res: ApiResponse<string>) => setStatus(res.data ?? "no data"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-bold">Backend status : {status}</p>
    </div>
  );
}

export default App;
