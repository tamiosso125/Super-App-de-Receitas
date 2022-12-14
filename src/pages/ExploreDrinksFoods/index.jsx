import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import titleGenerator from '../../services/titleGenerator';

import { ExploreButton, ExploreContainer } from './ExploreDrinksFoods.styled';

function ExploreDrinksFoods() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const randomRecipes = async () => {
    let url = '';
    if (pathname.includes('drinks')) {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    } else {
      url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    }
    const request = await fetch(url);
    const requestJson = await request.json();
    const recipeObject = Object.values(requestJson)[0][0];
    const idRecipe = recipeObject.idMeal || recipeObject.idDrink;
    if (pathname.includes('drinks')) {
      history.push(`/drinks/${idRecipe}`);
    } else {
      history.push(`/foods/${idRecipe}`);
    }
  };

  const searchIngredients = () => {
    if (pathname.includes('drinks')) {
      history.push('/explore/drinks/ingredients');
    } else {
      history.push('/explore/foods/ingredients');
    }
  };

  return (
    <>
      <Header title={ titleGenerator(pathname) } buttonProfile />
      <ExploreContainer>
        <Link to={ `${pathname}/ingredients` }>
          <ExploreButton
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => searchIngredients() }
          >
            By Ingredient
          </ExploreButton>
        </Link>
        {!pathname.includes('drinks')
        && (
          <Link to="/explore/foods/nationalities">
            <ExploreButton
              type="button"
              data-testid="explore-by-nationality"
            >
              By Nationality
            </ExploreButton>
          </Link>
        )}
        <ExploreButton
          type="button"
          data-testid="explore-surprise"
          onClick={ () => randomRecipes() }
        >
          Surprise me!
        </ExploreButton>
      </ExploreContainer>
      <Footer />
    </>
  );
}

export default ExploreDrinksFoods;
