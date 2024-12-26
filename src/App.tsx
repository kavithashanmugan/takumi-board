import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 w-full">
      <div className="flex-1 flex flex-col">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
