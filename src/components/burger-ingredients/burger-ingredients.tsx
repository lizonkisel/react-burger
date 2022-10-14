import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
import { useInView } from 'react-intersection-observer';

import burgerIngredients from './burger-ingredients.module.css';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import {IngredientVariants} from '../ingredient-variants/ingredient-variants';
import {Modal} from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function BurgerIngredients() {

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = React.useState<string>('buns');

  function tabClick(tab: string): void {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    //@ts-ignore
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

  //@ts-ignore
  const bunList = listOfIngredients.filter((ingredient) => {
    return ingredient.type === "bun";
  })

  //@ts-ignore
  const sauceList = listOfIngredients.filter((ingredient) => {
    return ingredient.type === "sauce";
  })

  //@ts-ignore
  const mainList = listOfIngredients.filter((ingredient) => {
    return ingredient.type === "main";
  })

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
          {
            //@ts-ignore
            <IngredientVariants ingredientName='Булки' listOfIngredients={bunList} titleId='buns' ref={bunRef}/>
          }
          {
            //@ts-ignore
            <IngredientVariants ingredientName='Соусы' listOfIngredients={sauceList} titleId='sauces' ref={sauceRef}/>
          }
          {
            //@ts-ignore
            <IngredientVariants ingredientName='Начинки' listOfIngredients={mainList} titleId='mains' ref={mainRef}/>
          }
          {/* <IngredientVariants ingredientName='Булки' listOfIngredients={bunList} titleId='buns' ref={bunRef}/>
          <IngredientVariants ingredientName='Соусы' listOfIngredients={sauceList} titleId='sauces' ref={sauceRef}/>
          <IngredientVariants ingredientName='Начинки' listOfIngredients={mainList} titleId='mains' ref={mainRef}/> */}
        </article>
      </section>
    </>
  )
}
