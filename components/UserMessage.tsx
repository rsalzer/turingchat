type MessageProps = {
  message: string;
};
export const UserMessage = ({ message }: MessageProps) => {
  return (
    <div className="px-3 @md:py-4 py-2.5 group transition-opacity message bg-rosa">
      <div className="flex items-start mx-auto space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="w-6 h-6 flex-shrink-0 mt-[2px]"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="w-full min-w-0 text-sm sm:text-base">
          <div className="prose prose-stone prose-sm sm:prose-base prose-pre:rounded-md prose-p:whitespace-pre-wrap prose-p:break-words w-full flex-1 leading-6 prose-p:leading-7 prose-pre:bg-[#282c34] max-w-full __className_1822b0">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
