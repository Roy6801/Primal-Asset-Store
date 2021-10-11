import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ total, count, color, size }) => {
  if (total < 3 || !total) {
    total = 3;
  }

  if (count < 0) {
    count = 0;
  }

  if (!color) {
    color = "yellow";
  }

  var stars = [];

  for (var i = 0; i < total; i++) {
    if (count > 0) {
      if (count > 0 && count < 1) {
        stars.push(0.5);
      } else {
        stars.push(1);
      }
    } else {
      stars.push(0);
    }
    count--;
  }

  return (
    <div>
      {stars.map((value, index) => {
        if (value === 1) {
          return <FaStar color={color} key={index} size={size} />;
        } else if (value === 0.5) {
          return <FaStarHalfAlt color={color} key={index} size={size} />;
        } else {
          return <FaRegStar color={color} key={index} size={size} />;
        }
      })}
    </div>
  );
};

export default StarRating;
