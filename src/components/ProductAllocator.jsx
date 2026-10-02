import { useState } from "react";
import { Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Choice,
  Field,
  Footnote,
  Notice,
  NumberInput,
  Section,
} from "@/components/shared";
import {
  REGULATED_PRODUCTS,
  lepIncomeCeiling,
  formatCurrency,
  formatDuration,
  monthsToReach,
} from "../utils/financialUtils";

const formatParts = (value) =>
  `${String(value).replace(".", ",")} part${value > 1 ? "s" : ""}`;
const PARTS = [1, 1.5, 2, 2.5, 3, 3.5, 4].map((value) => ({
  value,
  label: formatParts(value),
}));
const formatRate = (rate) => `${(rate * 100).toFixed(1).replace(".", ",")} %`;

const ProductAllocator = ({ results, userProfile }) => {
  // Revenu fiscal de référence estimé : salaire net annuel après abattement de 10 %
  const [taxIncome, setTaxIncome] = useState(
    Math.round(results.monthlySalary * 12 * 0.9)
  );
  const [parts, setParts] = useState(userProfile.isCouple ? 2 : 1);

  const lepCeiling = lepIncomeCeiling(parts);
  const lepEligible = taxIncome <= lepCeiling;
  const accounts = userProfile.isCouple ? 2 : 1; // un livret de chaque type par adulte
  const monthlySavings = Math.max(0, results.disposableIncome);
  const emergencyTarget = results.totalExpenses * 3;

  // On remplit les livrets du plus rémunérateur au moins rémunérateur
  const order = [
    ...(lepEligible ? [REGULATED_PRODUCTS.lep] : []),
    REGULATED_PRODUCTS.livretA,
    REGULATED_PRODUCTS.ldds,
  ];
  let remaining = userProfile.currentSavings || 0;
  const allocation = order.map((product) => {
    const ceiling = product.ceiling * accounts;
    const amount = Math.min(remaining, ceiling);
    remaining -= amount;
    return { ...product, ceiling, amount };
  });
  const regulatedTotal = allocation.reduce((sum, p) => sum + p.amount, 0);
  const regulatedRoom =
    allocation.reduce((sum, p) => sum + p.ceiling, 0) - regulatedTotal;
  const yearlyInterest = allocation.reduce(
    (sum, p) => sum + p.amount * p.rate,
    0
  );
  const emergencyDelay = monthsToReach(
    emergencyTarget,
    regulatedTotal,
    monthlySavings
  );

  const nextStep =
    monthlySavings <= 0
      ? null
      : regulatedTotal < emergencyTarget
      ? `Priorité : compléter votre épargne de précaution de ${formatCurrency(
          emergencyTarget
        )} sur ces livrets (${formatDuration(emergencyDelay)}).`
      : regulatedRoom > 0
      ? `Votre épargne de précaution est constituée. Il reste ${formatCurrency(
          regulatedRoom
        )} de place sur vos livrets ; au-delà, vos ${formatCurrency(
          monthlySavings
        )} mensuels peuvent viser le moyen et long terme.`
      : `Vos livrets sont pleins : vos ${formatCurrency(
          monthlySavings
        )} mensuels peuvent viser le moyen et long terme.`;

  return (
    <Section
      title="Où placer votre épargne ?"
      icon={Landmark}
      description="Répartition de votre épargne actuelle sur les livrets réglementés."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Revenu fiscal de référence (€)"
          hint="Pré-rempli avec une estimation : votre salaire net annuel moins 10 %. Le vrai montant figure sur votre avis d'impôt."
        >
          <NumberInput
            value={taxIncome}
            onChange={(value) => setTaxIncome(value ?? 0)}
            min={0}
            step={500}
          />
        </Field>
        <Field label="Parts fiscales">
          <Choice value={parts} onChange={setParts} options={PARTS} />
        </Field>
      </div>

      <Notice
        tone={lepEligible ? "success" : "info"}
        title={
          lepEligible
            ? "Vous semblez éligible au LEP, le livret le mieux rémunéré"
            : "Revenu au-dessus du plafond du LEP"
        }
      >
        Plafond de {formatCurrency(lepCeiling)} pour {formatParts(parts)}.
      </Notice>

      <ul className="flex flex-col divide-y">
        {allocation.map((product) => (
          <li
            key={product.name}
            className="flex items-center justify-between gap-3 py-2.5"
          >
            <span className="flex flex-col">
              <span className="flex items-center gap-2 text-sm font-medium">
                {product.name}
                <Badge variant="secondary">{formatRate(product.rate)} net</Badge>
              </span>
              <span className="text-xs text-muted-foreground">
                Plafond {formatCurrency(product.ceiling)}
              </span>
            </span>
            <span className="font-medium tabular-nums">
              {formatCurrency(product.amount)}
            </span>
          </li>
        ))}
        {remaining > 0 && (
          <li className="flex items-center justify-between gap-3 py-2.5">
            <span className="flex flex-col">
              <span className="text-sm font-medium">Moyen et long terme</span>
              <span className="text-xs text-muted-foreground">
                Assurance-vie, PEA, PEL (2 %) selon votre horizon et votre
                tolérance au risque
              </span>
            </span>
            <span className="font-medium tabular-nums">
              {formatCurrency(remaining)}
            </span>
          </li>
        )}
      </ul>

      <Notice
        title={`Environ ${formatCurrency(
          yearlyInterest
        )} d'intérêts par an, sans impôt ni prélèvements sociaux`}
      >
        {nextStep}
      </Notice>
      <Footnote>
        Taux et plafonds au 1er août 2026 (Service-Public.fr). Répartition
        indicative, qui ne constitue pas un conseil en investissement.
      </Footnote>
    </Section>
  );
};

export default ProductAllocator;
