import { useState } from "react";
import { Button } from "./components/ui/button";
import "./App.css";
import Sidebar from "./components/ui/sidebar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-row min-h-screen">
        <div className="flex flex-row flex-1 w-full border-4">

        <Button>Click me</Button>
        </div>
      <Sidebar />
      </div>
    </>
  );
}

export default App;
