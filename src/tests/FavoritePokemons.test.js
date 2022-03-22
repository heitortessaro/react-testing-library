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
  it('Teste de rota', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toEqual('/');
    const favoritesPath = '/favorites';
    history.push(favoritesPath);
    expect(history.location.pathname).toEqual(favoritesPath);
  });
  it('Teste conteúdo da pagina sem Pokemons favoritos.', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toEqual('/');
    history.push('/favorites');
    const title = screen.getByRole('heading', { level: 2, name: /favorite pokémons/i });
    expect(title).toBeInTheDocument();
    const text = screen.getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
});
