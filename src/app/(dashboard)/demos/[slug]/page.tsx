import { api } from "@/api";
import FrameContent from "./frame-content";

interface DemoProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: DemoProps) {
  const { demo } = await api.demo.findUniqueBySlug(params.slug);

  return { title: demo.name };
}

export default async function Demo({ params }: DemoProps) {
  const { demo } = await api.demo.findUniqueBySlug(params.slug);
  const defaultFrame = demo.frames[0];

  return (
    <main>
      <h1 className="mb-10 text-4xl font-bold text-zinc-950">{demo.name}</h1>

      {defaultFrame ? (
        <FrameContent defaultFrame={defaultFrame} frames={demo.frames} />
      ) : (
        <p className="text-zinc-700">Nenhum frame para exibir :(</p>
      )}
    </main>
  );
}
