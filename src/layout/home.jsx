import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  addMessageToSession,
  setActiveSession,
  setSessions,
} from "@/reducer/chatSlice";
import { HistoryIcon, MessageSquareDotIcon, SendIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatHistory from "./chatHistory";

export default function Home() {
  const generateSessionId = () => `chat_${new Date().getTime()}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  const sessions = useSelector((state) => state.chat.sessions);
  const activeSessionId = useSelector((state) => state.chat.activeSessionId);
  const messageRef = useRef();
  const [isSending, setIsSending] = useState(false);

  // Handle new message
  const sendMessage = () => {
    setIsSending(true);

    const messageText = messageRef?.current.value.trim();

    if (messageText === "" || !activeSessionId) {
      setIsSending(false);
      return;
    }

    // message object
    const newMessage = { userName, text: messageRef.current.value };

    dispatch(
      addMessageToSession({ sessionId: activeSessionId, message: newMessage })
    );
    messageRef.current.value = "";
    setIsSending(false);
  };

  // Listen for localStorage changes for other tabs
  useEffect(() => {
    const getUserName = localStorage.getItem("name");

    if (!getUserName) {
      navigate("/");
    } else {
      setUserName(getUserName);
    }

    // generate a new active session if there is none
    if (!activeSessionId) {
      const newSessionId = generateSessionId();
      dispatch(setActiveSession(newSessionId));
    }

    const StorageChange = (e) => {
      if (e.key === "chatSessions") {
        const updatedSessions = JSON.parse(e.newValue);
        dispatch(setSessions(updatedSessions));
      }
    };

    window.addEventListener("storage", StorageChange);

    return () => {
      window.removeEventListener("storage", StorageChange);
    };
  }, [dispatch, navigate, activeSessionId]);

  return (
    <>
      <div className="h-dvh overflow-y-hidden bg-zinc-900 scrollbar-hide grid grid-rows-[10%_1fr]">
        <nav className="flex items-center text-zinc-50 py-4 px-4 bg-zinc-900 justify-between">
          <div className="flex items-center justify-start">
            <MessageSquareDotIcon className="size-6 text-indigo-600 mr-1" />
            <h2 className="text-xl bg-gradient-to-r from-indigo-500 font-semibold to-indigo-600 bg-clip-text text-transparent">
              LocoChat
            </h2>
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <HistoryIcon className="text-indigo-600" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>ChatHistory</SheetTitle>
                  <SheetDescription>
                    <ChatHistory />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
        <main className="h-full grid scrollbar-hide bg-zinc-800 grid-rows-[1fr_20%] overflow-y-scroll">
          <div className="h-full custom-scrollbar flex flex-col items-end gap-1.5 px-3 py-2 overflow-y-scroll">
            {sessions && activeSessionId && sessions[activeSessionId] ? (
              sessions[activeSessionId].map((msg, index) => (
                <div key={index}>
                  <p className="bg-gradient-to-b ml-auto from-indigo-500 to-indigo-900 px-4 py-1 rounded-md text-zinc-50">
                    {msg.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-50 w-full mt-[12%] mx-auto">
                {sessions ? "No messages yet" : "Loading messages..."}
              </p>
            )}
          </div>

          <section className="w-full border-t bg-zinc-900 border-t-zinc-800 z-20 flex">
            <form
              className="w-full flex items-center p-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <textarea
                ref={messageRef}
                className="custom-scrollbar w-full p-2 border-0 mr-1.5 flex items-center ring-1 ring-zinc-950/20 bg-zinc-800 z-30 max-h-24 outline-none text-gray-50 text-sm rounded-lg shadow-sm resize-none"
                placeholder="Send Message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />

              {!isSending ? (
                <button
                  className="text-zinc-100 border border-indigo-500/40 p-2.5 flex items-center justify-center z-30 h-9 rounded-full"
                  type="submit"
                >
                  <SendIcon className="size-5 text-indigo-500" />
                </button>
              ) : (
                <button className=" px-2 bg-zinc-800 text-zinc-800 z-30 h-9 rounded-full flex justify-center items-center">
                  <svg
                    aria-hidden="true"
                    className="size-5 text-indigo-500 animate-spin"
                    viewBox="0 0 100 101"
                    fill="#0694a2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#27272a"
                    />
                  </svg>
                </button>
              )}
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
