import React, { useEffect, useRef }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import styles from './filling-ingredient.module.css';

import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/prop-types.js';

import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {DELETE_FROM_CONSTRUCTOR, REORDER_INGREDIENT, deleteFromConstructor, reorderIngredient} from '../../services/actions/constructor-ingredients.js';

export default function FillingIngredient({ item, index }) {

  const dispatch = useDispatch();


  // function deleteFromConstructor(item, key) {
  //   dispatch({
  //     type: DELETE_FROM_CONSTRUCTOR,
  //     item: item,
  //     key: key
  //   })
  // };

  const ref = useRef(null);
  const id = item.uId;

  const [{ handlerId }, drop] = useDrop({
    accept: 'fillings',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // dispatch({
      //   type: REORDER_INGREDIENT,
      //   dragIndex,
      //   hoverIndex
      // });
      dispatch(reorderIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'fillings',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));


  return (
    <li className={styles.element} draggable ref={ref} data-handler-id={handlerId} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(deleteFromConstructor(item, index))}
      />
    </li>
  )
}

FillingIngredient.propTypes = {
  item: ingredientPropTypes.isRequired,
  index: PropTypes.number.isRequired
}
