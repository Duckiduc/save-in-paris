import { useEffect, useState } from "react";
import { Scale } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import {
  Choice,
  Field,
  Footnote,
  Notice,
  NumberInput,
  Section,
  Stat,
} from "@/components/shared";
import { formatCurrency, RENT_CAP_END } from "../utils/financialUtils";

// Loyers de référence de la Ville de Paris (arrêtés préfectoraux), open data
const API =
  "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/logement-encadrement-des-loyers/records";

const query = async (params) => {
  const response = await fetch(`${API}?${new URLSearchParams(params)}`);
  if (!response.ok) throw new Error(response.statusText);
  return (await response.json()).results;
};

const PERIODS = [
  { value: "Avant 1946", label: "Avant 1946" },
  { value: "1946-1970", label: "1946-1970" },
  { value: "1971-1990", label: "1971-1990" },
  { value: "Apres 1990", label: "Après 1990" },
];

const ROOMS = [
  { value: 1, label: "1 pièce" },
  { value: 2, label: "2 pièces" },
  { value: 3, label: "3 pièces" },
  { value: 4, label: "4 pièces et +" },
];

const RentCapChecker = () => {
  const [year, setYear] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const [rooms, setRooms] = useState(2);
  const [period, setPeriod] = useState("Avant 1946");
  const [furnished, setFurnished] = useState(false);
  const [surface, setSurface] = useState(null);
  const [rent, setRent] = useState(null);
  const [reference, setReference] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [latest] = await query({
          select: "annee",
          order_by: "annee desc",
          limit: 1,
        });
        const rows = await query({
          select: "nom_quartier,code_grand_quartier",
          group_by: "nom_quartier,code_grand_quartier",
          where: `annee="${latest.annee}"`,
          limit: 100,
        });
        setYear(latest.annee);
        setDistricts(
          rows
            .map(({ nom_quartier, code_grand_quartier }) => {
              // 7511664 → 16e arrondissement
              const arrondissement = Number(
                String(code_grand_quartier).slice(3, 5)
              );
              return {
                value: nom_quartier,
                arrondissement,
              };
            })
            .sort(
              (a, b) =>
                a.arrondissement - b.arrondissement ||
                a.value.localeCompare(b.value)
            )
        );
      } catch {
        setError(true);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!year || !district) return;
    let cancelled = false;
    setLoading(true);
    query({
      select: "ref,max,min",
      where: `annee="${year}" and nom_quartier="${district}" and piece=${rooms} and epoque="${period}" and meuble_txt="${
        furnished ? "meublé" : "non meublé"
      }"`,
      limit: 1,
    })
      .then(([row]) => !cancelled && setReference(row || null))
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [year, district, rooms, period, furnished]);

  const ceiling = reference && surface ? reference.max * surface : null;
  const excess = ceiling && rent ? rent - ceiling : null;

  const expired = new Date() > new Date(`${RENT_CAP_END}T23:59:59`);
  const arrondissements = [...new Set(districts.map((d) => d.arrondissement))];
  const perSqm = (value) => `${value.toFixed(1).replace(".", ",")} €/m²`;

  return (
    <Section
      title="Mon loyer respecte-t-il l'encadrement ?"
      icon={Scale}
      description="À Paris, le loyer hors charges ne peut pas dépasser le loyer de référence majoré de votre quartier."
    >
      {error ? (
        <Notice
          tone="warning"
          title="Les loyers de référence sont momentanément indisponibles (opendata.paris.fr)"
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Field label="Quartier" className="col-span-2">
              <NativeSelect
                className="w-full"
                value={district ?? ""}
                onChange={(event) => setDistrict(event.target.value)}
                disabled={!districts.length}
              >
                <NativeSelectOption value="" disabled>
                  {districts.length ? "Choisissez votre quartier" : "Chargement..."}
                </NativeSelectOption>
                {arrondissements.map((arrondissement) => (
                  <NativeSelectOptGroup
                    key={arrondissement}
                    label={`${arrondissement}${
                      arrondissement === 1 ? "er" : "e"
                    } arrondissement`}
                  >
                    {districts
                      .filter((d) => d.arrondissement === arrondissement)
                      .map((d) => (
                        <NativeSelectOption key={d.value} value={d.value}>
                          {d.value}
                        </NativeSelectOption>
                      ))}
                  </NativeSelectOptGroup>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Pièces">
              <Choice value={rooms} onChange={setRooms} options={ROOMS} />
            </Field>
            <Field label="Construction">
              <Choice value={period} onChange={setPeriod} options={PERIODS} />
            </Field>
            <Field label="Surface (m²)">
              <NumberInput
                value={surface}
                onChange={setSurface}
                min={9}
                placeholder="35"
              />
            </Field>
            <Field label="Loyer hors charges (€)">
              <NumberInput
                value={rent}
                onChange={setRent}
                min={0}
                placeholder="1 000"
              />
            </Field>
            <div className="col-span-2 flex h-8 items-center gap-2 self-end">
              <Switch
                id="furnished"
                checked={furnished}
                onCheckedChange={setFurnished}
              />
              <Label htmlFor="furnished">Logement meublé</Label>
            </div>
          </div>

          {reference && (
            <div
              className={`grid grid-cols-2 gap-4 rounded-xl bg-primary/5 p-4 ring-1 ring-primary/10 transition-opacity md:grid-cols-3 ${
                loading ? "opacity-50" : ""
              }`}
            >
              <Stat label="Loyer de référence" value={perSqm(reference.ref)} />
              <Stat label="Plafond (référence majorée)" value={perSqm(reference.max)} />
              {ceiling && (
                <Stat
                  label="Loyer maximum de votre logement"
                  value={formatCurrency(ceiling)}
                />
              )}
            </div>
          )}
          {excess !== null &&
            (excess > 0 ? (
              <Notice
                tone="warning"
                title={`Votre loyer dépasse le plafond de ${formatCurrency(
                  excess
                )} par mois, soit ${formatCurrency(excess * 12)} par an`}
              >
                Un dépassement n&apos;est légal que si le bail prévoit un
                complément de loyer justifié par des caractéristiques
                exceptionnelles. Vous pouvez le contester auprès de la Ville de
                Paris ou de la commission départementale de conciliation.
              </Notice>
            ) : (
              <Notice tone="success" title="Votre loyer respecte le plafond" />
            ))}
          <Notice
            tone={expired ? "warning" : "info"}
            title={
              expired
                ? "L'expérimentation de l'encadrement a pris fin le 24 novembre 2026"
                : "Encadrement garanti jusqu'au 24 novembre 2026"
            }
          >
            {expired
              ? "Vérifiez auprès de la Ville de Paris ou de la DRIHL si une loi a prolongé le dispositif avant de vous appuyer sur ce plafond."
              : "L'arrêté de 2026 s'applique du 1er juillet au 24 novembre 2026, date de fin de l'expérimentation prévue par la loi ELAN. Sa prolongation dépend d'une loi."}
          </Notice>
          <Footnote>
            {year &&
              `Loyers de référence de l'arrêté applicable au 1er juillet ${year} (Ville de Paris, open data). `}
            Le plafond s&apos;applique aux baux signés ou renouvelés depuis
            juillet 2019. Vérifiez l&apos;arrêté en vigueur à la date de votre
            bail.
          </Footnote>
        </>
      )}
    </Section>
  );
};

export default RentCapChecker;
