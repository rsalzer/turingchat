export default async function GalleryPage({
  params = { id: "6" },
}: {
  params: { id: string };
}) {
  let { id } = params;
  if (!id) id = "6";
  const req = await fetch(`https://salzer.it/bias/json.php`, {
    cache: "no-store",
  });
  const data = await req.json();

  return (
    <>
      {data[id].map((item: string) => (
        <div key={item}>
          <div className="min-w-[300px] max-w-full bg-rosa aspect-square">
            <img
              src={`https://salzer.it/bias/${id}/${item}`}
              key={item}
              alt={item}
              loading={"lazy"}
            />
          </div>
          <div className="text-center">{item.substring(0, 10)}</div>
        </div>
      ))}
    </>
  );
}
