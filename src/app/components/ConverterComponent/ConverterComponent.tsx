import { useState } from 'react';
import { ExchangeRateType } from '@models/types/ExchangeRateType';
import { Button, Input, Label, Result, Wrapper } from './ConverterComponentStyles';
import { DEFAULT_OUTPUT_CURRENCY as defaultOutputCurrency } from '@shared/vars/constants';

type Props = {
  rates: ExchangeRateType[];
}

// = ({ text }: Props) => {
export const ConverterComponent = ({ rates }: Props) => {
  const [amount, setAmount] = useState<number>(100);
  const [outputCurrency, setOutputCurrency] = useState<string>(defaultOutputCurrency);
  const [result, setResult] = useState<number>(0);

  const convert = () => {
    setResult(amount);
  };

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value);
    convert();
  };

  const handleOutputCurrencyChange = (event: any) => {
    setOutputCurrency(event.target.value);
    convert();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    convert();
  }

  const ResultCondition = () => {
    if (result) {
      return (
        <Result>
          {amount}&nbsp;CZK =&nbsp;{result}&nbsp;{outputCurrency}
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
        <Input id="inputAmount" type="number" value={amount} onChange={handleAmountChange} />

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
