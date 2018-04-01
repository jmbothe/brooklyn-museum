import React from 'react';
import { Link } from 'react-router-dom';
import { MUSEUM_IMG_PATH } from '../../apis';

const ResultCard = ({ setDetail, object }) =>
  // <Link
  // className="result-card"
  //   onClick={() => this.props.setDetail(object)}
  //   to="/detail"
  // >
    <img src={`${MUSEUM_IMG_PATH}1/${object.primary_image}`} alt={object.title} className="result-card" />
  // </Link>
 
export default ResultCard;