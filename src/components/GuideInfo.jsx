import {
  Card,
  Typography,
  Row,
  Col,
  Divider,
  List,
  Tag,
  Alert,
  Statistic,
} from "antd";
import { WarningOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const GuideInfo = ({ section = "overview" }) => {
  // Guide data extracted from the markdown file
  const guideData = {
    overview: {
      budgetRule: {
        essential: 50, // 50% maximum pour dépenses essentielles
        personal: 30, // 30% maximum pour loisirs
        savings: 20, // 20% minimum pour épargne
      },
      averageCosts: {
        studioIntra: { min: 600, max: 1400 },
        t2Paris: { min: 1280, max: 1628 },
        charges: { min: 40, max: 120 },
        insurance: { min: 12, max: 25 },
      },
    },
    housing: {
      affordableArrondissements: [
        {
          district: "10e arrondissement",
          price: "dès 390€",
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
          savings: "-40%",
          description: "par rapport à Paris intra-muros",
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
      navigoAll: 88.8,
      navigo13: 82.8,
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
      cadres: 6044,
      intermediaires: 3210,
      employes: 2042,
      moyenne: 4313,
    },
    savings: {
      products: [
        { name: "Livret A", rate: "2,4%", type: "épargne de précaution" },
        { name: "LDDS", rate: "2,4%", type: "complément Livret A" },
        { name: "LEP", rate: "3,5%", type: "revenus modestes" },
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
      "Achats impulsifs (56% des Français vivent au-dessus de leurs moyens)",
      "Absence de suivi des dépenses réelles",
    ],
  };

  const renderOverview = () => (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Card title="📊 Règle Budgétaire 50/30/20" size="small">
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="Essentiel"
                value={guideData.overview.budgetRule.essential}
                suffix="% max"
                valueStyle={{ color: "#ff6b6b", fontSize: "18px" }}
              />
              <Text type="secondary" style={{ fontSize: "11px" }}>
                logement, transport, alimentation
              </Text>
            </Col>
            <Col span={8}>
              <Statistic
                title="Loisirs"
                value={guideData.overview.budgetRule.personal}
                suffix="% max"
                valueStyle={{ color: "#4ecdc4", fontSize: "18px" }}
              />
              <Text type="secondary" style={{ fontSize: "11px" }}>
                sorties, shopping, hobbies
              </Text>
            </Col>
            <Col span={8}>
              <Statistic
                title="Épargne"
                value={guideData.overview.budgetRule.savings}
                suffix="% min"
                valueStyle={{ color: "#45b7d1", fontSize: "18px" }}
              />
              <Text type="secondary" style={{ fontSize: "11px" }}>
                investissements, urgence
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card title="💰 Salaires Moyens Paris" size="small">
          <List size="small" split={false}>
            <List.Item>
              <Text strong>Cadres:</Text>{" "}
              <Text style={{ color: "#78dbff" }}>
                {guideData.salaries.cadres}€ nets/mois
              </Text>
            </List.Item>
            <List.Item>
              <Text strong>Intermédiaires:</Text>{" "}
              <Text style={{ color: "#78dbff" }}>
                {guideData.salaries.intermediaires}€ nets/mois
              </Text>
            </List.Item>
            <List.Item>
              <Text strong>Employés:</Text>{" "}
              <Text style={{ color: "#78dbff" }}>
                {guideData.salaries.employes}€ nets/mois
              </Text>
            </List.Item>
            <List.Item>
              <Text strong>Moyenne:</Text>{" "}
              <Text style={{ color: "#78dbff", fontWeight: "bold" }}>
                {guideData.salaries.moyenne}€ nets/mois
              </Text>
            </List.Item>
          </List>
        </Card>
      </Col>
    </Row>
  );

  const renderHousingGuide = () => (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Card title="🏠 Arrondissements Abordables" size="small">
          <List size="small">
            {guideData.housing.affordableArrondissements.map((area, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  title={
                    <Text style={{ color: "#78dbff" }}>{area.district}</Text>
                  }
                  description={
                    <>
                      <Tag color="green">{area.price}</Tag>
                      <Text type="secondary">{area.highlight}</Text>
                    </>
                  }
                />
              </List.Item>
            ))}
          </List>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card title="🚇 Alternatives Banlieue" size="small">
          <List size="small">
            {guideData.housing.suburbs.map((suburb, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  title={
                    <Text style={{ color: "#78dbff" }}>{suburb.name}</Text>
                  }
                  description={
                    <>
                      <Tag color="blue">{suburb.savings}</Tag>
                      <Text type="secondary">{suburb.description}</Text>
                    </>
                  }
                />
              </List.Item>
            ))}
          </List>
        </Card>
      </Col>
    </Row>
  );

  const renderTransportGuide = () => (
    <Card title="🚇 Optimisation Transport" size="small">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Paragraph>
            <Text strong>Pass Navigo toutes zones:</Text>{" "}
            <Text style={{ color: "#78dbff" }}>
              {guideData.transport.navigoAll}€/mois
            </Text>
          </Paragraph>
          <Paragraph>
            <Text strong>Pass Navigo zones 1-3:</Text>{" "}
            <Text style={{ color: "#78dbff" }}>
              {guideData.transport.navigo13}€/mois
            </Text>
          </Paragraph>
          <Alert
            message="Remboursement employeur: 50% minimum"
            type="info"
            showIcon
            size="small"
            style={{ marginBottom: 12 }}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Text strong style={{ color: "#78dbff" }}>
            Alternatives économiques:
          </Text>
          <List size="small">
            {guideData.transport.alternatives.map((alt, index) => (
              <List.Item key={index} style={{ padding: "4px 0" }}>
                <Text>{alt.option}: </Text>
                <Tag color="green">{alt.cost}</Tag>
                <Text type="secondary">{alt.benefit}</Text>
              </List.Item>
            ))}
          </List>
        </Col>
      </Row>
    </Card>
  );

  const renderFoodGuide = () => (
    <Card title="🛒 Budget Alimentation Optimisé" size="small">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Title level={5} style={{ color: "#78dbff", margin: "8px 0" }}>
            Budgets par profil:
          </Title>
          <List size="small">
            <List.Item>
              <Text>Personne seule: </Text>
              <Tag color="orange">{guideData.food.budgets.single.normal}€</Tag>
              <Text> → </Text>
              <Tag color="green">
                {guideData.food.budgets.single.optimized}€
              </Tag>
            </List.Item>
            <List.Item>
              <Text>Couple: </Text>
              <Tag color="orange">{guideData.food.budgets.couple.normal}€</Tag>
              <Text> → </Text>
              <Tag color="green">
                {guideData.food.budgets.couple.optimized}€
              </Tag>
            </List.Item>
            <List.Item>
              <Text>Famille de 4: </Text>
              <Tag color="orange">{guideData.food.budgets.family4.normal}€</Tag>
              <Text> → </Text>
              <Tag color="green">
                {guideData.food.budgets.family4.optimized}€
              </Tag>
            </List.Item>
          </List>
        </Col>
        <Col xs={24} sm={12}>
          <Title level={5} style={{ color: "#78dbff", margin: "8px 0" }}>
            Stratégies d&apos;économie:
          </Title>
          <List size="small">
            {guideData.food.strategies.map((strategy, index) => (
              <List.Item key={index} style={{ padding: "2px 0" }}>
                <CheckCircleOutlined
                  style={{ color: "#52c41a", marginRight: 4 }}
                />
                <Text style={{ fontSize: "12px" }}>{strategy}</Text>
              </List.Item>
            ))}
          </List>
        </Col>
      </Row>
    </Card>
  );

  const renderSavingsGuide = () => (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Card title="💎 Produits d'Épargne Recommandés" size="small">
          <List size="small">
            {guideData.savings.products.map((product, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  title={
                    <span>
                      <Text style={{ color: "#78dbff" }}>{product.name}</Text>
                      <Tag color="blue" style={{ marginLeft: 8 }}>
                        {product.rate}
                      </Tag>
                    </span>
                  }
                  description={<Text type="secondary">{product.type}</Text>}
                />
              </List.Item>
            ))}
          </List>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card title="🎯 Objectifs par Profil" size="small">
          <Row gutter={8}>
            <Col span={8}>
              <Statistic
                title="Débutant"
                value={`${guideData.savings.targets.beginner.min}-${guideData.savings.targets.beginner.max}`}
                suffix="%"
                valueStyle={{ color: "#ffa726", fontSize: "16px" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Expérimenté"
                value={`${guideData.savings.targets.experienced.min}-${guideData.savings.targets.experienced.max}`}
                suffix="%"
                valueStyle={{ color: "#66bb6a", fontSize: "16px" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Investisseur"
                value={`${guideData.savings.targets.investor.min}-${guideData.savings.targets.investor.max}`}
                suffix="%"
                valueStyle={{ color: "#42a5f5", fontSize: "16px" }}
              />
            </Col>
          </Row>
          <Divider style={{ margin: "12px 0" }} />
          <Alert
            message="Épargne automatique recommandée dès réception du salaire"
            type="success"
            showIcon
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );

  const renderWarnings = () => (
    <Card title="⚠️ Erreurs à Éviter" size="small">
      <List size="small">
        {guideData.warnings.map((warning, index) => (
          <List.Item key={index} style={{ padding: "4px 0" }}>
            <WarningOutlined style={{ color: "#ff7875", marginRight: 8 }} />
            <Text style={{ fontSize: "13px" }}>{warning}</Text>
          </List.Item>
        ))}
      </List>
      <Alert
        message="56% des Français vivent au-dessus de leurs moyens"
        description="Importance du suivi budgétaire régulier"
        type="warning"
        showIcon
        size="small"
        style={{ marginTop: 12 }}
      />
    </Card>
  );

  // Render different sections based on the section prop
  switch (section) {
    case "overview":
      return <div style={{ marginBottom: 24 }}>{renderOverview()}</div>;
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
    case "complete":
      return (
        <div>
          <Title
            level={3}
            style={{ color: "#78dbff", textAlign: "center", marginBottom: 24 }}
          >
            📖 Guide Complet d&apos;Épargne à Paris
          </Title>
          {renderOverview()}
          <Divider />
          {renderHousingGuide()}
          <Divider />
          {renderTransportGuide()}
          <Divider />
          {renderFoodGuide()}
          <Divider />
          {renderSavingsGuide()}
          <Divider />
          {renderWarnings()}
        </div>
      );
    default:
      return renderOverview();
  }
};

export default GuideInfo;
