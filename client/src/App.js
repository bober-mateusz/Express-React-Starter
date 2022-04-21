//Components
import Customers from "./components/customers/customers.jsx";
import Codeeditor from "./components/input/Codeeditor.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Output from "./components/output/output.jsx";
import BubbleSort from "./components/visualization/BubbleSort.jsx";

//Data
var data = [14, 2, 42, 17, 28, 12, 11, 18, 47, 19, 32, 46, 39, 34];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <hr></hr>
        <BubbleSort />
      </header>
    </div>
  );
}

export default App;
