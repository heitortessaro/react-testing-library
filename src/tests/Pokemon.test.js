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
});

// it('Teste de rota', () => {
  //   const { history } = renderWithRouter(<App />);
  //   expect(history.location.pathname).toEqual('/');
  // });
  // it('Teste de existencia de componentes', () => {
  //   renderWithRouter(<App />);
  //   const title = screen.getByRole('heading',
  //     { level: 2, name: /Encountered pokémons/i });
  //   expect(title).toBeInTheDocument();
  //   const btnNextPoke = screen.getByRole('button',
  //     { name: /próximo pokémon/i });
  //   expect(btnNextPoke).toBeInTheDocument();
  //   const btnTypeAll = screen.getByRole('button',
  //     { name: /all/i });
  //   expect(btnTypeAll).toBeInTheDocument();
  //   const btnTypes = [];
  //   types.forEach((type, index) => {
  //     btnTypes[index] = screen.getByRole('button', { name: type });
  //   });
  //   btnTypes.forEach((btn) => {
  //     expect(btn).toBeInTheDocument();
  //     // expect(btn.dataTestId).toContain('pokemon-type-button');
  //   });
  //   const btnByTestId = screen.getAllByTestId('pokemon-type-button');
  //   expect(btnByTestId.length).toBe(types.length);
  // });
  // it('Teste de apresentação dos pokemons e utilizacao btn Próximo Pokémon', () => {
  //   renderWithRouter(<App />);
  //   const btnNextPoke = screen.getByRole('button',
  //     { name: /próximo pokémon/i });
  //   pokemonNames.forEach((pokemonName) => {
  //     const card = screen.getByText(pokemonName);
  //     expect(card).toBeInTheDocument();
  //     userEvent.click(btnNextPoke);
  //   });
  //   const card = screen.getByText(pokemonNames[0]);
  //   expect(card).toBeInTheDocument();
  // });
  // it('Teste do funcionamento do botão All', () => {
  //   renderWithRouter(<App />);
  //   const btnNextPoke = screen.getByRole('button',
  //     { name: /próximo pokémon/i });
  //   userEvent.click(btnNextPoke);
  //   userEvent.click(btnNextPoke);
  //   const btnTypeAll = screen.getByRole('button',
  //     { name: /all/i });
  //   userEvent.click(btnTypeAll);
  //   const pokeName = screen.getByText(pokemonNames[0]);
  //   expect(pokeName).toBeInTheDocument();
  // });
  // it('Testa filtro por tipo de pokemon', () => {
  //   renderWithRouter(<App />);
  //   const selectedType = types.pop();
  //   const namesOfSelected = pokemons
  //     .filter((pokemon) => pokemon.type === selectedType)
  //     .map((pokemon) => pokemon.name);
  //   // console.log(selectedType);
  //   // console.log(namesOfSelected);
  //   const btnOfType = screen.getByRole('button', { name: selectedType });
  //   expect(btnOfType).toBeInTheDocument();
  //   userEvent.click(btnOfType);
  //   const btnNextPoke = screen.getByRole('button',
  //     { name: /próximo pokémon/i });
  //   namesOfSelected.forEach((name) => {
  //     const card = screen.getByText(name);
  //     expect(card).toBeInTheDocument();
  //     userEvent.click(btnNextPoke);
  //   });
  //   const card = screen.getByText(namesOfSelected[0]);
  //   expect(card).toBeInTheDocument();
  // });
  // it('Teste se apenas um pokemon é renderizado por vez', () => {
  //   renderWithRouter(<App />);
  //   const images = screen.getAllByRole('img');
  //   expect(images.length).toBe(1);
  //   const detailLinks = screen.getAllByRole('link', { name: /more details/i });
  //   expect(detailLinks.length).toBe(1);
  //   const weigthText = screen.getAllByText(/average weight/i);
  //   expect(weigthText.length).toBe(1);
  // });
// });