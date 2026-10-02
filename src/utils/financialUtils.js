// Utilitaires pour les calculs financiers et les données

export const calculateOptimalBudget = (salary) => {
  return {
    essentials: salary * 0.5, // 50% max
    personal: salary * 0.3, // 30% max
    savings: salary * 0.2, // 20% min
  };
};

export const getAgeRecommendations = (ageRange) => {
  const recommendations = {
    "18-25": {
      priority: "Épargne de précaution",
      products: ["Livret A", "LEP", "Assurance-vie"],
      target: "10-15% du salaire",
      tips: [
        "Privilégiez la colocation",
        "Utilisez les aides au logement",
        "Constituez 3 mois de charges d'épargne",
      ],
    },
    "26-35": {
      priority: "Projet immobilier",
      products: ["PEL", "Assurance-vie", "PEA"],
      target: "15-20% du salaire",
      tips: [
        "Préparez un apport immobilier",
        "Optimisez la fiscalité",
        "Explorez la banlieue bien desservie",
      ],
    },
    "36-45": {
      priority: "Constitution patrimoine",
      products: ["PER", "SCPI", "Assurance-vie"],
      target: "20-25% du salaire",
      tips: [
        "Maximisez la défiscalisation",
        "Anticipez les frais d'éducation",
        "Diversifiez les investissements",
      ],
    },
    "46-55": {
      priority: "Préparation retraite",
      products: ["PER", "SCPI", "Obligations"],
      target: "25-30% du salaire",
      tips: [
        "Intensifiez l'épargne retraite",
        "Réduisez les crédits",
        "Optimisez la transmission",
      ],
    },
    "55+": {
      priority: "Sécurisation patrimoine",
      products: ["Fonds euros", "SCPI", "Obligations"],
      target: "20% du salaire",
      tips: [
        "Sécurisez les placements",
        "Générez des revenus complémentaires",
        "Anticipez les besoins santé",
      ],
    },
  };

  return recommendations[ageRange] || recommendations["26-35"];
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (rate) => {
  return `${Math.round(rate * 100)}%`;
};

export const calculateSavingsProjection = (
  monthlySavings,
  years,
  annualReturn = 0.03,
  initialBalance = 0
) => {
  const monthlyReturn = annualReturn / 12;
  const months = years * 12;

  // Calcul avec intérêts composés
  const totalSaved = initialBalance + monthlySavings * months;
  const growth = Math.pow(1 + monthlyReturn, months);
  const totalWithInterest =
    initialBalance * growth +
    (monthlyReturn === 0
      ? monthlySavings * months
      : monthlySavings * ((growth - 1) / monthlyReturn));

  return {
    totalSaved,
    totalWithInterest,
    interestEarned: totalWithInterest - totalSaved,
  };
};

export const getSavingsAdvice = (
  currentRate,
  recommendedRate,
  disposableIncome
) => {
  const advice = [];

  if (currentRate < 0.05) {
    advice.push({
      type: "critical",
      message: "Taux d'épargne très faible",
      action: "Révisez votre budget en priorité",
    });
  } else if (currentRate < recommendedRate) {
    advice.push({
      type: "warning",
      message: "Taux d'épargne en dessous de la recommandation",
      action: "Optimisez vos dépenses non-essentielles",
    });
  } else {
    advice.push({
      type: "success",
      message: "Excellent taux d'épargne",
      action: "Continuez et diversifiez vos placements",
    });
  }

  if (disposableIncome < 0) {
    advice.push({
      type: "critical",
      message: "Budget déficitaire",
      action: "Réduisez vos charges ou augmentez vos revenus",
    });
  }

  return advice;
};

// Données de référence officielles (voir Sources.jsx pour les liens)

export const NAVIGO_MONTHLY = 90.8; // Forfait Navigo Mois toutes zones 2026 (IDFM)
export const EMPLOYER_TRANSPORT_SHARE = 0.5; // Prise en charge employeur obligatoire
export const FOOD_BASE = 350; // Hypothèse de l'application, personne seule
export const FOOD_PARTNER = 250; // Hypothèse : budget couple 600€
export const FOOD_PER_DEPENDENT = 200;

export const SAVINGS_RATE_BY_AGE = {
  "18-25": 0.12,
  "26-35": 0.17,
  "36-45": 0.22,
  "46-55": 0.27,
  "55+": 0.2,
};

export const LOCATION_LABELS = {
  "paris-intra": "Paris intra-muros",
  "petite-couronne": "Petite couronne",
  "grande-couronne": "Grande couronne",
};

// Loyers moyens hors charges au 1er janvier 2025 (OLAP, rapport 2025) :
// €/m² de l'ensemble des logements × surface moyenne par nombre de pièces
export const REFERENCE_RENTS = {
  "paris-intra": {
    studio: 730, // 30,4 €/m² × 24 m²
    t2: 1120, // 26,7 €/m² × 42 m²
    t3: 1605, // 25,1 €/m² × 64 m²
    t4: 2165, // 24,3 €/m² × 89 m²
  },
  "petite-couronne": {
    studio: 640, // 23,7 €/m² × 27 m²
    t2: 830, // 20,2 €/m² × 41 m²
    t3: 1110, // 17,9 €/m² × 62 m²
    t4: 1435, // 16,9 €/m² × 85 m²
  },
  "grande-couronne": {
    studio: 555, // 21,4 €/m² × 26 m²
    t2: 750, // 17,0 €/m² × 44 m²
    t3: 965, // 14,6 €/m² × 66 m²
    t4: 1190, // 14,0 €/m² × 85 m² (surface non diffusée, estimée)
  },
};

export const REFERENCE_SURFACES = { studio: 24, t2: 42, t3: 64, t4: 89 };
export const HOUSING_CHARGES = { studio: 40, t2: 60, t3: 80, t4: 100 };
export const HOUSING_INSURANCE = { studio: 12, t2: 15, t3: 18, t4: 20 };
export const OWNERSHIP_FACTOR = 0.7;

// Loyers des emménagés récents (OLAP, rapport 2025, tableau 13) : à utiliser
// pour simuler une nouvelle location, plus chère que la moyenne des baux en cours
export const MOVE_IN_RENTS = {
  "paris-intra": {
    studio: 775, // 32,3 €/m² × 24 m²
    t2: 1170, // 27,9 €/m² × 42 m²
    t3: 1740, // 27,2 €/m² × 64 m²
    t4: 2350, // 26,4 €/m² × 89 m²
  },
  "petite-couronne": {
    studio: 665, // 24,6 €/m² × 27 m²
    t2: 900, // 21,9 €/m² × 41 m²
    t3: 1220, // 19,7 €/m² × 62 m²
    t4: 1675, // 19,7 €/m² × 85 m²
  },
  "grande-couronne": {
    studio: 605, // 23,2 €/m² × 26 m²
    t2: 735, // 16,7 €/m² × 44 m²
    t3: 1080, // 16,4 €/m² × 66 m²
    t4: 1190, // non diffusé pour les emménagés récents : moyenne de l'ensemble des logements
  },
};

// Prix au m² des appartements anciens, ventes de novembre 2025 à janvier 2026
// (Notaires du Grand Paris, communiqué du 26 mars 2026)
export const PRICE_PER_SQM = {
  "paris-intra": 9570,
  "petite-couronne": 4910,
  "grande-couronne": 3190,
};

// Frais d'acquisition dans l'ancien en Île-de-France (Notaires du Grand Paris) :
// proches de 8 % depuis le passage du taux départemental à 5 % ; les
// primo-accédants restent à 4,5 %, soit environ 7,5 % (estimation)
export const ACQUISITION_FEES = 0.08;
export const ACQUISITION_FEES_FIRST_TIME = 0.075;

// Fin de l'expérimentation de l'encadrement des loyers (loi ELAN) : l'arrêté
// parisien de 2026 ne s'applique que jusqu'à cette date
export const RENT_CAP_END = "2026-11-24";

// Salaire net mensuel moyen en EQTP, secteur privé, 2024 (INSEE)
export const SALARY_BY_DEPARTMENT = {
  75: { name: "Paris", zone: "paris-intra", ensemble: 3836, cadres: 5663, intermediaires: 2842, employes: 2112, ouvriers: 2119 },
  92: { name: "Hauts-de-Seine", zone: "petite-couronne", ensemble: 4217, cadres: 5570, intermediaires: 2923, employes: 2084, ouvriers: 2067 },
  93: { name: "Seine-Saint-Denis", zone: "petite-couronne", ensemble: 3035, cadres: 5065, intermediaires: 2743, employes: 2110, ouvriers: 1994 },
  94: { name: "Val-de-Marne", zone: "petite-couronne", ensemble: 3028, cadres: 4847, intermediaires: 2800, employes: 2017, ouvriers: 2088 },
  77: { name: "Seine-et-Marne", zone: "grande-couronne", ensemble: 2572, cadres: 4328, intermediaires: 2728, employes: 1980, ouvriers: 2080 },
  78: { name: "Yvelines", zone: "grande-couronne", ensemble: 3238, cadres: 4928, intermediaires: 3127, employes: 1957, ouvriers: 2110 },
  91: { name: "Essonne", zone: "grande-couronne", ensemble: 2888, cadres: 4724, intermediaires: 2715, employes: 1989, ouvriers: 2072 },
  95: { name: "Val-d'Oise", zone: "grande-couronne", ensemble: 2644, cadres: 4658, intermediaires: 2702, employes: 1983, ouvriers: 2019 },
};
export const SALARY_IDF = { ensemble: 3479, cadres: 5363, intermediaires: 2839, employes: 2059, ouvriers: 2069 };
export const SALARY_FRANCE = { ensemble: 2733, cadres: 4629, intermediaires: 2633, employes: 1941, ouvriers: 2051 };

// Épargne réglementée au 1er août 2026 (Service-Public.fr)
export const REGULATED_PRODUCTS = {
  lep: { name: "LEP", rate: 0.025, ceiling: 10000 },
  livretA: { name: "Livret A", rate: 0.017, ceiling: 22950 },
  ldds: { name: "LDDS", rate: 0.017, ceiling: 12000 },
};
// Plafond de revenu fiscal de référence du LEP en 2026 : 23 028 € pour 1 part,
// + 6 149 € par demi-part supplémentaire
export const lepIncomeCeiling = (parts) => 23028 + 6149 * (parts - 1) * 2;

export const FLAT_TAX = 0.314; // Prélèvement forfaitaire unique 2026
export const MAX_DEBT_RATIO = 0.35; // HCSF
export const MAX_LOAN_YEARS = 25; // HCSF
export const DEFAULT_MORTGAGE_RATE = 3.3; // Banque de France, crédits nouveaux à l'habitat hors renégociations, juillet 2026

// Calcul du budget : utilisé par le formulaire et par le simulateur de scénarios
export const computeBudget = (values) => {
  const {
    salary,
    partnerSalary,
    ageRange,
    location,
    housingType,
    rent,
    isOwner,
    additionalExpenses,
    currentSavings,
    dependents,
  } = values;
  const employerRefund = values.employerRefund !== false;
  const isCouple = Boolean(values.isCouple && partnerSalary > 0);
  const adults = isCouple ? 2 : 1;
  const income = salary + (isCouple ? partnerSalary : 0);

  const navigoCost =
    NAVIGO_MONTHLY * (employerRefund ? 1 - EMPLOYER_TRANSPORT_SHARE : 1);
  const transportCost = navigoCost * adults;
  // Aucun montant officiel n'existe pour l'Île-de-France : l'utilisateur peut
  // saisir son propre budget, sinon on applique l'hypothèse de l'application
  const customFood = values.foodBudget != null;
  const foodCost = customFood
    ? values.foodBudget
    : FOOD_BASE +
      (isCouple ? FOOD_PARTNER : 0) +
      (dependents || 0) * FOOD_PER_DEPENDENT;

  let housingCost;
  let housingDetails = null;
  if (isOwner) {
    // Coût propriétaire = 70% du loyer équivalent + charges + assurance
    housingDetails = {
      equivalentRent: REFERENCE_RENTS[location]?.[housingType] || 800,
      ownershipFactor: OWNERSHIP_FACTOR,
      charges: HOUSING_CHARGES[housingType] || 60,
      insurance: HOUSING_INSURANCE[housingType] || 15,
    };
    housingCost =
      housingDetails.equivalentRent * OWNERSHIP_FACTOR +
      housingDetails.charges +
      housingDetails.insurance;
  } else {
    housingCost = rent || 0;
  }

  const totalExpenses =
    housingCost + transportCost + foodCost + (additionalExpenses || 0);
  const disposableIncome = income - totalExpenses;
  const recommendedSavingsRate = SAVINGS_RATE_BY_AGE[ageRange] || 0.15;
  const recommendedMonthlySavings = income * recommendedSavingsRate;

  const results = {
    monthlySalary: income,
    totalExpenses,
    disposableIncome,
    recommendedMonthlySavings,
    actualSavingsRate: Math.max(0, disposableIncome / income),
    recommendedSavingsRate,
    savingsGap: recommendedMonthlySavings - Math.max(0, disposableIncome),
    annualSavingsPotential: Math.max(0, disposableIncome) * 12,
    canSave: disposableIncome > 0,
    // Détail des calculs pour affichage
    breakdown: {
      housingCost: Math.round(housingCost),
      transportCost: Math.round(transportCost),
      foodCost: Math.round(foodCost),
      additionalExpenses: additionalExpenses || 0,
      isOwner,
      isCouple,
      employerRefund,
      customFood,
      housingDetails,
    },
  };

  const profile = {
    ageRange,
    location,
    housingType,
    isOwner,
    isCouple,
    salary,
    dependents,
    currentSavings: currentSavings || 0,
    inputs: values,
  };

  return { results, profile };
};

// Mensualité d'un prêt amortissable à taux fixe
export const loanMonthlyPayment = (principal, annualRatePercent, years) => {
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  if (principal <= 0) return 0;
  return r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
};

// Capital empruntable pour une mensualité donnée
export const borrowingCapacity = (payment, annualRatePercent, years) => {
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  return r === 0 ? payment * n : (payment * (1 - Math.pow(1 + r, -n))) / r;
};

// Nombre de mois pour atteindre un montant en épargnant chaque mois (sans intérêts)
export const monthsToReach = (target, current, monthlySavings) => {
  if (current >= target) return 0;
  if (monthlySavings <= 0) return Infinity;
  return Math.ceil((target - current) / monthlySavings);
};

export const formatDuration = (months) => {
  if (!Number.isFinite(months)) return "hors d'atteinte";
  if (months === 0) return "déjà atteint";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} mois`;
  return rest === 0 ? `${years} an${years > 1 ? "s" : ""}` : `${years} an${years > 1 ? "s" : ""} et ${rest} mois`;
};

// Scénario sauvegardé : lien partageable (hash de l'URL) et stockage local
const SCENARIO_KEY = "saveInParis.scenario";

export const encodeScenario = (values) =>
  btoa(encodeURIComponent(JSON.stringify(values)));

export const loadScenario = () => {
  try {
    const hash = new URLSearchParams(window.location.hash.slice(1)).get("s");
    if (hash) {
      return { values: JSON.parse(decodeURIComponent(atob(hash))), shared: true };
    }
    const stored = localStorage.getItem(SCENARIO_KEY);
    return stored ? { values: JSON.parse(stored), shared: false } : null;
  } catch {
    return null;
  }
};

export const saveScenario = (values) => {
  try {
    localStorage.setItem(SCENARIO_KEY, JSON.stringify(values));
  } catch {
    // stockage indisponible (navigation privée) : on ignore
  }
};

export const scenarioUrl = (values) =>
  `${window.location.origin}${window.location.pathname}#s=${encodeScenario(values)}`;
