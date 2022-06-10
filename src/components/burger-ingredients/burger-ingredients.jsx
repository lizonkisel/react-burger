import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import burgerIngredients from './burger-ingredients.module.css';

import {IngredientVariants} from '../ingredient-variants/ingredient-variants.jsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngredients() {

  const [currentTab, setCurrentTab] = React.useState('buns');

  function tabClick(tab) {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
    console.log(element);
  };

  const [bunRef, inViewBun] = useInView({
    threshold: 0.1,
  });

  const [sauceRef, inViewSauce] = useInView({
    threshold: 0.1,
  });

  const [mainRef, inViewMain] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrentTab('buns');
    } else if (inViewSauce) {
      setCurrentTab('sauces');
    } else if (inViewMain) {
      setCurrentTab('mains');
    }
  }, [inViewBun, inViewSauce, inViewMain]);


  const listOfIngredients = useSelector(store => store.allIngredients.items);

  const bunList = listOfIngredients.filter((ingredient) => {
    return ingredient.type === "bun";
  })

  const sauceList = listOfIngredients.filter((ingredient) => {
    return ingredient.type === "sauce";
  })

  const mainList = listOfIngredients.filter((ingredient) => {
    return ingredient.type === "main";
  })

  const ingredientInModal = useSelector(store => store.currentIngredient);

  return (
    <>
      <section className={burgerIngredients.section}>
        <h2 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h2>
        <nav className={`mb-10 ${burgerIngredients.menu}`}>
          <Tab value="buns" active={currentTab === 'buns'} onClick={tabClick}>
            Булки
          </Tab>
          <Tab value="sauces" active={currentTab === 'sauces'} onClick={tabClick}>
            Соусы
          </Tab>
          <Tab value="mains" active={currentTab === 'mains'} onClick={tabClick}>
            Начинки
          </Tab>
        </nav>
        <article className={burgerIngredients.ingredients} >
          <IngredientVariants ingredientName='Булки' listOfIngredients={bunList} titleId='buns' ref={bunRef}/>
          <IngredientVariants ingredientName='Соусы' listOfIngredients={sauceList} titleId='sauces' ref={sauceRef}/>
          <IngredientVariants ingredientName='Начинки' listOfIngredients={mainList} titleId='mains' ref={mainRef}/>
        </article>
      </section>

      {ingredientInModal &&
      <Modal title="Детали ингредиента" >
        <IngredientDetails />
      </Modal>}
    </>
  )
}
