import { boldFont, headingFont, normalFont } from "@/app/fonts";
import { getAllItemsFromDynamoDB } from "@/utils/awshandler";
import experiments from "@/public/experiments.json";
import { ExperimentType } from "@/components/Experiment";

export default async function Auswertung() {
  return <></>;
  // const data = await getAllItemsFromDynamoDB();
  //
  // const experimentsToUse = experiments as ExperimentType[];
  // experimentsToUse.forEach((experiment, index) => (experiment.id = index));
  //
  // const textEperiments = experimentsToUse.filter(
  //   (experiment) => experiment.type === "text"
  // );
  // const imageExperiments = experimentsToUse.filter(
  //   (experiment) => experiment.type === "image"
  // );
  //
  // return (
  //   <div className={`${normalFont.className} text-m`}>
  //     <h2 className={`${headingFont.className} text-2xl mb-3 text-rot`}>
  //       Auswertung
  //     </h2>
  //     <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-2 flex-1">
  //       {experimentsToUse.map((singleExperiment) => {
  //         const dataForExperiment = data.find(
  //           (item) => item.name === singleExperiment.name
  //         );
  //         if (!dataForExperiment) return <div></div>;
  //         const sections: string[] = Array(
  //           singleExperiment.words.length / 2
  //         ).fill("a");
  //         return sections.map((section, index) => {
  //           const wordsForSection = singleExperiment.words.slice(
  //             index * 2,
  //             index * 2 + 2
  //           );
  //           const total = wordsForSection.reduce(
  //             (previousValue, currentValue) =>
  //               previousValue + dataForExperiment.count[currentValue],
  //             0
  //           );
  //           const dataForWords = wordsForSection.map((word) => {
  //             const amount: number = dataForExperiment.count[word];
  //             const percentage: number = Math.round((amount / total) * 100);
  //             return {
  //               word,
  //               amount,
  //               percentage,
  //             };
  //           });
  //           return (
  //             <div className="min-w-[300px] max-w-full bg-rosa p-4">
  //               <b className="text-rot">{dataForExperiment.name}</b>
  //               <br />
  //               {dataForWords.map((wordData) => (
  //                 <div key={wordData.word}>
  //                   {wordData.percentage > 50 ? (
  //                     <b>
  //                       {wordData.word}: {wordData.amount} (
  //                       {wordData.percentage}%)
  //                     </b>
  //                   ) : (
  //                     <>
  //                       {wordData.word}: {wordData.amount} (
  //                       {wordData.percentage}%)
  //                     </>
  //                   )}
  //                 </div>
  //               ))}
  //               Total: {total}
  //             </div>
  //           );
  //         });
  //       })}
  //     </div>
  //   </div>
  // );
}
