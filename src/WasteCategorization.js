import React from 'react';

const WasteCategorization = ({ selectedCategory, setSelectedCategory, wasteCategories }) => {
  const handleClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="waste-categorization">
      <h2>Waste Category Selection</h2>
      <p>Select the category that best describes your waste:</p>
      <div className="category-images">
        {wasteCategories.map((category) => (
          <img
            key={category.id}
            src={`path/to/image/${category.id}.png`} // Replace with actual image paths
            alt={category.category_name}
            className={category.id === selectedCategory ? 'selected' : ''}
            onClick={() => handleClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WasteCategorization;
