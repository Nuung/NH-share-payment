import React from "react";
import PropTypes from "prop-types";
import Potato from './Potato';

const foodILike = [
  {
    id:1,
    name: "Kimchi",
    image:
      "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
    rating: (Math.ceil(Math.random() * 10) )
  },
  {
    id:2,
    name: "Samgyeopsal",
    image:
      "https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
    rating: (Math.ceil(Math.random() * 10) )
  },
  {
    id:3,
    name: "Bibimbap",
    image:
      "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
      rating: (Math.ceil(Math.random() * 10) )
  },
  {
    id:4,
    name: "Doncasu",
    image:
      "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
    rating: (Math.ceil(Math.random() * 10))
  },
  {
    id:5,
    name: "Kimbap",
    image:
      "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
    rating: (Math.ceil(Math.random() * 10))
  }
];

function Food({ name, image, rating }) {
  // console.log(props.name);
  // console.log(props.papapa);
  return (
    <div>
      <h2>I like {name}</h2>
      <h4> RATING: {rating} / 10.0 </h4>
      <img src={image} alt={name + " image"} />
    </div>
  );
}

// Description that I want to get
Food.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number
};

function renderFood(food) {
  return (
  <Food 
    key={food.id} 
    name={food.name} 
    image={food.image} 
    rating={food.rating}
  />);
}

function App() {
  return (
    <div className="App">
      <h1>Clear Everythings in it, to init</h1>
      <Potato />
      {foodILike.map(renderFood)}
    </div>
  );
}

export default App;
