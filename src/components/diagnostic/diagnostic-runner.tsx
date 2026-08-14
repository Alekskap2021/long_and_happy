"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { ListLink } from "@/components/ui/list-link";
import { Note } from "@/components/ui/note";
import { Panel } from "@/components/ui/panel";
import { Eyebrow } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
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

/** Пауза перед сменой шага: выбор успевает подсветиться, потом кадр меняется. */
const advanceDelay = 340;

/**
 * Сценарий проходится по шагам: на каждую ситуацию два вопроса —
 * цель и действие. Подсчёт делает сервер, ответы никуда не сохраняются.
 */
export function DiagnosticRunner({ diagnostic }: { diagnostic: Diagnostic }) {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState<Answer[]>(() =>
    diagnostic.situations.map((situation) => ({ situationId: situation.id })),
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const result = mutation.data?.result;

  const submit = useCallback(
    (list: Answer[]) => {
      const complete = list.filter(
        (answer) => answer.intent && answer.action,
      ) as (Answer & { intent: DiagnosticIntent; action: DiagnosticAction })[];

      mutation.mutate({
        diagnosticSlug: diagnostic.slug,
        answers: complete.map((answer) => ({
          situationId: answer.situationId,
          intent: answer.intent,
          action: answer.action,
          safetyFlag: answer.safetyFlag,
        })),
      });
    },
    [diagnostic.slug, mutation],
  );

  function start() {
    setStarted(true);
    void sendFunnelEvent({
      step: "diagnostic_start",
      path: `/diagnostika/${diagnostic.slug}`,
    }).catch(() => undefined);
  }

  function choose(optionId: string, update: Partial<Answer>, situationIndex: number) {
    if (timer.current) clearTimeout(timer.current);
    setSelected(optionId);

    const next = answers.map((answer, index) =>
      index === situationIndex ? { ...answer, ...update } : answer,
    );
    setAnswers(next);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    timer.current = setTimeout(
      () => {
        setSelected("");
        if (stepIndex + 1 < steps.length) {
          setStepIndex(stepIndex + 1);
        } else {
          submit(next);
        }
      },
      reduced ? 0 : advanceDelay,
    );
  }

  function goBack() {
    if (timer.current) clearTimeout(timer.current);
    setSelected("");
    setStepIndex((index) => Math.max(0, index - 1));
  }

  function restart() {
    mutation.reset();
    setAnswers(diagnostic.situations.map((s) => ({ situationId: s.id })));
    setStepIndex(0);
    setSelected("");
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
      />
    );
  }

  if (!started) {
    return (
      <Panel>
        <div className="flex flex-wrap items-center gap-3">
          <Tag tone="accent">Бесплатно</Tag>
          <span className="text-sm text-ink-muted">
            {diagnostic.situations.length} ситуации ·{" "}
            {diagnostic.situations.length * 2} вопросов ·{" "}
            {diagnostic.durationMinutes} минуты
          </span>
        </div>

        <h2 className="mt-6 font-display text-title">
          Начните с одного разговора
        </h2>

        <ul className="mt-6 space-y-3">
          {diagnostic.promise.map((item) => (
            <li key={item} className="flex gap-3.5 text-ink-soft">
              <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Button onClick={start} size="lg">
            Начать
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          </Button>
          <span className="text-sm text-ink-muted">{diagnostic.privacyNote}</span>
        </div>
      </Panel>
    );
  }

  const step = steps[stepIndex];
  const situation = diagnostic.situations[step.situationIndex];
  const question =
    step.kind === "intent" ? situation.intentQuestion : situation.actionQuestion;
  const options =
    step.kind === "intent"
      ? situation.intentQuestion.options.map((option) => ({
          id: option.id,
          label: option.label,
          update: { intent: option.intent } as Partial<Answer>,
        }))
      : situation.actionQuestion.options.map((option) => ({
          id: option.id,
          label: option.label,
          update: {
            action: option.action,
            safetyFlag: option.safetyFlag,
          } as Partial<Answer>,
        }));

  return (
    <Panel>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          {situation.label}
        </span>
        <span className="text-sm text-ink-muted">
          {stepIndex + 1} / {steps.length}
        </span>
      </div>

      <div
        className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-paper-deep"
        role="progressbar"
        aria-label="Прогресс диагностики"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={stepIndex + 1}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-320 ease-calm motion-reduce:transition-none"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Приём motion №2: смена кадра шага. Ключ перезапускает анимацию. */}
      <div key={stepIndex} className="animate-step-in motion-reduce:animate-none">
        <p className="voice mt-7 text-[1.35rem] leading-snug text-ink">
          {situation.scene}
        </p>

        <RadioGroup
          value={selected}
          onValueChange={(value) => {
            const option = options.find((item) => item.id === value);
            if (option) choose(option.id, option.update, step.situationIndex);
          }}
          aria-label={question.prompt}
          className="mt-7"
          disabled={mutation.isPending}
        >
          <p className="font-medium">{question.prompt}</p>

          <div className="mt-4 grid gap-2.5">
            {options.map((option) => (
              <label
                key={option.id}
                className="group flex cursor-pointer items-start gap-3.5 rounded-card border border-line px-5 py-4 transition-colors duration-200 ease-calm hover:border-accent-edge hover:bg-accent-quiet has-data-checked:border-accent has-data-checked:bg-accent-quiet motion-reduce:transition-none"
              >
                <Radio.Root
                  value={option.id}
                  className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent transition-colors duration-200 ease-calm group-hover:border-accent data-checked:border-accent motion-reduce:transition-none"
                >
                  <Radio.Indicator className="h-2.5 w-2.5 rounded-full bg-accent data-unchecked:hidden" />
                </Radio.Root>
                <span className="text-ink-soft group-hover:text-ink">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5">
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-200 ease-calm hover:text-ink"
          >
            <ArrowLeft aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
            Назад
          </button>
        )}

        {mutation.isPending && (
          <p className="text-sm text-ink-muted">Считаем результат…</p>
        )}
      </div>

      {mutation.isError && (
        <Note tone="accent" icon={null} className="mt-6">
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
    </Panel>
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
}) {
  const levelLabel = {
    aligned: "цель и способ согласованы",
    partial: "расхождение в одной ситуации",
    wide: "расхождение в большинстве ситуаций",
  }[divergenceLevel];

  return (
    <div className="animate-step-in motion-reduce:animate-none">
      <Eyebrow>Ваш результат</Eyebrow>
      <h2 className="mt-4 text-display">{headline}</h2>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-3">
        {[
          { term: "Чего хотите", value: intentLabel },
          { term: "Что делаете словами", value: actionLabel },
          {
            term: "Расхождение",
            value: `${divergenceCount} из 3 — ${levelLabel}`,
          },
        ].map((item) => (
          <div key={item.term} className="bg-paper-card px-5 py-5">
            <dt className="text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
              {item.term}
            </dt>
            <dd className="mt-2 font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="prose-editorial mt-10 max-w-[38rem]">
        {reading.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {safetyRoute && (
        <Note title="Отдельно про безопасность" className="mt-10">
          <p className="mt-2">
            Если в разговоре вы замираете от страха реакции другого человека,
            начинать стоит не с обучения. Это тема индивидуальной работы.
          </p>
          <Link
            href="/konsultacii"
            className="mt-3 inline-block text-accent underline underline-offset-4"
          >
            Раздел «Консультации»
          </Link>
        </Note>
      )}

      <div className="mt-14">
        <h3 className="font-display text-title">Подходящий следующий шаг</h3>

        <ul className="-mx-5 mt-4 grid sm:-mx-6 sm:grid-cols-2 sm:gap-x-6">
          {nextSteps.map((step) => (
            <li key={step.title}>
              <ListLink href={step.href}>
                <p className="font-display text-[1.2rem]">{step.title}</p>
                <p className="mt-2.5 max-w-[26rem] text-[0.95rem] text-ink-soft">
                  {step.body}
                </p>
                <p className="mt-4 text-[0.9rem] text-accent">{step.label}</p>
              </ListLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-200 ease-calm hover:text-ink"
        >
          <RotateCcw aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
          Пройти заново
        </button>

        <ButtonLink href="/besplatno" variant="secondary" size="sm">
          Библиотека материалов
        </ButtonLink>
      </div>
    </div>
  );
}
