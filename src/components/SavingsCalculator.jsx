import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Button, Space, Divider, Row, Col, Switch, Card, Typography, Tooltip, Alert } from 'antd';
import { CalculatorOutlined, InfoCircleOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const SavingsCalculator = ({ onCalculationComplete }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);

  const ageRanges = [
    { value: '18-25', label: '18-25 ans (Gen Z)' },
    { value: '26-35', label: '26-35 ans (Gen Z/Millennials)' },
    { value: '36-45', label: '36-45 ans (Millennials/Gen X)' },
    { value: '46-55', label: '46-55 ans (Gen X)' },
    { value: '55+', label: '55+ ans (Baby Boomers)' }
  ];

  const locations = [
    { value: 'paris-intra', label: 'Paris intra-muros' },
    { value: 'petite-couronne', label: 'Petite couronne (92, 93, 94)' },
    { value: 'grande-couronne', label: 'Grande couronne (77, 78, 91, 95)' }
  ];

  const housingTypes = [
    { value: 'studio', label: 'Studio' },
    { value: 't2', label: '2 pièces' },
    { value: 't3', label: '3 pièces' },
    { value: 't4', label: '4 pièces et +' }
  ];

  const calculateSavings = async (values) => {
    setLoading(true);
    
    // Simulation de calcul basé sur les données réelles
    const {
      salary,
      ageRange,
      location,
      housingType,
      rent,
      isOwner,
      additionalExpenses,
      currentSavings,
      dependents
    } = values;

    // Calculs basés sur les coûts moyens parisiens
    const transportCost = location === 'paris-intra' ? 84 : 88.80;
    const foodCost = 350 + (dependents * 200); // Base + par personne supplémentaire
    
    const totalExpenses = (isOwner ? 0 : rent) + transportCost + foodCost + (additionalExpenses || 0);
    const disposableIncome = salary - totalExpenses;
    
    // Recommandations selon l'âge
    const savingsRateRecommendations = {
      '18-25': 0.12,
      '26-35': 0.17,
      '36-45': 0.22,
      '46-55': 0.27,
      '55+': 0.20
    };

    const recommendedSavingsRate = savingsRateRecommendations[ageRange] || 0.15;
    const recommendedMonthlySavings = salary * recommendedSavingsRate;
    const actualSavingsRate = disposableIncome / salary;
    
    const results = {
      monthlySalary: salary,
      totalExpenses,
      disposableIncome,
      recommendedMonthlySavings,
      actualSavingsRate: Math.max(0, actualSavingsRate),
      recommendedSavingsRate,
      savingsGap: recommendedMonthlySavings - Math.max(0, disposableIncome),
      annualSavingsPotential: Math.max(0, disposableIncome) * 12,
      canSave: disposableIncome > 0
    };

    const profile = {
      ageRange,
      location,
      housingType,
      isOwner,
      salary,
      dependents,
      currentSavings
    };

    setTimeout(() => {
      onCalculationComplete(results, profile);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="web3-form-container">
      {/* Methodology Explanation Card */}
      <Card 
        title={
          <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            <InfoCircleOutlined style={{ marginRight: 8 }} />
            Comment fonctionne le calculateur ?
          </span>
        }
        style={{ 
          marginBottom: 24,
          background: 'rgba(10, 11, 13, 0.6)',
          border: '1px solid rgba(120, 219, 255, 0.2)'
        }}
        extra={
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => setShowMethodology(!showMethodology)}
            style={{ color: '#78dbff' }}
          >
            {showMethodology ? 'Masquer' : 'Voir la méthode'}
          </Button>
        }
      >
        {showMethodology && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Alert
              message="Données utilisées dans les calculs"
              description={
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <Paragraph style={{ marginBottom: 8, color: 'inherit' }}>
                    • <strong>Transport :</strong> Pass Navigo moyen (84€ Paris, 88.80€ banlieue)
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 8, color: 'inherit' }}>
                    • <strong>Alimentation :</strong> 350€/mois + 200€ par personne à charge
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 8, color: 'inherit' }}>
                    • <strong>Taux d'épargne recommandé par âge :</strong>
                    <br />- 18-25 ans : 12% (constitution épargne de précaution)
                    <br />- 26-35 ans : 17% (projet immobilier)
                    <br />- 36-45 ans : 22% (constitution patrimoine)
                    <br />- 46-55 ans : 27% (préparation retraite)
                    <br />- 55+ ans : 20% (sécurisation patrimoine)
                  </Paragraph>
                </div>
              }
              type="info"
              style={{ 
                background: 'rgba(24, 144, 255, 0.1)',
                border: '1px solid rgba(24, 144, 255, 0.3)'
              }}
            />
            
            <Alert
              message="Formule de calcul utilisée"
              description={
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <Paragraph style={{ marginBottom: 8, color: 'inherit' }}>
                    <strong>1. Dépenses totales =</strong> Loyer + Transport + Alimentation + Autres dépenses
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 8, color: 'inherit' }}>
                    <strong>2. Épargne possible =</strong> Salaire net - Dépenses totales
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 8, color: 'inherit' }}>
                    <strong>3. Taux d'épargne réel =</strong> (Épargne possible / Salaire net) × 100
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 0, color: 'inherit' }}>
                    <strong>4. Épargne recommandée =</strong> Salaire net × Taux recommandé pour votre âge
                  </Paragraph>
                </div>
              }
              type="success"
              style={{ 
                background: 'rgba(82, 196, 26, 0.1)',
                border: '1px solid rgba(82, 196, 26, 0.3)'
              }}
            />
          </Space>
        )}
      </Card>

      <Form
        form={form}
        layout="vertical"
        onFinish={calculateSavings}
        requiredMark={false}
        className="web3-form"
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Form.Item
              label={
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                  Salaire net mensuel (€)
                  <Tooltip title="Votre salaire après déduction des charges sociales et impôts. C'est la base de tous nos calculs." placement="top">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                  </Tooltip>
                </span>
              }
              name="salary"
              rules={[
                { required: true, message: 'Veuillez saisir votre salaire' },
                { type: 'number', min: 1000, message: 'Salaire minimum 1000€' }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="ex: 2500"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                className="web3-input"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                  Tranche d'âge
                  <Tooltip title="Votre âge détermine le taux d'épargne recommandé selon les objectifs de vie typiques (logement, famille, retraite)." placement="top">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                  </Tooltip>
                </span>
              }
              name="ageRange"
              rules={[{ required: true, message: 'Sélectionnez votre âge' }]}
            >
              <Select 
                placeholder="Sélectionnez votre âge"
                className="web3-select"
              >
                {ageRanges.map(age => (
                  <Option key={age.value} value={age.value}>{age.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                  Zone géographique
                  <Tooltip title="Les coûts de transport varient selon votre zone : Pass Navigo 84€ (Paris) vs 88.80€ (banlieue)." placement="top">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                  </Tooltip>
                </span>
              }
              name="location"
              rules={[{ required: true, message: 'Sélectionnez votre localisation' }]}
            >
              <Select 
                placeholder="Choisissez votre zone"
                className="web3-select"
              >
                {locations.map(loc => (
                  <Option key={loc.value} value={loc.value}>{loc.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                  Type de logement
                  <Tooltip title="Le type de logement influence le loyer et les charges. Un studio coûte moins cher qu'un T4." placement="top">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                  </Tooltip>
                </span>
              }
              name="housingType"
              rules={[{ required: true, message: 'Veuillez sélectionner le type de logement' }]}
            >
              <Select 
                placeholder="Type de logement"
                className="web3-select"
              >
                {housingTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                  Êtes-vous propriétaire ?
                  <Tooltip title="Indiquez si vous possédez votre logement. Cela impacte le calcul du loyer et des dépenses." placement="top">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                  </Tooltip>
                </span>
              }
              name="isOwner"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.isOwner !== currentValues.isOwner}
            >
              {({ getFieldValue }) =>
                !getFieldValue('isOwner') ? (
                  <Form.Item
                    label={
                      <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                        Loyer mensuel (charges comprises)
                        <Tooltip title="Inclut le loyer + charges (eau, électricité, chauffage, internet). Représente généralement 30-40% du budget." placement="top">
                          <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                        </Tooltip>
                      </span>
                    }
                    name="rent"
                    rules={[{ required: true, message: 'Veuillez entrer votre loyer' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0}
                      max={5000}
                      placeholder="1200"
                      className="web3-input"
                    />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                  Autres dépenses mensuelles
                  <Tooltip title="Inclut : assurances, téléphone, loisirs, vêtements, frais médicaux non remboursés, etc." placement="top">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                  </Tooltip>
                </span>
              }
              name="additionalExpenses"
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={5000}
                placeholder="500"
                className="web3-input"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                  Nombre de personnes à charge
                  <Tooltip title="Chaque personne à charge ajoute environ 200€/mois au budget alimentaire." placement="top">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                  </Tooltip>
                </span>
              }
              name="dependents"
              initialValue={0}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={10}
                placeholder="0"
                className="web3-input"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                  Épargne actuelle
                  <Tooltip title="Montant total de votre épargne existante (tous comptes confondus). Utilisé pour les projections futures." placement="top">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#78dbff' }} />
                  </Tooltip>
                </span>
              }
              name="currentSavings"
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={1000000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="10000"
                className="web3-input"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ borderColor: 'rgba(120, 219, 255, 0.2)', margin: '32px 0' }} />

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            size="large"
            icon={<CalculatorOutlined />}
            className="web3-button"
            style={{
              width: '100%',
              height: '48px',
              background: 'linear-gradient(135deg, #78dbff, #ff77c6)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 8px 32px rgba(120, 219, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            Calculer mon épargne
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SavingsCalculator;
