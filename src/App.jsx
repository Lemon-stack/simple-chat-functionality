import { Route, Routes } from "react-router-dom";
import Hero from "./layout/hero";

import Container from "./layout/container";

// STYLING AINT THE BEST, HAVE TO MEETUP TO DEADLINE :)
function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="chat" element={<Container />} />
    </Routes>
  );
}

export default App;
