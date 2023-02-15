import React, { useState } from "react";
import { dluk } from "../../../declarations/dluk";
import { Principal } from "@dfinity/principal";

function Balance() {
  const [inputValue, setInputValue] = useState("");
  const [balance, setBalance] = useState();
  const [cryptoSymbol, setCryptoSymbol] = useState();
  const [isHidden, setIsHidden] = useState(true);


  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balanceReturned = await dluk.balanceOf(principal);
    const symbol = await dluk.getSymbol();
    setBalance(balanceReturned.toLocaleString());
    setCryptoSymbol(symbol);
    setIsHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
          
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balance} {cryptoSymbol}.</p>
      
    </div>
  );
}

export default Balance;
