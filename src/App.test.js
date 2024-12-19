import { render, screen } from '@testing-library/react';
import App from './App';

Element.prototype.scrollTo = jest.fn();

it('renders learn react link', () => {
    render(<App />);
    const title = screen.getByText(/News Feed/i);
    expect(title).toBeInTheDocument();
});
