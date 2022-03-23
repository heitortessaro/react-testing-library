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
  // const pokemonNames = pokemons.map((pokemon) => pokemon.name);
  // const polemonIds = pokemons.map((pokemon) => pokemon.id);

  it('Testa apresentacao dos cards dos pokemons', () => {
    renderWithRouter(<App />);
    const btnNextPoke = screen.getByRole('button',
      { name: /próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();
      const type = screen.getAllByText(pokemon.type);
      expect(type.length).toBe(2);
      const weight = screen
        .getByText(`Average weight: ${pokemon
          .averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
      expect(weight).toBeInTheDocument();
      const image = screen.getByAltText(`${pokemon.name} sprite`);
      expect(image).toBeInTheDocument();
      expect(image.src).toEqual(pokemon.image);
      userEvent.click(btnNextPoke);
    });
  });
  it('Testa link e page de detalhes sobre pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonName = screen.getByText(pokemons[0].name);
    expect(pokemonName).toBeInTheDocument();
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toContain(`/pokemons/${pokemons[0].id}`);
    userEvent.click(detailsLink);
    expect(history.location.pathname).toContain(`/pokemons/${pokemons[0].id}`);
  });
  it('Testa seleção de pokemon favorito', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain('/star-icon.svg');
    userEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
