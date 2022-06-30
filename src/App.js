import logo from "./logo.svg";
import "./App.css";
import WalletContainer from "./components/Wallet/wallet.container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionContainer from "./components/Transaction/transaction.container";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WalletContainer />} />
        <Route exact path="/transaction" element={<TransactionContainer />} />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
}

export default App;
