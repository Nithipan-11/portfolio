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
  video?: { src: string; poster?: string; caption?: string };
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
  demoUrl?: string;
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

const DECODE_CACHE_SNIPPET = `// Each 4 KiB page keeps the decoded form of every word fetched from it.
const Inst& fetch(uint32_t pc) {
    Page& p = page(pc);  // flat page table: one array index
    const uint32_t slot = (pc & 0xFFF) >> 2;
    if (p.valid.test(slot)) return p.decoded[slot];  // hit
    p.decoded[slot] = decode(load32(pc));
    p.valid.set(slot);
    return p.decoded[slot];
}

// Any store clears the valid bit of the word it touches, so
// self-modifying code is re-decoded on its next fetch.
void store8(uint32_t a, uint8_t v) {
    Page& p = page(a);
    p.bytes[a & 0xFFF] = v;
    p.valid.reset((a & 0xFFF) >> 2);
}`;

const BRANCH_IMM_SNIPPET = `// B-type immediate: offset bits are scattered across the instruction.
// The original version left out instr[31] (offset bit 12), so every
// negative offset lost its sign and backward branches jumped forward.
wire [31:0] imm_b = {{19{instr[31]}}, instr[31], instr[7],
                     instr[30:25], instr[11:8], 1'b0};

// beq takes the branch when rs1 - rs2 == 0; bne when it isn't.
wire branch_equal     = branch    &  alu_zero;
wire branch_not_equal = branch_ne & ~alu_zero;
assign take_branch = branch_equal | branch_not_equal;

assign pc_target = pc + imm_b;
assign pc_next   = take_branch ? pc_target : pc_plus_4;`;

const STUDY_PAL_SNIPPET = `# Mode priority: PHONE > BREAK > FOCUS > AWAY
if phone_detected:
    new_mode = 'PHONE'
elif break_mode:
    new_mode = 'BREAK'
elif face_detected:
    new_mode = 'FOCUS'
else:
    new_mode = 'AWAY'

if new_mode != current_mode:
    now = time.time()
    # PHONE overrides instantly; other changes wait out a 1.5 s hold
    # so the Arduino can finish its blink/beep sequence first
    if new_mode == 'PHONE' or (now - last_switch_time) >= MODE_MIN_HOLD:
        current_mode = new_mode
        send_command(current_mode)   # text line over serial
        last_switch_time = now`;

export const PROJECTS: Project[] = [
  {
    id: "synthclin",
    title: "Synthclin: Private Synthetic Patient Data",
    description:
      "Generates realistic synthetic hospital records and ships each dataset with evidence it is private and useful. Three conditional generators in PyTorch (VAE, GAN, diffusion) trained with differential privacy via Opacus DP-SGD on 70k de-identified patients, benchmarked across 12 models. Every dataset is attacked with two membership-inference tests and checked by training a readmission model on synthetic data and testing it on real patients: the DP-VAE keeps 92% of real-data AUROC at ε = 3 while attacks stay at chance. Django + Celery run steward-approved accounts, async jobs and a hash-chained audit log; React drives the cohort dashboard.",
    tags: ["PyTorch", "Opacus", "Differential Privacy", "Django", "Celery", "React", "TypeScript"],
    thumbnail: "/projects/synthclin-thumbnail.jpg",
    linkType: "details",
    githubUrl: "https://github.com/Nithipan-11/synthclin",
    demoUrl: "/projects/synthclin-demo.mp4",
    details: {
      blockDiagram: ["Patient Records", "DP-SGD Generator", "Cohort Raking", "Clinical Constraints", "Privacy + Utility Audit", "CSV / FHIR"],
      video: {
        src: "/projects/synthclin-demo.mp4",
        poster: "/projects/synthclin-thumbnail.jpg",
        caption: "Shaping a cohort, generating 5,000 patients at ε = 3, and reading the audit (1.6x)",
      },
      images: [
        {
          src: "/projects/synthclin-generate.jpg",
          alt: "Dashboard with model picker, age, outcome and diagnosis controls, and a live cohort preview",
          caption: "Cohort Controls",
        },
        {
          src: "/projects/synthclin-columns.jpg",
          alt: "Fidelity results and per-column real vs synthetic distribution charts",
          caption: "Real vs Synthetic, Column by Column",
        },
        {
          src: "/projects/synthclin-tradeoff.jpg",
          alt: "Privacy vs utility charts across epsilon for VAE, GAN and diffusion models",
          caption: "Privacy–Utility Trade-off",
        },
        {
          src: "/projects/synthclin-audit.jpg",
          alt: "Hash-chained access log with integrity verification passing",
          caption: "Tamper-Evident Access Log",
        },
      ],
    },
  },
  {
    id: "rv32sim",
    title: "rv32sim: RISC-V Instruction-Set Simulator",
    description:
      "RV32IM + Zicsr instruction-set simulator in C++20 with precise machine-mode traps. Passes all 64 applicable official riscv-tests and runs bare-metal C at 120–160 MIPS, with a store-invalidated decoded-instruction cache giving a 1.5–2.2x speedup. It is the golden reference for my Verilog CPU: lockstep co-simulation in Icarus Verilog matched 2,000 random programs (141k instructions) commit by commit, mutation testing showed the fuzzer catches 10/10 planted RTL bugs, and a probe found 15 of 19 unsupported instructions in my CPU silently compute wrong results instead of trapping.",
    tags: ["C++20", "RISC-V", "CMake", "GoogleTest", "Icarus Verilog", "Python", "GitHub Actions"],
    thumbnail: "/projects/rv32sim-thumbnail.jpg",
    linkType: "details",
    githubUrl: "https://github.com/Nithipan-11/rv32sim",
    demoUrl: "/projects/rv32sim-demo.mp4",
    details: {
      blockDiagram: ["ELF / Hex Loader", "Paged Memory", "Decode Cache", "Execute + Traps", "Commit Log", "Lockstep Compare vs RTL"],
      video: {
        src: "/projects/rv32sim-demo.mp4",
        poster: "/projects/rv32sim-thumbnail.jpg",
        caption: "Unit tests, official riscv-tests, benchmarks, then co-simulation against the Verilog CPU (sped up)",
      },
      codeSnippet: {
        lang: "cpp",
        code: DECODE_CACHE_SNIPPET,
        caption: "Decoded-Instruction Cache",
      },
      images: [
        {
          src: "/projects/rv32sim-isa.jpg",
          alt: "Terminal output of the official riscv-tests runner showing 64 of 64 tests passing",
          caption: "Official riscv-tests: 64/64",
        },
        {
          src: "/projects/rv32sim-cosim.jpg",
          alt: "Differential fuzzer matching 2,000 programs against the Verilog CPU and killing all 10 planted mutants",
          caption: "Lockstep Fuzzing + Mutation Testing",
        },
        {
          src: "/projects/rv32sim-probe.jpg",
          alt: "Probe output showing unsupported instructions computing wrong results on the Verilog CPU versus the spec",
          caption: "Bugs Found in My CPU",
        },
        {
          src: "/projects/rv32sim-bench.jpg",
          alt: "Benchmark table with MIPS with and without the decode cache, all outputs verified",
          caption: "Benchmarks: Decode Cache On vs Off",
        },
      ],
    },
  },
  {
    id: "autonomous-navigation",
    title: "Autonomous Navigation Stack",
    description:
      "Lidar-based navigation for a differential-drive robot in ROS 2 (C++) and Gazebo, built on WATonomous' ASD training framework: costmap with obstacle inflation, odometry-based map fusion, an A* planner, and a pure-pursuit controller. Extended with a multi-checkpoint mission planner and a generated obstacle course — the robot clears all 5 checkpoints (104.5 m in 267.5 s) with zero collisions. Fixed wall-clipping by planning from the rotation centre with turning-radius inflation, and replanning deadlocks with path commitment, cost hysteresis, and previous-path bias.",
    tags: ["ROS 2", "C++", "Gazebo", "A*", "Pure Pursuit", "Docker"],
    thumbnail: "/projects/nav-thumbnail.png",
    linkType: "details",
    githubUrl: "https://github.com/Nithipan-11/ros2-autonomous-navigation",
    demoUrl: "/projects/nav-demo.mp4",
    details: {
      blockDiagram: ["Lidar", "Costmap", "Map Memory", "A* Planner", "Pure Pursuit", "Wheels"],
      video: {
        src: "/projects/nav-demo.mp4",
        poster: "/projects/nav-thumbnail.png",
        caption: "Full course run in Gazebo, replayed in Foxglove at 5x",
      },
      images: [
        {
          src: "/projects/nav-route.png",
          alt: "Top-down obstacle course with the robot's driven route through 5 checkpoints",
          caption: "Driven Route",
        },
        {
          src: "/projects/nav-slalom.jpg",
          alt: "Foxglove 3D view of the robot weaving through the slalom with its planned path",
          caption: "Slalom",
        },
        {
          src: "/projects/nav-pillars.jpg",
          alt: "Foxglove 3D view of the pillar field with inflated costmap halos",
          caption: "Pillar Field + Costmap",
        },
        {
          src: "/projects/nav-gate.jpg",
          alt: "Foxglove 3D view of the A* path threading the gate",
          caption: "A* Path Through the Gate",
        },
      ],
    },
  },
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
    title: "Single-Cycle RISC-V CPU",
    description:
      "Single-cycle RV32I CPU built from scratch in Verilog: program counter, instruction and data memories, a 32×32 register file with hardwired x0, an ALU, and a control unit covering 18 instructions (R/I-type ALU ops, lw, sw, beq, bne). Tracing the simulation in Icarus Verilog exposed a B-type immediate that dropped the offset's sign bit, which broke every backward branch, and a sample program whose hex didn't match its own source. A two-pass Python assembler builds programs from labelled assembly; the demo computes the points total and top scorer of the 2026 NBA Finals Game 5 on the CPU itself. Later verified against rv32sim, my C++ reference model: 2,000 random programs matched commit by commit.",
    tags: ["Verilog", "RISC-V", "Computer Architecture", "Icarus Verilog", "Python"],
    thumbnail: "/projects/riscv-thumbnail.png",
    linkType: "details",
    githubUrl: "https://github.com/Nithipan-11/simple-riscv-cpu",
    demoUrl: "/projects/riscv-demo.mp4",
    details: {
      blockDiagram: ["PC", "Instruction Memory", "Decode + Control", "Register File", "ALU", "Data Memory", "Write-Back"],
      video: {
        src: "/projects/riscv-demo.mp4",
        poster: "/projects/riscv-thumbnail.png",
        caption: "Sample program, assembler, NBA demo, then 2,000-program co-simulation against rv32sim (sped up)",
      },
      codeSnippet: {
        lang: "verilog",
        code: BRANCH_IMM_SNIPPET,
        caption: "Branch Logic (and the Bug Fix)",
      },
      images: [
        {
          src: "/projects/riscv-waveform.jpg",
          alt: "Waveform of the CPU summing six scores into x8 and finding the maximum in x7 with slt and beq",
          caption: "Waveform: Sum, Then Max",
        },
        {
          src: "/projects/riscv-testbench.jpg",
          alt: "Icarus Verilog output of the sample program trace and the NBA demo final register state",
          caption: "Testbench Runs",
        },
        {
          src: "/projects/riscv-assembler.jpg",
          alt: "Two-pass assembler output listing machine code, address and source line for the NBA program",
          caption: "Two-Pass Assembler",
        },
        {
          src: "/projects/rv32sim-cosim.jpg",
          alt: "Differential fuzzing matching 2,000 random programs against rv32sim and catching 10 of 10 planted bugs",
          caption: "Verified Against rv32sim",
        },
      ],
    },
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
      "Desk focus monitor that reacts in hardware. A Python loop runs an OpenCV Haar-cascade face detector and a YOLOv8n phone detector on every webcam frame, picks a mode by priority (phone > break > focus > away) with a 1.5 s hold so it doesn't flicker, and sends it to an Arduino Uno over 9600-baud serial. The Arduino firmware parses commands into a fixed buffer and drives two LEDs, an active buzzer and an SH1106 OLED with millis()-based state machines for the blink and beep patterns, so the serial parser is never blocked by delay(). My first fully self-directed embedded project.",
    tags: ["Python", "OpenCV", "YOLOv8", "Arduino", "C++", "Serial"],
    thumbnail: "/projects/study-pal-thumbnail.jpg",
    linkType: "details",
    githubUrl: "https://github.com/Nithipan-11/Study-Pal",
    demoUrl: "https://drive.google.com/file/d/1nRSZRYUJun9o3bbWzd23QW_gNX8PoTur/view?usp=sharing",
    details: {
      blockDiagram: ["Webcam", "Haar Face + YOLOv8n Phone", "Mode Priority + 1.5 s Hold", "Serial @ 9600", "Arduino Uno", "LEDs / Buzzer / OLED"],
      codeSnippet: {
        lang: "python",
        code: STUDY_PAL_SNIPPET,
        caption: "Mode Arbitration",
      },
      images: [
        {
          src: "/projects/study-pal-thumbnail.jpg",
          alt: "Breadboard with Arduino Uno, green and red LEDs, buzzer and OLED showing Study Pal Ready",
          caption: "Breadboard Build",
        },
        {
          src: "/projects/studypal-oled.jpg",
          alt: "Close-up of the SH1106 OLED showing the Study Pal boot screen",
          caption: "SH1106 OLED over I2C",
        },
        {
          src: "/projects/studypal-modes.jpg",
          alt: "Table of each mode's trigger and the LED, buzzer and OLED response",
          caption: "Mode → Hardware Response",
        },
        {
          src: "/projects/studypal-wiring.jpg",
          alt: "Wiring diagram of the Arduino Uno to LEDs on D8 and D9, buzzer on D10 and OLED on A4/A5",
          caption: "Wiring Diagram",
        },
      ],
    },
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
    ],
  },
];
