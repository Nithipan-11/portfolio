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
      "Contributed a 16-bit fixed-point multiplier in SystemVerilog to the team's ray-tracing pipeline, handling 10 multiplications per ray (3M+ per 640×480 frame) with integer math to reduce hardware area vs. floating-point.",
      "Implemented the pixel coordinate generator for the team's intersection pipeline, sweeping all 307,200 pixels of a 640×480 frame to produce one camera ray per clock cycle.",
      "Helped verify the ray-sphere hit detector by writing a cocotb testbench that checked 100+ hit/miss cases against a Python reference model with 0 mismatches, catching bugs before integration.",
    ],
  },
  {
    role: "Hardware/PCB Design Engineer",
    org: "UW Orbital",
    location: "Waterloo, ON",
    period: "May 2026 – Jun 2026",
    bullets: [
      "Supported early validation of the satellite's EPS power path by designing a current-sensing breakout board in Altium for the electrical team (0.15Ω shunt, INA180B3 amplifier, 100 V/V gain).",
      "Contributed to MPPT testing for the 3 solar panel inputs by bringing up and characterizing the breakout with a bench supply and oscilloscope, measuring load current within 5%.",
      "Helped prepare the board for Flatsat integration with the 5-board PC104 stack by defining a 4-pin connector (GND/V_OUT/3.3V/V_LOAD) and taking it through design review with the electrical leads.",
    ],
  },
  {
    role: "Firmware Developer",
    org: "UW Robotics Team (Mars Rover)",
    location: "Waterloo, ON",
    period: "Sep 2026 – Oct 2026",
    bullets: [
      "Contributed Mbed OS C++ firmware for an STM32 Nucleo board that lets the rover's main computer command servo actuators over CAN, decoding 500 kbps frames (4-byte float, 0–100%) into servo setpoints.",
      "Added a reusable TutorialServo driver to the team codebase that generates 50 Hz PWM and maps commanded angles to 1–2 ms pulse widths, giving future actuator firmware a drop-in interface.",
      "Fixed bugs in the team's training material that limited servo travel to ~30% and broke builds, correcting ADC-to-PWM math that treated AnalogIn's 0–1 reading as volts and repairing CMake linkage.",
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
