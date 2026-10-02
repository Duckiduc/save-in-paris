import { useEffect, useRef, useState } from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const TONES = {
  success: { icon: CircleCheck, className: "text-success" },
  warning: { icon: TriangleAlert, className: "text-warning" },
  error: { icon: CircleAlert, className: "text-destructive" },
  info: { icon: Info, className: "text-primary" },
};

export const toneClass = (tone) => TONES[tone]?.className;

// Carte de section : titre, icône, description et action optionnelles
export const Section = ({
  title,
  icon: Icon,
  description,
  action,
  className,
  children,
}) => (
  <Card
    className={cn(
      "break-inside-avoid shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] transition-shadow duration-300 [--card-spacing:--spacing(5)] hover:shadow-[0_1px_2px_rgb(0_0_0/0.05),0_16px_36px_-14px_rgb(0_0_0/0.2)]",
      className
    )}
  >
    <CardHeader>
      <CardTitle className="flex items-center gap-2.5">
        {Icon && (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
        )}
        {title}
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
      {action && <CardAction>{action}</CardAction>}
    </CardHeader>
    <CardContent className="stagger flex flex-col gap-4">{children}</CardContent>
  </Card>
);

export const Stat = ({ label, value, hint, tone, size = "default" }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span
      className={cn(
        "font-semibold tabular-nums tracking-tight",
        size === "lg" ? "text-3xl" : "text-xl",
        toneClass(tone)
      )}
    >
      {value}
    </span>
    {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
  </div>
);

export const Notice = ({ tone = "info", title, children, className }) => {
  const { icon: Icon, className: color } = TONES[tone];
  return (
    <Alert className={className}>
      <Icon className={color} />
      <AlertTitle>{title}</AlertTitle>
      {children && <AlertDescription>{children}</AlertDescription>}
    </Alert>
  );
};

export const Hint = ({ children }) => (
  <Popover>
    <PopoverTrigger
      type="button"
      aria-label="Aide"
      className="text-muted-foreground transition-colors hover:text-foreground"
    >
      <Info className="size-3.5" />
    </PopoverTrigger>
    <PopoverContent className="text-sm text-muted-foreground">
      {children}
    </PopoverContent>
  </Popover>
);

export const Field = ({ label, hint, error, className, children }) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <div className="flex items-center gap-1.5">
      <Label>{label}</Label>
      {hint && <Hint>{hint}</Hint>}
    </div>
    {children}
    {error && <span className="text-xs text-destructive">{error}</span>}
  </div>
);

// Champ numérique : renvoie un nombre, ou null quand le champ est vide
export const NumberInput = ({ value, onChange, className, ...props }) => (
  <Input
    type="number"
    inputMode="decimal"
    value={value ?? ""}
    onChange={(event) =>
      onChange(event.target.value === "" ? null : Number(event.target.value))
    }
    className={cn("tabular-nums", className)}
    {...props}
  />
);

// Liste déroulante : accepte des valeurs non textuelles (nombres)
export const Choice = ({ value, onChange, options, placeholder, ...props }) => (
  <Select
    value={value == null ? "" : String(value)}
    onValueChange={(next) =>
      onChange(options.find((option) => String(option.value) === next).value)
    }
  >
    <SelectTrigger className="w-full" {...props}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option.value} value={String(option.value)}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const Range = ({ label, value, onChange, className, ...props }) => (
  <div className={cn("flex flex-col gap-3", className)}>
    <Label>{label}</Label>
    <Slider
      className="**:data-[slot=slider-range]:bg-brand **:data-[slot=slider-track]:data-horizontal:h-1.5 **:data-[slot=slider-thumb]:size-4 **:data-[slot=slider-thumb]:border-primary **:data-[slot=slider-thumb]:shadow-sm"
      value={[value]}
      onValueChange={([next]) => onChange(next)}
      {...props}
    />
  </div>
);

// Fait défiler un nombre vers sa nouvelle valeur
export const useCountUp = (target, duration = 500) => {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = from.current;
    if (
      start === target ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      from.current = target;
      setValue(target);
      return;
    }
    let frame;
    const began = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - began) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      from.current = current;
      setValue(current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
};

export const Footnote = ({ children }) => (
  <p className="text-xs leading-relaxed text-muted-foreground">{children}</p>
);

// Habillage commun des graphiques Recharts
export const chartAxis = {
  stroke: "var(--border)",
  tick: { fill: "var(--muted-foreground)", fontSize: 12 },
  tickLine: false,
};
export const chartGrid = { stroke: "var(--border)", vertical: false };
export const chartTooltip = {
  cursor: { fill: "var(--muted)", opacity: 0.6 },
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    color: "var(--popover-foreground)",
    fontSize: 13,
  },
  labelStyle: { color: "var(--popover-foreground)", fontWeight: 500 },
  itemStyle: { color: "var(--popover-foreground)" },
};
