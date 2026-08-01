export type CalculatorMeta = {
  id: string;
  path: string;
  titleKey?: string; // For i18n lookup if available
  fallbackTitle: string;
  description: string;
  category:
    "finance" | "health" | "math" | "lifestyle" | "tech" | "real-estate";
  tags: string[];
};

export const calculators: CalculatorMeta[] = [
  // Static route calculators
  {
    id: "mortgage",
    path: "/mortgage-calculator",
    titleKey: "mortgageTitle",
    fallbackTitle: "Mortgage Calculator",
    description: "Calculate monthly payments for a home mortgage.",
    category: "real-estate",
    tags: ["loan", "house", "interest", "payment"],
  },
  {
    id: "compound",
    path: "/compound-interest",
    titleKey: "compoundTitle",
    fallbackTitle: "Compound Interest",
    description: "Calculate compound interest over time.",
    category: "finance",
    tags: ["investment", "growth", "savings", "interest"],
  },
  {
    id: "percentage",
    path: "/percentage-finder",
    titleKey: "percFinderTitle",
    fallbackTitle: "Percentage Finder",
    description: "Calculate percentages easily.",
    category: "math",
    tags: ["percent", "fraction", "discount"],
  },
  {
    id: "unit",
    path: "/unit-converter",
    titleKey: "unitConvTitle",
    fallbackTitle: "Unit Converter",
    description: "Convert between different units of measurement.",
    category: "math",
    tags: ["measure", "length", "weight", "metric", "imperial"],
  },
  {
    id: "bmi",
    path: "/bmi-calculator",
    titleKey: "bmiTitle",
    fallbackTitle: "BMI Calculator",
    description: "Calculate your Body Mass Index.",
    category: "health",
    tags: ["weight", "height", "body", "fitness", "health"],
  },
  {
    id: "tip",
    path: "/tip-calculator",
    titleKey: "tipTitle",
    fallbackTitle: "Tip Calculator",
    description: "Calculate tips and split bills.",
    category: "lifestyle",
    tags: ["restaurant", "bill", "split", "gratuity"],
  },
  {
    id: "salary",
    path: "/salary-calculator",
    titleKey: "salaryTitle",
    fallbackTitle: "Salary Calculator",
    description:
      "Convert between hourly, weekly, monthly, and annual salaries.",
    category: "finance",
    tags: ["job", "income", "wage", "pay"],
  },
  {
    id: "age",
    path: "/age-calculator",
    titleKey: "ageTitle",
    fallbackTitle: "Age Calculator",
    description: "Calculate exact age in years, months, and days.",
    category: "lifestyle",
    tags: ["birthday", "date", "time", "years"],
  },

  // Dynamic route calculators
  {
    id: "auto-loan",
    path: "/calculators/auto-loan",
    fallbackTitle: "Auto Loan Calculator",
    description: "Calculate monthly car loan payments.",
    category: "finance",
    tags: ["car", "loan", "vehicle", "finance"],
  },
  {
    id: "roi",
    path: "/calculators/roi",
    fallbackTitle: "ROI Calculator",
    description: "Calculate Return on Investment.",
    category: "finance",
    tags: ["return", "investment", "profit", "business"],
  },
  {
    id: "margin",
    path: "/calculators/margin",
    fallbackTitle: "Margin Calculator",
    description: "Calculate gross margin, markup, and profit.",
    category: "finance",
    tags: ["profit", "sales", "business", "pricing"],
  },
  {
    id: "cap-rate",
    path: "/calculators/cap-rate",
    fallbackTitle: "Cap Rate Calculator",
    description: "Calculate the Capitalization Rate for real estate.",
    category: "real-estate",
    tags: ["property", "investment", "yield", "noi"],
  },
  {
    id: "freelance-net-income",
    path: "/calculators/freelance-net-income",
    fallbackTitle: "Freelance Net Income",
    description: "Calculate take-home pay for freelancers.",
    category: "finance",
    tags: ["freelance", "tax", "income", "business", "independent"],
  },
  {
    id: "debt-snowball",
    path: "/calculators/debt-snowball",
    fallbackTitle: "Debt Snowball",
    description: "Calculate debt payoff time using the snowball method.",
    category: "finance",
    tags: ["debt", "loan", "payoff", "snowball", "finance"],
  },
  {
    id: "fuel-split",
    path: "/calculators/fuel-split",
    fallbackTitle: "Fuel Split",
    description: "Calculate and split travel costs fairly among passengers.",
    category: "lifestyle",
    tags: ["car", "travel", "gas", "split", "trip"],
  },
  {
    id: "goal-savings",
    path: "/calculators/goal-savings",
    fallbackTitle: "Goal Savings",
    description: "Calculate how much you need to save to reach a goal.",
    category: "finance",
    tags: ["savings", "goal", "money", "future"],
  },
  {
    id: "download-time",
    path: "/calculators/download-time",
    fallbackTitle: "Download Time",
    description: "Calculate how long a file download will take.",
    category: "tech",
    tags: ["internet", "speed", "bandwidth", "file", "time"],
  },
  {
    id: "peltier-cooling",
    path: "/calculators/peltier-cooling",
    fallbackTitle: "Peltier Cooling",
    description: "Calculate Thermoelectric Cooler capacity and COP.",
    category: "tech",
    tags: ["cooling", "thermoelectric", "hardware", "power"],
  },
  {
    id: "rent-vs-buy",
    path: "/calculators/rent-vs-buy",
    fallbackTitle: "Rent vs Buy Calculator",
    description: "Compare the costs of renting vs buying a home.",
    category: "real-estate",
    tags: ["home", "house", "rent", "mortgage", "buy"],
  },
];

export function getCalculatorsByCategory(category: string) {
  return calculators.filter((c) => c.category === category);
}

export function searchCalculators(query: string) {
  const lowerQuery = query.toLowerCase();
  return calculators.filter(
    (c) =>
      c.fallbackTitle.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.tags.some((t) => t.toLowerCase().includes(lowerQuery)),
  );
}

export function getRelatedCalculators(currentId: string, limit: number = 3) {
  const current = calculators.find(
    (c) => c.id === currentId || c.path === currentId,
  );
  if (!current) return calculators.slice(0, limit);

  // Find by same category first
  const related = calculators.filter(
    (c) => c.id !== current.id && c.category === current.category,
  );

  // If not enough in same category, pad with others
  if (related.length < limit) {
    const others = calculators.filter(
      (c) => c.id !== current.id && c.category !== current.category,
    );
    related.push(...others.slice(0, limit - related.length));
  }

  return related.slice(0, limit);
}
