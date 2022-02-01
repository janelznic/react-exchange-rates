import React from 'react';
import { render, screen } from '@testing-library/react';
import { AlertMessageEnum } from '../../models/enums/AlertMessageEnum';
import { AlertMessageComponent } from './AlertMessageComponent';

test('Renders error message', () => {
  render(<AlertMessageComponent type={AlertMessageEnum.Error} />);
  const linkElement = screen.getByText(/Nastala chyba/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders warning message', () => {
  render(<AlertMessageComponent type={AlertMessageEnum.Warning} />);
  const linkElement = screen.getByText(/Varování/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders message with children', () => {
  render(<AlertMessageComponent type={undefined}>Testujeme</AlertMessageComponent>);
  const linkElement = screen.getByText(/Testujeme/i);
  expect(linkElement).toBeInTheDocument();
});
