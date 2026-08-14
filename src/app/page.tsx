import { TrackFunnelStep } from "@/components/analytics/track-funnel-step";
import { HomeBlockRenderer } from "@/components/home/blocks";
import { getHomeBlocks } from "@/content/repository";

export default function HomePage() {
  const blocks = getHomeBlocks();

  return (
    <>
      <TrackFunnelStep step="source_landing" path="/" />
      {blocks.map((block) => (
        <HomeBlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
