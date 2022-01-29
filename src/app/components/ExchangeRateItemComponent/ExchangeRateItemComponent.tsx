import { ExchangeRateType } from '@models/types/ExchangeRateType';

export const ExchangeRateItemComponent = ({ country, currencyName, amount, currencyCode, rate }: ExchangeRateType) => {
  return (
    <tr>
      <td>{{country}}</td>
      <td>{{currencyName}}</td>
      <td>{{amount}}</td>
      <td>{{currencyCode}}</td>
      <td>{{rate}}</td>
    </tr>
  );
};
