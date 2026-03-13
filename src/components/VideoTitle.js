const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen h-screen pt-[20%] px-24 text-white bg-gradient-to-r from-black via-black/70 to-transparent">
      <h1 className="text-6xl font-bold">{title}</h1>

      <p className="text-lg w-1/4 mt-4">{overview}</p>

      <div className="mt-6">
        <button className="bg-white text-black px-4 py-2 rounded-md mr-4 text-xl hover:bg-opacity-80">
          ▶ Play
        </button>

        <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-xl mx-2 hover:bg-opacity-80">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;