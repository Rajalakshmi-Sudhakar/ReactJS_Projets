import { calculateInvestmentResults } from "../util/investment.js";
import { formatter } from "../util/investment.js";

export default function InvestmentOutput({ input }) {
  const resultsData = calculateInvestmentResults(input);
  console.log(resultsData);

  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment value</th>
          <th>Interest(year)</th>
          <th>Total Interest</th>
          <th>InvestedCapitol</th>
        </tr>
      </thead>
      <tbody>
        {resultsData.map((value, index) => {
          const totalInterest =
            value.valueEndOfYear -
            value.annualInvestment * value.year -
            initialInvestment;

          const totalAmountInvested = value.valueEndOfYear - totalInterest;
          return (
            <tr key={index}>
              <td>{value.year}</td>
              <td>{formatter.format(value.valueEndOfYear)}</td>
              <td>{formatter.format(value.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
