// All copy below is taken verbatim from awbauerco.com.
// Only obvious spelling errors are corrected (Stockhom → Stockholm, cashemere → cashmere,
// masters artisans → master artisans). Edit texts here, not in the page components.

export const HEAD_CUTTER = {
  namn: "Frederik Andersen",
  titel: "Head cutter",
  text: [
    "Head cutter Frederik Andersen oversees the Bauer atelier's daily operations.",
    "Regardless of whether you are on the cusp of ordering your first bespoke piece or already are in our books, Frederik is the one guiding you through the process.",
  ],
} as const;

export const ATELIER_INTRO = {
  rubrik: "Atelier",
  text: [
    "A.W. Bauer & Co. offers bespoke tailoring of suits, coats, shirts and more.",
    "We make and finish each element by hand, unflaggingly adapted to your vision. Choosing bespoke over off-the-peg garments is to opt for exquisiteness. Made carefully after your body contour and preferences, the result of bespoke is a piece that stays sharp, unaffected by the changes in fashion and style.",
  ],
} as const;

// `kort` is the first sentence of each section, used as a teaser on the home page.
export type AtelierAvsnitt = { id: string; rubrik: string; kort: string; text: string[] };

export const ATELIER_AVSNITT: AtelierAvsnitt[] = [
  {
    id: "fitting",
    kort: "To make an A.W. Bauer piece takes the first-time client a few visits.",
    rubrik: "Fitting",
    text: [
      "To make an A.W. Bauer piece takes the first-time client a few visits. Guiding you carefully through each step of the way, we ensure that nothing but the best selections are made. During our first meeting, we select cloth and trimmings together, take your measurements and establish your preferred garment style. We will call you in for two to three more fittings.",
    ],
  },
  {
    id: "cutting",
    kort: "Our master cutter takes your measurements.",
    rubrik: "Cutting",
    text: [
      "Our master cutter takes your measurements. He takes note of your small bodily quirks and transfers his observations to a master cut made from robust cartridge paper. The master is the basis for cutting the cloth. We archive it for future orders.",
    ],
  },
  {
    id: "tailoring",
    kort: "Each element making up your piece requires a bespoke treatment.",
    rubrik: "Tailoring",
    text: [
      "Each element making up your piece requires a bespoke treatment.",
      "At A.W.Bauer, our tailors specialize in the different areas of the craft - from trouser making, coat making to cutting. All our tailors have many years of experience in working in tandem to perfect bespoke pieces.",
    ],
  },
  {
    id: "shirts",
    kort: "The A.W. Bauer expertise also extends to shirt making.",
    rubrik: "Shirts",
    text: [
      "The A.W. Bauer expertise also extends to shirt making.",
      "We offer you a vast range of options in terms of fabric, style and detailing. Whether you want a crisp business shirt or a flattering denim shirt, we are here to help you.",
      "All our shirts are conceived, drafted and edited in our Stockholm atelier and cut, sewn and finished in Abruzzo, Italy.",
      "To ensure exquisite quality and keep our environmental impact at a minimum, we only use fabric from certified weavers.",
    ],
  },
  {
    id: "knitwear",
    kort: "A.W. Bauer now delivers the finest bespoke knitwear experience, epitomizing both luxury and durability.",
    rubrik: "Knitwear",
    text: [
      "With an unwavering commitment to constantly push the boundaries of excellence in every corner of the ideal wardrobe, A.W. Bauer now delivers the finest bespoke knitwear experience, epitomizing both luxury and durability.",
      "Beyond a simple made-to-measure service, we will guide you through the complete creation of the perfect garment to be then produced in the heart of Perugia, Italy, by the expertise of our master artisans who kept innovating their secular heritage to craft the world's best knitted cashmere items.",
    ],
  },
];

export const PRISER = {
  rubrik: "Pricing",
  text: "Please be aware that the cost of making a handmade garment very much depends on your individual choice of cloth, make and details. You should therefore only use the list below as a general guideline.",
  lista: [
    { plagg: "Suits", pris: "6000 EUR" },
    { plagg: "Blazers", pris: "4800 EUR" },
    { plagg: "Trousers", pris: "1300 EUR" },
    { plagg: "Overcoats", pris: "6500 EUR" },
    { plagg: "Workwear jackets", pris: "2500 EUR" },
    { plagg: "Knitwear", pris: "850 EUR" },
    { plagg: "Shirts", pris: "400 EUR" },
    { plagg: "Smoking", pris: "6500 EUR" },
  ],
} as const;

export const BESPOKE_SHIRT = {
  rubrik: "Bespoke Shirt",
  underrubrik: "Precision. Comfort. Scandinavian Refinement.",
  text: [
    "At A. W. Bauer & Co., a bespoke shirt is more than a wardrobe essential—it is a foundation of personal style. Crafted entirely by hand and tailored to your unique proportions, posture, and preferences, our shirts offer a level of precision and comfort that off-the-rack garments simply cannot match.",
    "Each piece begins with a personal consultation and a hand-drawn pattern made exclusively for you. From there, we select fabrics from the world’s most renowned mills—luxurious cottons, fine linens, softly structured twills and denim —curated for both elegance and everyday wear.",
    "Our shirts embody the essence of Scandinavian minimalism: clean lines, refined details, and a focus on timeless simplicity.",
    "Whether worn under a bespoke suit or styled casually, an A. W. Bauer shirt becomes a second skin—elevating your wardrobe with lasting elegance and everyday ease. It’s not just a shirt—it’s part of your identity.",
  ],
  cta: "Book a Consultation",
} as const;
