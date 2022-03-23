import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

describe('Teste do componente App', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('Testa informação detalhada do pokémon selecionado', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonName = screen.getByText(pokemons[0].name);
    expect(pokemonName).toBeInTheDocument();
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toContain(`/pokemons/${pokemons[0].id}`);
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();
    expect(history.location.pathname).toContain(`/pokemons/${pokemons[0].id}`);
    const title = screen.getByRole('heading', { name: `${pokemons[0].name} Details` });
    expect(title).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });
  it('Testa informações de localização do pokemon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const locationTitle = screen
      .getByRole('heading', { name: `Game Locations of ${pokemons[0].name}` });
    expect(locationTitle).toBeInTheDocument();
    const { foundAt } = pokemons[0];
    foundAt.forEach((location) => {
      const locName = screen.getByText(location.location);
      expect(locName).toBeInTheDocument();
    });
    const maps = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(maps.length).toEqual(foundAt.length);
    maps.forEach((img, index) => {
      expect(img.src).toEqual(foundAt[index].map);
    });
  });
  it('Testa seleção de pokemon favorito', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    expect(screen.getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    console.log(checkbox);
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain('/star-icon.svg');
    userEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
