import { useEffect, useRef, useState } from "react";
import { BadgeCheck, BookOpen, PiggyBank, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section } from "@/components/shared";
import SavingsCalculator from "./components/SavingsCalculator";
import ResultsDisplay from "./components/ResultsDisplay";
import TipsAndAdvice from "./components/TipsAndAdvice";
import DataVisualization from "./components/DataVisualization";
import SavingsProjection from "./components/SavingsProjection";
import GuideInfo from "./components/GuideInfo";
import Sources from "./components/Sources";
import EmergencyFund from "./components/EmergencyFund";
import PeerComparison from "./components/PeerComparison";
import WhatIfSimulator from "./components/WhatIfSimulator";
import ProductAllocator from "./components/ProductAllocator";
import HomePurchaseSimulator from "./components/HomePurchaseSimulator";
import RentCapChecker from "./components/RentCapChecker";

const GUIDE_TABS = [
  { key: "overview", label: "Repères" },
  { key: "housing", label: "Logement" },
  { key: "transport", label: "Transport" },
  { key: "food", label: "Alimentation" },
  { key: "savings", label: "Épargne" },
  { key: "warnings", label: "Erreurs à éviter" },
];

const LEGAL_NOTICES = [
  {
    title: "Projet open source",
    text: "Ce calculateur est un projet open source fourni « en l'état », sans aucune garantie expresse ou implicite. Le code source est disponible publiquement et peut être modifié par des tiers.",
  },
  {
    title: "Usage informatif uniquement",
    text: "Les calculs, estimations, conseils et informations fournis sont à des fins éducatives et informatives uniquement. Ils ne constituent en aucun cas des conseils financiers, juridiques, fiscaux ou d'investissement personnalisés.",
  },
  {
    title: "Exclusion de responsabilité",
    text: "L'auteur, les contributeurs et les hébergeurs déclinent toute responsabilité pour les pertes, dommages, erreurs ou conséquences résultant de l'utilisation de ce calculateur ou des décisions prises sur la base de ses résultats.",
  },
  {
    title: "Données et précision",
    text: "Les données utilisées proviennent de sources publiques et peuvent être inexactes, obsolètes ou non représentatives de votre situation. Les résultats sont des estimations approximatives et ne garantissent aucun résultat financier futur.",
  },
  {
    title: "Conseil professionnel recommandé",
    text: "Consultez toujours un conseiller financier agréé, un expert-comptable ou un notaire avant toute décision financière importante. Cet outil ne remplace pas un accompagnement professionnel personnalisé.",
  },
  {
    title: "Limitation de garantie",
    text: "Aucune garantie n'est donnée quant à la disponibilité, la sécurité, l'exactitude ou la performance de ce service. L'utilisateur assume tous les risques liés à son utilisation.",
  },
  {
    title: "Acceptation des conditions",
    text: "En utilisant ce service, vous acceptez intégralement ces conditions, reconnaissez avoir été informé(e) de ces limitations et déchargez les créateurs de toute responsabilité. Si vous n'acceptez pas ces conditions, cessez immédiatement d'utiliser ce service.",
  },
];

// Onglets à défilement horizontal sur mobile
const ScrollTabs = ({ tabs }) => (
  <div className="-mx-4 overflow-x-auto px-4 py-1 print:hidden">
    <TabsList className="h-10! rounded-full border bg-card p-1 shadow-sm">
      {tabs.map(({ key, label }) => (
        <TabsTrigger
          key={key}
          value={key}
          className="rounded-full px-4 data-active:bg-primary! data-active:text-primary-foreground! data-active:shadow-sm"
        >
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  </div>
);

const Empty = ({ children }) => (
  <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed bg-card/60 p-10 text-center text-sm text-muted-foreground">
    <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Sparkles className="size-5" />
    </span>
    {children}
  </div>
);

function App() {
  const [calculationResults, setCalculationResults] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [legalModalVisible, setLegalModalVisible] = useState(false);
  const [sourcesModalVisible, setSourcesModalVisible] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    // Check if user has already accepted terms in this session
    const accepted = sessionStorage.getItem("termsAccepted");
    if (!accepted) {
      setLegalModalVisible(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    if (hasAcceptedTerms) {
      sessionStorage.setItem("termsAccepted", "true");
      setLegalModalVisible(false);
    }
  };

  const handleCalculationComplete = (results, profile, { scroll } = {}) => {
    setCalculationResults(results);
    setUserProfile(profile);
    if (scroll && window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() =>
        resultsRef.current?.scrollIntoView({ behavior: "smooth" })
      );
    }
  };

  const ready = calculationResults && userProfile;
  const inputsKey = ready ? JSON.stringify(userProfile.inputs) : "";
  const needsForm = (
    <Empty>Remplissez le formulaire pour utiliser cet outil.</Empty>
  );

  const toolTabs = [
    { key: "whatif", label: "Et si... ?" },
    { key: "savings", label: "Mon épargne" },
    { key: "projection", label: "Projection" },
    { key: "purchase", label: "Projet d'achat" },
    { key: "salary", label: "Mon salaire" },
    { key: "rent", label: "Encadrement du loyer" },
  ];

  return (
    <div className="page-backdrop min-h-svh">
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-lg print:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <span className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-white shadow-sm shadow-primary/30">
              <PiggyBank className="size-4.5" />
            </span>
            Épargne Paris
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSourcesModalVisible(true)}
          >
            <BookOpen data-icon="inline-start" />
            Sources
          </Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10">
        <div className="flex max-w-3xl animate-in flex-col items-start gap-4 pt-4 duration-700 fade-in slide-in-from-bottom-3">
          <button
            type="button"
            onClick={() => setSourcesModalVisible(true)}
            className="flex items-center gap-1.5 rounded-full border bg-card/80 px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:border-primary/40"
          >
            <BadgeCheck className="size-3.5 text-primary" />
            Données officielles vérifiées en octobre 2026
          </button>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Combien pouvez‑vous épargner{" "}
            <span className="text-gradient">à Paris</span> ?
          </h1>
          <p className="text-lg text-muted-foreground">
            Un calcul de votre capacité d&apos;épargne à partir des loyers,
            salaires et tarifs officiels d&apos;Île-de-France.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Section title="Votre situation" className="print:hidden">
            <SavingsCalculator
              onCalculationComplete={handleCalculationComplete}
            />
          </Section>
          <div ref={resultsRef} className="scroll-mt-20 lg:sticky lg:top-20">
            {ready ? (
              <div className="animate-in duration-500 fade-in slide-in-from-bottom-3">
                <ResultsDisplay
                  results={calculationResults}
                  userProfile={userProfile}
                />
              </div>
            ) : (
              <Empty>
                Vos résultats apparaîtront ici une fois le formulaire rempli.
              </Empty>
            )}
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Outils</h2>
          <Tabs defaultValue="whatif" className="gap-4">
            <ScrollTabs tabs={toolTabs} />
            <TabsContent className="animate-in duration-300 fade-in" value="whatif">
              {ready ? (
                <WhatIfSimulator
                  key={inputsKey}
                  results={calculationResults}
                  userProfile={userProfile}
                />
              ) : (
                needsForm
              )}
            </TabsContent>
            <TabsContent className="animate-in duration-300 fade-in" value="savings">
              {ready ? (
                <div className="grid items-start gap-6 lg:grid-cols-2">
                  <EmergencyFund
                    results={calculationResults}
                    userProfile={userProfile}
                  />
                  <ProductAllocator
                    key={inputsKey}
                    results={calculationResults}
                    userProfile={userProfile}
                  />
                </div>
              ) : (
                needsForm
              )}
            </TabsContent>
            <TabsContent className="animate-in duration-300 fade-in" value="projection">
              {ready ? (
                <SavingsProjection
                  monthlySavings={calculationResults.disposableIncome}
                  initialBalance={userProfile.currentSavings}
                  userAge={parseInt(userProfile.ageRange)}
                />
              ) : (
                needsForm
              )}
            </TabsContent>
            <TabsContent className="animate-in duration-300 fade-in" value="purchase">
              {ready ? (
                <HomePurchaseSimulator
                  key={`${userProfile.location}-${userProfile.housingType}`}
                  results={calculationResults}
                  userProfile={userProfile}
                />
              ) : (
                needsForm
              )}
            </TabsContent>
            <TabsContent className="animate-in duration-300 fade-in" value="salary">
              {ready ? (
                <PeerComparison
                  key={userProfile.location}
                  userProfile={userProfile}
                />
              ) : (
                needsForm
              )}
            </TabsContent>
            <TabsContent className="animate-in duration-300 fade-in" value="rent">
              <RentCapChecker />
            </TabsContent>
          </Tabs>
        </section>

        <section className="grid items-start gap-6 lg:grid-cols-2 print:hidden">
          <Section
            title="Données de référence"
            description="Les chiffres officiels utilisés par le calculateur."
          >
            <DataVisualization userProfile={userProfile} />
          </Section>
          <Section
            title="Conseils"
            description="Adaptés à votre âge et à votre zone une fois le formulaire rempli."
          >
            <TipsAndAdvice
              userProfile={userProfile}
              results={calculationResults}
            />
          </Section>
        </section>

        <section className="flex flex-col gap-4 print:hidden">
          <h2 className="text-xl font-semibold tracking-tight">
            Guide de l&apos;épargne à Paris
          </h2>
          <Tabs defaultValue="overview" className="gap-4">
            <ScrollTabs tabs={GUIDE_TABS} />
            {GUIDE_TABS.map(({ key }) => (
              <TabsContent key={key} value={key} className="animate-in duration-300 fade-in">
                <div className="rounded-xl bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] ring-1 ring-foreground/10">
                  <GuideInfo section={key} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>

      <footer className="border-t bg-background/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-xs leading-relaxed text-muted-foreground">
          <span className="text-sm font-medium text-foreground">
            Avis légal et limitation de responsabilité
          </span>
          <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
            {LEGAL_NOTICES.map(({ title, text }) => (
              <p key={title}>
                <strong className="font-medium text-foreground">
                  {title}.
                </strong>{" "}
                {text}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4">
            <span>
              © 2026 Calculateur d&apos;Épargne Paris. Conditions complètes
              dans le fichier LEGAL.md du projet.
            </span>
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs print:hidden"
              onClick={() => setSourcesModalVisible(true)}
            >
              Consulter les sources et références
            </Button>
          </div>
        </div>
      </footer>

      <Sources
        visible={sourcesModalVisible}
        onClose={() => setSourcesModalVisible(false)}
      />

      {/* Legal Disclaimer Modal */}
      <Dialog open={legalModalVisible}>
        <DialogContent
          showCloseButton={false}
          onEscapeKeyDown={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
          className="sm:max-w-lg"
        >
          <DialogHeader>
            <DialogTitle>Avant de commencer</DialogTitle>
            <DialogDescription>
              Ce calculateur d&apos;épargne est fourni « en l&apos;état », sans
              aucune garantie.
            </DialogDescription>
          </DialogHeader>
          <div className="flex max-h-[45svh] flex-col gap-3 overflow-y-auto text-sm text-muted-foreground">
            <p>
              <strong className="font-medium text-foreground">
                Exclusion de responsabilité.
              </strong>{" "}
              Les créateurs déclinent toute responsabilité pour les pertes
              financières, erreurs de calcul, ou décisions prises sur la base
              de ces résultats.
            </p>
            <p>
              <strong className="font-medium text-foreground">
                Usage informatif uniquement.
              </strong>{" "}
              Ce calculateur fournit des estimations éducatives. Il ne constitue
              pas un conseil financier professionnel personnalisé.
            </p>
            <p>
              <strong className="font-medium text-foreground">
                Consultation professionnelle.
              </strong>{" "}
              Consultez toujours un conseiller financier agréé avant toute
              décision financière importante.
            </p>
            <p>
              <strong className="font-medium text-foreground">
                Limitations des données.
              </strong>{" "}
              Les données peuvent être inexactes, obsolètes ou non
              représentatives de votre situation personnelle.
            </p>
            <p>
              L&apos;utilisation de ce service est entièrement à vos risques et
              périls. Si vous n&apos;acceptez pas ces conditions, fermez cette
              page.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="accept-terms"
              checked={hasAcceptedTerms}
              onCheckedChange={(checked) => setHasAcceptedTerms(checked === true)}
            />
            <Label htmlFor="accept-terms">
              J&apos;ai lu et j&apos;accepte ces conditions
            </Label>
          </div>
          <DialogFooter>
            <Button disabled={!hasAcceptedTerms} onClick={handleAcceptTerms}>
              Accepter et continuer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}

export default App;
