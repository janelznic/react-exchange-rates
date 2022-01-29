import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExchangeRateType } from '@models/types/ExchangeRateType';
import {
  PARSE_RATE_REGEX as parseRateRegex,
  CNB_RATES_URI as cnbRatesUri
} from '@shared/vars/constants';

export const ExchangeRatesPage = () => {
  const [fetchedData, setFetchedData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(cnbRatesUri);
      setFetchedData(res.data);
    };

    fetchData();
  }, [fetchedData]);

  const pureRateStrings = fetchedData.split('\n').filter((row: string) => parseRateRegex.test(row));
  const tableData: ExchangeRateType[] = pureRateStrings.map(elm => {
    const arr = elm.split('|');

    return {
      country: arr[0],
      currencyName: arr[1],
      amount: arr[2],
      currencyCode: arr[3],
      rate: arr[4]
    }
  });

  return (
    <div>
      <h1>Kurzy ČNB</h1>

      <table>
        <thead>
          <tr>
            <td>Země</td>
            <td>Měna</td>
            <td>Množství</td>
            <td>Kód</td>
            <td>Kurz</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rate, index) => (
            <tr key={index}>
              <td>{rate.country}</td>
              <td>{rate.currencyName}</td>
              <td>{rate.amount}</td>
              <td>{rate.currencyCode}</td>
              <td>{rate.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
