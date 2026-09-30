export type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  tags?: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Hardware/PCB Design Engineer",
    org: "UW Orbital",
    location: "Waterloo, ON",
    period: "May 2026 – Jun 2026",
    bullets: [
      "Designed a shunt-based current-sensing circuit for a satellite power subsystem using a 0.15Ω shunt resistor and a TI INA180B3 100V/V current-sense amplifier.",
      "Added a decoupling capacitor to stabilize the amplifier's supply rail against noise.",
      "Designed a 4-pin connector breaking out GND / V_OUT / 3.3V / V_LOAD for integration with the power system.",
      "Laid out the schematic and PCB in Altium Designer, applying signal-integrity and noise-mitigation practices.",
    ],
  },
  {
    role: "Digital Design Engineer",
    org: "UWASIC (Waterloo ASIC Design Team)",
    location: "Waterloo, ON",
    period: "Feb 2026 – May 2026",
    bullets: [
      "Built a **16-bit fixed-point multiplier** in SystemVerilog, computing **10 multiplications per ray** (**3M+ per 640×480 frame**) with integer math, **cutting hardware area** vs. floating-point.",
      "Designed a **pixel coordinate generator** in SystemVerilog that sweeps all **307,200 pixels** of a **640×480 frame**, producing **one camera ray per clock cycle** for the intersection pipeline.",
      "Wrote a cocotb testbench for the **ray-sphere hit detector**, verifying **100+ hit/miss cases** against a Python reference model with **0 mismatches**, **catching bugs** before integration and **speeding up team debugging**.",
    ],
    tags: [
      "SystemVerilog",
      "RTL Design",
      "Fixed-Point Arithmetic",
      "cocotb",
      "Python",
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
