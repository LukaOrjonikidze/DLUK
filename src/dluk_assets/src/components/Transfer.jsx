import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/dluk";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";


function Transfer() {
  const [toInput, setToInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleClick() {
    setIsDisabled(true);
    const authClient = AuthClient.create();
    const identity = authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    setMessage(await authenticatedCanister.transfer(Principal.fromText(toInput), Number(amountInput)));
    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}

              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick} 
          disabled={isDisabled}
          >
            Transfer
          </button>
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Transfer;
