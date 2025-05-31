const AddProperty = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-2xl w-full ">
        <h3>Listing properti sebagai : </h3>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className=" bg-red-500 text-white p-4 rounded-xl">agent</div>
          <div className="bg-red-500 text-white p-4 rounded-xl">agency</div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
