import { ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sources officielles ou institutionnelles uniquement — vérifiées le 1er octobre 2026
const sourcesData = [
  {
    key: 'transport',
    title: 'Transport et Mobilité',
    sources: [
      { id: 'idfm-navigo-mois', date: '2026', title: 'Guide tarifaire — forfaits Navigo et tickets au 1er janvier 2026', figure: 'Navigo Mois : 90,80 € toutes zones, 88,80 € zones 2-3, 86,40 € zones 3-4, 84,40 € zones 4-5', url: 'https://www.iledefrance-mobilites.fr/medias/portail-idfm/acEkM5GXnQHGY2UT_IDFM_guide_tarifaire_A5_190326-2.pdf', provider: 'Île-de-France Mobilités' },
      { id: 'idfm-tarifs', date: '2026', title: 'Titres et tarifs', url: 'https://www.iledefrance-mobilites.fr/titres-et-tarifs', provider: 'Île-de-France Mobilités' },
      { id: 'sp-transport', date: 'févr. 2026', title: 'Remboursement des frais de transport domicile-travail', figure: "Prise en charge employeur obligatoire de 50 % de l'abonnement", url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F19846', provider: 'Service-Public.fr' },
    ]
  },
  {
    key: 'real-estate',
    title: 'Loyers et Immobilier',
    sources: [
      { id: 'olap-2025', date: 'janv. 2025', title: "Évolution en 2024 des loyers d'habitation du secteur locatif privé dans l'agglomération parisienne", figure: 'Loyer moyen hors charges : 26,3 €/m² à Paris, 19,1 €/m² en petite couronne, 15,6 €/m² en grande couronne ; emménagés récents : 28,3, 21,3 et 16,9 €/m²', url: 'https://www.observatoire-des-loyers.fr/sites/default/files/olap_documents/rapports_loyers/Rapport%20Paris%202025.pdf', provider: 'OLAP' },
      { id: 'olap-carte', date: '2025', title: 'Carte des niveaux de loyers — agglomération parisienne', url: 'https://www.observatoires-des-loyers.org/connaitre-les-loyers/carte-des-niveaux-de-loyers/agglomeration-parisienne-hors-paris', provider: 'Observatoires locaux des loyers' },
      { id: 'drihl-encadrement', date: 'juil. 2026', title: 'Arrêté n° IDF-2026-06-12-00003 fixant les loyers de référence pour la Ville de Paris', figure: 'Applicable du 1er juillet au 24 novembre 2026 (fin de l’expérimentation ELAN) ; loyer de référence majoré = référence + 20 %', url: 'https://www.drihl.ile-de-france.developpement-durable.gouv.fr/renouvellement-2026-de-l-arrete-annuel-d-a1512.html?lang=fr', provider: 'DRIHL Île-de-France' },
      { id: 'paris-encadrement', date: '2026', title: "L'encadrement des loyers : comprendre le dispositif", url: 'https://www.paris.fr/pages/l-encadrement-des-loyers-comprendre-le-dispositif-29091', provider: 'Ville de Paris' },
      { id: 'notaires-t2-2026', date: 'T2 2026', title: 'Conjoncture immobilière en Île-de-France au 2e trimestre 2026', figure: 'Appartements anciens : 9 560 €/m² à Paris, 6 130 €/m² en Île-de-France', url: 'https://paris.notaires.fr/fr/presse/communication-immobiliere-mensuelle/conjoncture-immobiliere-en-ile-de-france-au-2e-trimestre-2026', provider: 'Notaires du Grand Paris' },
      { id: 'notaires-janv-2026', date: 'janv. 2026', title: 'Le marché immobilier résidentiel ancien dans le Grand Paris — communiqué du 26 mars 2026', figure: 'Appartements anciens : 9 570 €/m² à Paris, 4 910 €/m² en petite couronne, 3 190 €/m² en grande couronne', url: 'https://notairesdugrandparis.fr/sites/default/files/2026-03/Communiqu%C3%A9%20mensuel_2026-03_prix%20fin%20janvier%202026.pdf', provider: 'Notaires du Grand Paris' },
      { id: 'notaires-frais', date: 'mai 2025', title: "Ventes immobilières : augmentation des droits d'enregistrement dans le Grand Paris", figure: "Frais et taxes d'acquisition proches de 8 % du prix ; taux départemental de 5 %, maintenu à 4,5 % pour les primo-accédants, jusqu'au 31 mars 2028", url: 'https://paris.notaires.fr/fr/actualites/ventes-immobilieres-augmentation-des-droits-denregistrement-dans-le-grand-paris', provider: 'Notaires du Grand Paris' },
      { id: 'paris-opendata-loyers', date: 'juil. 2025', title: 'Logement — Encadrement des loyers (open data)', figure: "Loyers de référence par quartier, nombre de pièces et époque de construction, utilisés par le vérificateur de loyer", url: 'https://opendata.paris.fr/explore/dataset/logement-encadrement-des-loyers/', provider: 'Ville de Paris' },
      { id: 'bdf-credits-habitat', date: 'juil. 2026', title: 'Crédits aux particuliers — juillet 2026', figure: "Taux moyen des nouveaux crédits à l'habitat hors renégociations : 3,30 % (3,21 % en mai)", url: 'https://www.banque-france.fr/fr/statistiques/credit/credits-aux-particuliers-2026-07', provider: 'Banque de France' },
      { id: 'hcsf-credit', date: '2022', title: "Mesure relative à l'octroi de crédits immobiliers", figure: "Taux d'effort maximal de 35 %, durée maximale de 25 ans", url: 'https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers', provider: 'Haut Conseil de stabilité financière' },
    ]
  },
  {
    key: 'salaries',
    title: 'Salaires et Revenus',
    sources: [
      { id: 'insee-salaires-dep', date: '2024', title: 'Salaire net mensuel moyen en EQTP par sexe et PCS dans le secteur privé — comparaisons départementales', figure: 'Paris : 3 836 € (cadres 5 663 €, professions intermédiaires 2 842 €, employés 2 112 €) ; Île-de-France : 3 479 € ; France : 2 733 €', url: 'https://www.insee.fr/fr/statistiques/2012733', provider: 'INSEE' },
      { id: 'insee-salaires-prive', date: '2024', title: 'Les salaires dans le secteur privé en 2024 — Insee Première n° 2079', figure: 'Par âge (France) : 1 865 € avant 25 ans, 2 567 € de 25 à 39 ans, 3 009 € de 40 à 49 ans, 3 267 € à 55 ans et plus', url: 'https://www.insee.fr/fr/statistiques/8657156', provider: 'INSEE' },
      { id: 'insee-essentiel-salaires', date: '2024', title: "L'essentiel sur... les salaires", url: 'https://www.insee.fr/fr/statistiques/7457170', provider: 'INSEE' },
    ]
  },
  {
    key: 'savings-products',
    title: "Produits d'Épargne et Fiscalité",
    sources: [
      { id: 'sp-livret-a', date: 'août 2026', title: 'Livret A', figure: "1,7 % du 1er août 2026 au 31 janvier 2027, plafond 22 950 € (même taux pour le LDDS)", url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2365', provider: 'Service-Public.fr' },
      { id: 'sp-lep', date: 'août 2026', title: "Livret d'épargne populaire (LEP)", figure: '2,5 %, plafond 10 000 €, revenu fiscal de référence ≤ 23 028 € pour 1 part', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2367', provider: 'Service-Public.fr' },
      { id: 'sp-pel', date: 'sept. 2026', title: 'Plan épargne logement (PEL)', figure: '2 % pour les PEL ouverts depuis le 1er janvier 2026, plafond 61 200 €', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F16140', provider: 'Service-Public.fr' },
      { id: 'sp-prelevements', date: '2026', title: 'Prélèvements sociaux sur les revenus du patrimoine et de placements', figure: 'Prélèvement forfaitaire unique de 31,4 % depuis 2026 (30 % maintenu pour assurance-vie, PEL et CEL)', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2329', provider: 'Service-Public.fr' },
      { id: 'mqda-precaution', date: '2026', title: 'Une épargne de précaution : pourquoi et comment faire ?', figure: '3 à 6 mois de revenus', url: 'https://www.mesquestionsdargent.fr/epargne-et-placements/epargne-de-precaution', provider: 'Banque de France — Mes questions d\'argent' },
    ]
  },
  {
    key: 'savings',
    title: 'Épargne des Ménages',
    sources: [
      { id: 'insee-comptes-t2-2026', date: 'T2 2026', title: 'Comptes nationaux trimestriels — Informations rapides n° 212', figure: "Taux d'épargne des ménages : 17,2 % du revenu disponible brut (17,9 % au T1)", url: 'https://www.insee.fr/fr/statistiques/9039499', provider: 'INSEE' },
      { id: 'bdf-epargne-t1-2026', date: 'T1 2026', title: 'Épargne des ménages — 2026 T1', figure: "Taux d'épargne financière : 9,5 % (5,8 % en zone euro)", url: 'https://www.banque-france.fr/fr/statistiques/epargne/epargne-des-menages-2026-q1', provider: 'Banque de France' },
      { id: 'insee-epargne-categories', date: '2022', title: 'Consommation et épargne par catégories de ménages', figure: "Taux d'épargne de -29 % pour les 20 % les plus modestes à 27 % pour les 20 % les plus aisés", url: 'https://www.insee.fr/fr/statistiques/8272803?sommaire=8071406', provider: 'INSEE' },
      { id: 'amf-barometre-2025', date: '2025', title: "Baromètre de l'épargne et de l'investissement 2025", figure: '42 % des moins de 35 ans acceptent une part de risque sur leurs placements', url: 'https://www.amf-france.org/sites/institutionnel/files/private/2025-12/barometre-amf-2025.pdf', provider: 'Autorité des marchés financiers' },
    ]
  },
  {
    key: 'cost-of-living',
    title: 'Prix et Coût de la Vie',
    sources: [
      { id: 'insee-ipc-sept-2026', date: 'sept. 2026', title: 'Indice des prix à la consommation — estimation provisoire, Informations rapides n° 242', figure: 'Inflation de 3,0 % sur un an', url: 'https://www.insee.fr/fr/statistiques/9056956', provider: 'INSEE' },
      { id: 'insee-budget-famille', date: '2017', title: 'Les comportements de consommation en 2017 — enquête Budget de famille, Insee Première n° 1749', figure: "L'alimentation représente 14 % du budget des ménages de l'agglomération parisienne ; aucun montant mensuel officiel n'existe, prochains résultats attendus en 2028", url: 'https://www.insee.fr/fr/statistiques/4127596', provider: 'INSEE' },
    ]
  }
];

const Sources = ({ visible, onClose }) => (
  <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Sources et références</DialogTitle>
        <DialogDescription>
          Sources officielles ou institutionnelles uniquement. L&apos;étiquette
          indique la période des données. Dernière vérification : 2 octobre
          2026.
        </DialogDescription>
      </DialogHeader>

      <Accordion type="multiple" defaultValue={[sourcesData[0].key]}>
        {sourcesData.map((category) => (
          <AccordionItem key={category.key} value={category.key}>
            <AccordionTrigger>{category.title}</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3">
                {category.sources.map((source) => (
                  <li key={source.id} className="flex flex-col gap-0.5">
                    <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {source.provider}
                      <Badge variant="outline">{source.date}</Badge>
                    </span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {source.title}
                      <ExternalLink className="mt-1 size-3 shrink-0" />
                    </a>
                    {source.figure && (
                      <span className="text-muted-foreground">
                        {source.figure}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="rounded-lg bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
        Les taux d&apos;épargne conseillés par âge, le budget alimentaire (350
        €/mois) et la règle 50/30/20 sont des hypothèses de l&apos;application
        et non des chiffres officiels. Les calculs ne constituent pas des
        conseils financiers personnalisés. Pour une décision importante,
        consultez un professionnel agréé.
      </p>
    </DialogContent>
  </Dialog>
);

export default Sources;
