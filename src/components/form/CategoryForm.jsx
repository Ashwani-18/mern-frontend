import React, { useState } from "react";

const CategoryForm = ({handleSubmit, value, setValue}) => {
  

    // You can send this to backend if needed


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          placeholder="Enter new Category"
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
      
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CategoryForm;
