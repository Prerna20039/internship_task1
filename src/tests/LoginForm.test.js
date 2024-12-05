import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders LoginForm and submits the form correctly', () => {
  const mockSubmit = jest.fn();

  render(<LoginForm onSubmit={mockSubmit} />);

  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  fireEvent.click(screen.getByText(/login/i));

  expect(mockSubmit).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'testpassword',
  });
});
