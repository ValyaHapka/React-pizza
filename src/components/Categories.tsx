import React from 'react';

interface CategoryProps {
  categoryIndex: number;
  onClickCategory: (id: number) => void;
}

const Categories: React.FC<CategoryProps> = ({ categoryIndex, onClickCategory }) => {
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
};
export default Categories;
