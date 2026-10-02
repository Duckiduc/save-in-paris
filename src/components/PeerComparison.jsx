import { useState } from "react";
import { Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Choice,
  Field,
  Footnote,
  Section,
  Stat,
  chartAxis,
  chartTooltip,
} from "@/components/shared";
import {
  SALARY_BY_DEPARTMENT,
  SALARY_IDF,
  SALARY_FRANCE,
  formatCurrency,
} from "../utils/financialUtils";

const CATEGORIES = [
  { value: "ensemble", label: "Tous salariés" },
  { value: "cadres", label: "Cadres" },
  { value: "intermediaires", label: "Professions intermédiaires" },
  { value: "employes", label: "Employés" },
  { value: "ouvriers", label: "Ouvriers" },
];

const DEPARTMENTS = Object.entries(SALARY_BY_DEPARTMENT).map(
  ([code, { name }]) => ({ value: code, label: `${name} (${code})` })
);

const PeerComparison = ({ userProfile }) => {
  const defaultDepartment = Object.keys(SALARY_BY_DEPARTMENT).find(
    (code) => SALARY_BY_DEPARTMENT[code].zone === userProfile.location
  );
  const [department, setDepartment] = useState(defaultDepartment);
  const [category, setCategory] = useState("ensemble");

  const reference = SALARY_BY_DEPARTMENT[department];
  const average = reference[category];
  const gap = (userProfile.salary - average) / average;

  const chartData = [
    { name: "Vous", value: userProfile.salary, color: "var(--chart-1)" },
    { name: reference.name, value: average, color: "var(--chart-5)" },
    { name: "Île-de-France", value: SALARY_IDF[category], color: "var(--chart-5)" },
    { name: "France", value: SALARY_FRANCE[category], color: "var(--chart-5)" },
  ];

  return (
    <Section
      title="Votre salaire face à la moyenne"
      icon={Users}
      description="Comparez votre salaire net à la moyenne de votre département et de votre catégorie."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Département de travail">
          <Choice
            value={department}
            onChange={setDepartment}
            options={DEPARTMENTS}
          />
        </Field>
        <Field label="Catégorie">
          <Choice value={category} onChange={setCategory} options={CATEGORIES} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4 rounded-xl bg-primary/5 p-4 ring-1 ring-primary/10">
        <Stat label={`Moyenne ${reference.name}`} value={formatCurrency(average)} />
        <Stat
          label="Votre écart à la moyenne"
          value={`${gap >= 0 ? "+" : ""}${Math.round(gap * 100)}%`}
          tone={gap >= 0 ? "success" : "warning"}
        />
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ right: 16 }}>
            <XAxis
              type="number"
              {...chartAxis}
              tickFormatter={(value) => `${value}€`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={110}
              {...chartAxis}
              axisLine={false}
            />
            <Tooltip
              {...chartTooltip}
              formatter={(value) => [formatCurrency(value), "Net mensuel"]}
            />
            <Bar dataKey="value" radius={4} barSize={22}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Footnote>
        Salaire net mensuel moyen en équivalent temps plein, secteur privé, par
        département du lieu de travail (INSEE, 2024). Une moyenne est tirée
        vers le haut par les hauts salaires : la médiane est plus basse.
      </Footnote>
    </Section>
  );
};

export default PeerComparison;
