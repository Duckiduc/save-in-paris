import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  Footnote,
  Notice,
  NumberInput,
  Range,
  Section,
  Stat,
} from "@/components/shared";
import {
  ACQUISITION_FEES,
  ACQUISITION_FEES_FIRST_TIME,
  DEFAULT_MORTGAGE_RATE,
  LOCATION_LABELS,
  MAX_DEBT_RATIO,
  MAX_LOAN_YEARS,
  PRICE_PER_SQM,
  REFERENCE_SURFACES,
  borrowingCapacity,
  formatCurrency,
  formatDuration,
  loanMonthlyPayment,
  monthsToReach,
} from "../utils/financialUtils";

const HomePurchaseSimulator = ({ results, userProfile }) => {
  const { location, housingType } = userProfile;
  const [pricePerSqm, setPricePerSqm] = useState(PRICE_PER_SQM[location]);
  const [surface, setSurface] = useState(REFERENCE_SURFACES[housingType]);
  const [depositRate, setDepositRate] = useState(10);
  const [rate, setRate] = useState(DEFAULT_MORTGAGE_RATE);
  const [years, setYears] = useState(MAX_LOAN_YEARS);
  const [firstTime, setFirstTime] = useState(!userProfile.isOwner);

  const savings = userProfile.currentSavings || 0;
  const monthlySavings = Math.max(0, results.disposableIncome);
  const price = pricePerSqm * surface;
  const feesRate = firstTime ? ACQUISITION_FEES_FIRST_TIME : ACQUISITION_FEES;
  const fees = price * feesRate;
  const depositNeeded = price * (depositRate / 100) + fees;
  const loan = price + fees - depositNeeded;
  const payment = loanMonthlyPayment(loan, rate, years);
  const maxPayment = results.monthlySalary * MAX_DEBT_RATIO;
  const capacity = borrowingCapacity(maxPayment, rate, years);
  const debtRatio = payment / results.monthlySalary;
  const affordable = debtRatio <= MAX_DEBT_RATIO;
  const delay = monthsToReach(depositNeeded, savings, monthlySavings);
  const currentHousing = results.breakdown.housingCost;

  return (
    <Section
      title={`Projet d'achat en ${LOCATION_LABELS[location]}`}
      icon={KeyRound}
      description="Apport, mensualité et capacité d'emprunt selon les règles d'octroi des banques."
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Field label="Prix au m² (€)">
          <NumberInput
            value={pricePerSqm}
            onChange={(value) => setPricePerSqm(value ?? 0)}
            min={1000}
            step={100}
          />
        </Field>
        <Field label="Surface (m²)">
          <NumberInput
            value={surface}
            onChange={(value) => setSurface(value ?? 0)}
            min={9}
          />
        </Field>
        <Field label="Taux du crédit (%)">
          <NumberInput
            value={rate}
            onChange={(value) => setRate(value ?? 0)}
            min={0}
            max={10}
            step={0.1}
          />
        </Field>
      </div>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <Range
          label={`Apport : ${depositRate}% du prix + frais`}
          value={depositRate}
          onChange={setDepositRate}
          min={0}
          max={50}
        />
        <Range
          label={`Durée : ${years} ans`}
          value={years}
          onChange={setYears}
          min={10}
          max={MAX_LOAN_YEARS}
        />
        <div className="flex items-center gap-2">
          <Switch
            id="first-time"
            checked={firstTime}
            onCheckedChange={setFirstTime}
          />
          <Label htmlFor="first-time">
            Premier achat de résidence principale
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl bg-primary/5 p-4 ring-1 ring-primary/10 md:grid-cols-4">
        <Stat label="Prix du bien" value={formatCurrency(price)} />
        <Stat label="Apport nécessaire" value={formatCurrency(depositNeeded)} />
        <Stat
          label="Mensualité"
          value={formatCurrency(payment)}
          tone={affordable ? "success" : "error"}
        />
        <Stat label="Capacité d'emprunt" value={formatCurrency(capacity)} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Notice
          tone={savings >= depositNeeded ? "success" : "info"}
          title={
            savings >= depositNeeded
              ? "Votre épargne actuelle couvre déjà l'apport"
              : `Apport atteint dans ${formatDuration(delay)}`
          }
        >
          {savings < depositNeeded &&
            `Il manque ${formatCurrency(depositNeeded - savings)}. `}
          Dont {formatCurrency(fees)} de frais d&apos;acquisition (environ{" "}
          {String(feesRate * 100).replace(".", ",")} % dans l&apos;ancien
          {firstTime ? ", taux réduit des primo-accédants" : ""}).
        </Notice>
        <Notice
          tone={affordable ? "success" : "warning"}
          title={`Taux d'effort : ${Math.round(
            debtRatio * 100
          )} % de vos revenus`}
        >
          Maximum 35 %, soit {formatCurrency(maxPayment)} par mois. La
          mensualité représente{" "}
          {formatCurrency(Math.abs(payment - currentHousing))} de{" "}
          {payment >= currentHousing ? "plus" : "moins"} que votre coût de
          logement actuel, hors charges de copropriété, taxe foncière et
          assurance emprunteur.
        </Notice>
      </div>
      <Footnote>
        Prix : appartements anciens, ventes de novembre 2025 à janvier 2026
        (Notaires du Grand Paris). Frais : proches de 8 % en Île-de-France,
        environ 7,5 % pour un premier achat (estimation). Règles d&apos;octroi :
        HCSF. Taux moyen des nouveaux crédits : 3,30 % en juillet 2026, hors
        assurance, en hausse depuis trois mois (Banque de France). Vos crédits
        en cours ne sont pas pris en compte.
      </Footnote>
    </Section>
  );
};

export default HomePurchaseSimulator;
