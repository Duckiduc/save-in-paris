# Calculateur d'Épargne Paris 🏦

Une application web moderne pour calculer et optimiser votre épargne à Paris et en région parisienne.

## 🚀 Fonctionnalités

- **Calculateur** : Calcul selon votre profil (âge, zone, situation), seul ou en couple, avec remboursement employeur du Navigo
- **Simulateur « Et si... ? »** : augmentation, colocation, déménagement, baisse des dépenses
- **Épargne de précaution** : mois de dépenses couverts face au repère de 3 à 6 mois
- **Où placer votre épargne** : répartition LEP / Livret A / LDDS selon les plafonds et l'éligibilité au LEP
- **Projet d'achat** : apport, mensualité et capacité d'emprunt selon la règle des 35 %
- **Encadrement des loyers** : vérification du loyer face au plafond légal parisien (open data de la Ville de Paris)
- **Comparaison salariale** : votre salaire face à la moyenne INSEE par département et catégorie
- **Projection** : en euros constants et après fiscalité, à partir de votre épargne actuelle
- **Partage** : lien contenant le scénario, sauvegarde locale et export PDF par impression
- **Visualisations de données** : Graphiques interactifs basés sur des données réelles
- **Interface moderne** : Design minimaliste et responsive avec shadcn/ui
- **Données réelles** : Basé sur les statistiques officielles du coût de la vie parisien

## 🛠️ Technologies

- **React 18** avec Vite
- **shadcn/ui** (Radix UI) et **Tailwind CSS** pour l'interface utilisateur
- **Recharts** pour les visualisations
- **Lucide** pour les icônes, thème clair ou sombre selon le système

## 📊 Données incluses

- Coûts de la vie par zone (Paris intra-muros, petite/grande couronne)
- Loyers moyens par zone et taille de logement (OLAP)
- Salaires moyens par département, catégorie et âge (INSEE)
- Taux d'épargne par niveau de vie (INSEE)
- Taux et plafonds de l'épargne réglementée (Service-Public.fr)

## 🎯 Comment utiliser

1. Remplissez vos informations personnelles (salaire, âge, zone)
2. Indiquez votre situation de logement (propriétaire/locataire)
3. Ajoutez vos dépenses additionnelles

## 💡 Conseils intégrés

- Règle des 50/30/20 adaptée à Paris
- Optimisation par tranche d'âge
- Astuces spécifiques par zone géographique
- Alertes sur les points d'attention financiers

## ⚡ Installation et démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) pour voir l'application.

## 🏗️ Structure du projet

```
src/
├── components/
│   ├── SavingsCalculator.jsx    # Formulaire de calcul
│   ├── ResultsDisplay.jsx       # Affichage des résultats
│   ├── TipsAndAdvice.jsx
│   └── DataVisualization.jsx   # Graphiques et données
├── data/                       # Données CSV et guides
└── App.jsx                     # Composant principal
```

## 📈 Métriques calculées

- Taux d'épargne réel vs recommandé
- Épargne mensuelle et annuelle possible
- Répartition budgétaire optimale
- Comparaison avec les moyennes par âge

## ⚠️ AVIS LÉGAL ET LIMITATION DE RESPONSABILITÉ

### 🔓 Projet Open Source

Ce projet est distribué sous licence open source et fourni **"EN L'ÉTAT"** sans aucune garantie expresse ou implicite. Le code source est public et peut être modifié par des tiers.

### 📋 Usage Informatif Uniquement

- Les calculs, estimations et conseils fournis sont **exclusivement à des fins éducatives et informatives**
- Ils **NE CONSTITUENT PAS** des conseils financiers, juridiques, fiscaux ou d'investissement personnalisés
- **AUCUNE GARANTIE** n'est donnée quant à l'exactitude, la fiabilité ou l'exhaustivité des informations

### 🚫 Exclusion de Responsabilité

L'auteur, les contributeurs et hébergeurs **DÉCLINENT TOUTE RESPONSABILITÉ** pour :

- Les pertes financières directes ou indirectes
- Les dommages résultant de l'utilisation de ce calculateur
- Les erreurs dans les calculs ou données
- Les décisions prises sur la base des résultats fournis

### 📊 Limitations des Données

- Les données proviennent de sources publiques et peuvent être inexactes ou obsolètes
- Les résultats sont des estimations approximatives
- Votre situation personnelle peut différer significativement des moyennes utilisées
- **AUCUNE GARANTIE** de résultat financier futur n'est donnée

### 💼 Conseil Professionnel Recommandé

**CONSULTEZ TOUJOURS** un professionnel agréé avant toute décision financière :

- Conseiller en gestion de patrimoine certifié
- Expert-comptable
- Notaire
- Conseiller bancaire qualifié

### ✅ Acceptation des Conditions

En utilisant ce logiciel, vous acceptez ces conditions et reconnaissez :

- Avoir été informé(e) de ces limitations
- Comprendre les risques associés
- Utiliser cet outil à vos propres risques
- Décharger les créateurs de toute responsabilité

### 🛡️ Limitations Supplémentaires

- **Sécurité :** Aucune garantie de sécurité des données ou de disponibilité du service
- **Compatibilité :** Aucune garantie de fonctionnement sur tous les appareils ou navigateurs
- **Maintenance :** Le projet peut être abandonné ou modifié sans préavis
- **Juridiction :** En cas de litige, seuls les tribunaux français sont compétents

### 📝 Clause de Non-Responsabilité Étendue

**AVERTISSEMENT MAXIMUM :** Cette application est fournie **SANS AUCUNE GARANTIE** de quelque nature que ce soit.
L'utilisation de cet outil est **ENTIÈREMENT À VOS RISQUES ET PÉRILS**. Les créateurs ne peuvent être tenus
responsables de QUELQUE MANIÈRE QUE CE SOIT pour les conséquences de son utilisation.

### 🚨 Mise en Garde Finale

**SI VOUS N'ACCEPTEZ PAS CES CONDITIONS DANS LEUR INTÉGRALITÉ, CESSEZ IMMÉDIATEMENT D'UTILISER CE SERVICE.**

📋 **CONDITIONS COMPLÈTES :** Consultez le fichier [LEGAL.md](./LEGAL.md) pour les conditions d'utilisation détaillées et complètes.

## 📚 Sources et Références

Cette application s'appuie sur des sources officielles ou institutionnelles (INSEE, Banque de France, Service-Public.fr, Île-de-France Mobilités, OLAP, Notaires du Grand Paris). Dernière vérification : 2 octobre 2026. Le dossier [sources/](sources/) contient le rapport de recherche et le tableau des données avec, pour chaque chiffre, son URL, sa date et son statut de vérification.

### Transport et Mobilité

- [Île-de-France Mobilités - Guide tarifaire — forfaits Navigo et tickets au 1er janvier 2026](https://www.iledefrance-mobilites.fr/medias/portail-idfm/acEkM5GXnQHGY2UT_IDFM_guide_tarifaire_A5_190326-2.pdf) (2026) — Navigo Mois : 90,80 € toutes zones, 88,80 € zones 2-3, 86,40 € zones 3-4, 84,40 € zones 4-5
- [Île-de-France Mobilités - Titres et tarifs](https://www.iledefrance-mobilites.fr/titres-et-tarifs) (2026)
- [Service-Public.fr - Remboursement des frais de transport domicile-travail](https://www.service-public.gouv.fr/particuliers/vosdroits/F19846) (févr. 2026) — Prise en charge employeur obligatoire de 50 % de l'abonnement

### Loyers et Immobilier

- [OLAP - Évolution en 2024 des loyers d'habitation du secteur locatif privé dans l'agglomération parisienne](https://www.observatoire-des-loyers.fr/sites/default/files/olap_documents/rapports_loyers/Rapport%20Paris%202025.pdf) (janv. 2025) — Loyer moyen hors charges : 26,3 €/m² à Paris, 19,1 €/m² en petite couronne, 15,6 €/m² en grande couronne ; emménagés récents : 28,3, 21,3 et 16,9 €/m²
- [Observatoires locaux des loyers - Carte des niveaux de loyers — agglomération parisienne](https://www.observatoires-des-loyers.org/connaitre-les-loyers/carte-des-niveaux-de-loyers/agglomeration-parisienne-hors-paris) (2025)
- [DRIHL Île-de-France - Arrêté n° IDF-2026-06-12-00003 fixant les loyers de référence pour la Ville de Paris](https://www.drihl.ile-de-france.developpement-durable.gouv.fr/renouvellement-2026-de-l-arrete-annuel-d-a1512.html?lang=fr) (juil. 2026) — Applicable du 1er juillet au 24 novembre 2026 (fin de l’expérimentation ELAN) ; loyer de référence majoré = référence + 20 %
- [Ville de Paris - L'encadrement des loyers : comprendre le dispositif](https://www.paris.fr/pages/l-encadrement-des-loyers-comprendre-le-dispositif-29091) (2026)
- [Notaires du Grand Paris - Conjoncture immobilière en Île-de-France au 2e trimestre 2026](https://paris.notaires.fr/fr/presse/communication-immobiliere-mensuelle/conjoncture-immobiliere-en-ile-de-france-au-2e-trimestre-2026) (T2 2026) — Appartements anciens : 9 560 €/m² à Paris, 6 130 €/m² en Île-de-France
- [Notaires du Grand Paris - Le marché immobilier résidentiel ancien dans le Grand Paris — communiqué du 26 mars 2026](https://notairesdugrandparis.fr/sites/default/files/2026-03/Communiqu%C3%A9%20mensuel_2026-03_prix%20fin%20janvier%202026.pdf) (janv. 2026) — Appartements anciens : 9 570 €/m² à Paris, 4 910 €/m² en petite couronne, 3 190 €/m² en grande couronne
- [Notaires du Grand Paris - Ventes immobilières : augmentation des droits d'enregistrement dans le Grand Paris](https://paris.notaires.fr/fr/actualites/ventes-immobilieres-augmentation-des-droits-denregistrement-dans-le-grand-paris) (mai 2025) — Frais et taxes d'acquisition proches de 8 % du prix ; taux départemental de 5 %, maintenu à 4,5 % pour les primo-accédants, jusqu'au 31 mars 2028
- [Ville de Paris - Logement — Encadrement des loyers (open data)](https://opendata.paris.fr/explore/dataset/logement-encadrement-des-loyers/) (juil. 2025) — Loyers de référence par quartier, nombre de pièces et époque de construction, utilisés par le vérificateur de loyer
- [Banque de France - Crédits aux particuliers — juillet 2026](https://www.banque-france.fr/fr/statistiques/credit/credits-aux-particuliers-2026-07) (juil. 2026) — Taux moyen des nouveaux crédits à l'habitat hors renégociations : 3,30 % (3,21 % en mai)
- [Haut Conseil de stabilité financière - Mesure relative à l'octroi de crédits immobiliers](https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers) (2022) — Taux d'effort maximal de 35 %, durée maximale de 25 ans

### Salaires et Revenus

- [INSEE - Salaire net mensuel moyen en EQTP par sexe et PCS dans le secteur privé — comparaisons départementales](https://www.insee.fr/fr/statistiques/2012733) (2024) — Paris : 3 836 € (cadres 5 663 €, professions intermédiaires 2 842 €, employés 2 112 €) ; Île-de-France : 3 479 € ; France : 2 733 €
- [INSEE - Les salaires dans le secteur privé en 2024 — Insee Première n° 2079](https://www.insee.fr/fr/statistiques/8657156) (2024) — Par âge (France) : 1 865 € avant 25 ans, 2 567 € de 25 à 39 ans, 3 009 € de 40 à 49 ans, 3 267 € à 55 ans et plus
- [INSEE - L'essentiel sur... les salaires](https://www.insee.fr/fr/statistiques/7457170) (2024)

### Produits d'Épargne et Fiscalité

- [Service-Public.fr - Livret A](https://www.service-public.gouv.fr/particuliers/vosdroits/F2365) (août 2026) — 1,7 % du 1er août 2026 au 31 janvier 2027, plafond 22 950 € (même taux pour le LDDS)
- [Service-Public.fr - Livret d'épargne populaire (LEP)](https://www.service-public.gouv.fr/particuliers/vosdroits/F2367) (août 2026) — 2,5 %, plafond 10 000 €, revenu fiscal de référence ≤ 23 028 € pour 1 part
- [Service-Public.fr - Plan épargne logement (PEL)](https://www.service-public.gouv.fr/particuliers/vosdroits/F16140) (sept. 2026) — 2 % pour les PEL ouverts depuis le 1er janvier 2026, plafond 61 200 €
- [Service-Public.fr - Prélèvements sociaux sur les revenus du patrimoine et de placements](https://www.service-public.gouv.fr/particuliers/vosdroits/F2329) (2026) — Prélèvement forfaitaire unique de 31,4 % depuis 2026 (30 % maintenu pour assurance-vie, PEL et CEL)
- [Banque de France — Mes questions d'argent - Une épargne de précaution : pourquoi et comment faire ?](https://www.mesquestionsdargent.fr/epargne-et-placements/epargne-de-precaution) (2026) — 3 à 6 mois de revenus

### Épargne des Ménages

- [INSEE - Comptes nationaux trimestriels — Informations rapides n° 212](https://www.insee.fr/fr/statistiques/9039499) (T2 2026) — Taux d'épargne des ménages : 17,2 % du revenu disponible brut (17,9 % au T1)
- [Banque de France - Épargne des ménages — 2026 T1](https://www.banque-france.fr/fr/statistiques/epargne/epargne-des-menages-2026-q1) (T1 2026) — Taux d'épargne financière : 9,5 % (5,8 % en zone euro)
- [INSEE - Consommation et épargne par catégories de ménages](https://www.insee.fr/fr/statistiques/8272803?sommaire=8071406) (2022) — Taux d'épargne de -29 % pour les 20 % les plus modestes à 27 % pour les 20 % les plus aisés
- [Autorité des marchés financiers - Baromètre de l'épargne et de l'investissement 2025](https://www.amf-france.org/sites/institutionnel/files/private/2025-12/barometre-amf-2025.pdf) (2025) — 42 % des moins de 35 ans acceptent une part de risque sur leurs placements

### Prix et Coût de la Vie

- [INSEE - Indice des prix à la consommation — estimation provisoire, Informations rapides n° 242](https://www.insee.fr/fr/statistiques/9056956) (sept. 2026) — Inflation de 3,0 % sur un an
- [INSEE - Les comportements de consommation en 2017 — enquête Budget de famille, Insee Première n° 1749](https://www.insee.fr/fr/statistiques/4127596) (2017) — L'alimentation représente 14 % du budget des ménages de l'agglomération parisienne ; aucun montant mensuel officiel n'existe, prochains résultats attendus en 2028

---

**Note :** Les taux d'épargne recommandés par âge, le budget alimentaire estimé (350 €/mois) et la règle 50/30/20 sont des hypothèses de l'application et non des chiffres officiels. Les calculs ne constituent pas des conseils financiers personnalisés.

---

Développé avec ❤️ pour optimiser votre budget parisien.
