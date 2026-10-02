import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Choice, Field, Hint, NumberInput } from "@/components/shared";
import {
  computeBudget,
  loadScenario,
  saveScenario,
} from "../utils/financialUtils";

const ageRanges = [
  { value: "18-25", label: "18-25 ans" },
  { value: "26-35", label: "26-35 ans" },
  { value: "36-45", label: "36-45 ans" },
  { value: "46-55", label: "46-55 ans" },
  { value: "55+", label: "55 ans et plus" },
];

const locations = [
  { value: "paris-intra", label: "Paris intra-muros" },
  { value: "petite-couronne", label: "Petite couronne (92, 93, 94)" },
  { value: "grande-couronne", label: "Grande couronne (77, 78, 91, 95)" },
];

const housingTypes = [
  { value: "studio", label: "Studio" },
  { value: "t2", label: "2 pièces" },
  { value: "t3", label: "3 pièces" },
  { value: "t4", label: "4 pièces et +" },
];

const DEFAULTS = {
  isOwner: false,
  isCouple: false,
  employerRefund: true,
  dependents: 0,
};

const validate = (values) => {
  const errors = {};
  if (!values.salary) errors.salary = "Veuillez saisir votre salaire";
  else if (values.salary < 1000) errors.salary = "Salaire minimum 1000€";
  if (!values.ageRange) errors.ageRange = "Sélectionnez votre âge";
  if (!values.location) errors.location = "Sélectionnez votre zone";
  if (!values.housingType)
    errors.housingType = "Sélectionnez le type de logement";
  if (!values.isOwner && values.rent == null)
    errors.rent = "Veuillez entrer votre loyer";
  if (values.isCouple && !values.partnerSalary)
    errors.partnerSalary = "Veuillez saisir le salaire du conjoint";
  return errors;
};

const Toggle = ({ label, hint, checked, onChange }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2 transition-colors has-data-[state=checked]:border-primary/40 has-data-[state=checked]:bg-primary/5">
    <div className="flex items-center gap-1.5">
      <Label>{label}</Label>
      {hint && <Hint>{hint}</Hint>}
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

const SavingsCalculator = ({ onCalculationComplete }) => {
  const [values, setValues] = useState(DEFAULTS);
  const [errors, setErrors] = useState({});

  const set = (name) => (value) =>
    setValues((current) => ({ ...current, [name]: value }));

  // Reprend le dernier scénario (lien partagé ou stockage local)
  useEffect(() => {
    const scenario = loadScenario();
    if (!scenario) return;
    const restored = { ...DEFAULTS, ...scenario.values };
    setValues(restored);
    if (Object.keys(validate(restored)).length === 0) {
      const { results, profile } = computeBudget(restored);
      onCalculationComplete(results, profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    saveScenario(values);
    const { results, profile } = computeBudget(values);
    onCalculationComplete(results, profile, { scroll: true });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Salaire net mensuel (€)"
          hint="Votre salaire après charges sociales et impôt. C'est la base de tous les calculs."
          error={errors.salary}
          className="sm:col-span-2"
        >
          <NumberInput
            value={values.salary}
            onChange={set("salary")}
            min={0}
            placeholder="2 500"
            aria-invalid={Boolean(errors.salary)}
          />
        </Field>

        <Field
          label="Tranche d'âge"
          hint="Votre âge détermine le taux d'épargne conseillé par l'application."
          error={errors.ageRange}
        >
          <Choice
            value={values.ageRange}
            onChange={set("ageRange")}
            options={ageRanges}
            placeholder="Votre âge"
            aria-invalid={Boolean(errors.ageRange)}
          />
        </Field>

        <Field
          label="Zone géographique"
          hint="Détermine le loyer et le prix de référence. Le forfait Navigo toutes zones est au tarif unique de 90,80€/mois."
          error={errors.location}
        >
          <Choice
            value={values.location}
            onChange={set("location")}
            options={locations}
            placeholder="Votre zone"
            aria-invalid={Boolean(errors.location)}
          />
        </Field>

        <Field label="Type de logement" error={errors.housingType}>
          <Choice
            value={values.housingType}
            onChange={set("housingType")}
            options={housingTypes}
            placeholder="Taille du logement"
            aria-invalid={Boolean(errors.housingType)}
          />
        </Field>

        {values.isOwner ? (
          <Field label="Coût du logement">
            <p className="text-sm text-muted-foreground">
              Estimé à 70% du loyer équivalent, plus charges et assurance.
            </p>
          </Field>
        ) : (
          <Field
            label="Loyer charges comprises (€)"
            hint="Loyer, charges, eau, électricité, chauffage et internet."
            error={errors.rent}
          >
            <NumberInput
              value={values.rent}
              onChange={set("rent")}
              min={0}
              placeholder="1 200"
              aria-invalid={Boolean(errors.rent)}
            />
          </Field>
        )}

        <Field
          label="Autres dépenses mensuelles (€)"
          hint="Assurances, téléphone, loisirs, vêtements, frais médicaux non remboursés."
        >
          <NumberInput
            value={values.additionalExpenses}
            onChange={set("additionalExpenses")}
            min={0}
            placeholder="500"
          />
        </Field>

        <Field
          label="Épargne actuelle (€)"
          hint="Total de votre épargne existante. Sert de point de départ aux projections, à l'épargne de précaution et au projet d'achat."
        >
          <NumberInput
            value={values.currentSavings}
            onChange={set("currentSavings")}
            min={0}
            placeholder="10 000"
          />
        </Field>

        <Field
          label="Budget alimentation (€)"
          hint="Facultatif. Sans saisie, l'application applique son hypothèse : 350€ par mois, + 250€ pour le conjoint, + 200€ par personne à charge. Il n'existe pas de montant officiel pour l'Île-de-France."
        >
          <NumberInput
            value={values.foodBudget}
            onChange={set("foodBudget")}
            min={0}
            placeholder="Estimé si vide"
          />
        </Field>

        <Field
          label="Personnes à charge"
          hint="Chaque personne à charge ajoute 200€ par mois au budget alimentaire estimé."
        >
          <NumberInput
            value={values.dependents}
            onChange={(value) => set("dependents")(value ?? 0)}
            min={0}
            max={10}
          />
        </Field>

        {values.isCouple && (
          <Field
            label="Salaire net du conjoint (€)"
            hint="Le taux d'épargne est calculé sur les revenus du foyer."
            error={errors.partnerSalary}
          >
            <NumberInput
              value={values.partnerSalary}
              onChange={set("partnerSalary")}
              min={0}
              placeholder="2 500"
              aria-invalid={Boolean(errors.partnerSalary)}
            />
          </Field>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Toggle
          label="Propriétaire"
          hint="Coût estimé : 70% du loyer équivalent de votre zone, plus charges de copropriété et assurance habitation."
          checked={values.isOwner}
          onChange={set("isOwner")}
        />
        <Toggle
          label="Budget en couple"
          hint="Ajoute le revenu de votre conjoint, un second forfait Navigo et 250€ d'alimentation."
          checked={values.isCouple}
          onChange={set("isCouple")}
        />
        <Toggle
          label="Navigo remboursé à 50%"
          hint="L'employeur doit prendre en charge 50% de l'abonnement de transport des salariés. Désactivez si vous n'êtes pas salarié."
          checked={values.employerRefund}
          onChange={set("employerRefund")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-11 w-full border-0 bg-brand text-base text-white shadow-lg shadow-primary/25 transition-all hover:brightness-110 hover:shadow-primary/35 active:scale-[0.99]"
      >
        <Calculator data-icon="inline-start" />
        Calculer mon épargne
      </Button>

      <Separator />

      <Accordion type="single" collapsible>
        <AccordionItem value="method">
          <AccordionTrigger>Comment fonctionne le calcul ?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Dépenses</strong> = logement
              + transport + alimentation + autres dépenses.
            </p>
            <p>
              <strong className="text-foreground">Épargne possible</strong> =
              revenus nets − dépenses.
            </p>
            <p>
              <strong className="text-foreground">Transport</strong> : forfait
              Navigo toutes zones (90,80€ en 2026), moitié prix si remboursé par
              l&apos;employeur, un forfait par adulte.
            </p>
            <p>
              <strong className="text-foreground">Alimentation</strong> :
              votre budget s&apos;il est saisi, sinon 350€/mois, + 250€ pour le
              conjoint, + 200€ par personne à charge.
            </p>
            <p>
              <strong className="text-foreground">Objectif par âge</strong> :
              12% (18-25 ans), 17% (26-35), 22% (36-45), 27% (46-55), 20% (55
              et plus). Ce sont des repères de l&apos;application, pas des
              chiffres officiels.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
};

export default SavingsCalculator;
