import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const nameRef = useRef();
  function nameSet(e) {
    e.preventDefault();
    localStorage.setItem("name", nameRef.current.value);
    navigate("chat");
  }
  useEffect(() => {
    const userName = localStorage.getItem("name");
    if (userName) {
      navigate("chat");
    }
  });
  return (
    <>
      <main className="flex text-zinc-50 gap-6 flex-col w-full items-center justify-center bg-zinc-800 h-dvh">
        <h2 className="text-xl">Welcome to LocalChat</h2>
        <form className="flex flex-col justify-center" onSubmit={nameSet}>
          <label className="text-sm font-light text-zinc-400 text-start">
            What should we call you?
          </label>
          <input
            ref={nameRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                nameSet();
              }
            }}
            className="bg-zinc-700 text-sm outline-none font-light text-zinc-100 border py-1 rounded-md px-2"
            type="text"
          />
          <button
            type="submit"
            className="py-1 hover:border-none mt-2 outline-none font-light focus:ring-0"
          >
            Continue
          </button>
        </form>
      </main>
    </>
  );
}
