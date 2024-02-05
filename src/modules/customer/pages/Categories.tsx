import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage:
          "url(data:image/jpeg;base64,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)",
      }}
    >
      <div className="hero min-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome </h1>
            <p className="mb-5">
              Step into a world of culinary delight where every dish tells a
              story and every meal is a journey. Whether you're seeking a cozy
              dinner for two, a lively family gathering, or a special
              celebration, we're thrilled to have you here.
            </p>
            <button className="btn btn-primary">Pick Your Order Now </button>
          </div>
        </div>
      </div>
      <div>
        <div className=" flex flex-wrap justify-around gap-5 mt-5 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
            () => (
              <div
                className="card card-compact w-80 bg-base-100 shadow-xl hover:opacity-80 "
                onClick={() => {
                  navigate(`products`);
                }}
              >
                <figure>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPhgVJ_EdConWcowWxq3cZ9_3MxZMpxcn6A&usqp=CAU"
                    alt="Food"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Food</h2>
                  <p>sssssssssssssssssssssssssssssss</p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
