import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector } from '../../redux/store';
import {
  getIngredients,
  setIngredients
} from '../../redux/slices/constructorItemSlice';
import { useDispatch } from 'react-redux';

function move(list: Array<any>, from: number, to: number) {
  list.splice(to, 0, list.splice(from, 1)[0]);
}

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const ingredients = useSelector(getIngredients);
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      const copy = [...ingredients];
      move(copy, index, index + 1);
      dispatch(setIngredients(copy));
    };

    const handleMoveUp = () => {
      const copy = [...ingredients];
      move(copy, index, index - 1);
      dispatch(setIngredients(copy));
    };

    const handleClose = () => {
      const copy = [...ingredients];
      copy.splice(index, 1);
      dispatch(setIngredients(copy));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
