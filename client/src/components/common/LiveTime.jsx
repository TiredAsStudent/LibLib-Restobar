import { useState, useEffect } from "react";

function LiveTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <time
        className="hidden sm:inline text-sm text-gray-500 font-mono"
        dateTime={currentTime.toISOString()}
      >
        {currentTime.toLocaleString("en-PH", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </time>
    </>
  );
}

export default LiveTime;
