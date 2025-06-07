import { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Divider,
  FloatButton,
  Tabs,
  Modal,
  Button,
  Checkbox,
} from "antd";
import {
  CalculatorOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  BookOutlined,
  HomeOutlined,
  CarOutlined,
  ShoppingOutlined,
  BankOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import SavingsCalculator from "./components/SavingsCalculator";
import ResultsDisplay from "./components/ResultsDisplay";
import TipsAndAdvice from "./components/TipsAndAdvice";
import DataVisualization from "./components/DataVisualization";
import SavingsProjection from "./components/SavingsProjection";
import GuideInfo from "./components/GuideInfo";
import MobileOptimizations from "./components/MobileOptimizations";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const [calculationResults, setCalculationResults] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [legalModalVisible, setLegalModalVisible] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  useEffect(() => {
    // Check if user has already accepted terms in this session
    const accepted = sessionStorage.getItem("termsAccepted");
    if (!accepted) {
      setLegalModalVisible(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    if (hasAcceptedTerms) {
      sessionStorage.setItem("termsAccepted", "true");
      setLegalModalVisible(false);
    }
  };

  const handleCalculationComplete = (results, profile) => {
    setCalculationResults(results);
    setUserProfile(profile);
  };

  // Define tabs items for the modern Tabs API
  const tabItems = [
    {
      key: "housing",
      label: (
        <span>
          <HomeOutlined /> Logement
        </span>
      ),
      children: <GuideInfo section="housing" userProfile={userProfile} />,
    },
    {
      key: "transport",
      label: (
        <span>
          <CarOutlined /> Transport
        </span>
      ),
      children: <GuideInfo section="transport" userProfile={userProfile} />,
    },
    {
      key: "food",
      label: (
        <span>
          <ShoppingOutlined /> Alimentation
        </span>
      ),
      children: <GuideInfo section="food" userProfile={userProfile} />,
    },
    {
      key: "savings",
      label: (
        <span>
          <BankOutlined /> Épargne
        </span>
      ),
      children: <GuideInfo section="savings" userProfile={userProfile} />,
    },
    {
      key: "warnings",
      label: (
        <span>
          <WarningOutlined /> Erreurs à Éviter
        </span>
      ),
      children: <GuideInfo section="warnings" userProfile={userProfile} />,
    },
  ];

  return (
    <Layout className="layout">
      <MobileOptimizations />
      
      <Header className="header">
        <div className="header-content">
          <CalculatorOutlined className="logo-icon" />
          <Title level={2} className="header-title">
            Calculateur d&apos;Épargne Paris
          </Title>
        </div>
      </Header>

      <Content className="content">
        <div className="hero-section">
          <Title level={1} className="hero-title">
            Optimisez votre épargne à Paris
          </Title>
          <Paragraph className="hero-description">
            Calculez votre capacité d&apos;épargne en tenant compte du coût de
            la vie parisien.
          </Paragraph>

          {/* Guide Overview Section */}
          <GuideInfo section="overview" userProfile={userProfile} />
        </div>

        <Row gutter={[24, 24]} className="main-content">
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <CalculatorOutlined /> Calculateur d&apos;Épargne
                </span>
              }
              className="calculator-card"
            >
              <SavingsCalculator
                onCalculationComplete={handleCalculationComplete}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            {calculationResults ? (
              <ResultsDisplay
                results={calculationResults}
                userProfile={userProfile}
              />
            ) : (
              <Card
                title={
                  <span>
                    <InfoCircleOutlined /> Vos Résultats
                  </span>
                }
                className="results-placeholder"
              >
                <Paragraph className="placeholder-text">
                  Remplissez le formulaire
                </Paragraph>
              </Card>
            )}
          </Col>
        </Row>

        <Divider />

        {/* Guide Information Tabs Section */}
        <Row gutter={[24, 24]} className="guide-section">
          <Col xs={24}>
            <Card
              title={
                <span>
                  <BookOutlined /> Guide Complet d&apos;Épargne à Paris
                </span>
              }
              className="guide-card"
            >
              <Tabs defaultActiveKey="housing" centered items={tabItems} />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[24, 24]} className="tips-section">
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <LineChartOutlined /> Données de Référence
                </span>
              }
            >
              <DataVisualization userProfile={userProfile} />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <InfoCircleOutlined /> Conseils & Recommandations
                </span>
              }
              className="tips-section"
            >
              <TipsAndAdvice
                userProfile={userProfile}
                results={calculationResults}
              />
            </Card>
          </Col>
        </Row>

        {calculationResults && calculationResults.canSave && (
          <>
            <Divider />
            <Row gutter={[24, 24]} className="full-width-section">
              <Col xs={24}>
                <SavingsProjection
                  monthlySavings={calculationResults.disposableIncome}
                  userAge={
                    userProfile
                      ? parseInt(userProfile.ageRange.split("-")[0])
                      : 30
                  }
                />
              </Col>
            </Row>
          </>
        )}
      </Content>

      <Footer className="footer">
        <div className="footer-content">
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <Paragraph
              style={{ color: "rgba(255, 255, 255, 0.7)", margin: "0 0 8px 0" }}
            >
              © 2025 Calculateur d&apos;Épargne Paris - Optimisez votre budget
              parisien
            </Paragraph>
            <Divider
              style={{
                margin: "12px 0",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            />
            <div
              style={{
                background: "rgba(255, 193, 7, 0.1)",
                border: "1px solid rgba(255, 193, 7, 0.3)",
                borderRadius: "8px",
                padding: "16px",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  margin: "0 0 12px 0",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  fontWeight: 600,
                }}
              >
                <WarningOutlined
                  style={{ color: "#faad14", marginRight: "8px" }}
                />
                <strong>AVIS LÉGAL ET LIMITATION DE RESPONSABILITÉ</strong>
              </Paragraph>

              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0 0 8px 0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                <strong>Projet Open Source :</strong> Ce calculateur est un
                projet open source fourni &quot;EN L&apos;ÉTAT&quot; sans aucune
                garantie expresse ou implicite. Le code source est disponible
                publiquement et peut être modifié par des tiers.
              </Paragraph>

              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0 0 8px 0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                <strong>Usage Informatif Uniquement :</strong> Les calculs,
                estimations, conseils et informations fournis sont à des fins
                éducatives et informatives uniquement. Ils ne constituent en
                aucun cas des conseils financiers, juridiques, fiscaux ou
                d&apos;investissement personnalisés.
              </Paragraph>

              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0 0 8px 0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                <strong>Exclusion de Responsabilité :</strong> L&apos;auteur,
                les contributeurs et les hébergeurs DÉCLINENT TOUTE
                RESPONSABILITÉ pour les pertes, dommages, erreurs ou
                conséquences résultant de l&apos;utilisation de ce calculateur
                ou des décisions prises sur la base de ses résultats.
              </Paragraph>

              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0 0 8px 0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                <strong>Données et Précision :</strong> Les données utilisées
                proviennent de sources publiques et peuvent être inexactes,
                obsolètes ou non représentatives de votre situation. Les
                résultats sont des estimations approximatives et ne garantissent
                aucun résultat financier futur.
              </Paragraph>

              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0 0 8px 0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                <strong>Conseil Professionnel Recommandé :</strong> Consultez
                TOUJOURS un conseiller financier agréé, un expert-comptable ou
                un notaire avant toute décision financière importante. Cet outil
                ne remplace pas un accompagnement professionnel personnalisé.
              </Paragraph>

              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0 0 8px 0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                <strong>Limitation de Garantie :</strong> AUCUNE GARANTIE
                n&apos;est donnée quant à la disponibilité, la sécurité,
                l&apos;exactitude ou la performance de ce service.
                L&apos;utilisateur assume tous les risques liés à son
                utilisation.
              </Paragraph>

              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                <strong>Acceptation des Conditions :</strong> En utilisant ce
                service, vous acceptez intégralement ces conditions,
                reconnaissez avoir été informé(e) de ces limitations et
                déchargez les créateurs de toute responsabilité. Si vous
                n&apos;acceptez pas ces conditions, cessez immédiatement
                d&apos;utiliser ce service.
              </Paragraph>

              <Paragraph
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: "8px 0 0 0",
                  fontSize: "10px",
                  lineHeight: "1.3",
                  textAlign: "center",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingTop: "8px",
                }}
              >
                📋 Conditions d&apos;utilisation complètes disponibles dans le
                fichier LEGAL.md du projet
              </Paragraph>
            </div>
          </div>
        </div>
      </Footer>

      <FloatButton.BackTop />

      {/* Legal Disclaimer Modal */}
      <Modal
        title={
          <div style={{ color: "#ff4d4f", fontWeight: "bold" }}>
            ⚠️ AVERTISSEMENT LÉGAL IMPORTANT
          </div>
        }
        open={legalModalVisible}
        onCancel={() => {}}
        closable={false}
        maskClosable={false}
        footer={
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 16 }}>
              <Checkbox
                checked={hasAcceptedTerms}
                onChange={(e) => setHasAcceptedTerms(e.target.checked)}
              >
                J'ai lu et j'accepte intégralement ces conditions
              </Checkbox>
            </div>
            <Button
              type="primary"
              danger
              disabled={!hasAcceptedTerms}
              onClick={handleAcceptTerms}
              size="large"
            >
              Accepter et Continuer
            </Button>
          </div>
        }
        width={600}
      >
        <div
          style={{ maxHeight: "400px", overflowY: "auto", padding: "0 8px" }}
        >
          <Paragraph
            style={{ color: "#ff4d4f", fontWeight: "bold", marginBottom: 16 }}
          >
            Ce calculateur d'épargne est fourni <strong>"EN L'ÉTAT"</strong>{" "}
            sans aucune garantie.
          </Paragraph>

          <Paragraph style={{ marginBottom: 12, color: "#262626" }}>
            <strong>🚫 EXCLUSION DE RESPONSABILITÉ :</strong>
            <br />
            Les créateurs DÉCLINENT TOUTE RESPONSABILITÉ pour les pertes
            financières, erreurs de calcul, ou décisions prises sur la base de
            ces résultats.
          </Paragraph>

          <Paragraph style={{ marginBottom: 12, color: "#262626" }}>
            <strong>📋 USAGE INFORMATIF UNIQUEMENT :</strong>
            <br />
            Ce calculateur fournit des estimations éducatives. Il NE CONSTITUE
            PAS un conseil financier professionnel personnalisé.
          </Paragraph>

          <Paragraph style={{ marginBottom: 12, color: "#262626" }}>
            <strong>💼 CONSULTATION PROFESSIONNELLE :</strong>
            <br />
            Consultez TOUJOURS un conseiller financier agréé avant toute
            décision financière importante.
          </Paragraph>

          <Paragraph style={{ marginBottom: 12, color: "#262626" }}>
            <strong>📊 LIMITATIONS DES DONNÉES :</strong>
            <br />
            Les données peuvent être inexactes, obsolètes ou non représentatives
            de votre situation personnelle.
          </Paragraph>

          <Paragraph
            style={{
              backgroundColor: "#fff2f0",
              padding: 12,
              border: "1px solid #ffccc7",
              borderRadius: 4,
              color: "#cf1322",
              fontWeight: "bold",
              marginBottom: 0,
            }}
          >
            ⚠️ L'utilisation de ce service est ENTIÈREMENT À VOS RISQUES ET
            PÉRILS. Si vous n'acceptez pas ces conditions, fermez cette page
            immédiatement.
          </Paragraph>
        </div>
      </Modal>
    </Layout>
  );
}

export default App;
