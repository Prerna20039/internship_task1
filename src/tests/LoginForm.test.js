// src/components/LoginForm/LoginForm.test.js
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders LoginForm and submits the form correctly', () => {
  const mockSubmit = jest.fn();

  render(<LoginForm onSubmit={mockSubmit} />);

  // Input fields
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  // Fill in form fields
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  // Submit the form
  fireEvent.click(screen.getByText(/login/i));

  // Assert the mock function was called with correct arguments
  expect(mockSubmit).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'testpassword',
  });
});
