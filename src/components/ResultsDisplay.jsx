import { Link2, Printer, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Notice, Section, Stat, useCountUp } from "@/components/shared";
import { formatCurrency, scenarioUrl } from "../utils/financialUtils";

const ResultsDisplay = ({ results, userProfile }) => {
  const {
    monthlySalary,
    totalExpenses,
    disposableIncome,
    actualSavingsRate,
    recommendedSavingsRate,
    savingsGap,
    annualSavingsPotential,
    canSave,
    breakdown,
  } = results;

  const animatedSavings = useCountUp(Math.max(0, disposableIncome));
  const ratePercent = Math.round(actualSavingsRate * 100);
  const targetPercent = Math.round(recommendedSavingsRate * 100);
  const onTarget = actualSavingsRate >= recommendedSavingsRate;

  const status = !canSave
    ? { tone: "error", title: "Vos dépenses dépassent vos revenus" }
    : onTarget
    ? { tone: "success", title: "Vous atteignez l'objectif d'épargne conseillé" }
    : { tone: "warning", title: "Vous pouvez améliorer votre taux d'épargne" };

  const copyLink = async () => {
    const url = scenarioUrl(userProfile.inputs);
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Lien copié : il contient les chiffres saisis");
    } catch {
      window.location.hash = url.split("#")[1];
      toast.info("Lien prêt dans la barre d'adresse");
    }
  };

  const lines = [
    {
      label: breakdown.isOwner ? "Logement (propriétaire)" : "Logement",
      value: breakdown.housingCost,
      color: "var(--chart-1)",
      detail: breakdown.housingDetails
        ? `70% de ${formatCurrency(
            breakdown.housingDetails.equivalentRent
          )} + ${formatCurrency(
            breakdown.housingDetails.charges
          )} de charges + ${formatCurrency(
            breakdown.housingDetails.insurance
          )} d'assurance`
        : "Loyer charges comprises",
    },
    {
      label: "Transport",
      value: breakdown.transportCost,
      color: "var(--chart-2)",
      detail: `Forfait Navigo${breakdown.isCouple ? " × 2" : ""}${
        breakdown.employerRefund ? ", 50% remboursé" : ""
      }`,
    },
    {
      label: "Alimentation",
      value: breakdown.foodCost,
      color: "var(--chart-3)",
      detail: breakdown.customFood
        ? "Votre budget"
        : `Estimation : base 350€${
            breakdown.isCouple ? " + conjoint" : ""
          } + personnes à charge`,
    },
    {
      label: "Autres dépenses",
      value: breakdown.additionalExpenses,
      color: "var(--chart-4)",
      detail: "Loisirs, assurances, téléphone",
    },
  ];

  return (
    <Section
      title="Vos résultats"
      icon={Wallet}
      action={
        <div className="flex gap-1 print:hidden">
          <Button variant="ghost" size="sm" onClick={copyLink}>
            <Link2 data-icon="inline-start" />
            Partager
          </Button>
          <Button variant="ghost" size="sm" onClick={() => window.print()}>
            <Printer data-icon="inline-start" />
            PDF
          </Button>
        </div>
      }
    >
      <div
        className={`relative overflow-hidden rounded-xl p-5 text-white ${
          canSave ? "bg-brand" : "bg-destructive"
        }`}
      >
        <div className="absolute -top-10 -right-8 size-40 animate-float rounded-full bg-white/10" />
        <div className="absolute -bottom-14 right-16 size-32 animate-float rounded-full bg-white/10 [animation-delay:-4s]" />
        <div className="relative flex flex-col gap-1">
          <span className="text-sm text-white/80">
            Épargne mensuelle possible
          </span>
          <span className="text-4xl font-semibold tracking-tight tabular-nums">
            {formatCurrency(animatedSavings)}
          </span>
          <span className="text-sm text-white/80">
            {formatCurrency(Math.max(0, annualSavingsPotential))} par an ·{" "}
            {ratePercent}% de vos revenus
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Stat label="Revenus mensuels" value={formatCurrency(monthlySalary)} />
        <Stat label="Dépenses totales" value={formatCurrency(totalExpenses)} />
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-sm">
            <span>Votre taux d&apos;épargne</span>
            <span className="font-medium tabular-nums">{ratePercent}%</span>
          </div>
          <Progress
            value={Math.min(100, ratePercent)}
            className="h-2 *:data-[slot=progress-indicator]:bg-brand"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Objectif conseillé pour votre âge</span>
            <span className="tabular-nums">{targetPercent}%</span>
          </div>
          <Progress
            value={targetPercent}
            className="h-2 *:data-[slot=progress-indicator]:bg-muted-foreground/40"
          />
        </div>
      </div>

      <Notice tone={status.tone} title={status.title}>
        {!canSave
          ? "Aucune marge après vos dépenses : réduisez vos charges ou augmentez vos revenus en priorité."
          : savingsGap > 0
          ? `Il manque ${formatCurrency(
              savingsGap
            )} par mois pour atteindre l'objectif.`
          : "Cette marge peut servir à l'épargne, aux loisirs et aux imprévus."}
      </Notice>

      <Separator />

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Détail des dépenses</span>
        <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
          {lines.map((line) => (
            <div
              key={line.label}
              className="transition-[width] duration-500"
              style={{
                width: `${(line.value / totalExpenses) * 100}%`,
                background: line.color,
              }}
            />
          ))}
        </div>
        <ul className="flex flex-col gap-2.5">
          {lines.map((line) => (
            <li key={line.label} className="flex items-start gap-2.5 text-sm">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full"
                style={{ background: line.color }}
              />
              <span className="flex flex-1 flex-col">
                <span>{line.label}</span>
                <span className="text-xs text-muted-foreground">
                  {line.detail}
                </span>
              </span>
              <span className="font-medium tabular-nums">
                {formatCurrency(line.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default ResultsDisplay;
