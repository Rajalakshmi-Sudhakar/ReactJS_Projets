import { useState } from "react";
import InvestmentInput from "./components/InvestmentInput";
import InvestmentOutput from "./components/InvestmentOutput";

function App() {
  const [inputValues, setInputValues] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = inputValues.duration >= 1;

  function handleInputChange(name, value) {
    setInputValues((prevUserInput) => {
      return { ...prevUserInput, [name]: +value };
    });
  }

  return (
    <>
      <InvestmentInput
        userInput={inputValues}
        onInputChange={handleInputChange}
      />
      {!inputIsValid && (
        <p className="center"> Please enter valid input data</p>
      )}
      {inputIsValid && <InvestmentOutput input={inputValues} />}
    </>
  );
}

export default App;
