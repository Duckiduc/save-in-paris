import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Button, Space, Divider, Row, Col, Switch } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';

const { Option } = Select;

const SavingsCalculator = ({ onCalculationComplete }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
              label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Salaire net mensuel (€)</span>}
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
              label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Tranche d'âge</span>}
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
              label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Zone géographique</span>}
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
              label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Type de logement</span>}
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
              label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Êtes-vous propriétaire ?</span>}
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
                    label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Loyer mensuel (charges comprises)</span>}
                    name="rent"
                    rules={[{ required: true, message: 'Veuillez entrer votre loyer' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0}
                      max={5000}
                      addonAfter="€"
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
              label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Autres dépenses mensuelles</span>}
              name="additionalExpenses"
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={5000}
                addonAfter="€"
                placeholder="500"
                className="web3-input"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Nombre de personnes à charge</span>}
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
              label={<span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Épargne actuelle</span>}
              name="currentSavings"
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={1000000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                addonAfter="€"
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
