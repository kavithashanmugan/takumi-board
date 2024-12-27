import Board from "./components/Board";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Navbar />
    <div className="text-center">
    <Board />
    </div>
  </div>
    // <div className="mx-auto" >
    //   <div className="flex flex-col bg-white">
    //   <Navbar />
    //   <main className="containermx-auto">
    //     <div className="flex justify-center items-center w-full">
    //       <div className="w-full max-w-5xl bg-gray-100 p-8 rounded-lg">
    //         <Board />
    //       </div>
    //     </div>
    //   </main>
    // </div>
    // </div>
  );
}

export default App;
