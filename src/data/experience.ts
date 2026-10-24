export type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Digital Design Engineer",
    org: "UWASIC (Waterloo ASIC Design Team)",
    location: "Waterloo, ON",
    period: "Feb 2026 – Present",
    bullets: [
      "Built a 16-bit fixed-point multiplier in SystemVerilog, computing 10 multiplications per ray (3M+ per 640×480 frame) with integer math, cutting hardware area vs. floating-point.",
      "Designed a pixel coordinate generator in SystemVerilog that sweeps all 307,200 pixels of a 640×480 frame, producing one camera ray per clock cycle for the intersection pipeline.",
      "Wrote a cocotb testbench for the ray-sphere hit detector, verifying 100+ hit/miss cases against a Python reference model with 0 mismatches, catching bugs before integration and speeding up team debugging.",
    ],
  },
  {
    role: "Hardware/PCB Design Engineer",
    org: "UW Orbital",
    location: "Waterloo, ON",
    period: "May 2026 – Jun 2026",
    bullets: [
      "Enabled early validation of the satellite's EPS power path before full-board assembly, by designing a current-sensing breakout board in Altium with a 0.15Ω shunt and INA180B3 amplifier (100 V/V gain).",
      "Supported MPPT testing for the 3 solar panel inputs, measuring load current within 5% accuracy, by bringing up and characterizing the breakout with a bench supply and oscilloscope.",
      "Prepared the board for Flatsat integration testing with the 5-board PC104 stack, by defining a 4-pin connector (GND/V_OUT/3.3V/V_LOAD) and passing design review with electrical leads.",
    ],
  },
  {
    role: "Firmware Developer",
    org: "UW Robotics Team (Mars Rover)",
    location: "Waterloo, ON",
    period: "Sept 2026 – Oct 2026",
    bullets: [
      "Enabled the rover's main computer to command servo actuators remotely, by building Mbed OS C++ firmware for an STM32 Nucleo board that decodes 500 kbps CAN frames (4-byte float, 0–100% of range) into servo setpoints.",
      "Gave future actuator firmware a drop-in servo interface, by writing a reusable TutorialServo driver that generates 50 Hz PWM and clamps and linearly maps commanded angles to 1–2 ms pulse widths across a configurable range.",
      "Restored full 0–100% servo travel in the training's potentiometer-control app (up from ~30%), by correcting ADC-to-PWM math that treated AnalogIn's normalized 0–1 reading as volts.",
      "Prevented build failures for future trainees, by fixing CMake library linkage and malformed build-config syntax in the team's training material and integrating both apps into the repo's CMake build.",
    ],
  },
  {
    role: "Mechanical Technician",
    org: "MGS Auto Service INC",
    location: "Markham, ON",
    period: "Jul 2020 – Aug 2025",
    bullets: [
      "Diagnosed and repaired mechanical and electrical systems, working to precise torque and tolerance specifications.",
      "Developed hands-on troubleshooting skills across a range of hardware systems and components.",
      "Built a foundation of precision, hands-on hardware work that carried directly into later engineering roles.",
    ],
  },
];
