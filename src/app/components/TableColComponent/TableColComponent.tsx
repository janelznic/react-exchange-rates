import styled from 'styled-components';

export const TableColComponent = styled.td`
  margin: 0;
  padding: .25em 1em;

  :first-child {
    padding-left: 2em;
  }

  :last-child {
    padding-right: 2em;
  }
`;
