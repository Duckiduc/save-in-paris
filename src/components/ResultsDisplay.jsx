import {
  Card,
  Statistic,
  Row,
  Col,
  Progress,
  Alert,
  Typography,
  Space,
} from "antd";
import {
  DollarOutlined,
  RiseOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

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
              suffix="€"
              prefix={<DollarOutlined />}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Statistic
              title="Dépenses totales"
              value={totalExpenses}
              suffix="€"
              valueStyle={{ color: "#cf1322" }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={12}>
            <Statistic
              title="Épargne mensuelle possible"
              value={Math.max(0, disposableIncome)}
              suffix="€"
              valueStyle={{ color: canSave ? "#3f8600" : "#cf1322" }}
              prefix={canSave ? <CheckCircleOutlined /> : <WarningOutlined />}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Statistic
              title="Épargne annuelle potentielle"
              value={Math.max(0, annualSavingsPotential)}
              suffix="€"
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
              message={`Pour atteindre l'objectif, vous devriez économiser ${Math.round(
                savingsGap
              )}€ de plus par mois`}
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
                  ((monthlySalary -
                    totalExpenses -
                    Math.max(0, disposableIncome)) /
                    monthlySalary) *
                    100
                )}
                %
              </Title>
              <Text>Marge flexible</Text>
            </div>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default ResultsDisplay;
