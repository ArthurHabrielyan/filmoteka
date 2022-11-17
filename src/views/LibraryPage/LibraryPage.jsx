import { AppBar } from "../../modules/AppBar";
import { Routes, Route } from "react-router-dom";
import { QueueList } from "../../modules/QueueList";
import { WatchedList } from "../../modules/WatchedList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LibraryPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/library/watched");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="watched" element={<WatchedList />} />
        <Route path="queue" element={<QueueList />} />
      </Routes>
    </>
  );
};
