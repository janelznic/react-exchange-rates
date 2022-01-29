import styled from 'styled-components';

export const Wrapper = styled.div`
  float: left;
  width: 25em;
  margin: 2em 0;
  padding: 1em;
  background: #F7F7F7;
  border-radius: .5em;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .5);
  overflow: auto;

  input, select, button {
    margin: .25em 0 .5em;
    padding: .25em;
    width: 100%;
    font-size: 1.5em;
    border: 2px solid rgba(0, 0, 0, .1);
    border-radius: .25em;

    :focus {
      outline: 4px solid #CCDEFF;
    }
  }

  select {
    height: 2.25em;
  }

  input {
    width: 94%;
    font-size: 1.75em;
  }
`;

export const Label = styled.label`
  
`;

export const Input = styled.input`
  
`;

export const Button = styled.button`
  height: 2em;
  color: #FFF;
  // background: #0D4680;
  background: #327CFE;
  border: 0;
  cursor: pointer;

  :hover {
    // background: #2487EA;
  }
`;

export const Result = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;
