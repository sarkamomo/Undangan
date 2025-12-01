export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  tags: string[];
  themeColor: string;
}

export interface InvitationData {
  groomName: string;
  groomParents: string;
  brideName: string;
  brideParents: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  message: string;
  templateId: string;
}

export const INITIAL_DATA: InvitationData = {
  groomName: "Rizky",
  groomParents: "Bpk. Ahmad & Ibu Siti",
  brideName: "Putri",
  brideParents: "Bpk. Budi & Ibu Rina",
  date: new Date().toISOString().split('T')[0],
  timeStart: "08:00",
  timeEnd: "12:00",
  venueName: "Gedung Serbaguna Mawar",
  venueAddress: "Jl. Merdeka No. 123, Jakarta Selatan",
  mapUrl: "",
  message: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  templateId: "floral-classic"
};

export const TEMPLATES: Template[] = [
  {
    id: "floral-classic",
    name: "Classic Floral",
    description: "Desain bunga elegan dengan sentuhan klasik dan font serif yang mewah.",
    thumbnailUrl: "https://picsum.photos/seed/wedding1/400/600",
    price: 99000,
    tags: ["Elegan", "Bunga", "Populer"],
    themeColor: "bg-rose-50"
  },
  {
    id: "minimalist-modern",
    name: "Modern Minimalist",
    description: "Tampilan bersih, simpel, dan modern untuk pasangan kekinian.",
    thumbnailUrl: "https://picsum.photos/seed/wedding2/400/600",
    price: 75000,
    tags: ["Minimalis", "Modern", "Hemat"],
    themeColor: "bg-slate-50"
  },
  {
    id: "luxury-gold",
    name: "Royal Gold",
    description: "Nuansa emas yang memberikan kesan mewah dan eksklusif.",
    thumbnailUrl: "https://picsum.photos/seed/wedding3/400/600",
    price: 149000,
    tags: ["Mewah", "Emas", "Premium"],
    themeColor: "bg-amber-50"
  },
  {
    id: "rustic-nature",
    name: "Rustic Nature",
    description: "Tema alam dengan warna bumi yang hangat dan natural.",
    thumbnailUrl: "https://picsum.photos/seed/wedding4/400/600",
    price: 89000,
    tags: ["Rustic", "Outdoor", "Natural"],
    themeColor: "bg-stone-50"
  }
];