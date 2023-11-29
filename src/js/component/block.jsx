import React from 'react';
import './block.module.css';

const Block = ({ title, imageUrl, link }) => {
  return (
    <a href={link} className="block">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
    </a>
  );
};

export default Block;
