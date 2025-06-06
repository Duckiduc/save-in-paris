// Utilitaires pour les calculs financiers et les données

export const SALARY_DATA = {
  '18-25': { average: 2306, savingsRate: 0.12 },
  '26-35': { average: 3100, savingsRate: 0.17 },
  '36-45': { average: 4150, savingsRate: 0.22 },
  '46-55': { average: 4903, savingsRate: 0.27 },
  '55+': { average: 4903, savingsRate: 0.20 }
};

export const LOCATION_MULTIPLIERS = {
  'paris-intra': { rent: 1.0, transport: 0.95, food: 1.1 },
  'petite-couronne': { rent: 0.75, transport: 1.0, food: 1.0 },
  'grande-couronne': { rent: 0.65, transport: 1.1, food: 0.9 }
};

export const AVERAGE_COSTS = {
  transport: 84, // Pass Navigo moyen
  food: 350, // Alimentation mensuelle personne seule
  utilities: 60, // Charges moyennes
  healthcare: 50, // Santé mensuelle
  entertainment: 200 // Loisirs moyens
};

export const calculateOptimalBudget = (salary) => {
  return {
    essentials: salary * 0.5, // 50% max
    personal: salary * 0.3,   // 30% max  
    savings: salary * 0.2     // 20% min
  };
};

export const getAgeRecommendations = (ageRange) => {
  const recommendations = {
    '18-25': {
      priority: 'Épargne de précaution',
      products: ['Livret A', 'LEP', 'Assurance-vie'],
      target: '10-15% du salaire',
      tips: [
        'Privilégiez la colocation',
        'Utilisez les aides au logement',
        'Constituez 3 mois de charges d\'épargne'
      ]
    },
    '26-35': {
      priority: 'Projet immobilier',
      products: ['PEL', 'Assurance-vie', 'PEA'],
      target: '15-20% du salaire',
      tips: [
        'Préparez un apport immobilier',
        'Optimisez la fiscalité',
        'Explorez la banlieue bien desservie'
      ]
    },
    '36-45': {
      priority: 'Constitution patrimoine',
      products: ['PER', 'SCPI', 'Assurance-vie'],
      target: '20-25% du salaire',
      tips: [
        'Maximisez la défiscalisation',
        'Anticipez les frais d\'éducation',
        'Diversifiez les investissements'
      ]
    },
    '46-55': {
      priority: 'Préparation retraite',
      products: ['PER', 'SCPI', 'Obligations'],
      target: '25-30% du salaire',
      tips: [
        'Intensifiez l\'épargne retraite',
        'Réduisez les crédits',
        'Optimisez la transmission'
      ]
    },
    '55+': {
      priority: 'Sécurisation patrimoine',
      products: ['Fonds euros', 'SCPI', 'Obligations'],
      target: '20% du salaire',
      tips: [
        'Sécurisez les placements',
        'Générez des revenus complémentaires',
        'Anticipez les besoins santé'
      ]
    }
  };
  
  return recommendations[ageRange] || recommendations['26-35'];
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (rate) => {
  return `${Math.round(rate * 100)}%`;
};

export const calculateSavingsProjection = (monthlySavings, years, annualReturn = 0.03) => {
  const monthlyReturn = annualReturn / 12;
  const months = years * 12;
  
  // Calcul avec intérêts composés
  const totalSaved = monthlySavings * months;
  const totalWithInterest = monthlySavings * (
    (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn
  );
  
  return {
    totalSaved,
    totalWithInterest,
    interestEarned: totalWithInterest - totalSaved
  };
};

export const getSavingsAdvice = (currentRate, recommendedRate, disposableIncome) => {
  const advice = [];
  
  if (currentRate < 0.05) {
    advice.push({
      type: 'critical',
      message: 'Taux d\'épargne très faible',
      action: 'Révisez votre budget en priorité'
    });
  } else if (currentRate < recommendedRate) {
    advice.push({
      type: 'warning',
      message: 'Taux d\'épargne en dessous de la recommandation',
      action: 'Optimisez vos dépenses non-essentielles'
    });
  } else {
    advice.push({
      type: 'success',
      message: 'Excellent taux d\'épargne',
      action: 'Continuez et diversifiez vos placements'
    });
  }
  
  if (disposableIncome < 0) {
    advice.push({
      type: 'critical',
      message: 'Budget déficitaire',
      action: 'Réduisez vos charges ou augmentez vos revenus'
    });
  }
  
  return advice;
};
