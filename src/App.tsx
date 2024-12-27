import Board from "./components/Board";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex justify-center items-center w-full h-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-screen-xl">
            <Board />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
