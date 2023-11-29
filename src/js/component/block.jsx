import React from 'react';
import { Link } from 'react-router-dom';
import './block.module.css';

const Block = ({ title, imageUrl, link }) => {
  return (
    <Link to={link} className="block">
      <img src={imageUrl} alt={title} className="block-image"/>
      <h2>{title}</h2>
    </Link>
  );
};

export default Block;
