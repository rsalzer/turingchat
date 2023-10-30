import { headingFont } from "@/app/fonts";

export default function MainPage() {
  return (
    <div className="">
      <h2 className={`${headingFont.className} text-2xl my-1 text-rot`}>
        Willkommen zum BIAS-Tester.
      </h2>
      <p>KI hat Bias ... blablub.</p>
    </div>
  );
}
