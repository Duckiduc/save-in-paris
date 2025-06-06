import React, { useState } from 'react';
import { Layout, Typography, Card, Row, Col, Divider, BackTop } from 'antd';
import { CalculatorOutlined, InfoCircleOutlined, LineChartOutlined, RiseOutlined } from '@ant-design/icons';
import SavingsCalculator from './components/SavingsCalculator';
import ResultsDisplay from './components/ResultsDisplay';
import TipsAndAdvice from './components/TipsAndAdvice';
import DataVisualization from './components/DataVisualization';
import SavingsProjection from './components/SavingsProjection';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const [calculationResults, setCalculationResults] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const handleCalculationComplete = (results, profile) => {
    setCalculationResults(results);
    setUserProfile(profile);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="header-content">
          <CalculatorOutlined className="logo-icon" />
          <Title level={2} className="header-title">
            Calculateur d'Épargne Paris
          </Title>
        </div>
      </Header>

      <Content className="content">
        <div className="hero-section">
          <Title level={1} className="hero-title">
            Optimisez votre épargne à Paris
          </Title>
          <Paragraph className="hero-description">
            Calculez votre capacité d'épargne en tenant compte du coût de la vie parisien 
            et recevez des conseils personnalisés selon votre profil.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} className="main-content">
          <Col xs={24} lg={12}>
            <Card 
              title={
                <span>
                  <CalculatorOutlined /> Calculateur d'Épargne
                </span>
              }
              className="calculator-card"
            >
              <SavingsCalculator onCalculationComplete={handleCalculationComplete} />
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
                  Remplissez le formulaire pour voir vos résultats personnalisés
                </Paragraph>
              </Card>
            )}
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
              <TipsAndAdvice userProfile={userProfile} results={calculationResults} />
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
                  userAge={userProfile ? parseInt(userProfile.ageRange.split('-')[0]) : 30}
                />
              </Col>
            </Row>
          </>
        )}
      </Content>

      <Footer className="footer">
        <div className="footer-content">
          <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
            © 2025 Calculateur d'Épargne Paris - Optimisez votre budget parisien
          </Paragraph>
        </div>
      </Footer>

      <BackTop />
    </Layout>
  );
}

export default App;
