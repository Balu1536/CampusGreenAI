export type CategoryId =
  | "energy"
  | "waste"
  | "water"
  | "transportation"
  | "awareness";

export interface Category {
  id: CategoryId;
  label: string;
  weight: number;
  icon: string;
  description: string;
}

export interface Question {
  id: string;
  category: CategoryId;
  text: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "energy",
    label: "Energy Management",
    weight: 25,
    icon: "Zap",
    description: "Lighting, renewables, appliances, and consumption tracking.",
  },
  {
    id: "waste",
    label: "Waste Management",
    weight: 25,
    icon: "Recycle",
    description: "Segregation, composting, plastics, and recycling programs.",
  },
  {
    id: "water",
    label: "Water Conservation",
    weight: 20,
    icon: "Droplets",
    description: "Harvesting, leak control, fixtures, and reuse systems.",
  },
  {
    id: "transportation",
    label: "Transportation",
    weight: 15,
    icon: "Bus",
    description: "Shared mobility, cycling, EVs, and public transport.",
  },
  {
    id: "awareness",
    label: "Awareness & Initiatives",
    weight: 15,
    icon: "Sprout",
    description: "Workshops, clubs, plantation drives, and curriculum.",
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "e1",
    category: "energy",
    text: "Does your campus use LED or other energy-efficient lighting in most buildings?",
  },
  {
    id: "e2",
    category: "energy",
    text: "Have you installed solar panels or other renewable energy sources on campus?",
  },
  {
    id: "e3",
    category: "energy",
    text: "Are energy-efficient (5-star rated) appliances used in offices, labs, and hostels?",
  },
  {
    id: "e4",
    category: "energy",
    text: "Is there a system in place to monitor and track electricity consumption?",
  },
  {
    id: "w1",
    category: "waste",
    text: "Is waste on campus segregated into wet, dry, and hazardous categories?",
  },
  {
    id: "w2",
    category: "waste",
    text: "Does the campus have a composting facility for organic/wet waste?",
  },
  {
    id: "w3",
    category: "waste",
    text: "Are single-use plastics banned or actively discouraged on campus?",
  },
  {
    id: "w4",
    category: "waste",
    text: "Is there a regular recycling program for paper, e-waste, and plastics?",
  },
  {
    id: "wa1",
    category: "water",
    text: "Does the campus have rainwater harvesting systems installed?",
  },
  {
    id: "wa2",
    category: "water",
    text: "Are water leakages monitored and repaired promptly across campus?",
  },
  {
    id: "wa3",
    category: "water",
    text: "Are water-efficient fixtures (low-flow taps, dual-flush toilets) installed?",
  },
  {
    id: "wa4",
    category: "water",
    text: "Is wastewater treated and reused, for example for gardening or flushing?",
  },
  {
    id: "t1",
    category: "transportation",
    text: "Does the campus promote carpooling or run a shared shuttle service?",
  },
  {
    id: "t2",
    category: "transportation",
    text: "Are bicycle stands or dedicated cycling tracks available on campus?",
  },
  {
    id: "t3",
    category: "transportation",
    text: "Are electric vehicle (EV) charging stations available on campus?",
  },
  {
    id: "t4",
    category: "transportation",
    text: "Does the institution actively encourage public transport use among staff and students?",
  },
  {
    id: "a1",
    category: "awareness",
    text: "Are sustainability workshops or seminars conducted regularly for students and staff?",
  },
  {
    id: "a2",
    category: "awareness",
    text: "Does the campus have an active environmental or eco club?",
  },
  {
    id: "a3",
    category: "awareness",
    text: "Are tree plantation or green cover drives organized on campus?",
  },
  {
    id: "a4",
    category: "awareness",
    text: "Is sustainability included in the curriculum, orientation, or induction programs?",
  },
];

export type AnswerValue = "yes" | "partial" | "no";

export const ANSWER_OPTIONS: { value: AnswerValue; label: string; points: number }[] = [
  { value: "yes", label: "Yes", points: 5 },
  { value: "partial", label: "Partially", points: 3 },
  { value: "no", label: "No", points: 0 },
];
