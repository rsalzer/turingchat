export default async function GalleryPage({
  params,
}: {
  params: { id: string };
}) {
  const req = await fetch(`https://salzer.it/bias/${params.id}/json.php`);
  const data = await req.json();

  return (
    <>
      {data.imgs.map((item: string) => (
        <img
          src={`https://salzer.it/bias/${params.id}/${item}`}
          className="min-w-[300px] max-w-full"
          key={item}
          alt={item}
        />
      ))}
    </>
  );
}
