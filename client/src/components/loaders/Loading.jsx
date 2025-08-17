import { Loader2 } from "lucide-react";

function Loading({ text = "Loading...", fullScreen = false }) {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center ${
          fullScreen ? "h-screen" : "py-10"
        }`}
      >
        <Loader2 className="animate-spin text-orange-500 w-10 h-10 mb-3" />
        <p className="text-gray-600 font-medium">{text}</p>
      </div>
    </>
  );
}

export default Loading;
