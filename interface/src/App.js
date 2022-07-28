import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import { fetchData } from "./utils/tzkt";
import { collectNFT, mintNFT } from "./utils/tzkt";

const App = () => {
  // Players holding lottery tickets
  const [data, setData] = useState([]);
  const [token, setToken] = useState(5);
  const [loading, setLoading] = useState(false);

  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    (async () => {
      const storage = await fetchData();
      setData(Object.values(storage.data));
      setToken(storage.token_id);
    })();
  }, []);

  // TODO 7.a - Complete onBuyTicket function
  const oncollectNFT = async () => {
   try{ 
    setLoading(true);
    await collectNFT();
    alert("Transaction Confirmed!");
  } catch (err){
    alert("Transaction failed: ", err.message);
  }
    setLoading(false);
  };

  // TODO 11.a - Complete onEndGame function
  const onmintNFT = async () => {
    try{ 
      setLoading(true);
      await mintNFT();
      alert("Transaction Confirmed!");
    } catch (err){
      alert("Transaction failed: ", err.message);
    }
      setLoading(false);
  };

  useEffect(()=>{
    dispatch(fetchData());
},[Tezos, dispatch]);

// sistemare ui e accesso dati contratto, prova
  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {/* Ticket remaining display */}
        <div className="py-1"></div>
        {/* Action Buttons */}
        {tickets > 0 ? (
          <button onClick={onBuyTicket} className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
            {loading === true ? "Loading..." : "Buy Ticket"}
          </button>
        ) : (
          <button onClick={onEndGame} className="btn btn-success btn-lg">
            {/* TODO 11.b - Call onEndGame on click */}
            {/* TODO 11.c - Show "loading..." when buying operation is pending */}
            {loading === true ? "Loading..." : "End Game"}
          </button>
        )}
        {/* List of Players */}
        <div className="mt-2">
          {players.map((player, index) => (
            <div key={index}>
              <b>Ticket {index + 1}:</b> {player}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
