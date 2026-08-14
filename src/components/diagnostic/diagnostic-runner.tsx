"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { Card, Note, Tag } from "@/components/ui/card";
import type {
  Diagnostic,
  DiagnosticAction,
  DiagnosticIntent,
} from "@/content/schemas";
import { sendFunnelEvent, submitDiagnostic } from "@/lib/api";

type Answer = {
  situationId: string;
  intent?: DiagnosticIntent;
  action?: DiagnosticAction;
  safetyFlag?: boolean;
};

/**
 * Сценарий проходится по шагам: на каждую ситуацию два вопроса —
 * цель и действие. Подсчёт делает сервер, ответы никуда не сохраняются.
 */
export function DiagnosticRunner({ diagnostic }: { diagnostic: Diagnostic }) {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(() =>
    diagnostic.situations.map((situation) => ({ situationId: situation.id })),
  );

  const steps = useMemo(
    () =>
      diagnostic.situations.flatMap((situation, index) => [
        { situationIndex: index, kind: "intent" as const },
        { situationIndex: index, kind: "action" as const },
      ]),
    [diagnostic.situations],
  );

  const mutation = useMutation({
    mutationFn: submitDiagnostic,
    onSuccess: () => {
      void sendFunnelEvent({
        step: "diagnostic_complete",
        path: `/diagnostika/${diagnostic.slug}`,
      }).catch(() => undefined);
    },
  });

  const result = mutation.data?.result;

  function start() {
    setStarted(true);
    void sendFunnelEvent({
      step: "diagnostic_start",
      path: `/diagnostika/${diagnostic.slug}`,
    }).catch(() => undefined);
  }

  function answerAndAdvance(update: Partial<Answer>, situationIndex: number) {
    const next = answers.map((answer, index) =>
      index === situationIndex ? { ...answer, ...update } : answer,
    );
    setAnswers(next);

    if (stepIndex + 1 < steps.length) {
      setStepIndex(stepIndex + 1);
      return;
    }

    const complete = next.filter(
      (answer): answer is Required<Pick<Answer, "situationId" | "intent" | "action">> &
        Answer => Boolean(answer.intent && answer.action),
    );

    mutation.mutate({
      diagnosticSlug: diagnostic.slug,
      answers: complete.map((answer) => ({
        situationId: answer.situationId,
        intent: answer.intent,
        action: answer.action,
        safetyFlag: answer.safetyFlag,
      })),
    });
  }

  function restart() {
    mutation.reset();
    setAnswers(diagnostic.situations.map((s) => ({ situationId: s.id })));
    setStepIndex(0);
    setStarted(false);
  }

  if (result) {
    return (
      <DiagnosticResultView
        headline={result.headline}
        reading={result.reading}
        intentLabel={result.intentLabel}
        actionLabel={result.actionLabel}
        divergenceLevel={result.divergenceLevel}
        divergenceCount={result.divergenceCount}
        safetyRoute={result.safetyRoute}
        nextSteps={result.nextSteps}
        onRestart={restart}
        disclaimer={diagnostic.disclaimer}
      />
    );
  }

  if (!started) {
    return (
      <Card className="border-line-strong">
        <div className="flex flex-wrap items-center gap-3">
          <Tag tone="accent">Бесплатно</Tag>
          <span className="text-sm text-ink-muted">
            {diagnostic.situations.length} ситуации ·{" "}
            {diagnostic.situations.length * 2} вопросов ·{" "}
            {diagnostic.durationMinutes} минуты
          </span>
        </div>
        <h2 className="mt-5 font-display text-2xl leading-snug">
          Начните с одного разговора
        </h2>
        <ul className="mt-5 space-y-2.5">
          {diagnostic.promise.map((item) => (
            <li key={item} className="flex gap-3 text-ink-soft">
              <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Button onClick={start}>Начать</Button>
          <span className="text-sm text-ink-muted">
            {diagnostic.privacyNote}
          </span>
        </div>
      </Card>
    );
  }

  const step = steps[stepIndex];
  const situation = diagnostic.situations[step.situationIndex];
  const question =
    step.kind === "intent" ? situation.intentQuestion : situation.actionQuestion;

  return (
    <Card className="border-line-strong">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
          {situation.label}
        </span>
        <span className="text-sm text-ink-muted">
          {stepIndex + 1} / {steps.length}
        </span>
      </div>

      <div
        className="mt-4 h-1 w-full overflow-hidden rounded-full bg-paper-deep"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={stepIndex + 1}
      >
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      <p className="mt-6 font-display text-xl leading-snug">{situation.scene}</p>
      <p className="mt-5 font-medium">{question.prompt}</p>

      <div className="mt-4 grid gap-2.5">
        {step.kind === "intent"
          ? situation.intentQuestion.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  answerAndAdvance({ intent: option.intent }, step.situationIndex)
                }
                className="rounded-card border border-line px-5 py-4 text-left transition-colors hover:border-accent hover:bg-accent-soft/50"
              >
                {option.label}
              </button>
            ))
          : situation.actionQuestion.options.map((option) => (
              <button
                key={option.id}
                type="button"
                disabled={mutation.isPending}
                onClick={() =>
                  answerAndAdvance(
                    { action: option.action, safetyFlag: option.safetyFlag },
                    step.situationIndex,
                  )
                }
                className="rounded-card border border-line px-5 py-4 text-left transition-colors hover:border-accent hover:bg-accent-soft/50 disabled:opacity-60"
              >
                {option.label}
              </button>
            ))}
      </div>

      {stepIndex > 0 && (
        <button
          type="button"
          onClick={() => setStepIndex(stepIndex - 1)}
          className="mt-5 text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
        >
          Назад
        </button>
      )}

      {mutation.isPending && (
        <p className="mt-5 text-sm text-ink-muted">Считаем результат…</p>
      )}

      {mutation.isError && (
        <Note tone="accent">
          <p>{mutation.error.message}</p>
          <button
            type="button"
            onClick={() => mutation.reset()}
            className="mt-2 underline underline-offset-4"
          >
            Попробовать снова
          </button>
        </Note>
      )}
    </Card>
  );
}

function DiagnosticResultView({
  headline,
  reading,
  intentLabel,
  actionLabel,
  divergenceLevel,
  divergenceCount,
  safetyRoute,
  nextSteps,
  onRestart,
  disclaimer,
}: {
  headline: string;
  reading: string[];
  intentLabel: string;
  actionLabel: string;
  divergenceLevel: "aligned" | "partial" | "wide";
  divergenceCount: number;
  safetyRoute: boolean;
  nextSteps: {
    kind: string;
    title: string;
    body: string;
    href: string;
    label: string;
  }[];
  onRestart: () => void;
  disclaimer: string;
}) {
  const levelLabel = {
    aligned: "цель и способ согласованы",
    partial: "расхождение в одной ситуации",
    wide: "расхождение в большинстве ситуаций",
  }[divergenceLevel];

  return (
    <div className="space-y-6">
      <Card className="border-line-strong">
        <Tag tone="accent">Ваш результат</Tag>
        <h2 className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
          {headline}
        </h2>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-card bg-paper-deep/70 p-4">
            <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">
              Чего хотите
            </dt>
            <dd className="mt-1.5 font-medium">{intentLabel}</dd>
          </div>
          <div className="rounded-card bg-paper-deep/70 p-4">
            <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">
              Что делаете словами
            </dt>
            <dd className="mt-1.5 font-medium">{actionLabel}</dd>
          </div>
          <div className="rounded-card bg-paper-deep/70 p-4">
            <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">
              Расхождение
            </dt>
            <dd className="mt-1.5 font-medium">
              {divergenceCount} из 3 — {levelLabel}
            </dd>
          </div>
        </dl>

        <div className="prose-editorial mt-6">
          {reading.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-muted">{disclaimer}</p>
      </Card>

      {safetyRoute && (
        <Note>
          <p className="font-medium">Отдельно про безопасность</p>
          <p className="mt-2">
            Если в разговоре вы замираете от страха реакции другого человека,
            начинать стоит не с обучения. Это тема индивидуальной работы.
          </p>
          <Link href="/konsultacii" className="mt-2 inline-block underline">
            Раздел «Консультации»
          </Link>
        </Note>
      )}

      <div>
        <h3 className="font-display text-xl">Подходящий следующий шаг</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {nextSteps.map((step) => (
            <Card key={step.title} className="flex h-full flex-col">
              <p className="font-display text-lg">{step.title}</p>
              <p className="mt-2.5 flex-1 text-[0.95rem] text-ink-soft">
                {step.body}
              </p>
              <div className="mt-5">
                <ButtonLink
                  href={step.href}
                  variant={step.kind === "theme" ? "secondary" : "primary"}
                  size="sm"
                >
                  {step.label}
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
      >
        Пройти заново
      </button>
    </div>
  );
}
