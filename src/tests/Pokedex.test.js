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
  const typesArr = pokemons.map((pokemon) => pokemon.type);
  const types = typesArr.filter((type, index) => typesArr.indexOf(type) === index);
  const pokemonNames = pokemons.map((pokemon) => pokemon.name);

  it('Teste de rota', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toEqual('/');
  });
  it('Teste de existencia de componentes', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
    const btnNextPoke = screen.getByRole('button',
      { name: /próximo pokémon/i });
    expect(btnNextPoke).toBeInTheDocument();
    const btnTypeAll = screen.getByRole('button',
      { name: /all/i });
    expect(btnTypeAll).toBeInTheDocument();
    const btnTypes = [];
    types.forEach((type, index) => {
      btnTypes[index] = screen.getByRole('button', { name: type });
    });
    btnTypes.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });
  });
  it('Teste de apresentação dos pokemons', () => {
    renderWithRouter(<App />);
    const btnNextPoke = screen.getByRole('button',
      { name: /próximo pokémon/i });
    expect(btnNextPoke).toBeInTheDocument();
    // const btnTypes = [];
    // types.forEach((type, index) => {
    //   btnTypes[index] = screen.getByRole('button', { name: type });
    // });
    // btnTypes.push(screen.getByRole('button', { name: /all/i }));
    pokemonNames.forEach((pokemonName) => {
      const card = screen.getByText(pokemonName);
      expect(card).toBeInTheDocument();
      userEvent.click(btnNextPoke);
    });
    const card = screen.getByText(pokemonNames[0]);
    expect(card).toBeInTheDocument();
  });
});
