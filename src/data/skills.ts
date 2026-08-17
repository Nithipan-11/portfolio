export type SkillCategory = {
  label: string;
  items: string[];
};

export const SKILLS: SkillCategory[] = [
  {
    label: "Languages",
    items: [
      "Verilog/SystemVerilog",
      "Python",
      "C/C++",
      "MATLAB",
      "JavaScript",
      "HTML/CSS",
      "Bash",
    ],
  },
  {
    label: "Embedded & Hardware",
    items: [
      "STM32",
      "ESP32",
      "Raspberry Pi",
      "Arduino",
      "Tiny Tapeout (OpenLane/Cocotb)",
    ],
  },
  {
    label: "EDA & Design Tools",
    items: ["Altium Designer", "KiCad", "SolidWorks", "AutoCAD"],
  },
  {
    label: "Systems & AI",
    items: ["OpenCV", "YOLOv8", "PyTorch", "Git/GitHub", "GitHub Actions"],
  },
  {
    label: "Lab Instrumentation",
    items: [
      "Oscilloscopes",
      "Multimeters",
      "Function Generators",
      "Soldering & Rework",
    ],
  },
];
