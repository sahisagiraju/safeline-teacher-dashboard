import './App.css';
import Sidebar from "./components/sidebar";
import Banner from "./components/banner";
import Card from './components/card';
import { useState } from 'react';

function App() {
  const [currStudent, setCurrStudent] = useState(null); // Use null initially

  return (
    <div className="App">
      <Banner />
      <div className="flex flex-row h-screen">
        {/* Sidebar: Takes full height of the remaining screen and scrollable */}
        <div className="w-[30%] h-full overflow-y-auto">
          <Sidebar onSelectStudent={setCurrStudent} /> {/* Pass callback */}
        </div>

        {/* Card: Takes the remaining space */}
        <div className="w-[70%]">
          <Card student={currStudent} /> {/* Pass selected student */}
        </div>
      </div>
    </div>
  );
}

export default App;
