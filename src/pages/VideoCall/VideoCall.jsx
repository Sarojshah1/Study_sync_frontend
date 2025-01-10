import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function VideoCall() {
  const { state } = useLocation();
  const { contextId } = state || {};
  const jitsiContainerRef = useRef(null);

  // Load Jitsi Meet External API script if it's not already loaded
  useEffect(() => {
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = () => {
        console.log("Jitsi Meet API loaded successfully");
      };
      script.onerror = () => {
        console.error("Failed to load Jitsi Meet API");
      };
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script); // Clean up the script when component unmounts
      };
    }
  }, []);

  useEffect(() => {
    if (!window.JitsiMeetExternalAPI) {
      console.error("Jitsi Meet API script is not loaded.");
      return;
    }

    const domain = "meet.jit.si"; // Public Jitsi domain
    const roomName = contextId || `DefaultRoom-${Date.now()}`; // Dynamic room name

    const options = {
      roomName,
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: "100%",
      configOverwrite: {
        startWithAudioMuted: false, // Users join with audio enabled
        startWithVideoMuted: false, // Users join with video enabled
        disableModeratorIndicator: true, // Bypass moderator approval
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "chat",
          "raisehand",
          "tileview",
          "hangup",
          "screen-sharing",
        ], 
      },
    };

    // Create Jitsi Meet API instance
    const api = new window.JitsiMeetExternalAPI(domain, options);

    // Handle cleanup on unmount
    return () => {
      api.dispose();
    };
  }, [contextId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        ref={jitsiContainerRef}
        className="w-full h-[500px] md:h-[700px] bg-black rounded-md shadow-md"
      ></div>
    </div>
  );
}

export default VideoCall;
