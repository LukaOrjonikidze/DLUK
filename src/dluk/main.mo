import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
  let owner : Principal = Principal.fromText("hyzdc-3ghho-wvaxv-itwnv-v6w5x-r5skb-27ge6-ktxnc-fg3cc-ydaoh-rqe");
  let totalSupply : Nat = 1000000000;
  let symbol : Text = "DLUK";

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  if (balances.size() < 1){
    balances.put(owner, totalSupply);
  };
  
  public query func balanceOf(who: Principal): async Nat{
    let balance : Nat = switch (balances.get(who)){
      case null 0;
      case (?result) result;
    };
    return balance;
  };
  public query func getSymbol(): async Text{
    return symbol;
  };
  public shared(msg) func payOut() : async Text{
    Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null){
      let result = await transfer(msg.caller, 10000);
      return result;
    };
    return "You have already claimed DLUK - s";
  };
  public shared(msg) func transfer(to: Principal, amount: Nat): async Text{
    var message : Text = "";
    let fromAmount : Nat = await balanceOf(msg.caller);
    let toAmount : Nat = await balanceOf(to);
    if (Principal.equal(msg.caller, to)){
      message:= "You cannot send DLUK-s to yourself!"
    } else {
      if (fromAmount < amount){
        message := "Insufficient DLUK - s";
      } else {
        message := "Successfully Transfered";
        balances.put(msg.caller, fromAmount - amount);
        balances.put(to, toAmount + amount);
      };
    };
    return message;
  };

  system func preupgrade(){
    balanceEntries := Iter.toArray(balances.entries());
  };
  system func postupgrade(){
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1){
      balances.put(owner, totalSupply);
    }
  };

}