import React, { useState } from 'react';
import { Card, Slider, Typography, Row, Col, Statistic, Alert } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RiseOutlined } from '@ant-design/icons';
import { calculateSavingsProjection, formatCurrency } from '../utils/financialUtils';

const { Title, Text } = Typography;

const SavingsProjection = ({ monthlySavings, userAge = 30 }) => {
  const [projectionYears, setProjectionYears] = useState(10);
  const retirementAge = 65;
  const maxYears = Math.max(5, retirementAge - userAge);

  if (!monthlySavings || monthlySavings <= 0) {
    return (
      <Alert
        message="Projection non disponible"
        description="Vous devez d'abord avoir une épargne mensuelle positive pour voir les projections."
        type="info"
        showIcon
      />
    );
  }

  // Calcul des projections avec différents taux de rendement
  const conservativeReturn = 0.02; // 2% annuel
  const moderateReturn = 0.04;     // 4% annuel
  const aggressiveReturn = 0.06;   // 6% annuel

  const conservative = calculateSavingsProjection(monthlySavings, projectionYears, conservativeReturn);
  const moderate = calculateSavingsProjection(monthlySavings, projectionYears, moderateReturn);
  const aggressive = calculateSavingsProjection(monthlySavings, projectionYears, aggressiveReturn);

  // Données pour le graphique année par année
  const chartData = [];
  for (let year = 1; year <= projectionYears; year++) {
    const consProj = calculateSavingsProjection(monthlySavings, year, conservativeReturn);
    const modProj = calculateSavingsProjection(monthlySavings, year, moderateReturn);
    const aggProj = calculateSavingsProjection(monthlySavings, year, aggressiveReturn);
    
    chartData.push({
      year,
      age: userAge + year,
      conservative: Math.round(consProj.totalWithInterest),
      moderate: Math.round(modProj.totalWithInterest),
      aggressive: Math.round(aggProj.totalWithInterest),
      saved: Math.round(consProj.totalSaved)
    });
  }

  return (
    <Card 
      title={
        <span>
          <RiseOutlined /> Projection d'Épargne
        </span>
      }
    >
      <div style={{ marginBottom: 24 }}>
        <Text strong>Horizon de projection : {projectionYears} ans</Text>
        <Slider
          min={1}
          max={maxYears}
          value={projectionYears}
          onChange={setProjectionYears}
          marks={{
            5: '5 ans',
            10: '10 ans',
            20: '20 ans',
            [maxYears]: `${maxYears} ans (retraite)`
          }}
          style={{ marginTop: 16 }}
        />
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card size="small" style={{ backgroundColor: '#f6ffed' }}>
            <Statistic
              title="Conservateur (2%/an)"
              value={conservative.totalWithInterest}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: '#52c41a', fontSize: '16px' }}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Intérêts : {formatCurrency(conservative.interestEarned)}
            </Text>
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card size="small" style={{ backgroundColor: '#fff7e6' }}>
            <Statistic
              title="Modéré (4%/an)"
              value={moderate.totalWithInterest}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: '#fa8c16', fontSize: '16px' }}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Intérêts : {formatCurrency(moderate.interestEarned)}
            </Text>
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card size="small" style={{ backgroundColor: '#f0f5ff' }}>
            <Statistic
              title="Dynamique (6%/an)"
              value={aggressive.totalWithInterest}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: '#1890ff', fontSize: '16px' }}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Intérêts : {formatCurrency(aggressive.interestEarned)}
            </Text>
          </Card>
        </Col>
      </Row>

      <div style={{ height: 300, marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Années', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              label={{ value: 'Montant (€)', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => `${Math.round(value / 1000)}k€`}
            />
            <Tooltip 
              formatter={(value, name) => [
                formatCurrency(value),
                name === 'conservative' ? 'Conservateur (2%)' :
                name === 'moderate' ? 'Modéré (4%)' :
                name === 'aggressive' ? 'Dynamique (6%)' :
                'Épargne seule'
              ]}
              labelFormatter={(year) => `À ${userAge + year} ans (${year} ans d'épargne)`}
            />
            <Line 
              type="monotone" 
              dataKey="saved" 
              stroke="#8c8c8c" 
              strokeDasharray="5 5"
              name="saved"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="conservative" 
              stroke="#52c41a" 
              strokeWidth={2}
              name="conservative"
            />
            <Line 
              type="monotone" 
              dataKey="moderate" 
              stroke="#fa8c16" 
              strokeWidth={2}
              name="moderate"
            />
            <Line 
              type="monotone" 
              dataKey="aggressive" 
              stroke="#1890ff" 
              strokeWidth={3}
              name="aggressive"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Alert
        message="Projection indicative"
        description={`Avec ${formatCurrency(monthlySavings)} épargnés chaque mois, vous pourriez constituer entre ${formatCurrency(conservative.totalWithInterest)} et ${formatCurrency(aggressive.totalWithInterest)} selon votre stratégie d'investissement.`}
        type="info"
        showIcon
        style={{ marginTop: 16 }}
      />
    </Card>
  );
};

export default SavingsProjection;
