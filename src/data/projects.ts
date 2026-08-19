export type ProjectLinkType = "details" | "github" | "multi-link";

export type BomItem = {
  ref: string;
  part: string;
  manufacturer: string;
  description: string;
};

export type ProjectDetails = {
  blockDiagram?: string[];
  signalChain?: string[];
  codeSnippet?: { lang: string; code: string; caption?: string };
  images?: { src: string; alt: string; caption: string }[];
  bom?: BomItem[];
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  linkType: ProjectLinkType;
  githubUrl?: string;
  codeScreenshot?: string;
  links?: ProjectLink[];
  details?: ProjectDetails;
};

const CDC_SYNCHRONIZER_SNIPPET = `module cdc_synchronizer (
    input  wire clk,
    input  wire rst_n,
    input  wire async_in,
    output reg  sync_out
);
    reg meta_stage;

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            meta_stage <= 1'b0;
            sync_out   <= 1'b0;
        end else begin
            meta_stage <= async_in;   // stage 1: capture, may go metastable
            sync_out   <= meta_stage; // stage 2: resolved, safe to use downstream
        end
    end
endmodule`;

export const PROJECTS: Project[] = [
  {
    id: "spi-digital-peripheral",
    title: "SPI-Controlled Digital Peripheral",
    description:
      "Verilog design with 2-stage CDC synchronizers for asynchronous SPI, a 5-register config interface, and a 3kHz PWM generator across 16 output pins — verified with a Cocotb testbench and carried through full synthesis and gate-level verification on Tiny Tapeout/OpenLane.",
    tags: ["Verilog", "Cocotb", "Tiny Tapeout", "OpenLane", "SPI"],
    thumbnail: "/projects/spi-thumbnail.png",
    linkType: "details",
    githubUrl: "https://github.com/Nithipan-11/onboarding-start",
    details: {
      blockDiagram: [
        "SPI Input",
        "CDC Synchronizer",
        "Register File",
        "PWM Generator",
        "16 Output Pins",
      ],
      codeSnippet: {
        lang: "verilog",
        caption: "2-stage flip-flop CDC synchronizer",
        code: CDC_SYNCHRONIZER_SNIPPET,
      },
      images: [
        {
          src: "/projects/spi-gds-2d.png",
          alt: "SPI peripheral GDS layout, 2D preview",
          caption: "2D Layout",
        },
        {
          src: "/projects/spi-gds-3d.png",
          alt: "SPI peripheral GDS layout, 3D rendered view",
          caption: "3D Layer View",
        },
      ],
    },
  },
  {
    id: "riscv-cpu",
    title: "Simple Single-Cycle RISC-V CPU",
    description:
      "Single-cycle RV32I CPU built from scratch in Verilog, with a working RV32I instruction subset, an ALU, register file, and control unit. Simulating it in Icarus Verilog surfaced two real bugs — a branch-target immediate silently dropping a bit and a sample program that didn't match its own documented output — both caught by tracing simulation, not code review. Assembled from labeled source by a custom two-pass Python assembler. A demo program computes the top scorer from a real NBA Finals box score (Game 5, 2026, Knicks vs. Spurs) using the CPU's own ALU and branch logic.",
    tags: ["Verilog", "RISC-V", "Computer Architecture", "Python", "Icarus Verilog"],
    thumbnail: "/projects/riscv-thumbnail.png",
    linkType: "github",
    githubUrl: "https://github.com/Nithipan-11/simple-riscv-cpu",
  },
  {
    id: "current-sensing-pcb",
    title: "Current-Sensing PCB",
    description:
      "Shunt-based current-sense circuit for a satellite power subsystem: a TI INA180B3 current-sense amplifier, precision shunt resistor, decoupling, and a 4-pin breakout connector — schematic and layout in Altium Designer.",
    tags: ["Altium Designer", "Analog Design", "PCB Layout", "Power"],
    thumbnail: "/projects/pcb-3d-render.png",
    linkType: "details",
    details: {
      signalChain: [
        "Shunt Resistor (0.15Ω)",
        "INA180B3 Current-Sense Amp (100V/V)",
        "V_OUT",
      ],
      images: [
        {
          src: "/projects/pcb-layout.png",
          alt: "Current-sensing PCB layout",
          caption: "PCB Layout",
        },
        {
          src: "/projects/pcb-schematic.png",
          alt: "Current-sensing schematic",
          caption: "Schematic",
        },
      ],
      bom: [
        {
          ref: "U1",
          part: "INA180B3IDBVR",
          manufacturer: "Texas Instruments",
          description: "Current-sense amplifier, 100V/V gain, SOT23-5",
        },
        {
          ref: "R1 (RSENSE)",
          part: "CSR0603FTR150",
          manufacturer: "Stackpole",
          description: "0.15Ω, ±1%, 1/8W, 0603 shunt resistor",
        },
        {
          ref: "C1 (CBYPASS)",
          part: "GRM188R71H104KA93D",
          manufacturer: "Murata",
          description: "0.1µF, 0603, X7R decoupling capacitor for IC supply",
        },
        {
          ref: "P1",
          part: "61300411121",
          manufacturer: "Würth Elektronik",
          description: "4-pin connector: GND / V_OUT / 3.3V / V_LOAD",
        },
      ],
    },
  },
  {
    id: "study-pal",
    title: "Study Pal",
    description:
      "Arduino Uno + Python computer vision over serial for real-time face/object detection (YOLOv8, OpenCV, Ultralytics), built to help you stay focused on your work — with Arduino C++ driving LEDs, a buzzer, and an I2C OLED using non-blocking millis() timing.",
    tags: ["Arduino", "OpenCV", "YOLOv8", "Python", "C++"],
    thumbnail: "/projects/study-pal-thumbnail.jpg",
    linkType: "multi-link",
    links: [
      {
        label: "View GitHub",
        href: "https://github.com/Nithipan-11/Study-Pal",
        external: true,
      },
      {
        label: "Watch Demo",
        href: "https://drive.google.com/file/d/1nRSZRYUJun9o3bbWzd23QW_gNX8PoTur/view?usp=sharing",
        external: true,
      },
    ],
  },
  {
    id: "autonomous-utility-arm",
    title: "Autonomous Utility Robotic Arm",
    description:
      "Environmental sensors and the AgroMonitoring API drive irrigation/fertilization decisions; an OpenCV/YOLOv8 vision pipeline identifies plants, weeds, and zones; a 6-DOF arm designed in SolidWorks runs ESP32 inverse-kinematics motion control.",
    tags: ["SolidWorks", "ESP32", "OpenCV", "YOLOv8", "Robotics"],
    thumbnail: "/projects/robotic-arm-thumbnail.jpg",
    linkType: "multi-link",
    links: [
      {
        label: "View GitHub",
        href: "https://github.com/Syinaric/A.U.R.A.-Farm",
        external: true,
      },
      {
        label: "View Post",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7394034605210902528/",
        external: true,
      },
    ],
  },
];
