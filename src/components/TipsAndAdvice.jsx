import React from 'react';
import { Card, List, Typography, Tag, Space, Divider } from 'antd';
import { 
  BulbOutlined, 
  WarningOutlined, 
  CheckCircleOutlined,
  DollarOutlined,
  HomeOutlined,
  CarOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const TipsAndAdvice = ({ userProfile, results }) => {
  const getAgeSpecificAdvice = (ageRange) => {
    const adviceMap = {
      '18-25': {
        title: 'Conseils pour les 18-25 ans',
        tips: [
          'Privilégiez la colocation pour réduire les coûts de logement',
          'Constituez d\'abord une épargne de précaution (3 mois de charges)',
          'Profitez des aides au logement (APL, ALS)',
          'Utilisez les transports en commun avec la carte Imagine R',
          'Explorez les bons plans étudiants et jeunes actifs'
        ],
        savingsTarget: '10-15% du salaire net',
        priority: 'Épargne de précaution'
      },
      '26-35': {
        title: 'Conseils pour les 26-35 ans',
        tips: [
          'Préparez un apport pour l\'achat immobilier (10-20%)',
          'Optimisez vos impôts avec un PEA ou assurance-vie',
          'Négociez votre salaire et vos avantages en nature',
          'Considérez l\'achat en banlieue bien desservie',
          'Diversifiez vos placements progressivement'
        ],
        savingsTarget: '15-20% du salaire net',
        priority: 'Projet immobilier'
      },
      '36-45': {
        title: 'Conseils pour les 36-45 ans',
        tips: [
          'Maximisez vos dispositifs de défiscalisation',
          'Anticipez les frais de scolarité des enfants',
          'Investissez dans l\'immobilier locatif si possible',
          'Réévaluez votre assurance-vie régulièrement',
          'Préparez votre retraite avec un PER'
        ],
        savingsTarget: '20-25% du salaire net',
        priority: 'Constitution du patrimoine'
      },
      '46-55': {
        title: 'Conseils pour les 46-55 ans',
        tips: [
          'Intensifiez votre épargne retraite',
          'Explorez les investissements SCPI',
          'Optimisez la transmission de votre patrimoine',
          'Réduisez vos crédits avant la retraite',
          'Diversifiez géographiquement vos investissements'
        ],
        savingsTarget: '25-30% du salaire net',
        priority: 'Préparation retraite'
      },
      '55+': {
        title: 'Conseils pour les 55 ans et plus',
        tips: [
          'Sécurisez vos placements (fonds euros)',
          'Générez des revenus complémentaires',
          'Optimisez votre fiscalité avant la retraite',
          'Anticipez vos besoins en santé',
          'Préparez la transmission de vos biens'
        ],
        savingsTarget: '20% du salaire net',
        priority: 'Sécurisation du patrimoine'
      }
    };
    
    return adviceMap[ageRange] || adviceMap['26-35'];
  };

  const getLocationSpecificTips = (location) => {
    const locationTips = {
      'paris-intra': [
        'Explorez les arrondissements moins chers (10e, 19e, 20e)',
        'Privilégiez le vélo pour économiser sur les transports',
        'Profitez des marchés de fin de journée pour l\'alimentation',
        'Négociez les frais d\'agence immobilière'
      ],
      'petite-couronne': [
        'Optimisez vos trajets domicile-travail',
        'Profitez du meilleur rapport qualité-prix',
        'Explorez les zones en développement (prix en hausse)',
        'Considérez l\'achat si vous êtes locataire'
      ],
      'grande-couronne': [
        'Budgetez les coûts de transport supplémentaires',
        'Profitez de l\'espace pour du télétravail',
        'Explorez les opportunités d\'investissement local',
        'Optimisez vos déplacements (covoiturage, télétravail)'
      ]
    };
    
    return locationTips[location] || locationTips['paris-intra'];
  };

  const getFinancialWarnings = (results) => {
    const warnings = [];
    
    if (!results?.canSave) {
      warnings.push({
        type: 'error',
        icon: <WarningOutlined />,
        message: 'Attention : Vos dépenses dépassent vos revenus',
        advice: 'Réduisez vos charges ou augmentez vos revenus en priorité'
      });
    }
    
    if (results?.actualSavingsRate < 0.1) {
      warnings.push({
        type: 'warning',
        icon: <WarningOutlined />,
        message: 'Taux d\'épargne faible (moins de 10%)',
        advice: 'Analysez vos dépenses non-essentielles et optimisez votre budget'
      });
    }
    
    if (results?.savingsGap > 500) {
      warnings.push({
        type: 'info',
        icon: <BulbOutlined />,
        message: 'Écart important avec l\'objectif d\'épargne',
        advice: 'Considérez un changement de logement ou une augmentation de revenus'
      });
    }
    
    return warnings;
  };

  const generalTips = [
    {
      category: 'Logement',
      icon: <HomeOutlined />,
      tips: [
        'Le logement ne devrait pas dépasser 33% de vos revenus',
        'Négociez votre loyer lors du renouvellement',
        'Optimisez vos charges (électricité, internet, assurances)',
        'Considérez la colocation pour réduire les coûts'
      ]
    },
    {
      category: 'Transport',
      icon: <CarOutlined />,
      tips: [
        'Profitez du remboursement employeur (50% minimum)',
        'Combinez vélo et transports en commun',
        'Évitez les frais de parking en centre-ville',
        'Utilisez les applications de mobilité partagée'
      ]
    },
    {
      category: 'Épargne',
      icon: <DollarOutlined />,
      tips: [
        'Automatisez vos virements d\'épargne',
        'Diversifiez vos placements selon votre âge',
        'Profitez des enveloppes fiscales (PEA, assurance-vie)',
        'Réévaluez vos objectifs chaque année'
      ]
    }
  ];

  const ageAdvice = userProfile ? getAgeSpecificAdvice(userProfile.ageRange) : null;
  const locationTips = userProfile ? getLocationSpecificTips(userProfile.location) : [];
  const warnings = results ? getFinancialWarnings(results) : [];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {warnings.length > 0 && (
        <Card title="Points d'attention" size="small">
          <List
            size="small"
            dataSource={warnings}
            renderItem={warning => (
              <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <List.Item.Meta
                  avatar={warning.icon}
                  title={<span style={{ color: 'rgba(255, 255, 255, 0.95)' }}>{warning.message}</span>}
                  description={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{warning.advice}</span>}
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      {ageAdvice && (
        <Card title={ageAdvice.title} size="small">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div>
              <Tag color="blue">Objectif : {ageAdvice.savingsTarget}</Tag>
              <Tag color="green">Priorité : {ageAdvice.priority}</Tag>
            </div>
            <List
              size="small"
              dataSource={ageAdvice.tips}
              renderItem={tip => (
                <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{tip}</span>
                </List.Item>
              )}
            />
          </Space>
        </Card>
      )}

      {locationTips.length > 0 && (
        <Card title="Conseils spécifiques à votre zone" size="small">
          <List
            size="small"
            dataSource={locationTips}
            renderItem={tip => (
              <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <BulbOutlined style={{ color: '#faad14', marginRight: 8 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{tip}</span>
              </List.Item>
            )}
          />
        </Card>
      )}

      <Card title="Conseils généraux" size="small">
        {generalTips.map((category, index) => (
          <div key={index}>
            <Title level={5} style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
              {category.icon} {category.category}
            </Title>
            <List
              size="small"
              dataSource={category.tips}
              renderItem={tip => (
                <List.Item style={{ paddingLeft: 24, color: 'rgba(255, 255, 255, 0.9)' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>• {tip}</span>
                </List.Item>
              )}
            />
            {index < generalTips.length - 1 && <Divider />}
          </div>
        ))}
      </Card>

      <Card title="Règle des 50/30/20 adaptée à Paris" size="small">
        <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Text strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}>50% maximum</Text> pour les dépenses essentielles (logement, transport, alimentation)
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Text strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}>30% maximum</Text> pour les loisirs et dépenses personnelles
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <Text strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}>20% minimum</Text> pour l'épargne et investissements
        </Paragraph>
      </Card>
    </Space>
  );
};

export default TipsAndAdvice;
