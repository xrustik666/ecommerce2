const Categories = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="categories">
      {categories.map((category) => (
        <div
          key={category}
          className={`categories--item ${category === selectedCategory ? 'categories--item-selected' : ''}`}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;