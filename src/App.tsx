import "./App.scss";
import Header from "./components/header/Header";
import LotList from "./components/lotList/LotList";
import SearchingPlaceholder from "./components/searchingPlaceholder/SearchingPlaceholder";
import { useAppSelector } from "./hooks/redux";

function App() {
  const lotList = useAppSelector((state) => state.lotListReducer.lots);
  const searching = useAppSelector((state) => state.searchingReducer.searching);
  const minStock = useAppSelector((state) => state.minStockReducer.minStock);

  return (
    <div className="App">
      <Header />
      <LotList lotList={ minStock !== undefined && minStock > 1 ? lotList.filter((el) => el.totalMaps >= minStock) : lotList} />
      {searching && <SearchingPlaceholder />}
    </div>
  );
}

export default App;
