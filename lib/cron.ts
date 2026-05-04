// Minimal 5-field cron parser. Parses standard Vixie syntax: min hour dom month dow.
// Supports: * value list ranges step. Day-of-month and day-of-week are OR-ed when
// either is restricted, matching Vixie cron behaviour.

export interface CronFields {
  minute: Set<number>;
  hour: Set<number>;
  dom: Set<number>;
  month: Set<number>;
  dow: Set<number>;
  domRestricted: boolean;
  dowRestricted: boolean;
}

const RANGES = {
  minute: [0, 59],
  hour: [0, 23],
  dom: [1, 31],
  month: [1, 12],
  dow: [0, 6],
} as const;

function parseField(field: string, name: keyof typeof RANGES): Set<number> {
  const [lo, hi] = RANGES[name];
  const set = new Set<number>();
  for (const part of field.split(",")) {
    let stepValue = 1;
    let body = part;
    const stepIdx = part.indexOf("/");
    if (stepIdx >= 0) {
      stepValue = Number(part.slice(stepIdx + 1));
      body = part.slice(0, stepIdx);
      if (!Number.isInteger(stepValue) || stepValue < 1) {
        throw new Error(`Invalid step in ${name}: ${part}`);
      }
    }
    let from: number = lo;
    let to: number = hi;
    if (body !== "*" && body !== "") {
      if (body.includes("-")) {
        const [a, b] = body.split("-").map(Number);
        from = a;
        to = b;
      } else {
        from = Number(body);
        to = from;
      }
    }
    if (![from, to].every(Number.isInteger) || from < lo || to > hi || from > to) {
      throw new Error(`Invalid range in ${name}: ${part}`);
    }
    for (let v = from; v <= to; v += stepValue) {
      let n = v;
      if (name === "dow" && n === 7) n = 0;
      set.add(n);
    }
  }
  return set;
}

export function parseCron(expr: string): CronFields {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Expected 5 fields");
  return {
    minute: parseField(parts[0], "minute"),
    hour: parseField(parts[1], "hour"),
    dom: parseField(parts[2], "dom"),
    month: parseField(parts[3], "month"),
    dow: parseField(parts[4], "dow"),
    domRestricted: parts[2] !== "*",
    dowRestricted: parts[4] !== "*",
  };
}

export function nextRuns(fields: CronFields, from: Date, count: number): Date[] {
  const out: Date[] = [];
  // Start from the next minute boundary.
  const d = new Date(from);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  const limit = 60 * 24 * 366 * 4; // 4 years of minutes — generous safety net.
  let i = 0;
  while (out.length < count && i < limit) {
    if (
      fields.minute.has(d.getMinutes()) &&
      fields.hour.has(d.getHours()) &&
      fields.month.has(d.getMonth() + 1)
    ) {
      const dom = d.getDate();
      const dow = d.getDay();
      let dayMatch: boolean;
      if (fields.domRestricted && fields.dowRestricted) {
        dayMatch = fields.dom.has(dom) || fields.dow.has(dow);
      } else if (fields.domRestricted) {
        dayMatch = fields.dom.has(dom);
      } else if (fields.dowRestricted) {
        dayMatch = fields.dow.has(dow);
      } else {
        dayMatch = true;
      }
      if (dayMatch) out.push(new Date(d));
    }
    d.setMinutes(d.getMinutes() + 1);
    i++;
  }
  return out;
}

export function explain(expr: string, locale: "en" | "zh"): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "";
  const [m, h, dom, mo, dow] = parts;

  function describe(field: string, single: string, plural: string): string {
    if (field === "*") return locale === "zh" ? `每${single}` : `every ${single}`;
    if (field.startsWith("*/")) {
      return locale === "zh" ? `每 ${field.slice(2)} ${plural}` : `every ${field.slice(2)} ${plural}`;
    }
    if (field.includes("-") && !field.includes(",")) {
      return locale === "zh" ? `${plural} ${field}` : `${plural} ${field}`;
    }
    return locale === "zh" ? `第 ${field} ${single}` : `${single} ${field}`;
  }

  const labels = locale === "zh"
    ? { minute: "分钟", minutes: "分钟", hour: "小时", hours: "小时", dom: "日", days: "日", month: "月", months: "月", dow: "周几" }
    : { minute: "minute", minutes: "minutes", hour: "hour", hours: "hours", dom: "day", days: "days", month: "month", months: "months", dow: "day-of-week" };

  if (locale === "zh") {
    return `${describe(mo, labels.month, labels.months)}的${describe(dom, labels.dom, labels.days)}（${describe(dow, "周几", "周")}）${describe(h, labels.hour, labels.hours)}的${describe(m, labels.minute, labels.minutes)}触发。`;
  }
  return `Runs at ${describe(m, labels.minute, labels.minutes)} of ${describe(h, labels.hour, labels.hours)} on ${describe(dom, labels.dom, labels.days)} of ${describe(mo, labels.month, labels.months)} (${describe(dow, labels.dow, labels.dow)}).`;
}
