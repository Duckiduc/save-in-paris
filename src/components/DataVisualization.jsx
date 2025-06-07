import { useState } from "react";
import { Select, Row, Col } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const { Option } = Select;

const DataVisualization = ({ userProfile }) => {
  const [chartType, setChartType] = useState("savings-rate");

  // Données basées sur les fichiers CSV
  const savingsData = [
    { age: "Moins de 26 ans", epargne: 1638, taux: 8.3, salaire: 2306 },
    { age: "26-30 ans", epargne: 2345, taux: 11.8, salaire: 3100 },
    { age: "30-40 ans", epargne: 3239, taux: 11.3, salaire: 4150 },
    { age: "40-50 ans", epargne: 3239, taux: 11.3, salaire: 4150 },
    { age: "50-60 ans", epargne: 5893, taux: 18.0, salaire: 4903 },
    { age: "60+ ans", epargne: 5935, taux: 21.7, salaire: 4903 },
  ];

  const generationData = [
    { generation: "Gen Z", tauxEpargne: 43, priorite: "Imprévus", risque: 56 },
    {
      generation: "Millennials",
      tauxEpargne: 52,
      priorite: "Immobilier",
      risque: 40,
    },
    {
      generation: "Gen X",
      tauxEpargne: 51,
      priorite: "Patrimoine",
      risque: 28,
    },
    {
      generation: "Baby Boomers",
      tauxEpargne: 57,
      priorite: "Retraite",
      risque: 15,
    },
  ];

  const costBreakdown = [
    { name: "Logement", value: 45, color: "#1890ff" },
    { name: "Transport", value: 15, color: "#52c41a" },
    { name: "Alimentation", value: 20, color: "#faad14" },
    { name: "Loisirs", value: 12, color: "#f5222d" },
    { name: "Autres", value: 8, color: "#722ed1" },
  ];

  const renderChart = () => {
    switch (chartType) {
      case "savings-rate":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === "taux" ? `${value}%` : `${value}€`,
                  name === "taux" ? "Taux d'épargne" : "Épargne annuelle",
                ]}
              />
              <Bar dataKey="taux" fill="#1890ff" name="taux" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "salary-comparison":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}€`, "Salaire moyen"]} />
              <Line
                type="monotone"
                dataKey="salaire"
                stroke="#52c41a"
                strokeWidth={3}
                dot={{ fill: "#52c41a", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "generation":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={generationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="generation" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value}%`, "Taux d'épargne mensuelle"]}
              />
              <Bar dataKey="tauxEpargne" fill="#722ed1" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "costs":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {costBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Part du budget"]} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getChartDescription = () => {
    switch (chartType) {
      case "savings-rate":
        return "Taux d'épargne moyen par tranche d'âge à Paris";
      case "salary-comparison":
        return "Évolution du salaire moyen net par âge à Paris";
      case "generation":
        return "Comportements d'épargne par génération";
      case "costs":
        return "Répartition moyenne du budget à Paris";
      default:
        return "";
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24}>
          <Select
            value={chartType}
            onChange={setChartType}
            style={{ width: "100%" }}
            placeholder="Choisir un graphique"
          >
            <Option value="savings-rate">Taux d&apos;épargne par âge</Option>
            <Option value="salary-comparison">Salaires moyens</Option>
            <Option value="generation">Comportements par génération</Option>
            <Option value="costs">Répartition des coûts</Option>
          </Select>
        </Col>
      </Row>

      <div style={{ marginBottom: 16, textAlign: "center", color: "#666" }}>
        {getChartDescription()}
      </div>

      {renderChart()}

      {userProfile && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: "#f6f8fa",
            borderRadius: 6,
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
            💡 <strong>Votre profil :</strong> {userProfile.ageRange} ans,{" "}
            {userProfile.location === "paris-intra"
              ? "Paris intra-muros"
              : userProfile.location === "petite-couronne"
              ? "Petite couronne"
              : "Grande couronne"}
          </p>
        </div>
      )}
    </div>
  );
};

export default DataVisualization;
