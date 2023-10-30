import React from "react";
import FreeChat from "@/components/FreeChat";
import { headingFont } from "@/app/fonts";

const ChatPage = () => {
  return (
    <div className="w-full h-full">
      <h3 className={`${headingFont.className} text-2xl my-3 text-rot`}>
        Freier Chat
      </h3>
      <FreeChat />
    </div>
  );
};

export default ChatPage;
