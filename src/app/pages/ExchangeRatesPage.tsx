import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExchangeRateType } from '@models/types/ExchangeRateType';
import { CNB_RATES_URI as cnbRatesUri } from '@shared/vars/constants';
import {
  ConverterComponent,
  TableBodyComponent,
  TableColComponent,
  TableComponent,
  TableHeadComponent,
  TableHeadRowComponent,
  TableRowComponent,
  TitleComponent,
  WrapperComponent
} from '@components/index';

export const ExchangeRatesPage = () => {
  const [fetchedData, setFetchedData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(cnbRatesUri);
      setFetchedData(res.data);
    };

    if (!fetchedData) {
      fetchData();
    }
  }, [fetchedData]);

  const pureRateStringsArray = fetchedData.split('\n').filter((row) => {
    const arr = row.split('|');
    return (arr.length === 5 && !isNaN(parseFloat(arr[4].replace(',', '.'))));
  });

  const tableData: ExchangeRateType[] = pureRateStringsArray.map(elm => {
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
    <WrapperComponent>
      <TitleComponent>Kurzy ČNB</TitleComponent>

      <TableComponent cellSpacing="0" cellPadding="0">
        <TableHeadComponent>
          <TableHeadRowComponent>
            <TableColComponent>Země</TableColComponent>
            <TableColComponent>Měna</TableColComponent>
            <TableColComponent>Množství</TableColComponent>
            <TableColComponent>Kód</TableColComponent>
            <TableColComponent>Kurz</TableColComponent>
          </TableHeadRowComponent>
        </TableHeadComponent>
        <TableBodyComponent>
          {tableData.map((rate, index) => (
            <TableRowComponent key={index}>
              <TableColComponent>{rate.country}</TableColComponent>
              <TableColComponent>{rate.currencyName}</TableColComponent>
              <TableColComponent>{rate.amount}</TableColComponent>
              <TableColComponent>{rate.currencyCode}</TableColComponent>
              <TableColComponent>{rate.rate}</TableColComponent>
            </TableRowComponent>
          ))}
        </TableBodyComponent>
      </TableComponent>

      <ConverterComponent rates={tableData} />
    </WrapperComponent>
  );
};
