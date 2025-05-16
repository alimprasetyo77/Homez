import { useParams } from "react-router-dom";

const DetailProperty = () => {
  const { slug } = useParams();
  return <div className="min-h-screen text-center ">DetailProperty : {slug}</div>;
};

export default DetailProperty;
