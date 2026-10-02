import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Notice, Stat } from "@/components/shared";
import { formatCurrency } from "../utils/financialUtils";

const Panel = ({ title, children }) => (
  <div className="flex flex-col gap-3 rounded-lg border p-4">
    <span className="text-sm font-medium">{title}</span>
    {children}
  </div>
);

const Row = ({ label, children }) => (
  <li className="flex items-center justify-between gap-3 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="flex items-center gap-1.5 font-medium tabular-nums">
      {children}
    </span>
  </li>
);

const GuideInfo = ({ section = "overview" }) => {
  // Guide data extracted from the markdown file
  const guideData = {
    overview: {
      budgetRule: {
        essential: 50, // 50% maximum pour dépenses essentielles
        personal: 30, // 30% maximum pour loisirs
        savings: 20, // 20% minimum pour épargne
      },
    },
    housing: {
      affordableArrondissements: [
        {
          district: "10e arrondissement",
          price: "petites surfaces",
          highlight: "studios abordables",
        },
        {
          district: "19e arrondissement",
          price: "excellent rapport qualité/prix",
          highlight: "résidentiel",
        },
        {
          district: "20e arrondissement",
          price: "quartiers en développement",
          highlight: "potentiel",
        },
        {
          district: "12e arrondissement",
          price: "résidentiel et accessible",
          highlight: "calme",
        },
      ],
      suburbs: [
        {
          name: "Montreuil",
          savings: "-27% au m²",
          description: "loyer moyen en petite couronne par rapport à Paris (OLAP)",
        },
        {
          name: "Saint-Denis",
          savings: "très abordable",
          description: "logements économiques",
        },
        {
          name: "Pantin",
          savings: "créatif",
          description: "quartiers en expansion",
        },
        {
          name: "Aubervilliers",
          savings: "excellente connexion",
          description: "transport optimisé",
        },
      ],
    },
    transport: {
      navigoAll: "90,80",
      navigo23: "88,80",
      employerRefund: 50, // percentage
      alternatives: [
        {
          option: "Vélo/trottinette",
          cost: "30-50€/mois",
          benefit: "amortissement rapide",
        },
        { option: "Marche à pied", cost: "gratuit", benefit: "zones denses" },
      ],
    },
    food: {
      budgets: {
        single: { normal: 350, optimized: 275 },
        couple: { normal: 600, optimized: 480 },
        family4: { normal: 1000, optimized: 750 },
      },
      strategies: [
        "Marchés de fin de journée (-30%)",
        "Magasins hard-discount (Lidl, Aldi)",
        "Applications anti-gaspillage (Too Good To Go)",
        "Produits de saison (-30%)",
        "Préparation maison (-40% vs restaurants)",
      ],
    },
    salaries: {
      // Salaire net mensuel moyen en EQTP à Paris, secteur privé (INSEE, 2024)
      cadres: 5663,
      intermediaires: 2842,
      employes: 2112,
      moyenne: 3836,
    },
    savings: {
      products: [
        { name: "Livret A", rate: "1,7%", type: "épargne de précaution" },
        { name: "LDDS", rate: "1,7%", type: "complément Livret A" },
        { name: "LEP", rate: "2,5%", type: "revenus modestes" },
        { name: "Assurance-vie", rate: "variable", type: "moyen/long terme" },
        { name: "PEA", rate: "variable", type: "actions européennes" },
      ],
      targets: {
        beginner: { min: 5, max: 10 },
        experienced: { min: 15, max: 20 },
        investor: { min: 25, max: 35 },
      },
    },
    warnings: [
      "Sous-estimer les charges (copropriété, chauffage, internet)",
      "Négliger l'assurance habitation obligatoire",
      "Surévaluer sa capacité sans prévoir les imprévus",
      "Oublier les frais annexes (déménagement, caution)",
      "Achats impulsifs",
      "Absence de suivi des dépenses réelles",
    ],
  };

  const { overview, housing, transport, food, salaries, savings, warnings } =
    guideData;

  const renderOverview = () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel title="Règle budgétaire 50/30/20">
        <div className="grid grid-cols-3 gap-3">
          <Stat
            label="Essentiel"
            value={`${overview.budgetRule.essential}% max`}
            hint="logement, transport, alimentation"
          />
          <Stat
            label="Loisirs"
            value={`${overview.budgetRule.personal}% max`}
            hint="sorties, shopping"
          />
          <Stat
            label="Épargne"
            value={`${overview.budgetRule.savings}% min`}
            hint="placements, précaution"
          />
        </div>
      </Panel>
      <Panel title="Salaires nets moyens à Paris (INSEE, 2024)">
        <ul className="flex flex-col gap-1.5">
          <Row label="Cadres">{formatCurrency(salaries.cadres)}</Row>
          <Row label="Professions intermédiaires">
            {formatCurrency(salaries.intermediaires)}
          </Row>
          <Row label="Employés">{formatCurrency(salaries.employes)}</Row>
          <Row label="Ensemble">{formatCurrency(salaries.moyenne)}</Row>
        </ul>
      </Panel>
    </div>
  );

  const renderHousingGuide = () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel title="Arrondissements abordables">
        <ul className="flex flex-col gap-2">
          {housing.affordableArrondissements.map((area) => (
            <li key={area.district} className="flex flex-col text-sm">
              <span className="font-medium">{area.district}</span>
              <span className="text-muted-foreground">
                {area.price}, {area.highlight}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Alternatives en banlieue">
        <ul className="flex flex-col gap-2">
          {housing.suburbs.map((suburb) => (
            <li key={suburb.name} className="flex flex-col text-sm">
              <span className="flex items-center gap-2 font-medium">
                {suburb.name}
                <Badge variant="secondary">{suburb.savings}</Badge>
              </span>
              <span className="text-muted-foreground">
                {suburb.description}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );

  const renderTransportGuide = () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel title="Forfait Navigo">
        <ul className="flex flex-col gap-1.5">
          <Row label="Toutes zones">{transport.navigoAll}€/mois</Row>
          <Row label="Zones 2-3">{transport.navigo23}€/mois</Row>
        </ul>
        <Notice
          title={`Prise en charge employeur : ${transport.employerRefund}% minimum`}
        />
      </Panel>
      <Panel title="Alternatives économiques">
        <ul className="flex flex-col gap-2">
          {transport.alternatives.map((alt) => (
            <li key={alt.option} className="flex flex-col text-sm">
              <span className="flex items-center gap-2 font-medium">
                {alt.option}
                <Badge variant="secondary">{alt.cost}</Badge>
              </span>
              <span className="text-muted-foreground">{alt.benefit}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );

  const renderFoodGuide = () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel title="Budget mensuel : habituel, puis optimisé">
        <ul className="flex flex-col gap-1.5">
          {[
            ["Personne seule", food.budgets.single],
            ["Couple", food.budgets.couple],
            ["Famille de 4", food.budgets.family4],
          ].map(([label, budget]) => (
            <Row key={label} label={label}>
              {budget.normal}€
              <ArrowRight className="size-3.5 text-muted-foreground" />
              <span className="text-success">{budget.optimized}€</span>
            </Row>
          ))}
        </ul>
      </Panel>
      <Panel title="Stratégies d'économie">
        <ul className="flex flex-col gap-1.5">
          {food.strategies.map((strategy) => (
            <li key={strategy} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              {strategy}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );

  const renderSavingsGuide = () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel title="Produits d'épargne">
        <ul className="flex flex-col gap-2">
          {savings.products.map((product) => (
            <li key={product.name} className="flex flex-col text-sm">
              <span className="flex items-center gap-2 font-medium">
                {product.name}
                <Badge variant="secondary">{product.rate}</Badge>
              </span>
              <span className="text-muted-foreground">{product.type}</span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Objectifs d'épargne par profil">
        <div className="grid grid-cols-3 gap-3">
          <Stat
            label="Débutant"
            value={`${savings.targets.beginner.min}-${savings.targets.beginner.max}%`}
          />
          <Stat
            label="Expérimenté"
            value={`${savings.targets.experienced.min}-${savings.targets.experienced.max}%`}
          />
          <Stat
            label="Investisseur"
            value={`${savings.targets.investor.min}-${savings.targets.investor.max}%`}
          />
        </div>
        <Notice
          tone="success"
          title="Épargne automatique conseillée dès réception du salaire"
        />
      </Panel>
    </div>
  );

  const renderWarnings = () => (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {warnings.map((warning) => (
          <li key={warning} className="flex items-start gap-2 text-sm">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" />
            {warning}
          </li>
        ))}
      </ul>
      <Notice title="Épargne de précaution conseillée : 3 à 6 mois de revenus">
        Repère de la Banque de France (Mes questions d&apos;argent)
      </Notice>
    </div>
  );

  switch (section) {
    case "housing":
      return renderHousingGuide();
    case "transport":
      return renderTransportGuide();
    case "food":
      return renderFoodGuide();
    case "savings":
      return renderSavingsGuide();
    case "warnings":
      return renderWarnings();
    default:
      return renderOverview();
  }
};

export default GuideInfo;
