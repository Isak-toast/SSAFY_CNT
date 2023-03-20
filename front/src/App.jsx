import "./App.css";
import NavBar from "./components/organism/NavBar";
import DataSecond from "./components/organism/DataSecond";
import DataThird from "./components/organism/DataThird/index";
import WorldMap from "./components/organism/WorldMap";
function App() {
  return (
    <>
      <NavBar />
      <WorldMap />
      <DataSecond />
      <DataThird />
    </>
  );
}

export default App;
