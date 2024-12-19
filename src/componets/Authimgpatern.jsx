const Authimgpatern = ({ titel, subtitel }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl mt-3 ml-3 bg-primary/10 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">{titel}</h2>
          <p className="text-base-content/60">{subtitel}</p>
        </div>
      </div>
    );
  };
  
  export default Authimgpatern;
  