import { useState } from "react";
import { FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Choice,
  Field,
  Footnote,
  Range,
  Section,
  Stat,
} from "@/components/shared";
import {
  computeBudget,
  formatCurrency,
  HOUSING_CHARGES,
  LOCATION_LABELS,
  MOVE_IN_RENTS,
} from "../utils/financialUtils";

const zones = Object.entries(LOCATION_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const WhatIfSimulator = ({ results, userProfile }) => {
  const { inputs } = userProfile;
  const baseRent = inputs.rent || 0;
  const [raise, setRaise] = useState(0);
  const [rent, setRent] = useState(baseRent);
  const [flatmate, setFlatmate] = useState(false);
  const [location, setLocation] = useState(inputs.location);
  const [expenses, setExpenses] = useState(inputs.additionalExpenses || 0);

  const reset = () => {
    setRaise(0);
    setRent(baseRent);
    setFlatmate(false);
    setLocation(inputs.location);
    setExpenses(inputs.additionalExpenses || 0);
  };

  // Déménager : on repart du loyer des emménagés récents de la zone, charges estimées incluses
  const moveTo = (zone) => {
    setLocation(zone);
    setRent(
      zone === inputs.location
        ? baseRent
        : MOVE_IN_RENTS[zone][inputs.housingType] +
            HOUSING_CHARGES[inputs.housingType]
    );
  };

  const scenario = computeBudget({
    ...inputs,
    salary: inputs.salary * (1 + raise / 100),
    rent: flatmate ? rent / 2 : rent,
    location,
    additionalExpenses: expenses,
  }).results;

  const delta = scenario.disposableIncome - results.disposableIncome;
  const rate = Math.round(
    (scenario.disposableIncome / scenario.monthlySalary) * 100
  );

  return (
    <Section
      title="Et si... ?"
      icon={FlaskConical}
      description="Testez un changement et voyez l'effet sur votre épargne."
      action={
        <Button variant="ghost" size="sm" onClick={reset}>
          Réinitialiser
        </Button>
      }
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <Range
          label={`Augmentation de salaire : +${raise}%`}
          value={raise}
          onChange={setRaise}
          min={0}
          max={30}
        />
        <Range
          label={`Autres dépenses : ${formatCurrency(expenses)}`}
          value={expenses}
          onChange={setExpenses}
          min={0}
          max={Math.max(2000, (inputs.additionalExpenses || 0) * 2)}
          step={10}
        />
        {!inputs.isOwner && (
          <>
            <Range
              label={`Loyer : ${formatCurrency(flatmate ? rent / 2 : rent)}${
                flatmate ? " (votre moitié)" : ""
              }`}
              value={rent}
              onChange={setRent}
              min={300}
              max={Math.max(3000, baseRent * 1.5)}
              step={10}
            />
            <div className="grid grid-cols-[1fr_auto] items-end gap-4">
              <Field label="Déménager">
                <Choice value={location} onChange={moveTo} options={zones} />
              </Field>
              <div className="flex h-8 items-center gap-2">
                <Switch
                  id="flatmate"
                  checked={flatmate}
                  onCheckedChange={setFlatmate}
                />
                <Label htmlFor="flatmate">Colocation</Label>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 rounded-xl bg-primary/5 p-4 ring-1 ring-primary/10">
        <Stat
          label="Épargne mensuelle"
          value={formatCurrency(scenario.disposableIncome)}
          tone={scenario.disposableIncome > 0 ? "success" : "error"}
        />
        <Stat
          label="Écart avec aujourd'hui"
          value={`${delta > 0 ? "+" : ""}${formatCurrency(delta)}`}
          tone={delta > 0 ? "success" : delta < 0 ? "error" : undefined}
        />
        <Stat label="Taux d'épargne" value={`${rate}%`} />
      </div>
      {location !== inputs.location && (
        <Footnote>
          Loyer pré-rempli avec le loyer moyen des emménagés récents de la zone
          pour ce type de logement (OLAP, janvier 2025), charges estimées
          incluses. Ajustez-le avec le curseur.
        </Footnote>
      )}
    </Section>
  );
};

export default WhatIfSimulator;
