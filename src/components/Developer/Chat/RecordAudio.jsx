import React, { useState } from "react";
import { AiFillAudio, AiOutlinePauseCircle } from "react-icons/ai";

function RecordAudio() {
  const [mediaStream, setMediaStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setMediaStream(stream);

    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);

    mediaRecorder.addEventListener("dataavailable", (event) => {
      setRecordedChunks((prev) => [...prev, event.data]);
    });

    mediaRecorder.start();
  };

  const stopRecording = () => {
    setRecording(false);
    recorder.stop();
    mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
  };

  const playRecording = () => {
    const audioBlob = new Blob(recordedChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };
  return (
    <div>
      {recording ? (
        <AiOutlinePauseCircle className="text-3xl mt-2 text-gray-700" onClick={stopRecording} />
      ) : (
        <AiFillAudio className="text-3xl mt-2 text-gray-700" onClick={startRecording} />
      )}
      {/* <button onClick={playRecording}>Play Recording</button> */}
    </div>
  );
}

export default RecordAudio;
