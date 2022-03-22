import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste do componente App', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };
  it('Teste de página não encontrada', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toEqual('/');
    history.push('/teste');
    const title = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
    const image = screen.getByAltText(/Pikachu crying because the page requested was/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
