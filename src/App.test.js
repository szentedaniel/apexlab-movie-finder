import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Homepage. Please search for any movie/i);
  expect(linkElement).toBeInTheDocument();
});
