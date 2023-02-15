import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/dluk";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("Gimme gimme");
  const [identity, setIdentity] = useState("");

  async function handleClick(event) {
    setIsDisabled(true);
    const authClient = AuthClient.create();
    const identity = authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const message = await authenticatedCanister.payOut();
    setButtonMessage(message)
    setIdentity(identity._principal.toString());
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DLuka tokens here! Claim 10,000 DLUK coins to your account. {identity}</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonMessage}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
