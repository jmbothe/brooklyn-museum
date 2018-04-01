import React from 'react';
import { Link } from 'react-router-dom';
import { MUSEUM_IMG_PATH } from '../../apis';

const ResultCard = ({ setDetail, object }) =>
  <div>
    <input type="checkbox" />
    <Link
      onClick={() => setDetail(object)}
      to={{
        pathname: "/detail",
        hash: `${object.id}`
      }}
    />
    <img src={`${MUSEUM_IMG_PATH}2/${object.primary_image}`} alt={object.title} className="result-card" />
  </div>
 
export default ResultCard;