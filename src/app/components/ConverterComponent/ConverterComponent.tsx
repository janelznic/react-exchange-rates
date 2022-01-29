import { useState } from 'react';
import { ExchangeRateType } from '@models/types/ExchangeRateType';
import { Button, Input, Label, Result, Wrapper } from './ConverterComponentStyles';
import {
  DEFAULT_INPUT_AMOUNT as defaultInputAmount,
  DEFAULT_OUTPUT_CURRENCY as defaultOutputCurrency
} from '@shared/vars/constants';

type Props = {
  rates: ExchangeRateType[];
}

export const ConverterComponent = ({ rates }: Props) => {
  const [amount, setAmount] = useState<number>(defaultInputAmount);
  const [outputCurrency, setOutputCurrency] = useState<string>(defaultOutputCurrency);
  const [result, setResult] = useState<number>(0);

  let ratesByCode: any = [];
  rates.forEach(rate => {
    ratesByCode[rate.currencyCode] = {
      amount: rate.amount,
      rate: parseFloat(rate.rate.replace(',', '.'))
    };
  });

  const convert = () => {
    setResult(amount / (ratesByCode[outputCurrency].rate / ratesByCode[outputCurrency].amount));
  };

  const resetResult = () => {
    setResult(0);
  };

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value);
    resetResult();
  };

  const handleOutputCurrencyChange = (event: any) => {
    setOutputCurrency(event.target.value);
    resetResult();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    convert();
  }

  const ResultCondition = () => {
    if (result) {
      return (
        <Result>
          =&nbsp;{result}&nbsp;{outputCurrency}
        </Result>
      );
    } else {
      return (
        <Result />
      );
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>

        <Label htmlFor="inputAmount">
          Částka:
        </Label>
        <Input id="inputAmount" type="number" min={0} step={'any'} value={amount} onChange={handleAmountChange} />

        <Label htmlFor="inputCurrency">
          Z:
        </Label>
        <select defaultValue="CZK" disabled>
          <option value="CZK">CZK (koruna) - Česká republika</option>
        </select>

        <Label htmlFor="outputCurrency">
          Do:
        </Label>

        <select value={outputCurrency} onChange={handleOutputCurrencyChange}>
          {rates.map((rate, index) => (
            <option value={rate.currencyCode} key={index}>{rate.currencyCode} ({rate.currencyName}) - {rate.country}</option>
          ))}
        </select>

        <Button type="submit">Převést</Button>
      </form>

      <ResultCondition />
    </Wrapper>
  );
};
