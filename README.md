# Calculateur d'Épargne Paris 🏦

Une application web moderne pour calculer et optimiser votre épargne à Paris et en région parisienne.

## 🚀 Fonctionnalités

- **Calculateur** : Calcul selon votre profil (âge, zone, situation)
- **Visualisations de données** : Graphiques interactifs basés sur des données réelles
- **Interface moderne** : Design minimaliste et responsive avec Ant Design
- **Données réelles** : Basé sur les statistiques officielles du coût de la vie parisien

## 🛠️ Technologies

- **React 18** avec Vite
- **Ant Design** pour l'interface utilisateur
- **Recharts** pour les visualisations
- **CSS moderne** avec gradients et animations

## 📊 Données incluses

- Coûts de la vie par zone (Paris intra-muros, petite/grande couronne)
- Statistiques d'épargne par tranche d'âge
- Comportements financiers par génération
- Recommandations d'experts financiers

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

Cette application s'appuie sur des données provenant de sources fiables et reconnues pour fournir des estimations réalistes du coût de la vie parisien et des comportements d'épargne.

### 💰 Coût de la Vie et Budget à Paris

- [Studely - Budget étudiant Paris 2024](https://www.studely.com/fr/article/quel-budget-etudiant-pour-vivre-a-paris-en-2024/) [^1_1]
- [Combien Coûte - Coût de la vie Paris](https://www.combien-coute.net/cout-de-la-vie/ile-de-france/paris/) [^1_2]
- [Studapart - Coût de la vie France 2024](https://www.studapart.com/fr/nos-astuces/quel-est-le-cout-de-la-vie-en-france-en-2024) [^1_3]
- [Déménagement24 - Coût de la vie Paris](https://www.demenagement24.com/blog/conseils/cout-de-la-vie-a-paris-tarifs-actuels/) [^1_4]
- [RiaMoney - Coût de la vie France 2024](https://www.riamoneytransfer.com/fr/blog/cout-de-la-vie-en-france-en-2024-paris-marseille-lyon-nice/) [^1_32]
- [LaFinancePourTous - Coût vie étudiante 2024](https://www.lafinancepourtous.com/2024/09/05/cout-de-la-vie-etudiante-la-rentree-2024-encore-synonyme-de-hausse/) [^1_33]

### 🏠 Immobilier et Logement Paris

- [Studapart - Prix loyer Paris](https://www.studapart.com/fr/proprietaires/guides-proprietaires/prix-loyer-paris) [^1_5]
- [Paris Rental - Location appartement Paris 2025](https://fr.parisrental.com/blog/tout-sur-la-location-meublee/le-cout-de-la-location-dun-appartement-a-paris-en-2025) [^1_7]
- [Le Figaro Immobilier - Prix immobilier Paris](https://immobilier.lefigaro.fr/prix-immobilier/paris/ville-75056) [^1_9]
- [SeLoger - Prix immobilier Île-de-France](https://www.seloger.com/prix-de-l-immo/vente/ile-de-france/paris.htm) [^1_10]
- [Foncia - Prix m² Paris](https://fr.foncia.com/estimer-son-bien/prix-m2/paris-75) [^1_13]
- [MeilleursAgents - Prix immobilier Paris](https://www.meilleursagents.com/prix-immobilier/paris-75000/) [^2_18]
- [Hosman - Prix mètre carré Paris](https://www.hosman.co/blog/paris-prix-metre-carre) [^1_34]
- [Notaires Paris - Carte des prix](https://paris.notaires.fr/fr/carte-des-prix) [^1_35]

### 💼 Salaires et Revenus

- [Journal du Net - Salaire Paris](https://www.journaldunet.com/business/salaire/paris/departement-75) [^1_6]
- [HelloWorkplace - Salaire moyen région 2024](https://www.helloworkplace.fr/salaire-moyen-region-2024/) [^1_8]
- [HelloWork - Salaire moyen France](https://www.hellowork.com/fr-fr/medias/salaire-moyen-france-secteurs-regions-metiers.html) [^2_3]
- [News Entreprises - Salaire moyen France 2024](https://newsentreprises.com/salaire-moyen-france-2024/) [^2_7]
- [Journal du Net - Salaire Île-de-France](https://www.journaldunet.com/business/salaire/ile-de-france/region-11) [^2_9]
- [Early App - Salaire moyen France](https://early.app/fr/salaire-moyen/france/) [^2_10]

### 🚊 Transport et Mobilité

- [Île-de-France Mobilités - Titres et tarifs](https://www.iledefrance-mobilites.fr/titres-et-tarifs) [^1_24]
- [IDF Mobilités - Forfait Navigo mensuel](https://www.iledefrance-mobilites.fr/titres-et-tarifs/detail/forfait-navigo-mois) [^1_25]
- [IDF Mobilités - Forfait Navigo annuel](https://www.iledefrance-mobilites.fr/titres-et-tarifs/detail/forfait-navigo-annuel) [^1_26]
- [Capital - Pass Navigo guide](https://www.capital.fr/conso/pass-navigo-demarche-forfait-et-prix-1476764) [^1_27]
- [RideMotto - Meilleurs transports Paris](https://blog.ridemotto.com/meilleurs-moyens-transport-paris/) [^1_29]

### 💰 Épargne et Comportements Financiers

- [Banque de France - Épargne ménages Q2 2024](https://www.banque-france.fr/fr/statistiques/epargne/epargne-des-menages-2024-q2) [^1_37]
- [Banque de France - Épargne ménages Q3 2024](https://www.banque-france.fr/fr/statistiques/epargne/epargne-des-menages-2024-q3) [^1_38]
- [LaFinancePourTous - Taux épargne français 2024](https://www.lafinancepourtous.com/2025/06/04/le-taux-depargne-des-francais-atteint-18-fin-2024/) [^1_17]
- [FBF - Épargne ménages faits et chiffres](https://www.fbf.fr/fr/lepargne-des-menages-faits-et-chiffres-cles/) [^1_16]
- [Ramify - Épargne moyenne français](https://www.ramify.fr/epargne/epargne-moyenne-des-francais) [^1_18]
- [Club Patrimoine - Taux épargne ménages France](https://www.clubpatrimoine.com/contenus/graph-taux-epargne-menages-france) [^2_22]
- [L'Assurance en Mouvement - Bilan épargne 2024](https://www.lassuranceenmouvement.com/2024/11/14/la-france-un-peuple-depargnants-bilan-2024/) [^2_23]

### 👥 Comportements par Génération

- [Business Cool - Comportement financier Gen Z](https://business-cool.com/decryptage/analyse/generation-z-quel-est-leur-comportement-financier/) [^2_4]
- [Forbes - Habitudes dépense épargne Gen Z](https://www.forbes.fr/business/les-habitudes-de-depense-et-depargne-de-la-generation-z-et-leur-effet-sur-les-services-financiers/) [^2_6]
- [MyLittleMoney - Stratégies placement Millennials](https://mylittlemoney.com/2017/11/22/epargne-les-droles-de-strategies-de-placement-des-millennials/) [^2_11]
- [MySweetImmo - Millennials meilleurs épargnants](https://www.mysweetimmo.com/2023/02/27/epargne-les-millenials-sont-les-meilleurs-epargnants-de-france-toutes-generations-confondues/) [^2_17]
- [Natixis - Génération X inquiétudes retraite](https://www.im.natixis.com/fr-fr/about/newsroom/press-releases/2024/pres-du-tiers-des-membres-de-la-generation-x-s-inquiete-de-ne-pas-pouvoir-prendre-sa-retraite) [^2_15]
- [AllNews - Évolution préférences investissement générations](https://www.allnews.ch/content/points-de-vue/l'évolution-des-préférences-d'investissement-des-«boomers»-à-la-«genz») [^2_16]

### 📊 Données Statistiques INSEE

- [INSEE - Statistiques revenus patrimoine](https://www.insee.fr/fr/statistiques/5650198) [^2_5]
- [INSEE - Outil interactif économie](https://www.insee.fr/fr/outil-interactif/5367857/details/10_ECC/11_ECO/11E_Figure5) [^2_30]
- [INSEE - Statistiques épargne 2024](https://www.insee.fr/fr/statistiques/7457170) [^2_32]

### 🏦 Assurances et Charges

- [Le Figaro - Assurance habitation Paris](https://immobilier.lefigaro.fr/article/la-ville-de-paris-lance-une-assurance-habitation-a-prix-casses_fac4af5e-697a-11ed-845d-0f540038713c/) [^1_11]
- [Ma-Nego - Prix charges copropriété Paris](https://www.ma-nego.fr/2024/09/03/les-prix-des-charges-de-copropriete-a-paris-ce-quil-faut-savoir/) [^1_12]
- [VYV Conseil - Assurance habitation Paris](https://vyv-conseil.fr/nos-assurances/assurance-habitation-paris/) [^1_14]
- [LiberKeys - Charges locatives Paris](https://www.liberkeys.com/blog/top-3-arrondissements-charges-locatives-elevees-paris) [^1_15]

### 🎯 Conseils et Optimisation Budget

- [Linxea - Épargner petit budget](https://www.linxea.com/tout-savoir-sur/epargne/comment-epargner-avec-un-petit-budget/) [^1_19]
- [Mes Questions d'Argent - Astuces économies](https://www.mesquestionsdargent.fr/budget/comment-faire-des-economies/astuces-economies-accessible) [^1_22]
- [CBNews - 56% français vivent au-dessus moyens](https://www.cbnews.fr/cb/image-epargne-enquete-yomoni-buzzpress-devoilent-que-56-francais-vivent-au-dessus-leurs-moyens) [^1_23]
- [Blog Nalo - État lieux épargne français](https://blog.nalo.fr/etat-des-lieux-previsions-epargne-des-francais/) [^1_21]

### 🏡 Investissement et Patrimoine

- [Pretto - Âge investir immobilier](https://www.pretto.fr/investissement-locatif/investissement-immobilier/age-investir-immobilier/) [^2_25]
- [PraxiFinance - Âge devenir propriétaire](https://www.praxifinance.fr/actualite/a-quel-age-devient-on-proprietaire) [^2_21]
- [iSélection - Investissement locatif selon âge](https://www.iselection.com/b2c/conseils-investir/investissement-immobilier-locatif-selon-age/) [^2_27]
- [Ramify - Combien avoir côté 50 ans](https://www.ramify.fr/epargne/combien-avoir-de-cote-a-50-ans) [^2_28]

### 📈 Études et Baromètres

- [IFOP - Baromètre épargne 2024](https://www.ifop.com/publication/barometre-2024-de-lepargne-en-france-et-en-regions/) [^2_31]
- [Altaprofits - Baromètre Hauts-de-France](https://www.altaprofits.com/documentation/pdf/ESPACEPRESSE/septembre2024/CP-IFOP-Altaprofits-Barometre2024-Hauts-de-France.pdf) [^2_2]
- [Natixis - Gen X Report](https://www.im.natixis.com/fr-fr/insights/investor-sentiment/2024/gen-x-report) [^2_33]
- [Yomoni - Épargne ou style de vie](https://blog.yomoni.fr/epargne-ou-style-de-vie/) [^2_34]

---

**Note :** Toutes les données utilisées dans cette application proviennent de sources publiques et officielles. Les calculs et recommandations sont basés sur ces références mais ne constituent pas des conseils financiers personnalisés.

---

Développé avec ❤️ pour optimiser votre budget parisien.
