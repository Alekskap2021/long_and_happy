import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DiagnosticRunner } from "@/components/diagnostic/diagnostic-runner";
import { Note } from "@/components/ui/card";
import { Illustration } from "@/components/ui/illustration";
import { Eyebrow } from "@/components/ui/section";
import { getDiagnostic, getDiagnostics } from "@/content/repository";

export function generateStaticParams() {
  return getDiagnostics().map((diagnostic) => ({ slug: diagnostic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const diagnostic = getDiagnostic(slug);
  if (!diagnostic) return {};

  return {
    title: diagnostic.title,
    description: diagnostic.subtitle,
    alternates: { canonical: `/diagnostika/${diagnostic.slug}` },
    openGraph: {
      title: diagnostic.title,
      description: diagnostic.subtitle,
      url: `/diagnostika/${diagnostic.slug}`,
    },
  };
}

export default async function DiagnosticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const diagnostic = getDiagnostic(slug);

  if (!diagnostic) notFound();

  return (
    <article className="py-14 sm:py-20">
      <div className="container-prose">
        <Eyebrow>Бесплатная диагностика</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl">{diagnostic.title}</h1>
        <p className="mt-5 text-lg text-ink-soft">{diagnostic.subtitle}</p>

        <div className="mt-10">
          <DiagnosticRunner diagnostic={diagnostic} />
        </div>

        {/* Иллюстрация ниже сценария: не отодвигает первый шаг от первого экрана. */}
        {diagnostic.illustration && (
          <Illustration name={diagnostic.illustration} className="mt-12" />
        )}

        <div className="mt-12">
          <Note icon="boundary">
            <p className="font-medium">Что это не такое</p>
            <p className="mt-2">{diagnostic.disclaimer}</p>
          </Note>
        </div>
      </div>
    </article>
  );
}
