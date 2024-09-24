import ChatHistory from "./chatHistory";
import Home from "./home";

export default function Container() {
  return (
    <div className="grid lg:grid-cols-[20%_1fr]">
      <div className="hidden lg:flex">
        <ChatHistory />
      </div>
      <Home />
    </div>
  );
}
