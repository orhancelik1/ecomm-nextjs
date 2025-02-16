const Loading = ({ message }: { message: string }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <p className="text-lg font-semibold text-gray-700">
        {message || "Loading..."}
      </p>
    </div>
  );
};

export default Loading;
