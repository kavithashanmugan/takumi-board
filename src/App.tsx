import Board from "./components/Board";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Navbar />
    <div className="mt-[10%] text-center">
    <Board />
    </div>
  </div>
  );
}

export default App;
