import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login'; // Import the Login component

test('renders login form', () => {
  render(<Login />);
  
  
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/login/i));

  expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Example check for loading state
});
