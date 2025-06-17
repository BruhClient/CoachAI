import {
  Binary,
  BookCopy,
  Cone,
  FlaskConical,
  HandCoins,
  Languages,
} from "lucide-react";

export const subjects = [
  "Maths",
  "Language",
  "Science",
  "History",
  "Coding",
  "Economics",
];

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};

export const subjectsIcons = {
  science: FlaskConical,
  maths: Cone,
  language: Languages,
  coding: Binary,
  history: BookCopy,
  economics: HandCoins,
};
export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const DEFAULT_FETCH_LIMIT = 5;

export const pricePerSecond = 0.005;
