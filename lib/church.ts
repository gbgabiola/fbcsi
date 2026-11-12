export const church = {
  name: "Fundamental Baptist Church",
  title: "Fundamental Baptist Church | San Isidro, San Fernando",
  description: "Plan a visit to Fundamental Baptist Church in San Isidro, San Fernando, Pampanga. Find Sunday worship times, directions, and Baptist beliefs.",
  url: "https://fbcsi.onrender.com",
  logo: "/fbcsi-logo.jpg",
  facebook: "https://www.facebook.com/fbcsi4Christ",
  map: "https://maps.app.goo.gl/7hfevm2YGM75h9829?g_st=ic",
  village: "San Isidro Village",
  street: "3M35+RHW, Sampaguita Main Road",
  locality: "San Fernando",
  region: "Pampanga",
} as const;

export const churchContact: {
  phone?: { label: string; dial: string };
  email?: string;
  youtube?: string;
  instagram?: string;
} = {
  phone: { label: "+63 992 620 2638", dial: "+639926202638" },
  email: "fbcsi1982@gmail.com",
};

export const weeklySchedule = [
  { day: "Sunday", gathering: "Sunday School", start: { time: "08:30", label: "8:30 AM" } },
  { day: "Sunday", gathering: "Worship Service", start: { time: "09:30", label: "9:30 AM" } },
  { day: "Wednesday", gathering: "Prayer Meeting", start: { time: "18:00", label: "6:00 PM" } },
  { day: "Thursday", gathering: "Saguin Prayer Meeting", start: { time: "18:00", label: "6:00 PM" } },
  { day: "Friday", gathering: "Outreach in San Jose", start: null },
  { day: "Saturday", gathering: "Outreach in San Isidro, Bacolor", start: { time: "09:00", label: "9:00 AM" } },
] as const;
