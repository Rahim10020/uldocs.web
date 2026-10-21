export default async function MatierePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold text-black">Matière #{id}</h1>
      <p className="mt-2 text-black-60">Liste des documents à venir.</p>
    </div>
  );
}
