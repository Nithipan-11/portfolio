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
    label: "EDA & Engineering Software",
    items: [
      "Altium Designer",
      "KiCad",
      "SolidWorks",
      "AutoCAD",
      "OpenCV",
      "YOLOv8",
      "PyTorch",
    ],
  },
  {
    label: "Developer Tools",
    items: [
      "Git/GitHub",
      "GitHub Actions",
      "Docker",
      "CMake",
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
