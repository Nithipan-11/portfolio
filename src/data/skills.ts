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
      "R",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Bash",
    ],
  },
  {
    label: "Embedded & Hardware",
    items: [
      "STM32 (Mbed OS)",
      "ESP32",
      "Raspberry Pi",
      "Arduino",
      "CAN",
      "SPI",
      "I2C",
      "Tiny Tapeout (OpenLane/Cocotb)",
    ],
  },
  {
    label: "Robotics & Simulation",
    items: [
      "ROS 2 (rclcpp)",
      "Gazebo",
      "Foxglove",
      "A* Path Planning",
      "Pure Pursuit Control",
    ],
  },
  {
    label: "Machine Learning & Data",
    items: [
      "PyTorch",
      "Opacus (Differential Privacy)",
      "scikit-learn",
      "pandas/NumPy/SciPy",
      "OpenCV",
      "YOLOv8",
    ],
  },
  {
    label: "Web & Backend",
    items: [
      "Django + REST Framework",
      "Celery/Redis",
      "PostgreSQL",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    label: "EDA & Engineering Software",
    items: [
      "Altium Designer",
      "KiCad",
      "SolidWorks",
      "AutoCAD",
    ],
  },
  {
    label: "Developer Tools",
    items: [
      "Git/GitHub",
      "GitHub Actions",
      "Docker",
      "CMake",
      "GoogleTest",
      "Linux",
      "Icarus Verilog",
      "GTKWave",
    ],
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
