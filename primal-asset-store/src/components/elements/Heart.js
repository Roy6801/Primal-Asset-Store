import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

const Heart = ({ fill }) => {
  if (fill) {
    return <BsSuitHeartFill color="#ff4d4d" />;
  } else {
    return <BsSuitHeart />;
  }
};

export default Heart;
