import { useEffect, useState } from "react";

type CounterProps = {
  hashName: string;
  words: string[];
  wordsToIncrement: string[];
};
export default function Counter({
  hashName,
  words,
  wordsToIncrement,
}: CounterProps) {
  const [count, setCount] = useState<object>({});

  const increment = async (keys: string[]) => {
    const response = await fetch("/api/increment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hash: hashName,
        keys: keys,
      }),
    });
    const data = await response.json();
    const dataCount = data.count;
    setCount(dataCount);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/increment?hash=${hashName}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data != null) {
        const dataCount = data.count;
        if (dataCount !== null) setCount(dataCount);
      }
    };
    fetchData().catch(console.error);
  }, [hashName, words]);

  useEffect(() => {
    console.log("Increment the words:", wordsToIncrement);
    const wordsPlusTotal = [...wordsToIncrement, "TOTAL"];
    if (wordsToIncrement.length > 0) {
      increment(wordsPlusTotal);
    }
  }, [wordsToIncrement]);

  return (
    <div className="text-2xl text-red-900">
      {words.map((word: string) => (
        <div onClick={() => increment([word])} key={word}>
          {word}:{" "}
          {count.hasOwnProperty(word) ? count[word as keyof typeof count] : 0}
        </div>
      ))}
      <div>
        TOTAL:{" "}
        {count.hasOwnProperty("TOTAL")
          ? count["TOTAL" as keyof typeof count]
          : 0}
      </div>
    </div>
  );
}
