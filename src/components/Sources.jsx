import { Modal, Typography, Collapse, Button, Space, Tag } from 'antd';
import { BookOutlined, LinkOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text, Link } = Typography;

const Sources = ({ visible, onClose }) => {
  const sourcesData = [
    {
      key: 'cost-of-living',
      title: '💰 Coût de la Vie et Budget à Paris',
      sources: [
        { id: '^1_1', title: 'Budget étudiant Paris 2024', url: 'https://www.studely.com/fr/article/quel-budget-etudiant-pour-vivre-a-paris-en-2024/', provider: 'Studely' },
        { id: '^1_2', title: 'Coût de la vie Paris', url: 'https://www.combien-coute.net/cout-de-la-vie/ile-de-france/paris/', provider: 'Combien Coûte' },
        { id: '^1_3', title: 'Coût de la vie France 2024', url: 'https://www.studapart.com/fr/nos-astuces/quel-est-le-cout-de-la-vie-en-france-en-2024', provider: 'Studapart' },
        { id: '^1_4', title: 'Coût de la vie Paris - Tarifs actuels', url: 'https://www.demenagement24.com/blog/conseils/cout-de-la-vie-a-paris-tarifs-actuels/', provider: 'Déménagement24' },
        { id: '^1_32', title: 'Coût de la vie France 2024', url: 'https://www.riamoneytransfer.com/fr/blog/cout-de-la-vie-en-france-en-2024-paris-marseille-lyon-nice/', provider: 'RiaMoney' },
        { id: '^1_33', title: 'Coût vie étudiante 2024', url: 'https://www.lafinancepourtous.com/2024/09/05/cout-de-la-vie-etudiante-la-rentree-2024-encore-synonyme-de-hausse/', provider: 'LaFinancePourTous' },
      ]
    },
    {
      key: 'real-estate',
      title: '🏠 Immobilier et Logement Paris',
      sources: [
        { id: '^1_5', title: 'Prix loyer Paris', url: 'https://www.studapart.com/fr/proprietaires/guides-proprietaires/prix-loyer-paris', provider: 'Studapart' },
        { id: '^1_7', title: 'Location appartement Paris 2025', url: 'https://fr.parisrental.com/blog/tout-sur-la-location-meublee/le-cout-de-la-location-dun-appartement-a-paris-en-2025', provider: 'Paris Rental' },
        { id: '^1_9', title: 'Prix immobilier Paris', url: 'https://immobilier.lefigaro.fr/prix-immobilier/paris/ville-75056', provider: 'Le Figaro' },
        { id: '^1_10', title: 'Prix immobilier Île-de-France', url: 'https://www.seloger.com/prix-de-l-immo/vente/ile-de-france/paris.htm', provider: 'SeLoger' },
        { id: '^2_18', title: 'Prix immobilier Paris', url: 'https://www.meilleursagents.com/prix-immobilier/paris-75000/', provider: 'MeilleursAgents' },
        { id: '^1_34', title: 'Prix mètre carré Paris', url: 'https://www.hosman.co/blog/paris-prix-metre-carre', provider: 'Hosman' },
      ]
    },
    {
      key: 'salaries',
      title: '💼 Salaires et Revenus',
      sources: [
        { id: '^1_6', title: 'Salaire Paris', url: 'https://www.journaldunet.com/business/salaire/paris/departement-75', provider: 'Journal du Net' },
        { id: '^1_8', title: 'Salaire moyen région 2024', url: 'https://www.helloworkplace.fr/salaire-moyen-region-2024/', provider: 'HelloWorkplace' },
        { id: '^2_3', title: 'Salaire moyen France', url: 'https://www.hellowork.com/fr-fr/medias/salaire-moyen-france-secteurs-regions-metiers.html', provider: 'HelloWork' },
        { id: '^2_7', title: 'Salaire moyen France 2024', url: 'https://newsentreprises.com/salaire-moyen-france-2024/', provider: 'News Entreprises' },
        { id: '^2_9', title: 'Salaire Île-de-France', url: 'https://www.journaldunet.com/business/salaire/ile-de-france/region-11', provider: 'Journal du Net' },
        { id: '^2_10', title: 'Salaire moyen France', url: 'https://early.app/fr/salaire-moyen/france/', provider: 'Early App' },
      ]
    },
    {
      key: 'transport',
      title: '🚊 Transport et Mobilité',
      sources: [
        { id: '^1_24', title: 'Titres et tarifs', url: 'https://www.iledefrance-mobilites.fr/titres-et-tarifs', provider: 'IDF Mobilités' },
        { id: '^1_25', title: 'Forfait Navigo mensuel', url: 'https://www.iledefrance-mobilites.fr/titres-et-tarifs/detail/forfait-navigo-mois', provider: 'IDF Mobilités' },
        { id: '^1_26', title: 'Forfait Navigo annuel', url: 'https://www.iledefrance-mobilites.fr/titres-et-tarifs/detail/forfait-navigo-annuel', provider: 'IDF Mobilités' },
        { id: '^1_27', title: 'Pass Navigo guide', url: 'https://www.capital.fr/conso/pass-navigo-demarche-forfait-et-prix-1476764', provider: 'Capital' },
        { id: '^1_29', title: 'Meilleurs transports Paris', url: 'https://blog.ridemotto.com/meilleurs-moyens-transport-paris/', provider: 'RideMotto' },
      ]
    },
    {
      key: 'savings',
      title: '💰 Épargne et Comportements Financiers',
      sources: [
        { id: '^1_37', title: 'Épargne ménages Q2 2024', url: 'https://www.banque-france.fr/fr/statistiques/epargne/epargne-des-menages-2024-q2', provider: 'Banque de France' },
        { id: '^1_17', title: 'Taux épargne français 2024', url: 'https://www.lafinancepourtous.com/2025/06/04/le-taux-depargne-des-francais-atteint-18-fin-2024/', provider: 'LaFinancePourTous' },
        { id: '^1_16', title: 'Épargne ménages faits et chiffres', url: 'https://www.fbf.fr/fr/lepargne-des-menages-faits-et-chiffres-cles/', provider: 'FBF' },
        { id: '^1_18', title: 'Épargne moyenne français', url: 'https://www.ramify.fr/epargne/epargne-moyenne-des-francais', provider: 'Ramify' },
        { id: '^2_22', title: 'Taux épargne ménages France', url: 'https://www.clubpatrimoine.com/contenus/graph-taux-epargne-menages-france', provider: 'Club Patrimoine' },
        { id: '^2_23', title: 'Bilan épargne 2024', url: 'https://www.lassuranceenmouvement.com/2024/11/14/la-france-un-peuple-depargnants-bilan-2024/', provider: 'L\'Assurance en Mouvement' },
      ]
    },
    {
      key: 'generations',
      title: '👥 Comportements par Génération',
      sources: [
        { id: '^2_4', title: 'Comportement financier Gen Z', url: 'https://business-cool.com/decryptage/analyse/generation-z-quel-est-leur-comportement-financier/', provider: 'Business Cool' },
        { id: '^2_6', title: 'Habitudes dépense épargne Gen Z', url: 'https://www.forbes.fr/business/les-habitudes-de-depense-et-depargne-de-la-generation-z-et-leur-effet-sur-les-services-financiers/', provider: 'Forbes' },
        { id: '^2_11', title: 'Stratégies placement Millennials', url: 'https://mylittlemoney.com/2017/11/22/epargne-les-droles-de-strategies-de-placement-des-millennials/', provider: 'MyLittleMoney' },
        { id: '^2_17', title: 'Millennials meilleurs épargnants', url: 'https://www.mysweetimmo.com/2023/02/27/epargne-les-millenials-sont-les-meilleurs-epargnants-de-france-toutes-generations-confondues/', provider: 'MySweetImmo' },
        { id: '^2_15', title: 'Génération X inquiétudes retraite', url: 'https://www.im.natixis.com/fr-fr/about/newsroom/press-releases/2024/pres-du-tiers-des-membres-de-la-generation-x-s-inquiete-de-ne-pas-pouvoir-prendre-sa-retraite', provider: 'Natixis' },
      ]
    },
    {
      key: 'insee',
      title: '📊 Données Statistiques INSEE',
      sources: [
        { id: '^2_5', title: 'Statistiques revenus patrimoine', url: 'https://www.insee.fr/fr/statistiques/5650198', provider: 'INSEE' },
        { id: '^2_30', title: 'Outil interactif économie', url: 'https://www.insee.fr/fr/outil-interactif/5367857/details/10_ECC/11_ECO/11E_Figure5', provider: 'INSEE' },
        { id: '^2_32', title: 'Statistiques épargne 2024', url: 'https://www.insee.fr/fr/statistiques/7457170', provider: 'INSEE' },
      ]
    },
    {
      key: 'studies',
      title: '📈 Études et Baromètres',
      sources: [
        { id: '^2_31', title: 'Baromètre épargne 2024', url: 'https://www.ifop.com/publication/barometre-2024-de-lepargne-en-france-et-en-regions/', provider: 'IFOP' },
        { id: '^2_2', title: 'Baromètre Hauts-de-France', url: 'https://www.altaprofits.com/documentation/pdf/ESPACEPRESSE/septembre2024/CP-IFOP-Altaprofits-Barometre2024-Hauts-de-France.pdf', provider: 'Altaprofits' },
        { id: '^2_33', title: 'Gen X Report', url: 'https://www.im.natixis.com/fr-fr/insights/investor-sentiment/2024/gen-x-report', provider: 'Natixis' },
        { id: '^2_34', title: 'Épargne ou style de vie', url: 'https://blog.yomoni.fr/epargne-ou-style-de-vie/', provider: 'Yomoni' },
      ]
    }
  ];

  const renderSourceLink = (source) => (
    <div key={source.id} style={{ marginBottom: '8px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
      <Space>
        <Tag color="blue" style={{ fontSize: '11px', minWidth: '45px', textAlign: 'center' }}>
          {source.id}
        </Tag>
        <Text strong style={{ color: 'rgba(255,255,255,0.9)' }}>{source.provider}</Text>
      </Space>
      <div style={{ marginTop: '4px' }}>
        <Link 
          href={source.url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#78dbff', fontSize: '13px' }}
        >
          <LinkOutlined style={{ marginRight: '4px' }} />
          {source.title}
        </Link>
      </div>
    </div>
  );

  return (
    <Modal
      title={
        <Space>
          <BookOutlined style={{ color: '#78dbff' }} />
          <span style={{ color: '#ffffff' }}>Sources et Références</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Fermer
        </Button>
      ]}
      style={{ top: 20 }}
      styles={{
        mask: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        content: { 
          backgroundColor: 'rgba(10, 11, 13, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(120, 219, 255, 0.2)'
        },
        header: {
          backgroundColor: 'transparent',
          borderBottom: '1px solid rgba(120, 219, 255, 0.2)',
          paddingBottom: '16px'
        },
        body: { 
          backgroundColor: 'transparent',
          maxHeight: '70vh',
          overflowY: 'auto'
        },
        footer: {
          backgroundColor: 'transparent',
          borderTop: '1px solid rgba(120, 219, 255, 0.2)'
        }
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '16px' }}>
          <ExclamationCircleOutlined style={{ color: '#78dbff', marginRight: '8px' }} />
          Cette application s&apos;appuie sur des données provenant de sources fiables et reconnues pour fournir 
          des estimations réalistes du coût de la vie parisien et des comportements d&apos;épargne.
        </Paragraph>
      </div>
      
      <Collapse 
        ghost
        style={{ backgroundColor: 'transparent' }}
        items={sourcesData.map(category => ({
          key: category.key,
          label: <Text strong style={{ color: '#ffffff', fontSize: '15px' }}>{category.title}</Text>,
          children: (
            <div>
              {category.sources.map(renderSourceLink)}
            </div>
          ),
          style: {
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderRadius: '8px',
            marginBottom: '8px',
            border: '1px solid rgba(120, 219, 255, 0.1)'
          }
        }))}
      />
      
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(120, 219, 255, 0.1)', borderRadius: '8px', border: '1px solid rgba(120, 219, 255, 0.2)' }}>
        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', lineHeight: '1.6' }}>
          <strong>Note importante :</strong> Toutes les données utilisées dans cette application proviennent de sources publiques et officielles. 
          Les calculs et recommandations sont basés sur ces références mais ne constituent pas des conseils financiers personnalisés. 
          Pour des décisions financières importantes, consultez toujours un professionnel agréé.
        </Text>
      </div>
    </Modal>
  );
};

export default Sources;
