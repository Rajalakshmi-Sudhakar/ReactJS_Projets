export default function InvestmentInput({ userInput, onInputChange }) {
  return (
    <div id="user-input">
      <span className="input-group">
        <label>
          INITIAL INVESTMENT
          <input
            type="number"
            min="0"
            step="1"
            value={userInput.initialInvestment}
            onChange={(event) =>
              onInputChange("initialInvestment", event.target.value)
            }
          />
        </label>
        <label>
          ANNUAL INVESTMENT
          <input
            type="number"
            min="0"
            step="1"
            value={userInput.annualInvestment}
            onChange={(event) =>
              onInputChange("annualInvestment", event.target.value)
            }
          />
        </label>
      </span>
      <br />

      <span className="input-group">
        <label>
          EXPECTED RETURN
          <input
            type="number"
            min="0"
            step="1"
            value={userInput.expectedReturn}
            onChange={(event) =>
              onInputChange("expectedReturn", event.target.value)
            }
          />
        </label>
        <label>
          DURATION
          <input
            type="number"
            min="0"
            max="12"
            step="1"
            value={userInput.duration}
            onChange={(event) => onInputChange("duration", event.target.value)}
          />
        </label>
      </span>
    </div>
  );
}
