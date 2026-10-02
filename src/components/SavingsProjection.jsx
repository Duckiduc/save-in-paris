import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Footnote,
  Notice,
  NumberInput,
  Range,
  Section,
  Stat,
  chartAxis,
  chartGrid,
  chartTooltip,
} from "@/components/shared";
import {
  calculateSavingsProjection,
  formatCurrency,
  FLAT_TAX,
} from "../utils/financialUtils";

const SERIES = {
  saved: { label: "Sans intérêts", color: "var(--chart-5)" },
  conservative: { label: "Prudent (2%)", color: "var(--chart-2)" },
  moderate: { label: "Équilibré (4%)", color: "var(--chart-3)" },
  aggressive: { label: "Dynamique (6%)", color: "var(--chart-1)" },
};

const SavingsProjection = ({
  monthlySavings,
  userAge = 30,
  initialBalance = 0,
}) => {
  const [projectionYears, setProjectionYears] = useState(10);
  const [realTerms, setRealTerms] = useState(false);
  const [afterTax, setAfterTax] = useState(false);
  const [inflation, setInflation] = useState(2);
  const retirementAge = 65;
  const maxYears = Math.max(5, retirementAge - userAge);

  if (!monthlySavings || monthlySavings <= 0) {
    return (
      <Notice title="Projection non disponible">
        Il faut une épargne mensuelle positive pour afficher une projection.
      </Notice>
    );
  }

  // Le scénario à 2% correspond aux livrets réglementés, exonérés d'impôt ;
  // les deux autres supportent le prélèvement forfaitaire unique sur les gains
  const scenarios = {
    saved: { rate: 0, taxed: false },
    conservative: { rate: 0.02, taxed: false },
    moderate: { rate: 0.04, taxed: true },
    aggressive: { rate: 0.06, taxed: true },
  };

  const project = (key, years) => {
    const { rate, taxed } = scenarios[key];
    const { totalSaved, totalWithInterest } = calculateSavingsProjection(
      monthlySavings,
      years,
      rate,
      initialBalance
    );
    const gains = totalWithInterest - totalSaved;
    const net = totalSaved + gains * (afterTax && taxed ? 1 - FLAT_TAX : 1);
    const deflator = realTerms ? Math.pow(1 + inflation / 100, years) : 1;
    return {
      totalWithInterest: net / deflator,
      interestEarned: (net - totalSaved) / deflator,
    };
  };

  const conservative = project("conservative", projectionYears);
  const moderate = project("moderate", projectionYears);
  const aggressive = project("aggressive", projectionYears);

  // Données pour le graphique année par année
  const chartData = [];
  for (let year = 1; year <= projectionYears; year++) {
    chartData.push({
      year,
      age: userAge + year,
      conservative: Math.round(project("conservative", year).totalWithInterest),
      moderate: Math.round(project("moderate", year).totalWithInterest),
      aggressive: Math.round(project("aggressive", year).totalWithInterest),
      saved: Math.round(project("saved", year).totalWithInterest),
    });
  }

  return (
    <Section
      title="Projection d'épargne"
      icon={TrendingUp}
      description={`${
        initialBalance > 0
          ? `En partant de vos ${formatCurrency(initialBalance)} et avec `
          : "Avec "
      }${formatCurrency(monthlySavings)} épargnés chaque mois.`}
    >
      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
        <Range
          label={`Horizon : ${projectionYears} ans (jusqu'à ${
            userAge + projectionYears
          } ans)`}
          value={projectionYears}
          onChange={setProjectionYears}
          min={1}
          max={maxYears}
        />
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <Switch
              id="real-terms"
              checked={realTerms}
              onCheckedChange={setRealTerms}
            />
            <Label htmlFor="real-terms">
              En euros d&apos;aujourd&apos;hui, inflation de
            </Label>
            <NumberInput
              value={inflation}
              onChange={(value) => setInflation(value ?? 0)}
              min={0}
              max={10}
              step={0.5}
              className="h-7 w-16"
              aria-label="Inflation annuelle en %"
            />
            <span className="text-sm">%</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="after-tax"
              checked={afterTax}
              onCheckedChange={setAfterTax}
            />
            <Label htmlFor="after-tax">
              Après impôt sur les gains (31,4 %)
            </Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 rounded-xl bg-primary/5 p-4 ring-1 ring-primary/10">
        {[
          ["conservative", conservative],
          ["moderate", moderate],
          ["aggressive", aggressive],
        ].map(([key, projection]) => (
          <Stat
            key={key}
            label={SERIES[key].label}
            value={formatCurrency(projection.totalWithInterest)}
            hint={`dont ${formatCurrency(projection.interestEarned)} de gains`}
          />
        ))}
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 8, right: 8 }}>
            <CartesianGrid {...chartGrid} />
            <XAxis dataKey="year" {...chartAxis} />
            <YAxis
              {...chartAxis}
              axisLine={false}
              tickFormatter={(value) => `${Math.round(value / 1000)}k€`}
            />
            <Tooltip
              {...chartTooltip}
              cursor={{ stroke: "var(--border)" }}
              formatter={(value, name) => [
                formatCurrency(value),
                SERIES[name].label,
              ]}
              labelFormatter={(year) =>
                `À ${userAge + year} ans (${year} an${year > 1 ? "s" : ""})`
              }
            />
            {Object.entries(SERIES).map(([key, { color }]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                strokeDasharray={key === "saved" ? "4 4" : undefined}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {Object.entries(SERIES).map(([key, { label, color }]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>

      <Footnote>
        Le scénario à 2% correspond aux livrets réglementés, exonérés
        d&apos;impôt. Les scénarios à 4% et 6% supportent le prélèvement
        forfaitaire unique de 31,4 % sur les gains (30 % en assurance-vie, moins
        en PEA après 5 ans). Inflation : 3,0 % sur un an en septembre 2026
        (INSEE) ; 2 % est la cible de la BCE. Les rendements ne sont pas
        garantis.
      </Footnote>
    </Section>
  );
};

export default SavingsProjection;
