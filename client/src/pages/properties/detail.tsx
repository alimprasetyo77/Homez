import { useParams } from "react-router-dom";

const DetailProperty = () => {
  const { propertyId } = useParams();
  return <div className="min-h-screen text-center ">DetailProperty : {propertyId}</div>;
};

export default DetailProperty;
