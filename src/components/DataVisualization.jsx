import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { Choice, chartAxis, chartGrid, chartTooltip } from "@/components/shared";
import { SALARY_BY_DEPARTMENT } from "../utils/financialUtils";

// Salaire net mensuel moyen en EQTP par âge, secteur privé, France (INSEE, 2024)
const salaryByAge = [
  { age: "Moins de 25 ans", salaire: 1865 },
  { age: "25-39 ans", salaire: 2567 },
  { age: "40-49 ans", salaire: 3009 },
  { age: "50-54 ans", salaire: 3175 },
  { age: "55 ans et +", salaire: 3267 },
];

// Taux d'épargne par cinquième de niveau de vie, en % du revenu disponible (INSEE, 2022)
const savingsByIncome = [
  { tranche: "20% les plus modestes", taux: -29 },
  { tranche: "2e cinquième", taux: 0 },
  { tranche: "3e cinquième", taux: 6 },
  { tranche: "4e cinquième", taux: 10 },
  { tranche: "20% les plus aisés", taux: 27 },
];

// Loyer moyen hors charges en €/m² au 1er janvier 2025 (OLAP)
const rentBySize = [
  { taille: "1 pièce", paris: 30.4, petite: 23.7, grande: 21.4 },
  { taille: "2 pièces", paris: 26.7, petite: 20.2, grande: 17.0 },
  { taille: "3 pièces", paris: 25.1, petite: 17.9, grande: 14.6 },
  { taille: "4 pièces", paris: 24.3, petite: 16.9, grande: 14.0 },
];

const salaryByDepartment = Object.entries(SALARY_BY_DEPARTMENT)
  .map(([code, { name, ensemble, zone }]) => ({
    departement: `${name} (${code})`,
    salaire: ensemble,
    zone,
  }))
  .sort((a, b) => b.salaire - a.salaire);

const CHARTS = {
  "salary-age": {
    label: "Salaires par âge",
    description:
      "Salaire net mensuel moyen par âge, secteur privé, France entière (INSEE, 2024)",
  },
  "salary-department": {
    label: "Salaires par département",
    description:
      "Salaire net mensuel moyen par département d'Île-de-France, secteur privé (INSEE, 2024)",
  },
  "savings-income": {
    label: "Taux d'épargne par niveau de vie",
    description:
      "Taux d'épargne des ménages selon leur niveau de vie, France (INSEE, 2022)",
  },
  rents: {
    label: "Loyers au m²",
    description:
      "Loyer moyen hors charges selon la zone et la taille du logement (OLAP, janvier 2025)",
  },
};

const DataVisualization = ({ userProfile }) => {
  const [chartType, setChartType] = useState("salary-department");

  const renderChart = () => {
    switch (chartType) {
      case "salary-age":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryByAge}>
              <CartesianGrid {...chartGrid} />
              <XAxis
                dataKey="age"
                {...chartAxis}
                angle={-30}
                textAnchor="end"
                height={70}
              />
              <YAxis {...chartAxis} tickFormatter={(value) => `${value}€`} />
              <Tooltip
                {...chartTooltip}
                formatter={(value) => [`${value}€`, "Salaire net moyen"]}
              />
              <Bar dataKey="salaire" fill="var(--chart-1)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "salary-department":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salaryByDepartment}
              layout="vertical"
              margin={{ left: 40 }}
            >
              <CartesianGrid {...chartGrid} vertical horizontal={false} />
              <XAxis
                type="number"
                {...chartAxis}
                tickFormatter={(value) => `${value}€`}
              />
              <YAxis
                type="category"
                dataKey="departement"
                width={130}
                {...chartAxis}
              />
              <Tooltip
                {...chartTooltip}
                formatter={(value) => [`${value}€`, "Salaire net moyen"]}
              />
              <Bar dataKey="salaire" radius={4}>
                {salaryByDepartment.map((entry) => (
                  <Cell
                    key={entry.departement}
                    fill={
                      entry.zone === userProfile?.location
                        ? "var(--chart-1)"
                        : "var(--chart-5)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "savings-income":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={savingsByIncome}>
              <CartesianGrid {...chartGrid} />
              <XAxis
                dataKey="tranche"
                {...chartAxis}
                angle={-30}
                textAnchor="end"
                height={90}
              />
              <YAxis {...chartAxis} tickFormatter={(value) => `${value}%`} />
              <ReferenceLine y={0} stroke="var(--muted-foreground)" />
              <Tooltip
                {...chartTooltip}
                formatter={(value) => [`${value}%`, "Taux d'épargne"]}
              />
              <Bar dataKey="taux" radius={4}>
                {savingsByIncome.map((entry) => (
                  <Cell
                    key={entry.tranche}
                    fill={entry.taux < 0 ? "var(--destructive)" : "var(--chart-1)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "rents":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rentBySize}>
              <CartesianGrid {...chartGrid} />
              <XAxis dataKey="taille" {...chartAxis} />
              <YAxis {...chartAxis} tickFormatter={(value) => `${value}€`} />
              <Tooltip
                {...chartTooltip}
                formatter={(value, name) => [`${value} €/m²`, name]}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="paris" name="Paris" fill="var(--chart-1)" radius={3} />
              <Bar dataKey="petite" name="Petite couronne" fill="var(--chart-2)" radius={3} />
              <Bar dataKey="grande" name="Grande couronne" fill="var(--chart-3)" radius={3} />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Choice
        value={chartType}
        onChange={setChartType}
        options={Object.entries(CHARTS).map(([value, { label }]) => ({
          value,
          label,
        }))}
      />
      <p className="text-sm text-muted-foreground">
        {CHARTS[chartType].description}
      </p>
      {renderChart()}
    </div>
  );
};

export default DataVisualization;
