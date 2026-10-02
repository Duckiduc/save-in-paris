import { ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Notice, Section, Stat } from "@/components/shared";
import {
  formatCurrency,
  formatDuration,
  monthsToReach,
} from "../utils/financialUtils";

// Épargne de précaution : 3 à 6 mois de dépenses (Banque de France, Mes questions d'argent)
const EmergencyFund = ({ results, userProfile }) => {
  const { totalExpenses, disposableIncome } = results;
  const currentSavings = userProfile.currentSavings || 0;
  const monthsCovered = currentSavings / totalExpenses;
  const minTarget = totalExpenses * 3;
  const maxTarget = totalExpenses * 6;
  const monthlySavings = Math.max(0, disposableIncome);
  const delay = monthsToReach(minTarget, currentSavings, monthlySavings);

  const tone =
    monthsCovered >= 6 ? "success" : monthsCovered >= 3 ? "info" : "warning";
  const message =
    userProfile.inputs.currentSavings == null
      ? "Renseignez le champ « Épargne actuelle » du formulaire, puis relancez le calcul, pour voir combien de mois vous couvrez."
      : monthsCovered >= 6
      ? "Votre épargne de précaution est complète : le surplus peut être placé à plus long terme."
      : monthsCovered >= 3
      ? "Vous avez atteint le minimum conseillé de 3 mois de dépenses."
      : `Il vous manque ${formatCurrency(
          minTarget - currentSavings
        )} pour couvrir 3 mois de dépenses (${formatDuration(
          delay
        )} à votre rythme d'épargne).`;

  return (
    <Section
      title="Épargne de précaution"
      icon={ShieldCheck}
      description="Repère de la Banque de France : 3 à 6 mois de dépenses disponibles à tout moment."
    >
      <div className="grid grid-cols-3 gap-4">
        <Stat
          label="Mois couverts"
          value={monthsCovered.toFixed(1).replace(".", ",")}
          tone={tone === "info" ? undefined : tone}
        />
        <Stat label="Objectif 3 mois" value={formatCurrency(minTarget)} />
        <Stat label="Objectif 6 mois" value={formatCurrency(maxTarget)} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Progress
          value={Math.min(100, (currentSavings / maxTarget) * 100)}
          className="h-2 *:data-[slot=progress-indicator]:bg-brand"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatCurrency(currentSavings)} aujourd&apos;hui</span>
          <span>{formatCurrency(maxTarget)}</span>
        </div>
      </div>
      <Notice tone={tone} title={message} />
    </Section>
  );
};

export default EmergencyFund;
