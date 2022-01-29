import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const ExchangeRatesTableComponent = ({ children }: Props) => {
  return (
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
        {children}
      </tbody>
    </table>
  );
};
