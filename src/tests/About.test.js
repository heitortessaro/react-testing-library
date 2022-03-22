import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste do componente About', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };
  it('Teste de rota', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toEqual('/');
    history.push('/about');
    expect(history.location.pathname).toEqual('/about');
  });
  it('Teste dos componentes da page About', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toEqual('/');
    history.push('/about');
    expect(history.location.pathname).toEqual('/about');
    const title = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(title).toBeInTheDocument();
    const image = screen.getByAltText(/pokédex/i);
    expect(image).toBeInTheDocument();
    const IMAGE_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    console.log(image);
    expect(image.src).toEqual(IMAGE_URL);
    const firstP = screen.getByText(/this application simulates a pokédex/i);
    expect(firstP).toBeInTheDocument();
    const seccondP = screen.getByText(/one can filter pokémons by type,/i);
    expect(seccondP).toBeInTheDocument();
  });
});
