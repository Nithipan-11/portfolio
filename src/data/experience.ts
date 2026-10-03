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
    role: "Robotics Fabrication Engineer",
    org: "UW NanoRobotics Group",
    location: "Waterloo, ON",
    period: "Sept 2025 – Jan 2026",
    bullets: [
      "Wrote motion control scripts for a nanoparticle ink printing robot.",
      "Integrated mechanical, electronic, and control subsystems for PCB fabrication and printed electronics.",
      "Designed structural frames, motor mounts, and threaded-rod mechanisms in CAD for sub-millimeter positioning tolerance.",
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
