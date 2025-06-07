import {
  Card,
  Statistic,
  Row,
  Col,
  Progress,
  Alert,
  Typography,
  Space,
  Tag,
  Divider,
} from "antd";
import {
  DollarOutlined,
  RiseOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  CarOutlined,
  ShoppingOutlined,
  MoreOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "../utils/financialUtils";

const { Title, Text } = Typography;

const ResultsDisplay = ({ results }) => {
  if (!results) return null;

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

  const savingsRatePercentage = Math.round(actualSavingsRate * 100);
  const recommendedRatePercentage = Math.round(recommendedSavingsRate * 100);

  const getSavingsStatus = () => {
    if (!canSave) {
      return {
        status: "error",
        message: "Attention : Vos dépenses dépassent vos revenus",
        color: "red",
      };
    } else if (actualSavingsRate >= recommendedSavingsRate) {
      return {
        status: "success",
        message: "Excellent ! Vous atteignez l'objectif d'épargne recommandé",
        color: "green",
      };
    } else {
      return {
        status: "warning",
        message: "Vous pouvez améliorer votre taux d'épargne",
        color: "orange",
      };
    }
  };

  const status = getSavingsStatus();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Résultats de votre simulation">
        <Alert
          message={status.message}
          type={status.status}
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Statistic
              title="Revenus mensuels"
              value={monthlySalary}
              formatter={(value) => formatCurrency(value)}
              prefix={<DollarOutlined />}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Statistic
              title="Dépenses totales"
              value={totalExpenses}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: "#cf1322" }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={12}>
            <Statistic
              title="Épargne mensuelle possible"
              value={Math.max(0, disposableIncome)}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: canSave ? "#3f8600" : "#cf1322" }}
              prefix={canSave ? <CheckCircleOutlined /> : <WarningOutlined />}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Statistic
              title="Épargne annuelle potentielle"
              value={Math.max(0, annualSavingsPotential)}
              formatter={(value) => formatCurrency(value)}
              prefix={<RiseOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Col>
        </Row>
      </Card>

      <Card title="Analyse de votre taux d'épargne">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Text strong>Votre taux d&apos;épargne actuel</Text>
            <Progress
              percent={Math.min(100, savingsRatePercentage)}
              status={
                canSave
                  ? actualSavingsRate >= recommendedSavingsRate
                    ? "success"
                    : "active"
                  : "exception"
              }
              format={() => `${savingsRatePercentage}%`}
            />
          </div>

          <div>
            <Text strong>Objectif recommandé pour votre âge</Text>
            <Progress
              percent={recommendedRatePercentage}
              strokeColor="#52c41a"
              format={() => `${recommendedRatePercentage}%`}
            />
          </div>

          {savingsGap > 0 && (
            <Alert
              message={`Pour atteindre l'objectif, vous devriez économiser ${formatCurrency(
                savingsGap
              )} de plus par mois`}
              type="info"
              showIcon
            />
          )}
        </Space>
      </Card>

      <Card title="Répartition de votre budget">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Title level={4} style={{ color: "#1890ff" }}>
                {Math.round((totalExpenses / monthlySalary) * 100)}%
              </Title>
              <Text>Dépenses</Text>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Title
                level={4}
                style={{ color: canSave ? "#52c41a" : "#ff4d4f" }}
              >
                {savingsRatePercentage}%
              </Title>
              <Text>Épargne possible</Text>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div style={{ textAlign: "center" }}>
              <Title level={4} style={{ color: "#faad14" }}>
                {Math.round(
                  (Math.max(0, disposableIncome) / monthlySalary) * 100
                )}
                %
              </Title>
              <Text>Marge flexible</Text>
            </div>
          </Col>
        </Row>
      </Card>

      <Card
        title="💡 Comprendre votre marge flexible"
        style={{ marginBottom: 16 }}
      >
        <Alert
          message={`Votre marge flexible : ${formatCurrency(
            Math.max(0, disposableIncome)
          )}/mois (${Math.round(
            (Math.max(0, disposableIncome) / monthlySalary) * 100
          )}%)`}
          description={
            <div>
              <Text style={{ display: "block", marginBottom: 8 }}>
                <strong>La marge flexible</strong> représente l&apos;argent
                disponible chaque mois après avoir payé toutes vos dépenses
                essentielles (logement, transport, alimentation, autres charges
                fixes).
              </Text>
              <Text style={{ display: "block", marginBottom: 8 }}>
                Cette somme peut être utilisée pour :
              </Text>
              <ul style={{ marginLeft: 16, marginBottom: 8 }}>
                <li>
                  🎯 <strong>Épargne</strong> pour vos projets futurs
                </li>
                <li>
                  🎉 <strong>Loisirs et sorties</strong> (restaurants, cinéma,
                  vacances)
                </li>
                <li>
                  🛍️ <strong>Achats plaisir</strong> (vêtements, gadgets)
                </li>
                <li>
                  🚨 <strong>Imprévus</strong> (réparations, frais médicaux)
                </li>
                <li>
                  🎁 <strong>Cadeaux et voyages</strong>
                </li>
              </ul>
              <Text
                strong
                style={{
                  color:
                    canSave && disposableIncome > 200
                      ? "#52c41a"
                      : disposableIncome > 0
                      ? "#faad14"
                      : "#ff4d4f",
                }}
              >
                {canSave && disposableIncome > 200
                  ? "✅ Excellente marge ! Vous pouvez épargner ET vous faire plaisir."
                  : disposableIncome > 0
                  ? "⚠️ Marge correcte, mais attention aux dépenses impulsives."
                  : "🚨 Aucune marge flexible - révisez votre budget en priorité."}
              </Text>
            </div>
          }
          type={
            canSave && disposableIncome > 200
              ? "success"
              : disposableIncome > 0
              ? "warning"
              : "error"
          }
          showIcon
        />
      </Card>

      {breakdown && (
        <Card
          title={
            <span>
              <InfoCircleOutlined style={{ marginRight: 8 }} />
              Détail de vos dépenses mensuelles
            </span>
          }
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card
                size="small"
                style={{
                  backgroundColor: "#fff1f0",
                  border: "1px solid #ffccc7",
                }}
              >
                <Statistic
                  title={
                    <span>
                      <HomeOutlined /> Logement
                      {breakdown.isOwner && (
                        <Tag color="blue" style={{ marginLeft: 8 }}>
                          Propriétaire
                        </Tag>
                      )}
                    </span>
                  }
                  value={breakdown.housingCost}
                  formatter={(value) => formatCurrency(value)}
                  valueStyle={{ color: "#cf1322", fontSize: "18px" }}
                />
                {breakdown.isOwner && breakdown.housingDetails && (
                  <div
                    style={{ marginTop: 8, fontSize: "12px", color: "#666" }}
                  >
                    <div>
                      Loyer équivalent:{" "}
                      {formatCurrency(breakdown.housingDetails.equivalentRent)}
                    </div>
                    <div>
                      × 70% ={" "}
                      {formatCurrency(
                        Math.round(
                          breakdown.housingDetails.equivalentRent * 0.7
                        )
                      )}
                    </div>
                    <div>
                      + Charges:{" "}
                      {formatCurrency(breakdown.housingDetails.charges)}
                    </div>
                    <div>
                      + Assurance:{" "}
                      {formatCurrency(breakdown.housingDetails.insurance)}
                    </div>
                  </div>
                )}
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                size="small"
                style={{
                  backgroundColor: "#f6ffed",
                  border: "1px solid #b7eb8f",
                }}
              >
                <Statistic
                  title={
                    <span>
                      <CarOutlined /> Transport
                    </span>
                  }
                  value={breakdown.transportCost}
                  formatter={(value) => formatCurrency(value)}
                  valueStyle={{ color: "#52c41a", fontSize: "18px" }}
                />
                <div style={{ marginTop: 8, fontSize: "12px", color: "#666" }}>
                  Pass Navigo mensuel
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                size="small"
                style={{
                  backgroundColor: "#fff7e6",
                  border: "1px solid #ffd591",
                }}
              >
                <Statistic
                  title={
                    <span>
                      <ShoppingOutlined /> Alimentation
                    </span>
                  }
                  value={breakdown.foodCost}
                  formatter={(value) => formatCurrency(value)}
                  valueStyle={{ color: "#fa8c16", fontSize: "18px" }}
                />
                <div style={{ marginTop: 8, fontSize: "12px", color: "#666" }}>
                  Base 350€ + personnes à charge
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                size="small"
                style={{
                  backgroundColor: "#f9f0ff",
                  border: "1px solid #d3adf7",
                }}
              >
                <Statistic
                  title={
                    <span>
                      <MoreOutlined /> Autres dépenses
                    </span>
                  }
                  value={breakdown.additionalExpenses}
                  formatter={(value) => formatCurrency(value)}
                  valueStyle={{ color: "#722ed1", fontSize: "18px" }}
                />
                <div style={{ marginTop: 8, fontSize: "12px", color: "#666" }}>
                  Loisirs, assurances, etc.
                </div>
              </Card>
            </Col>
          </Row>

          <Divider />

          <Row justify="center">
            <Col>
              <Card
                size="small"
                style={{
                  backgroundColor: "#f0f5ff",
                  border: "2px solid #597ef7",
                }}
              >
                <Statistic
                  title="Total des dépenses"
                  value={totalExpenses}
                  formatter={(value) => formatCurrency(value)}
                  valueStyle={{
                    color: "#1d39c4",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      )}
    </Space>
  );
};

export default ResultsDisplay;
