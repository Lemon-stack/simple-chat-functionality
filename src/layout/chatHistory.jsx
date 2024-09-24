import { useDispatch, useSelector } from "react-redux";
import { setActiveSession } from "@/reducer/chatSlice";

export default function ChatHistory() {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.chat.sessions);
  const activeSessionId = useSelector((state) => state.chat.activeSessionId);

  const handleSessionClick = (sessionId) => {
    dispatch(setActiveSession(sessionId)); // Set the clicked session as active
  };

  return (
    <div className="text-zinc-50 h-dvh grid lg:grid-rows-[6%_1fr] grid-cols-1 px-4 py-4">
      <h3 className="text-indigo-600 font-semibold hidden lg:flex">Chat History</h3>
      <ul className="h-full flex flex-col gap-1 overflow-y-scroll">
        {Object.keys(sessions).map((sessionId) => (
          <li
            key={sessionId}
            onClick={() => handleSessionClick(sessionId)}
            className={`px-2 rounded-sm flex items-center justify-start ${
              sessionId === activeSessionId ? "bg-indigo-400" : ""
            }`}
          >
         {sessionId}

          </li>
        ))}
      </ul>
    </div>
  );
}
