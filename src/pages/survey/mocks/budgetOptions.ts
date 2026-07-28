import ticketIcon from "@/shared/assets/svg/ic-ticket.svg";
import tramIcon from "@/shared/assets/svg/ic-tram-front.svg";
import utensilsIcon from "@/shared/assets/svg/ic-utensils.svg";

export type BudgetPreset = {
  id: string;
  label: string;
  value: number;
};

export type BudgetAllocation = {
  id: string;
  label: string;
  percent: number;
  icon: string;
};

export const tripDayOptions = [1, 2, 3, 4, 5];

export const budgetPresets: BudgetPreset[] = [
  {
    id: "value",
    label: "~3만 · 가성비",
    value: 30000,
  },
  {
    id: "standard",
    label: "3~6만 · 적당",
    value: 60000,
  },
  {
    id: "relaxed",
    label: "6만+ · 여유",
    value: 90000,
  },
];

export const budgetAllocations: BudgetAllocation[] = [
  {
    id: "transportation",
    label: "교통비",
    percent: 40,
    icon: tramIcon,
  },
  {
    id: "food",
    label: "식비",
    percent: 35,
    icon: utensilsIcon,
  },
  {
    id: "activity",
    label: "체험/입장료",
    percent: 25,
    icon: ticketIcon,
  },
];
