import { HashLoader, PulseLoader } from "react-spinners";

function PageLoader({ loading }) {
  return (
    <div className="flex flex-col justify-center  items-center my-auto p-5">
      <HashLoader
        color="#D4AF37"
        loading={loading}
        size={60}
        aria-label="pulse loader"
        data-testid="loader"
      />
      <div className="flex items-center justify-center gap-1 mt-2">
        <p className="text-center">Loading</p>
        <PulseLoader
          color="#D4AF37"
          loading={loading}
          size={10}
          aria-label="pulse loader"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default PageLoader;
