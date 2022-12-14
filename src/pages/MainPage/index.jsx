import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import titleGenerator from '../../services/titleGenerator';
import ReceitasContext from '../../context/ReceitasContext';
import Loading from '../../components/Loading';
import Cards from '../../components/Cards';
import Footer from '../../components/Footer';
import Category from '../../components/Category';
import { generatorURL, generatorURLCategory } from '../../services/generatorURL';
import DropdownNationalities from '../../components/DropdownNationalities';

import GlobalStyle from '../../style/GlobalStyle';

function MainPage() {
  const location = useLocation();
  const { pathname } = location;
  const { data, setUrlAPI, setCategoryAPI, categoryData,
    setPreviousPath, previousPath } = useContext(ReceitasContext);
  const [loading, setLoading] = useState(true);
  const [changePoint, setChangePoint] = useState(pathname);

  useEffect(() => {
    setChangePoint(pathname);
    setLoading(true);
  }, [pathname]);
  useEffect(() => {
    const changeURL = () => {
      if (!previousPath) {
        setUrlAPI(generatorURL(pathname));
      } else {
        setUrlAPI(previousPath);
        setPreviousPath('');
      }
      setCategoryAPI(generatorURLCategory(pathname));
    };
    changeURL();
  }, [changePoint]);
  useEffect(() => {
    const controlLoading = () => {
      if (data.meals || data.drinks) {
        setLoading(false);
      }
    };
    controlLoading();
  }, [data]);
  return (
    <>
      <GlobalStyle />
      <Header
        title={ titleGenerator(changePoint) }
        buttonSearch
        buttonProfile
      />
      {loading
        ? <Loading />
        : (
          <div>
            {pathname.includes('nationalities')
              ? <DropdownNationalities />
              : <Category returnAPI={ categoryData } />}
            <Cards size={ 12 } returnAPI={ data } />
          </div>
        )}
      <Footer />
    </>
  );
}

export default MainPage;
