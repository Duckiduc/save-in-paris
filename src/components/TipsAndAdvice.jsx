import { Check, House, PiggyBank, TrainFront } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/shared";

const TipList = ({ tips }) => (
  <ul className="flex flex-col gap-1.5">
    {tips.map((tip) => (
      <li key={tip} className="flex items-start gap-2">
        <Check className="mt-0.5 size-4 shrink-0 text-success" />
        {tip}
      </li>
    ))}
  </ul>
);

const TipsAndAdvice = ({ userProfile, results }) => {
  const getAgeSpecificAdvice = (ageRange) => {
    const adviceMap = {
      "18-25": {
        title: "Conseils pour les 18-25 ans",
        tips: [
          "Privilégiez la colocation pour réduire les coûts de logement",
          "Constituez d'abord une épargne de précaution (3 mois de charges)",
          "Profitez des aides au logement (APL, ALS)",
          "Utilisez les transports en commun avec la carte Imagine R",
          "Explorez les bons plans étudiants et jeunes actifs",
        ],
        savingsTarget: "10-15% du salaire net",
        priority: "Épargne de précaution",
      },
      "26-35": {
        title: "Conseils pour les 26-35 ans",
        tips: [
          "Préparez un apport pour l'achat immobilier (10-20%)",
          "Optimisez vos impôts avec un PEA ou assurance-vie",
          "Négociez votre salaire et vos avantages en nature",
          "Considérez l'achat en banlieue bien desservie",
          "Diversifiez vos placements progressivement",
        ],
        savingsTarget: "15-20% du salaire net",
        priority: "Projet immobilier",
      },
      "36-45": {
        title: "Conseils pour les 36-45 ans",
        tips: [
          "Maximisez vos dispositifs de défiscalisation",
          "Anticipez les frais de scolarité des enfants",
          "Investissez dans l'immobilier locatif si possible",
          "Réévaluez votre assurance-vie régulièrement",
          "Préparez votre retraite avec un PER",
        ],
        savingsTarget: "20-25% du salaire net",
        priority: "Constitution du patrimoine",
      },
      "46-55": {
        title: "Conseils pour les 46-55 ans",
        tips: [
          "Intensifiez votre épargne retraite",
          "Explorez les investissements SCPI",
          "Optimisez la transmission de votre patrimoine",
          "Réduisez vos crédits avant la retraite",
          "Diversifiez géographiquement vos investissements",
        ],
        savingsTarget: "25-30% du salaire net",
        priority: "Préparation retraite",
      },
      "55+": {
        title: "Conseils pour les 55 ans et plus",
        tips: [
          "Sécurisez vos placements (fonds euros)",
          "Générez des revenus complémentaires",
          "Optimisez votre fiscalité avant la retraite",
          "Anticipez vos besoins en santé",
          "Préparez la transmission de vos biens",
        ],
        savingsTarget: "20% du salaire net",
        priority: "Sécurisation du patrimoine",
      },
    };

    return adviceMap[ageRange] || adviceMap["26-35"];
  };

  const getLocationSpecificTips = (location) => {
    const locationTips = {
      "paris-intra": [
        "Explorez les arrondissements moins chers (10e, 19e, 20e)",
        "Privilégiez le vélo pour économiser sur les transports",
        "Profitez des marchés de fin de journée pour l'alimentation",
        "Négociez les frais d'agence immobilière",
      ],
      "petite-couronne": [
        "Optimisez vos trajets domicile-travail",
        "Profitez du meilleur rapport qualité-prix",
        "Explorez les zones en développement (prix en hausse)",
        "Considérez l'achat si vous êtes locataire",
      ],
      "grande-couronne": [
        "Budgetez les coûts de transport supplémentaires",
        "Profitez de l'espace pour du télétravail",
        "Explorez les opportunités d'investissement local",
        "Optimisez vos déplacements (covoiturage, télétravail)",
      ],
    };

    return locationTips[location] || locationTips["paris-intra"];
  };

  const getFinancialWarnings = (results) => {
    const warnings = [];

    if (!results?.canSave) {
      warnings.push({
        tone: "error",
        message: "Attention : Vos dépenses dépassent vos revenus",
        advice: "Réduisez vos charges ou augmentez vos revenus en priorité",
      });
    }

    if (results?.actualSavingsRate < 0.1) {
      warnings.push({
        tone: "warning",
        message: "Taux d'épargne faible (moins de 10%)",
        advice:
          "Analysez vos dépenses non-essentielles et optimisez votre budget",
      });
    }

    if (results?.savingsGap > 500) {
      warnings.push({
        tone: "info",
        message: "Écart important avec l'objectif d'épargne",
        advice:
          "Considérez un changement de logement ou une augmentation de revenus",
      });
    }

    return warnings;
  };

  const generalTips = [
    {
      category: "Logement",
      icon: House,
      tips: [
        "Le logement ne devrait pas dépasser 33% de vos revenus",
        "Négociez votre loyer lors du renouvellement",
        "Optimisez vos charges (électricité, internet, assurances)",
        "Considérez la colocation pour réduire les coûts",
      ],
    },
    {
      category: "Transport",
      icon: TrainFront,
      tips: [
        "Profitez du remboursement employeur (50% minimum)",
        "Combinez vélo et transports en commun",
        "Évitez les frais de parking en centre-ville",
        "Utilisez les applications de mobilité partagée",
      ],
    },
    {
      category: "Épargne",
      icon: PiggyBank,
      tips: [
        "Automatisez vos virements d'épargne",
        "Diversifiez vos placements selon votre âge",
        "Profitez des enveloppes fiscales (PEA, assurance-vie)",
        "Réévaluez vos objectifs chaque année",
      ],
    },
  ];

  const ageAdvice = userProfile
    ? getAgeSpecificAdvice(userProfile.ageRange)
    : null;
  const locationTips = userProfile
    ? getLocationSpecificTips(userProfile.location)
    : [];
  const warnings = results ? getFinancialWarnings(results) : [];

  return (
    <div className="flex flex-col gap-4">
      {warnings.map((warning) => (
        <Notice key={warning.message} tone={warning.tone} title={warning.message}>
          {warning.advice}
        </Notice>
      ))}

      <Accordion
        type="multiple"
        defaultValue={ageAdvice ? ["age"] : ["general-0"]}
      >
        {ageAdvice && (
          <AccordionItem value="age">
            <AccordionTrigger>{ageAdvice.title}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  Objectif : {ageAdvice.savingsTarget}
                </Badge>
                <Badge variant="secondary">
                  Priorité : {ageAdvice.priority}
                </Badge>
              </div>
              <TipList tips={ageAdvice.tips} />
            </AccordionContent>
          </AccordionItem>
        )}
        {locationTips.length > 0 && (
          <AccordionItem value="zone">
            <AccordionTrigger>Conseils pour votre zone</AccordionTrigger>
            <AccordionContent>
              <TipList tips={locationTips} />
            </AccordionContent>
          </AccordionItem>
        )}
        {generalTips.map(({ category, icon: Icon, tips }, index) => (
          <AccordionItem key={category} value={`general-${index}`}>
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <Icon className="size-4 text-muted-foreground" />
                {category}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <TipList tips={tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TipsAndAdvice;
