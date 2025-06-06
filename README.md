# Calculateur d'Épargne Paris 🏦

Une application web moderne pour calculer et optimiser votre épargne à Paris et en région parisienne.

## 🚀 Fonctionnalités

- **Calculateur personnalisé** : Calcul précis selon votre profil (âge, zone, situation)
- **Visualisations de données** : Graphiques interactifs basés sur des données réelles
- **Conseils personnalisés** : Recommandations adaptées à votre tranche d'âge et situation
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
4. Obtenez vos résultats personnalisés et conseils

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
│   ├── TipsAndAdvice.jsx       # Conseils personnalisés
│   └── DataVisualization.jsx   # Graphiques et données
├── data/                       # Données CSV et guides
└── App.jsx                     # Composant principal
```

## 📈 Métriques calculées

- Taux d'épargne réel vs recommandé
- Épargne mensuelle et annuelle possible
- Répartition budgétaire optimale
- Comparaison avec les moyennes par âge

Développé avec ❤️ pour optimiser votre budget parisien.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
