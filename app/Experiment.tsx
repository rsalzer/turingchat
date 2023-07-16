import Counter from "@/app/Counter";
import Chat from "@/app/Chat";
import { useEffect, useState } from "react";

type ExperimentProps = {
  chosenExperiment: {
    name: string;
    words: string[];
    prompt: string;
  };
};

const Experiment = ({ chosenExperiment }: ExperimentProps) => {
  const [wordsToIncrement, setWordsToIncrement] = useState([]);
  const wordsFound = (words) => {
    setWordsToIncrement(words);
  };

  useEffect(() => {
    setWordsToIncrement([]);
  }, [chosenExperiment]);

  return (
    <div>
      <h3 className="font-bold text-xl my-3">
        Experiment: {chosenExperiment.name}
      </h3>
      <div className="flex gap-10">
        <Counter
          hashName={chosenExperiment.name}
          words={chosenExperiment.words}
          wordsToIncrement={wordsToIncrement}
        />
        <Chat
          wordsToCheck={chosenExperiment.words}
          promptToSet={chosenExperiment.prompt}
          wordsFound={wordsFound}
        />
      </div>
    </div>
  );
};

export default Experiment;
