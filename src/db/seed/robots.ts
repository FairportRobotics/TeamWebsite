export type SubSection = {
  label: string | null;
  description: string;
};

export type Section = {
  heading: string;
  subsections: SubSection[];
};

export type Feature = {
  title: string;
  sections: Section[];
};

export type Award = {
  type: "red" | "blue";
  description: string;
};

export type Robot = {
  year: number;
  name: string;
  imageUrls: string[];
  videoUrls: string[];
  awards: Award[];
  features: Feature[];
};

export const seedRobots = [
  {
    year: 2026,
    name: "Boulder",
    imageUrls: [],
    videoUrls: [],
    awards: [],
    features: [
      {
        title: "Robot Abilities",
        sections: [
          {
            heading: "Drive Train",
            subsections: [
              {
                label: "",
                description: "",
              },
            ],
          },
          {
            heading: "Intake",
            subsections: [
              {
                label: "",
                description: "",
              },
            ],
          },
          {
            heading: "Scoring",
            subsections: [
              {
                label: "",
                description: "",
              },
            ],
          },
        ],
      },
      {
        title: "Programming",
      },
      {
        title: "Performance",
      },
    ],
  },
] as Robot[];
