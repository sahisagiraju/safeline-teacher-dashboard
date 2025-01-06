import { useState } from "react";
import Banner from "./components/banner";
import Sidebar from "./components/sidebar";
import Card from "./components/card";

function App() {
  const [currStudent, setCurrStudent] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshStudents = () => {
    console.log("Project ID:", process.env.REACT_APP_PROJECT_ID);
    setRefreshTrigger((prev) => prev + 1); // Increment the trigger state
  };

  return (
    <div className="App">
      <Banner onReset={refreshStudents} />
      <div className="flex flex-row h-screen">
        <div className="w-[30%] h-full overflow-y-auto">
          <Sidebar
            onSelectStudent={setCurrStudent}
            refreshTrigger={refreshTrigger}
          />
        </div>
        <div className="w-[70%]">
          <Card student={currStudent} onStatusChange={refreshStudents} />
        </div>
      </div>
    </div>
  );
}

export default App;
