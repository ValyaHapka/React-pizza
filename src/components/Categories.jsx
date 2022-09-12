import React from 'react';

export default function Categories({ categoryIndex, onClickCategory }) {
  const categories = [
    'Все 🍕',
    'Мясные 🥩',
    'Вегетарианская 🌱',
    'Гриль 🔥',
    'Острые 🌶️ ',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={categoryIndex === i ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}