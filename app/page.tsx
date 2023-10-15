import { headingFont } from "@/app/fonts";

export default function MainPage() {
  return (
    <div className="">
      <h2 className={`${headingFont.className} text-2xl my-1`}>
        Willkommen zum BIAS-Tester. Wählen Sie ein Experiment aus.
      </h2>
    </div>
  );
}
