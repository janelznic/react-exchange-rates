import { ReactNode } from 'react';
import styled from 'styled-components';
import { AlertMessageEnum } from '../../models/enums/AlertMessageEnum';

const Alert = styled.div`
  text-align: center;

  color: #141619;
  background-color: #d3d3d4;
  border-color: #bcbebf;
  border: 1px solid #BCBEBF;
  border-radius: 0.25em;

  > div {
    padding: 1em;
  }

  .error {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
  }

  .info {
    color: #084298;
    background-color: #cfe2ff;
    border-color: #b6d4fe;
  }

  .success {
    color: #0f5132;
    background-color: #d1e7dd;
    border-color: #badbcc;
  }

  .warning {
    color: #664d03;
    background-color: #fff3cd;
    border-color: #ffecb5;
  }
`;

type Props = {
  type?: AlertMessageEnum;
  children?: ReactNode;
}

export const AlertMessageComponent = ({ type, children }: Props) => {
  switch(type) {
    case AlertMessageEnum.Error:
      return (
        <Alert>
          <div className="error"><b>Nastala chyba:</b> {children}</div>
        </Alert>
      );
    case AlertMessageEnum.Info:
      return (
        <Alert>
          <div className="info">{children}</div>
        </Alert>
      );
    case AlertMessageEnum.Success:
      return (
        <Alert>
          <div className="success">{children}</div>
        </Alert>
      );
    case AlertMessageEnum.Warning:
      return (
        <Alert>
          <div className="warning"><b>Varování:</b> {children}</div>
        </Alert>
      );
    default:
      return (
        <Alert>
          <div>{children}</div>
        </Alert>
      );
  }
};
