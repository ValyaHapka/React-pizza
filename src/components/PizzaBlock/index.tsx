import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CartPizza, setItem } from '../../redux/slices/cartSlice';
import { selectItemById } from '../../redux/slices/pizzaSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';

interface PizzaBlockProps {
  title: string;
  price: number;
  imageUrl: string;
  sizes: Array<number>;
  types: Array<number>;
  id: string;
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, price, imageUrl, sizes, types, id }) => {
  const dispatch = useAppDispatch();
  const item = useSelector(selectItemById(id));

  const [typeIndex, setTypeIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const typeNames = ['Традиционное', 'Тонкое'];

  const addedCount = item ? item.count : 0;

  function onClickAdd() {
    const item: CartPizza = {
      title,
      price,
      imageUrl,
      id,
      type: typeNames[typeIndex],
      size: sizes[sizeIndex],
      count: 0,
    };
    dispatch(setItem(item));
  }
  const path = `/pizza/${id}`;

  return (
    <div className="pizza-block-container">
      <div className="pizza-block">
        <Link to={path}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeNum) => (
              <li
                key={typeNum}
                onClick={() => setTypeIndex(typeNum)}
                className={types.length === 1 || typeIndex === typeNum ? 'active' : ''}>
                {typeNames[typeNum]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setSizeIndex(i)}
                className={sizeIndex === i ? 'active' : ''}>
                {size} см
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
