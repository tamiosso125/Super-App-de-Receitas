import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import titleGenerator from '../services/titleGenerator';
import ReceitasContext from '../context/ReceitasContext';

function ExploreDrinksFoods(props) {
  const { location: { pathname } } = props;
  const { setUrlAPI } = useContext(ReceitasContext);
  const history = useHistory();
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
    console.log('Cliclou');
    if (pathname.includes('drinks')) {
      setUrlAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    } else {
      setUrlAPI('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    }
  };

  return (
    <>
      <Header title={ titleGenerator(pathname) } buttonProfile />
      <Link to={ `${pathname}/ingredients` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => searchIngredients() }
        >
          By Ingredient
        </button>
      </Link>
      {!pathname.includes('drinks')
        && (
          <Link to="/explore/foods/nationalities">
            <button
              type="button"
              data-testid="explore-by-nationality"
            >
              By Nationality
            </button>
          </Link>
        )}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => randomRecipes() }
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

ExploreDrinksFoods.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default ExploreDrinksFoods;
