import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { ExchangeRateType } from '@models/types/ExchangeRateType';
import {
  PARSE_RATE_REGEX as parseRateRegex,
  CNB_RATES_URI as cnbRatesUri
} from '@shared/vars/constants';

const Table = styled.table`
  padding: 0 0 1em 0;
  font-size: 1em;
  background: #292C34;
  color: #FFF;
  border-radius: 1em;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .5);
`;

const TableHead = styled.thead`
  font-size: 1em;
  font-weight: bold;
  color: #54A9F1;
`;

const TableHeadRow = styled.tr`
  td {
    padding: 1em 1em .25em;
  }
`;

const TableBody = styled.tbody`
  
`;

const TableRow = styled.tr`
  :hover {
    background: #363B45;
    color: #F5C867;
  }
`;

const TableCol = styled.td`
  margin: 0;
  padding: .25em 1em;

  :first-child {
    padding-left: 2em;
  }

  :last-child {
    padding-right: 2em;
  }
`;

const Title = styled.h1`
  padding-bottom: .5em;
  font-size: 2em;
  text-align: center;
  color: #000;
`;

const Wrapper = styled.section`
  padding: 2em 4em;
  background: #FFF;
`;

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
    <Wrapper>
      <Title>Kurzy ČNB</Title>

      <Table cellSpacing="0" cellPadding="0">
        <TableHead>
          <TableHeadRow>
            <TableCol>Země</TableCol>
            <TableCol>Měna</TableCol>
            <TableCol>Množství</TableCol>
            <TableCol>Kód</TableCol>
            <TableCol>Kurz</TableCol>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {tableData.map((rate, index) => (
            <TableRow key={index}>
              <TableCol>{rate.country}</TableCol>
              <TableCol>{rate.currencyName}</TableCol>
              <TableCol>{rate.amount}</TableCol>
              <TableCol>{rate.currencyCode}</TableCol>
              <TableCol>{rate.rate}</TableCol>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
};
