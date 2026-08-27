import type { HomeBlock } from "@/content/schemas";

import { AuthorsBlock } from "./blocks/authors-block";
import { BoundariesBlock } from "./blocks/boundaries-block";
import { DiagnosticBlock } from "./blocks/diagnostic-block";
import { FinalCtaBlock } from "./blocks/final-cta-block";
import { HeroBlock } from "./blocks/hero-block";
import { LevelsBlock } from "./blocks/levels-block";
import { LibraryBlock } from "./blocks/library-block";
import { MethodBlock } from "./blocks/method-block";
import { ParadoxBlock } from "./blocks/paradox-block";
import { SituationsBlock } from "./blocks/situations-block";

const registry = {
  hero: HeroBlock,
  paradox: ParadoxBlock,
  situations: SituationsBlock,
  diagnostic: DiagnosticBlock,
  method: MethodBlock,
  levels: LevelsBlock,
  library: LibraryBlock,
  authors: AuthorsBlock,
  "final-cta": FinalCtaBlock,
  boundaries: BoundariesBlock,
} as const;

export function HomeBlockRenderer({ block }: { block: HomeBlock }) {
  const Component = registry[block.type];
  return <Component block={block} />;
}
