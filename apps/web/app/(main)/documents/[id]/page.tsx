export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold text-black">Document #{id}</h1>
      <p className="mt-2 text-black-60">Détail et aperçu PDF à venir.</p>
    </div>
  );
}
