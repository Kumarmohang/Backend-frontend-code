import { useEffect, useState } from "react";
import "./offline.scss";

const OfflineScreen = ({ onStatusChange }) => {
  const [status, setStatus] = useState(navigator.onLine ? "online" : "offline");
  const handleEvent = (event) => {
    console.log({ event });
    setStatus(event.type);
    onStatusChange(event.type);
  };
  useEffect(() => {
    window.addEventListener("online", handleEvent);
    window.addEventListener("offline", handleEvent);
    return () => {
      window.removeEventListener("online", handleEvent);
      window.removeEventListener("offline", handleEvent);
    };
  }, []);

  return (
    <>
      {status === "offline" && (
        <div className="offline-screen">
          <div className="offline-container">
            <div className="offline-header">No Internet Connection</div>
            <div className="offline-msg">
              Please make sure you are connected to the internet
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfflineScreen;
