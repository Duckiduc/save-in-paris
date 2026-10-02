# Calculateur d'épargne Île-de-France : chiffres officiels les plus récents (état au 2 octobre 2026)

Sur les 7 points, 4 sont couverts par une source officielle autorisée avec une valeur directement utilisable : le Navigo Mois, l'arrêté d'encadrement des loyers de Paris, le taux des crédits à l'habitat et la hausse des droits de mutation. Les 3 autres ne le sont que partiellement : les loyers OLAP (les montants en euros et les surfaces par nombre de pièces manquent), les prix au m² par département (le tableau complet du 2e trimestre 2026 n'a pas pu être ouvert) et la dépense alimentaire (il n'existe aucun montant mensuel officiel pour l'Île-de-France ; la dernière donnée INSEE date de 2017).

## TL;DR
- **Valeurs à intégrer directement :**
  - Navigo Mois toutes zones : 90,80 € (2-3 : 88,80 € ; 3-4 : 86,40 € ; 4-5 : 84,40 €) depuis le 1er janvier 2026.
  - Taux moyen des nouveaux crédits à l'habitat hors renégociations : 3,30 % en juillet 2026 (Banque de France).
  - Droits de mutation : taux départemental de 5 % dans les 8 départements d'Île-de-France.
  - Frais d'acquisition dans l'ancien : « proches de 8 % » selon les Notaires du Grand Paris.
- **Loyers :**
  - Le dernier rapport OLAP trouvé (août 2025, mis en ligne le 29/10/2025) donne les loyers au 1er janvier 2025 : 1 307 € pour 50 m² à Paris, 996 € pour 52 m² en petite couronne, 897 € pour 58 m² en grande couronne.
  - À Paris, l'arrêté n° IDF-2026-06-12-00003 du 12 juin 2026 s'applique seulement du 1er juillet au 24 novembre 2026, date de fin de l'expérimentation ELAN.
- **Chiffres partiels :**
  - Prix au m² par département au T2 2026 : seuls l'Île-de-France (6 130 €/m², +0,3 % sur un an) et quelques départements sont confirmés. Le tableau complet par département le plus récent qui ait été vérifié correspond à janvier 2026 ; pour mars-mai 2026, la page officielle des Notaires (« Conjoncture immobilière en Ile-de-France de mars à mai 2026 », paris.notaires.fr) donne seulement 6 120 €/m² en Île-de-France (+0,3 % sur un an) et 9 520 €/m² à Paris (+0,1 %), avec des variations par département « comprises entre -0,4 % dans le Val-de-Marne et +1 % dans les Hauts-de-Seine ».
  - Alimentation : seule une part de budget est disponible (14 % pour l'alimentation à domicile dans l'agglomération parisienne, INSEE 2017), aucun montant en euros.

## Tableaux récapitulatifs par point

### 1. Forfait Navigo Mois (IDFM)

| Zones | Tarif mensuel plein tarif | Navigo Annuel (référence) |
|---|---|---|
| Toutes zones (1 à 5) | **90,80 €** | 998,80 € |
| Zones 2 à 3 | **88,80 €** | 976,80 € |
| Zones 3 à 4 | **86,40 €** | 950,40 € |
| Zones 4 à 5 | **84,40 €** | 928,40 €\[1\] |

- **Source primaire :** guide tarifaire IDFM « Tarifs applicables au 1er janvier 2026 – Forfaits Navigo et tickets », https://www.iledefrance-mobilites.fr/medias/portail-idfm/acEkM5GXnQHGY2UT_IDFM_guide_tarifaire_A5_190326-2.pdf
- **Date de publication :** non indiquée dans le document. Le nom du fichier (« 190326 ») suggère une édition du 19 mars 2026. Il existe une édition antérieure : …_IDFM_guide_tarifaire_A5_020226.pdf.
- **Période de validité :** tarifs en vigueur depuis le 1er janvier 2026. Le forfait est « valable un mois, du premier au dernier jour du mois, sur tous les modes de transport, sauf Orlyval ». Les forfaits par zones sont dézonés les week-ends, les jours fériés, pendant les petites vacances de la zone C et de mi-juillet à mi-août.\[1\]
- **Contexte :** IDFM annonçait une hausse moyenne de 2,3 % et +2 € sur l'abonnement mensuel (communiqué presse.iledefrance-mobilites.fr).\[2\] Pour le calculateur, l'employeur rembourse au moins 50 %.\[1\]

### 2. Loyers moyens hors charges (OLAP)

| Zone (parc privé non meublé) | Loyer moyen mensuel au 1/1/2025 | Surface moyenne | €/m² |
|---|---|---|---|
| Paris | **1 307 €** | 50 m² | 26,3 |
| Petite couronne (92, 93, 94) | **996 €** | 52 m² | 19,1 |
| Grande couronne (partie agglomérée 77, 78, 91, 95) | **897 €** | 58 m² | 15,6 |
| Agglomération parisienne | **1 070 €** | 53 m² | 20,3\[3\] |

Loyer au m² selon le nombre de pièces, tous logements confondus, au 1/1/2025 (OLAP, tableau n° 3) :

| €/m² | 1 p. | 2 p. | 3 p. | 4 p. | 5 p. et + |
|---|---|---|---|---|---|
| Paris | 30,4 | 26,7 | 25,1 | 24,3 | 25,9 |
| Petite couronne | 23,7 | 20,2 | 17,9 | 16,9 | 18,5 |
| Grande couronne | 21,4 | 17,0 | 14,6 | 14,0 | 14,3\[3\] |

Pour les emménagés récents, les loyers moyens sont de 28,3 €/m² à Paris, 21,3 €/m² en petite couronne et 16,9 €/m² en grande couronne.\[3\] Ce sont les valeurs à retenir pour simuler une nouvelle location.

- **Source primaire :** OLAP, « Évolution en 2024 des loyers d'habitation du secteur locatif privé dans l'agglomération parisienne », https://www.observatoire-des-loyers.fr/sites/default/files/olap_documents/rapports_loyers/Rapport%20Paris%202025.pdf (page d'annonce : https://www.observatoire-des-loyers.fr/observatoire/actualites/nouveau-sur-le-site/rapport-agglomeration-parisienne-2025). \[3\]
- **Date de publication :** le rapport est daté d'« Août 2025 » ; il a été mis en ligne le 29/10/2025.\[3\]\[4\]
- **Période des données :** niveaux au 1er janvier 2025, évolution sur l'année 2024. L'enquête porte sur 10 817 logements.\[3\]

### 3. Encadrement des loyers à Paris

| Élément | Valeur |
|---|---|
| Arrêté en vigueur | **Arrêté préfectoral n° IDF-2026-06-12-00003** fixant les loyers de référence, majorés et minorés pour la ville de Paris |
| Date | 12 juin 2026 |
| Période de validité | **du 1er juillet 2026 au 24 novembre 2026**, à titre exceptionnel, en raison de la fin de l'expérimentation prévue par la loi ELAN\[5\]\[6\] |
| Arrêté précédent | n° 2025-06-16-00003, valable du 1er juillet 2025 au 30 juin 2026\[7\] |
| Téléchargement (DRIHL, PDF de l'arrêté avec annexe 2 des loyers de référence) | https://www.drihl.ile-de-france.developpement-durable.gouv.fr/IMG/pdf/arrete_no_2026-06-12-00003_fixant_les_loyers_de_reference_les_loyers_de_reference_majores_et_les_loyers_de_reference_minores_pour_de_la_ville_de_paris_du_1er_jullet_2026_au_24_novembre_2026_.pdf |
| Annonce DRIHL | https://www.drihl.ile-de-france.developpement-durable.gouv.fr/renouvellement-2026-de-l-arrete-annuel-d-a1512.html?lang=fr (publiée le 01/07/2026)\[8\] |
| Page Ville de Paris | https://www.paris.fr/pages/l-encadrement-des-loyers-comprendre-le-dispositif-29091 |

Les loyers de référence sont fixés par secteur (14 zones, 80 quartiers), par période de construction, par nombre de pièces et selon que le logement est loué vide ou meublé.\[9\] Le loyer de référence majoré est égal au loyer de référence + 20 %, le loyer minoré au loyer de référence − 30 %.\[10\]\[11\]

**Conséquence pour un calculateur :** ce plafond n'est garanti que jusqu'au 24 novembre 2026. Après cette date, sa prolongation dépend d'une loi qui n'est pas encore votée.\[5\] Le calculateur doit donc rendre le plafond désactivable.

### 4. Prix au m² des appartements anciens (Notaires du Grand Paris / indices Notaires-INSEE)

**Dernier trimestre publié : T2 2026 (avril-juin), publication du 08/09/2026**

| Zone | €/m² T2 2026 | Évolution sur un an | Statut de la vérification |
|---|---|---|---|
| Île-de-France | **6 130 €** | +0,3 % (−0,3 % sur le trimestre) | Officiel : carte des prix des Notaires du Grand Paris (« prix au 2e trimestre 2026 ») ; la hausse de +0,3 % figure aussi dans le communiqué\[12\]\[13\]\[14\] |
| Paris (75) | 9 560 € (rapporté par la presse : Immo Matin et MySweetimmo, citant les Notaires du Grand Paris le 08/09/2026 : « À Paris, le prix des appartements anciens s'établit à 9 560 €/m², en très légère hausse de 0,6 % en un an ») | +0,6 % (presse) | **Non vérifié** dans le PDF officiel ; la page officielle du T2 confirme seulement des prix quasi stables sur un an (−0,3 % pour les logements, +0,3 % pour les appartements) |
| 92, 93, 94, 77, 78, 91, 95 | 92 : 5 940 € ; 77 : 2 810 € (source secondaire europe-business-news.com, 09/09/2026, citant les Notaires du Grand Paris pour le T2 2026) ; 93, 94, 78, 91, 95 : — | — | **Non vérifié** pour le 92 et le 77 ; **introuvable** pour les autres : le PDF officiel du dossier T2 2026 n'a pas pu être ouvert |

- **Communiqué T2 2026 :** https://paris.notaires.fr/fr/presse/communication-immobiliere-mensuelle/conjoncture-immobiliere-en-ile-de-france-au-2e-trimestre-2026 (publié le 08/09/2026). Le dossier PDF est lié depuis cette page : http://paris.notaires.fr/sites/default/files/2026-09/Dossier%20de%20presse_T2%202026.pdf \[15\]

**Tableau complet par département le plus récent qui ait été vérifié : novembre 2025-janvier 2026** (communiqué du 26 mars 2026 ; donnée officielle plus récente pour mars-mai 2026, mais sans détail par département : 6 120 €/m² en Île-de-France et 9 520 €/m² à Paris, page « Conjoncture immobilière en Ile-de-France de mars à mai 2026 », paris.notaires.fr)

| IdF | Paris 75 | Petite couronne | 92 | 93 | 94 | Grande couronne | 77 | 78 | 91 | 95 |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 140 € | 9 570 € | 4 910 € | 5 960 € | 3 690 € | 4 750 € | 3 190 € | 2 770 € | 4 050 € | 2 790 € | 2 880 €\[16\] |

- **URL :** https://notairesdugrandparis.fr/sites/default/files/2026-03/Communiqu%C3%A9%20mensuel_2026-03_prix%20fin%20janvier%202026.pdf
- **Période :** ventes de novembre 2025 à janvier 2026.\[16\]

Pour comparaison, au T4 2025, dernier point de la série trimestrielle officielle : IdF 6 160 €, Paris 9 600 €, 92 5 990 €, 93 3 710 €, 94 4 740 €, 77 2 800 €, 78 4 050 €, 91 2 810 €, 95 2 890 €. Source : https://paris.notaires.fr/sites/default/files/Historiquedesprixdesappartementspardep_3.pdf

**Lecture :** sur un an, les prix franciliens sont quasi stables (entre +0,3 % et +1 % pour les appartements).\[13\]\[15\]\[16\]\[17\] Utiliser le tableau de janvier 2026 au lieu du T2 2026 entraîne donc une erreur probablement inférieure à 1 %. Il faudra quand même le remplacer dès que le PDF T2 2026 aura été lu.

### 5. Dépense alimentaire des ménages (INSEE, Budget de famille)

| Indicateur | Valeur | Périmètre |
|---|---|---|
| Part de l'alimentation à domicile dans le budget | **14 %** (contre 17 % en commune rurale) | Agglomération parisienne (unité urbaine de Paris) |
| Consommation totale des ménages par rapport à la moyenne nationale | **+16 % par ménage, +18 % par unité de consommation** | Agglomération parisienne |
| Part de l'alimentation hors tabac et alcool | 15,6 % | France (moyenne nationale)\[18\] |
| Consommation moyenne d'un ménage | 34 000 € par an | France (moyenne nationale)\[19\] |

- **Source primaire :** INSEE Première n° 1749, « Les comportements de consommation en 2017 », https://www.insee.fr/fr/statistiques/4127596 (publié en 2019 ; tableaux détaillés dans « Les dépenses des ménages en 2017 », Insee Résultats, septembre 2020).
- **Année des données :** enquête Budget de famille 2017 (terrain d'octobre 2016 à octobre 2017).\[20\]
- **Montant mensuel en euros pour l'Île-de-France : introuvable** dans les sources consultées. Un ordre de grandeur peut être calculé : 34 000 € × 1,16 × 14 % / 12, soit environ 460 € par mois et par ménage en euros de 2017. Ce n'est pas un chiffre INSEE : c'est un calcul à revaloriser avec l'indice des prix alimentaires.
- **Prochaine donnée :** l'enquête Budget de famille 2026 est en cours de collecte (janvier à décembre 2026). Selon le Cnis, ses premiers résultats sont prévus en 2028.\[21\]\[22\]

### 6. Frais d'acquisition (« frais de notaire ») dans l'ancien

| Élément | Valeur | Source |
|---|---|---|
| Frais et taxes totaux en région parisienne | **« proches de 8 % du prix »** | Notaires du Grand Paris, 16/05/2025 |
| Taux départemental des droits de mutation | **5 %** (au lieu de 4,5 %, soit +0,5 point) | idem |
| Départements d'IdF concernés | **les 8 départements** : Paris, Hauts-de-Seine, Val-de-Marne, Val-d'Oise, Seine-Saint-Denis, Seine-et-Marne, Essonne, Yvelines | idem |
| Primo-accédants (résidence principale) | Non concernés par la hausse : ils restent à 4,5 % | idem\[23\] |
| Durée | Actes signés du 1er avril 2025 au 31 mars 2028 (article 116 de la loi de finances pour 2025) | Cadre légal\[14\]\[24\] |

- **URL :** https://paris.notaires.fr/fr/actualites/ventes-immobilieres-augmentation-des-droits-denregistrement-dans-le-grand-paris (publié le 16/05/2025).
- **Simulateur officiel :** Service-Public.fr renvoie vers le simulateur de Notaires de France (https://entreprendre.service-public.fr/vosdroits/R16181, « Vérifié le 06 mai 2025 »).\[25\]
- **Paramétrage conseillé :**
  - acquéreur standard : 8 % ;
  - primo-accédant achetant sa résidence principale : environ 7,5 %, puisque son taux départemental reste à 4,5 %.
- **Date d'entrée en vigueur dans les départements :** seules des sources secondaires non officielles la donnent. Selon infosyvelines.fr, la hausse dans les Yvelines a été « votée par le conseil départemental le 7 mars 2025 » et s'applique au 1er mai 2025. Selexium et MyNotary placent le 78, le 94 et le 95 au 1er mai 2025, et le 75, le 92, le 93, le 91 et le 77 au 1er avril 2025. Aucune source de la liste autorisée ne le confirme.

### 7. Taux des crédits nouveaux à l'habitat (Banque de France)

| Indicateur | Juillet 2025 | Mai 2026 | Juin 2026 | **Juillet 2026** |
|---|---|---|---|---|
| Taux moyen des nouveaux crédits à l'habitat hors renégociations | 3,09 % | 3,21 % | 3,27 % | **3,30 %**\[26\]\[27\] |
| Taux moyen des crédits à l'habitat, y compris renégociations | 3,01 % | 3,11 % | 3,17 % | 3,19 % |
| Production hors renégociations (CVS) | 12,5 Md€ | 11,4 Md€ | 13,2 Md€ | 11,0 Md€\[27\]\[28\] |

- **Source primaire :** Banque de France, Stat Info « Crédits aux particuliers – France, 2026-07 », https://www.banque-france.fr/en/statistics/loans/loans-individuals-france-2026-07 (page mise à jour le 4 septembre 2026).\[28\]
- **Mois de référence :** juillet 2026. Le taux est un taux effectif au sens étroit, hors frais et assurance. Ce n'est pas un TAEG.\[26\]\[28\]\[29\]
- **Écart avec des sources secondaires :**
  - certains sites (Crédit Agricole, FBF) citent 3,18 % ou 3,19 %. Le 3,19 % correspond au taux y compris renégociations ;\[30\]\[31\]
  - le chiffre à retenir pour un achat est 3,30 %.
- **Tendance :** troisième hausse mensuelle consécutive.\[27\]\[28\] Les Notaires du Grand Paris évoquent « une probable hausse des taux de crédit à l'habitat ».\[15\] Le calculateur doit donc permettre un scénario à environ 3,5 %.
- **Durée observée :** la durée initiale moyenne des nouveaux prêts pour l'achat d'une résidence principale est de 23 ans et 4 mois (Banque de France, décembre 2025).\[32\]
- **HCSF (contexte) :** taux d'effort maximal de 35 % (assurance comprise), durée maximale de 25 ans, et jusqu'à 27 ans pour le neuf avec différé. Ces règles relèvent de la décision HCSF juridiquement contraignante depuis janvier 2022. Le HCSF a tenu sa séance du 3e trimestre le 15 septembre 2026 ; le communiqué est publié sur presse.economie.gouv.fr, mais je n'ai pas pu lire le PDF lui-même. D'après la presse (Journal de l'Agence), il « confirme le maintien du plafond de 35 % de taux d'effort, de la durée maximale de 25 ans et de la marge de flexibilité de 20 % ». La base juridique est la décision D-HCSF-2021-7, modifiée en 2023 (source secondaire).

## Chiffres introuvables ou partiels dans les sources autorisées

1. **Navigo : page HTML de la fiche « Navigo Mois » sur iledefrance-mobilites.fr non consultée.** Les tarifs viennent du guide tarifaire PDF hébergé sur le site d'IDFM, qui ne porte pas de date de mise à jour explicite. La date du 19/03/2026 est seulement déduite du nom du fichier.
2. **OLAP : partiel.**
   - Le loyer mensuel en euros et la surface moyenne par nombre de pièces se trouvent en annexe du rapport. Je ne les ai pas extraits. Seul le loyer au m² par nombre de pièces est fourni ci-dessus.
   - Aucun rapport OLAP 2026 (loyers au 1/1/2026) n'a été trouvé. Le rapport d'août 2025 reste le plus récent identifié.
3. **Encadrement des loyers :** les données sont complètes. Il faut seulement savoir que l'arrêté expire le 24 novembre 2026 et qu'aucun arrêté ultérieur n'existe pour l'instant.
4. **Prix au m² par département au T2 2026 : partiel.**
   - Seul le chiffre Île-de-France (6 130 €/m²) est confirmé par une source notariale officielle.
   - Les valeurs des départements 75, 77, 78, 91, 92, 93 et 95 au T2 2026 sont introuvables, car le PDF du dossier de presse n'a pas pu être lu. Le chiffre de 9 560 €/m² pour Paris ne vient que de la presse.
   - Le tableau de janvier 2026 sert de substitut officiel.
5. **Dépense alimentaire mensuelle : introuvable en euros pour l'Île-de-France.**
   - L'INSEE ne publie que des parts budgétaires et des écarts à la moyenne pour l'agglomération parisienne, et seulement avec des données de 2017.
   - Le périmètre est « agglomération parisienne » (unité urbaine), pas la région Île-de-France.
   - Aucune donnée plus récente n'existe avant 2028.
6. **Frais de notaire sur Service-Public.fr : partiel.** La fiche « Frais de notaire » (F17701) n'a pas pu être consultée : son pourcentage et sa date « Vérifié le » sont introuvables. La valeur retenue vient des Notaires du Grand Paris, qui figurent dans la liste autorisée.
7. **HCSF : texte primaire non lu.** Le communiqué de la séance du 15 septembre 2026 est publié sur presse.economie.gouv.fr, mais son PDF n'a pas pu être consulté. Le maintien des 35 %, des 25 ans et de la marge de flexibilité de 20 % n'est donc confirmé que par la presse (Journal de l'Agence). La décision de référence est la D-HCSF-2021-7, modifiée en 2023.
8. **Taux Banque de France d'août 2026 :** pas encore publié au 2 octobre 2026. La publication est attendue début octobre.

## Recommandations pour le calculateur

- **Valeurs par défaut :**
  - transport : Navigo 90,80 € par mois, moins 50 % de remboursement employeur, soit 45,40 € à charge ;
  - taux de crédit : 3,30 % sur 20 à 25 ans, avec un test à 3,5 % ;
  - frais d'acquisition : 8 % (7,5 % pour un primo-accédant) ;
  - loyers : OLAP « emménagés récents » en €/m².
- **Champs à dater et à mettre à jour :**
  - prix au m² par département, chaque mois (Notaires du Grand Paris) ;
  - taux de crédit, chaque mois (Banque de France) ;
  - plafond d'encadrement à Paris, à revoir le 24 novembre 2026.
- **Alimentation :** afficher la valeur comme une estimation dérivée et non comme un chiffre officiel, ou demander à l'utilisateur de saisir son propre budget.

## Sources

1. [Tarifs applicables au 1er janvier 2026 Forfaits Navigo et tickets](https://www.iledefrance-mobilites.fr/medias/portail-idfm/acEkM5GXnQHGY2UT_IDFM_guide_tarifaire_A5_190326-2.pdf)
2. [TARIFS NAVIGO 2026 : UNE ÉVOLUTION TARIFAIRE LIMITÉE POUR ACCOMPAGNER L'OFFRE SUPPLÉMENTAIRE - Île-de-France Mobilités](https://presse.iledefrance-mobilites.fr/tarifs-navigo-2026-une-evolution-tarifaire-limitee-pour-accompagner-loffre-supplementaire/)
3. [Observatoire des Loyers de l’Agglomération Parisienne](https://www.observatoire-des-loyers.fr/sites/default/files/olap_documents/rapports_loyers/Rapport%20Paris%202025.pdf)
4. [Rapport agglomération parisienne 2025](https://www.observatoire-des-loyers.fr/observatoire/actualites/nouveau-sur-le-site/rapport-agglomeration-parisienne-2025)
5. [Encadrement des loyers : tout comprendre sur le - Ville de Paris](https://www.paris.fr/pages/l-encadrement-des-loyers-comprendre-le-dispositif-29091)
6. [Encadrement des loyers Paris : plafonds au 1er juillet 2026](https://quelbail.fr/encadrement-loyers)
7. [Arrêtés fixant les loyers de référence, les loyers de référence majorés et les loyers de référence minorés pour la Ville de Paris](https://www.drihl.ile-de-france.developpement-durable.gouv.fr/arrete-fixant-les-loyers-de-reference-les-loyers-a291.html?lang=fr)
8. [Renouvellement 2026 de l’arrêté annuel d’encadrement des loyers pour la ville de Paris](https://www.drihl.ile-de-france.developpement-durable.gouv.fr/renouvellement-2026-de-l-arrete-annuel-d-a1512.html?lang=fr)
9. [Encadrement des loyers à Paris - ADIL de Paris](https://www.adil75.org/ladil-de-paris/encadrement-des-loyers-a-paris/)
10. [Estimation loyers Paris 2025 : Prix par arrondissement](https://plusse.co/guide/estimation-loyers-paris-2025-fixer-prix/)
11. [www.assemblee-nationale.fr](https://www.assemblee-nationale.fr/dyn/15/questions/QANR5L15QE39978.pdf)
12. [Carte des prix de l’immobilier du Grand Paris](https://chambre-essonne.notaires.fr/fr/carte-des-prix)
13. [Conjoncture immobilière en Ile de France au 2ème trimestre 2026 : une reprise de l'activité progressive mais un marché toujours fragile. - Chambre des Notaires de l’Ouest Parisien](https://cinop.notaires.fr/une-reprise-de-lactivite-progressive-mais-un-marche-toujours-fragile/?nom-colonne-tri=psvmsfedeeab)
14. [Marché immobilier en Île-de-France : reprise fragile au 2e trimestre 2026](https://monimmeuble.com/actualite/marche-immobilier-en-ile-de-france-reprise-fragile-au-2e-trimestre-2026)
15. [Conjoncture immobilière en Ile-de-France au 2e trimestre 2026 | Chambre de Paris](https://paris.notaires.fr/fr/presse/communication-immobiliere-mensuelle/conjoncture-immobiliere-en-ile-de-france-au-2e-trimestre-2026)
16. [Le marché immobilier résidentiel ancien dans Ie Grand Paris 26 mars 2026](https://notairesdugrandparis.fr/sites/default/files/2026-03/Communiqu%C3%A9%20mensuel_2026-03_prix%20fin%20janvier%202026.pdf)
17. [​Marché immobilier du Grand Paris : reprise fragile au T1 2026](https://monimmeuble.com/actualite/marche-immobilier-du-grand-paris-reprise-fragile-au-t1-2026)
18. [Les comportements de consommation en 2017 - Insee Première - 1749](https://www.insee.fr/fr/statistiques/4127596)
19. [E](https://www.insee.fr/fr/statistiques/fichier/version-html/4127596/ip1749.pdf)
20. [En 2017, 20 % des ménages ont consommé des produits alimentaires de leur propre production ou de celle d’un autre ménage - Insee Focus - 236](https://www.insee.fr/fr/statistiques/5370353)
21. [Enquête Budget de famille - Cnis.fr](https://www.cnis.fr/enquetes/budget-de-famille/)
22. [INSEE-Enquête budget de famille-Une étude statistique dans notre commune - Mairie de Brou-Sur-Chantereine](https://www.brousurchantereine.info/actualite/insee-enquete-budget-de-famille-une-etude-statistique-dans-notre-commune/)
23. [Ventes immobilières : augmentation des droits d’enregistrement dans le Grand Paris](https://paris.notaires.fr/fr/actualites/ventes-immobilieres-augmentation-des-droits-denregistrement-dans-le-grand-paris)
24. [Frais de notaire à 5 % : le vrai surcoût, et qui y échappe](https://www.koliving.fr/droits-mutation-dmto-5-pourcent-frais-notaire-2026/)
25. [Calculer le montant des frais d'acquisition d'un bien immobilier](https://entreprendre.service-public.fr/vosdroits/R16181)
26. [Immobilier : les prix reculent, les taux repartent en 2026 - Meilleurtaux](https://www.meilleurtaux.com/credit-immobilier/actualites/2026-septembre/immobilier-les-prix-reculent-les-taux-repartent-en-2026.html)
27. [Crédit immobilier : la Banque de France chiffre la production à 11 milliards d'euros en juillet, le taux moyen grimpe à 3,30 %](https://www.zimo.fr/blog/immobilier/article/credit-immobilier-banque-de-france-production-juillet-2026-11-milliards-taux-3-30-pourcent)
28. [Loans to individuals, France - 2026-07](https://www.banque-france.fr/en/statistics/loans/loans-individuals-france-2026-07)
29. [Stat Info - Crédits aux particuliers](https://www.banque-france.fr/system/files/webstats/Credit_particuliers_202602_credit_conso_20260403/FR_Stat_info_Credits_aux_particuliers_202602.pdf)
30. [Taux de prêt immobilier : les tendances 2026](https://e-immobilier.credit-agricole.fr/guide-immobilier/pret-immobilier/taux-de-credit-immobilier)
31. [Derniers chiffres sur les crédits aux particuliers - Chiffres clés - Fédération bancaire française (FBF)](https://www.fbf.fr/fr/derniers-chiffres-sur-les-credits-aux-particuliers/)
32. [Crédits aux particuliers - 2025-12](https://www.banque-france.fr/en/statistics/loans/loans-individuals-france-2025-12)
