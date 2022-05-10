import ingredientDetails from './ingredient-details.module.css';

export default function IngredientDetails({ingredient}) {
  return (
    <article className={ingredientDetails.card}>
      <img className={ingredientDetails.image} src={ingredient.image} />
      <h4 className={`mt-4 mb-8 text text_type_main-medium ${ingredientDetails.title}`}>{ingredient.name}</h4>
      <ul className={`mb-15 ${ingredientDetails.nutritionalValue}`}>
        <li className={`text text_type_main-default text_color_inactive ${ingredientDetails.component}`}>
          <p className={ingredientDetails.componentName}>Калории,ккал</p>
          <span className={`text_type_digits-default ${ingredientDetails.componentValue}`}>{ingredient.calories}</span>
        </li>
        <li className={`text text_type_main-default text_color_inactive ${ingredientDetails.component}`}>
          <p className={ingredientDetails.componentName}>Белки, г</p>
          <span className={`text_type_digits-default ${ingredientDetails.componentValue}`}>{ingredient.proteins}</span>
        </li>
        <li className={`text text_type_main-default text_color_inactive ${ingredientDetails.component}`}>
          <p className={ingredientDetails.componentName}>Жиры, г</p>
          <span className={`text_type_digits-default ${ingredientDetails.componentValue}`}>{ingredient.fat}</span>
        </li>
        <li className={`text text_type_main-default text_color_inactive ${ingredientDetails.component}`}>
          <p className={ingredientDetails.componentName}>Углеводы, г</p>
          <span className={`text_type_digits-default ${ingredientDetails.componentValue}`}>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </article>
  )
}
