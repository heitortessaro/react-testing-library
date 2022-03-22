import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  });

  it('Teste dos links do menu', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toEqual('/');
    userEvent.click(aboutLink);
    expect(history.location.pathname).toEqual('/about');
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toEqual('/favorites');
  });
});
