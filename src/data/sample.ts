/**
 * Sample data. Every person, company and contact detail here is made up.
 * Replace this file (or point the pages at an API) when you start a new prototype.
 */

export interface Requisition {
  id: string;
  title: string;
  client: string;
  location: string;
  type: string;
  pay: string;
  am: string;
  hm: string;
  cpfs: number;
  submittals: number;
  status: "Open" | "Interviewing" | "On hold";
  summary: string;
  questions: Array<{ topic: string; question: string; listenFor: string }>;
}

export const REQUISITIONS: Requisition[] = [
  {
    id: "REQ-31211",
    title: "Embedded Systems Engineer, Fleet IoT",
    client: "Planet Express",
    location: "Dallas, TX",
    type: "Full-time",
    pay: "$125K–$150K",
    am: "Alex Kiaya",
    hm: "Emily Carter",
    cpfs: 5,
    submittals: 2,
    status: "Interviewing",
    summary:
      "This engineer builds the software that runs on the small computers inside Planet Express trucks and trailers. Those devices track location, engine health, temperature and driver activity, then send the data back over cellular networks. The work means writing low-level code in C or C++ and making it reliable, low-power and secure in rough road conditions. It also includes updating devices remotely and working with the hardware and data teams on fleet tracking and the upcoming telematics rollout.",
    questions: [
      { topic: "Experience", question: "Tell me about an embedded device you've shipped. What microcontroller and RTOS did you use, and what part of the firmware did you own?", listenFor: "hands-on C/C++ on ARM Cortex-M or similar, FreeRTOS or Zephyr, and code that actually shipped." },
      { topic: "Connectivity", question: "Have you worked with devices that send data over cellular (LTE-M, NB-IoT) or GPS/GNSS modules? How did you deal with lost connections?", listenFor: "retries, buffering data while offline, and awareness of power use." },
      { topic: "Remote updates", question: "How have you handled firmware updates sent over the air to devices already in the field? What happens if an update fails halfway?", listenFor: "fallback to the previous version, signed images and staged rollouts." },
      { topic: "Field debugging", question: "Describe a bug that only showed up on devices in the field, not on your desk. How did you track it down?", listenFor: "logging and remote diagnostics, a scope or logic analyzer, and a clear, methodical approach." },
    ],
  },
  {
    id: "REQ-31218",
    title: "Controls Engineer, Warehouse Automation",
    client: "Planet Express",
    location: "Red Oak, TX",
    type: "Full-time",
    pay: "$110K–$135K",
    am: "Alex Kiaya",
    hm: "Danielle Johnson",
    cpfs: 4,
    submittals: 2,
    status: "Open",
    summary:
      "This engineer keeps the conveyors, sorters and robots in the Red Oak warehouse running. They program and troubleshoot the PLCs that control the equipment, tune it to move more packages per hour, and fix problems on the floor fast when a line goes down. It's an onsite role with some evening coverage during peak season.",
    questions: [
      { topic: "Experience", question: "Which PLC platforms have you programmed, and what kind of material-handling equipment did they run?", listenFor: "Allen-Bradley or Siemens, ladder logic, conveyors or sortation." },
      { topic: "Troubleshooting", question: "Tell me about a line-down you fixed. How did you find the cause?", listenFor: "a calm, step-by-step approach and reading I/O and fault logs." },
      { topic: "Improvement", question: "Have you increased throughput on a system? What did you change?", listenFor: "real numbers, like packages per hour before and after." },
      { topic: "Schedule", question: "Peak season needs some evening and weekend coverage. Does that work for you?", listenFor: "a clear yes and no conflicts." },
    ],
  },
  {
    id: "REQ-31232",
    title: "RFID & Scanner Hardware Engineer",
    client: "Northstar",
    location: "Irving, TX",
    type: "Full-time",
    pay: "$105K–$125K",
    am: "Alex Kiaya",
    hm: "Sofia Chen",
    cpfs: 2,
    submittals: 1,
    status: "Open",
    summary:
      "This engineer designs and tests the RFID readers and handheld scanners warehouse staff use to track every package. They pick antennas and chips, lay out circuit boards, and make sure the devices read tags reliably through cardboard, metal shelving and busy radio environments. They also work with suppliers to get new hardware certified and into production.",
    questions: [
      { topic: "Experience", question: "What RFID or barcode hardware have you designed or brought to production?", listenFor: "UHF RFID, antenna design and work that went past the prototype stage." },
      { topic: "Read rates", question: "How have you improved read rates in a tough environment, like near metal or liquids?", listenFor: "antenna tuning, field testing and measured results." },
      { topic: "Board design", question: "Which PCB tools do you use, and have you designed RF boards yourself?", listenFor: "Altium or similar, impedance control and RF layout experience." },
      { topic: "Certification", question: "Have you taken a radio device through FCC certification?", listenFor: "pre-compliance testing and working with test labs." },
    ],
  },
  { id: "REQ-31204", title: "Telematics Firmware Engineer", client: "Planet Express", location: "New York, NY · Hybrid", type: "Full-time", pay: "$135K–$160K", am: "Alex Kiaya", hm: "Emily Carter", cpfs: 6, submittals: 3, status: "Interviewing", summary: "", questions: [] },
  { id: "REQ-31225", title: "Robotics Integration Engineer (AMR)", client: "Planet Express", location: "Newark, NJ", type: "Full-time", pay: "$120K–$145K", am: "Alex Kiaya", hm: "Danielle Johnson", cpfs: 3, submittals: 1, status: "Open", summary: "", questions: [] },
  { id: "REQ-31240", title: "Network Engineer, Distribution Centers", client: "Planet Express", location: "Irving, TX", type: "Contract · 12 mo", pay: "$70–$85/hr", am: "Alex Kiaya", hm: "Marcus Lee", cpfs: 5, submittals: 3, status: "Open", summary: "", questions: [] },
  { id: "REQ-31247", title: "WMS Integration Engineer", client: "Planet Express", location: "New York, NY · Remote OK", type: "Full-time", pay: "$130K–$155K", am: "Alex Kiaya", hm: "Emily Carter", cpfs: 7, submittals: 4, status: "Interviewing", summary: "", questions: [] },
  { id: "REQ-31253", title: "Junior Embedded Software Engineer", client: "Planet Express", location: "Dallas, TX", type: "Full-time", pay: "$85K–$100K", am: "Alex Kiaya", hm: "Emily Carter", cpfs: 3, submittals: 0, status: "On hold", summary: "", questions: [] },
];

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  location: string;
  skills: string[];
  availability: string;
  desiredPay: string;
  education: string;
  status: "New" | "Screening" | "Submitted" | "Interviewing";
  recruiter: string;
  lastActivity: string;
}

export const CANDIDATES: Candidate[] = [
  { id: "c-1001", name: "Priya Natarajan", email: "priya.natarajan88@gmail.com", phone: "(212) 555-0148", currentRole: "Firmware Engineer II, Halcyon Robotics", location: "Dallas, TX", skills: ["C / C++", "ARM Cortex-M", "FreeRTOS", "Zephyr", "LTE-M / NB-IoT", "GPS / GNSS", "OTA updates"], availability: "Dec 1, 2026", desiredPay: "$145K", education: "BS, Computer Engineering", status: "Screening", recruiter: "Marisol Ortega", lastActivity: "Nov 9, 2026" },
  { id: "c-1002", name: "Marcus Whitfield", email: "mwhitfield22@gmail.com", phone: "(404) 555-0147", currentRole: "Controls Technician, Brightline Manufacturing", location: "Atlanta, GA", skills: ["Allen-Bradley", "Ladder logic", "Conveyors", "HMI"], availability: "Immediately", desiredPay: "$118K", education: "AAS, Industrial Automation", status: "Submitted", recruiter: "Marisol Ortega", lastActivity: "Nov 8, 2026" },
  { id: "c-1003", name: "Helen Okafor", email: "helen.okafor@outlook.com", phone: "(917) 555-0412", currentRole: "RF Hardware Engineer, Lumen Optics", location: "Irving, TX", skills: ["UHF RFID", "Altium", "Antenna tuning", "FCC certification"], availability: "Jan 4, 2027", desiredPay: "$122K", education: "MS, Electrical Engineering", status: "Interviewing", recruiter: "Marisol Ortega", lastActivity: "Nov 7, 2026" },
  { id: "c-1004", name: "Dominic Reyes", email: "d.reyes.pro@gmail.com", phone: "(678) 555-0286", currentRole: "Embedded Developer, Keystone Networks", location: "Raleigh, NC", skills: ["C", "Linux drivers", "Yocto", "CAN bus"], availability: "Dec 15, 2026", desiredPay: "$135K", education: "BS, Computer Science", status: "New", recruiter: "Marisol Ortega", lastActivity: "Nov 6, 2026" },
  { id: "c-1005", name: "Grace Lindqvist", email: "g.lindqvist@protonmail.com", phone: "(303) 555-0375", currentRole: "Robotics Engineer, Redline Mobility", location: "Newark, NJ", skills: ["ROS 2", "AMR fleets", "Python", "Safety PLCs"], availability: "Feb 1, 2027", desiredPay: "$140K", education: "BS, Mechatronics", status: "Screening", recruiter: "Marisol Ortega", lastActivity: "Nov 5, 2026" },
  { id: "c-1006", name: "Tomás Herrera", email: "tomas.herrera.eng@gmail.com", phone: "(214) 555-0193", currentRole: "Network Engineer, Corvid Logistics", location: "Dallas, TX", skills: ["Cisco", "SD-WAN", "Wi-Fi 6E", "Warehouse networks"], availability: "Immediately", desiredPay: "$80/hr", education: "BS, Information Systems", status: "Submitted", recruiter: "Marisol Ortega", lastActivity: "Nov 4, 2026" },
  { id: "c-1007", name: "Aisha Bello", email: "aisha.bello.dev@gmail.com", phone: "(646) 555-0321", currentRole: "Integration Engineer, Halden & Rowe", location: "New York, NY", skills: ["WMS", "REST / EDI", "SQL", "Manhattan SCALE"], availability: "Dec 8, 2026", desiredPay: "$150K", education: "BS, Computer Engineering", status: "Interviewing", recruiter: "Marisol Ortega", lastActivity: "Nov 3, 2026" },
  { id: "c-1008", name: "Kenji Watanabe", email: "kenji.w@gmail.com", phone: "(512) 555-0444", currentRole: "Junior Firmware Engineer, Northvane Devices", location: "Austin, TX", skills: ["C / C++", "STM32", "Unit testing"], availability: "Jan 11, 2027", desiredPay: "$95K", education: "BS, Computer Engineering", status: "New", recruiter: "Marisol Ortega", lastActivity: "Nov 2, 2026" },
  { id: "c-1009", name: "Lena Novak", email: "lena.novak@outlook.com", phone: "(469) 555-0170", currentRole: "Senior Embedded Engineer, Tandem Auto", location: "Dallas, TX", skills: ["AUTOSAR", "C", "Telematics", "Functional safety"], availability: "Dec 1, 2026", desiredPay: "$160K", education: "MS, Computer Engineering", status: "Screening", recruiter: "Marisol Ortega", lastActivity: "Nov 1, 2026" },
  { id: "c-1010", name: "Samuel Ortiz", email: "samuel.ortiz@gmail.com", phone: "(201) 555-0119", currentRole: "PLC Programmer, Bluestem Foods", location: "Newark, NJ", skills: ["Siemens TIA", "Ladder logic", "SCADA"], availability: "Immediately", desiredPay: "$112K", education: "BS, Electrical Engineering", status: "New", recruiter: "Marisol Ortega", lastActivity: "Oct 30, 2026" },
  { id: "c-1011", name: "Nadia Rahman", email: "nadia.rahman@gmail.com", phone: "(972) 555-0102", currentRole: "Hardware Test Engineer, Northstar", location: "Irving, TX", skills: ["Validation", "Python", "RF test", "LabVIEW"], availability: "Dec 15, 2026", desiredPay: "$115K", education: "BS, Electrical Engineering", status: "Screening", recruiter: "Marisol Ortega", lastActivity: "Oct 29, 2026" },
  { id: "c-1012", name: "Owen Fitzgerald", email: "owen.fitz@protonmail.com", phone: "(917) 555-0388", currentRole: "IoT Engineer, Marlow Distribution", location: "New York, NY", skills: ["MQTT", "LTE-M", "C++", "AWS IoT"], availability: "Jan 4, 2027", desiredPay: "$142K", education: "BS, Computer Engineering", status: "New", recruiter: "Marisol Ortega", lastActivity: "Oct 28, 2026" },
];

export const ACCOUNTS = [
  { id: "a-1", name: "Planet Express", industry: "Logistics & Freight", hq: "New York, NY", openReqs: 8, am: "Alex Kiaya" },
  { id: "a-2", name: "Northstar", industry: "Hardware", hq: "Irving, TX", openReqs: 3, am: "Alex Kiaya" },
  { id: "a-3", name: "Halden & Rowe Freight", industry: "Logistics & Freight", hq: "Newark, NJ", openReqs: 5, am: "Jordan Ellis" },
  { id: "a-4", name: "Brightline Semiconductor", industry: "Semiconductors", hq: "San Jose, CA", openReqs: 6, am: "Hannah Wilks" },
  { id: "a-5", name: "Redline Mobility", industry: "Automotive", hq: "Detroit, MI", openReqs: 4, am: "Stacy Jones" },
];

export const ACTIVITY = [
  { id: "act-1", candidate: "c-1001", type: "Candidate profile (CPF)", by: "Marisol Ortega", when: "Nov 9, 2026 · 10:30 AM", req: "REQ-31211", note: "profile done. 4 yrs Zephyr + FreeRTOS on Cortex-M, shipped a fleet tracker at Halcyon. wants 145, open to hybrid Dallas." },
  { id: "act-2", candidate: "c-1001", type: "Call", by: "Marisol Ortega", when: "Nov 6, 2026 · 2:15 PM", req: "REQ-31211", note: "intro call. strong on OTA + LTE-M. avail Dec 1. sending JD." },
  { id: "act-3", candidate: "c-1001", type: "Note", by: "Alex Kiaya", when: "Nov 5, 2026 · 9:00 AM", req: null, note: "Emily at Planet Express wants 2 more embedded profiles by Fri." },
];

/** Client-side contacts: hiring managers and decision makers at accounts. */
export const CONTACTS = [
  { id: "ct-1", name: "Emily Carter", title: "Director of Fleet Engineering", account: "Planet Express", office: "Dallas", email: "emily.carter@example.com", phone: "(214) 555-0110", lastContact: "Nov 5, 2026" },
  { id: "ct-2", name: "Taylor Lee", title: "HR Manager, Irving", account: "Planet Express", office: "Dallas", email: "taylor.lee@example.com", phone: "(214) 555-0147", lastContact: "Nov 9, 2026" },
  { id: "ct-3", name: "Danielle Johnson", title: "Warehouse Automation Lead", account: "Planet Express", office: "Dallas", email: "danielle.johnson@example.com", phone: "(214) 555-0168", lastContact: "Oct 30, 2026" },
  { id: "ct-4", name: "Dana Copper", title: "VP, Operations", account: "Planet Express", office: "Dallas", email: "dana.copper@example.com", phone: "(214) 555-0182", lastContact: "Sep 30, 2026" },
  { id: "ct-5", name: "Yesenia Bayle", title: "CFO", account: "Planet Express", office: "New York", email: "yesenia.bayle@example.com", phone: "(212) 555-0136", lastContact: "Sep 30, 2026" },
  { id: "ct-6", name: "Sofia Chen", title: "Hardware Engineering Manager", account: "Northstar", office: "Dallas", email: "sofia.chen@example.com", phone: "(972) 555-0124", lastContact: "Nov 2, 2026" },
  { id: "ct-7", name: "Marcus Lee", title: "IT Infrastructure Manager", account: "Planet Express", office: "Dallas", email: "marcus.lee@example.com", phone: "(214) 555-0193", lastContact: "Oct 21, 2026" },
  { id: "ct-8", name: "Priya Shah", title: "Talent Acquisition Partner", account: "Brightline Semiconductor", office: "New York", email: "priya.shah@example.com", phone: "(408) 555-0151", lastContact: "Oct 14, 2026" },
];

/** Internal staff. */
export const EMPLOYEES = [
  { id: "e-1", name: "Jordan Park", role: "Operations Admin", office: "Dallas", team: "Operations", start: "Mar 2019" },
  { id: "e-2", name: "Dana Whitfield", role: "Recruiting Manager", office: "Dallas", team: "Engineering Recruiting", start: "Jun 2018" },
  { id: "e-3", name: "Marisol Ortega", role: "Senior Technical Recruiter", office: "Dallas", team: "Engineering Recruiting", start: "Jan 2021" },
  { id: "e-4", name: "Alex Kiaya", role: "Account Manager", office: "New York", team: "Sales", start: "Aug 2020" },
  { id: "e-5", name: "Jordan Ellis", role: "Account Manager", office: "Dallas", team: "Sales", start: "Feb 2022" },
  { id: "e-6", name: "Hannah Wilks", role: "Account Manager", office: "New York", team: "Sales", start: "Sep 2017" },
  { id: "e-7", name: "Mike Alvarez", role: "Technical Recruiter", office: "Dallas", team: "Engineering Recruiting", start: "Apr 2023" },
  { id: "e-8", name: "Sam Rivera", role: "Product Designer", office: "New York", team: "Product", start: "Oct 2024" },
];

/** Consultants currently on assignment with clients. */
export const CONSULTANTS = [
  { id: "cs-1", name: "Rafael Costa", role: "Firmware Engineer", account: "Planet Express", location: "Dallas, TX", start: "Jul 14, 2026", end: "Jan 15, 2027", status: "On assignment" },
  { id: "cs-2", name: "Mei Tanaka", role: "Controls Engineer", account: "Planet Express", location: "Red Oak, TX", start: "May 4, 2026", end: "Nov 27, 2026", status: "Ending soon" },
  { id: "cs-3", name: "Derek Owens", role: "Network Engineer", account: "Planet Express", location: "Irving, TX", start: "Aug 3, 2026", end: "Aug 2, 2027", status: "On assignment" },
  { id: "cs-4", name: "Ana Petrovic", role: "RF Test Engineer", account: "Northstar", location: "Irving, TX", start: "Sep 8, 2026", end: "Mar 6, 2027", status: "On assignment" },
  { id: "cs-5", name: "Luis Romero", role: "WMS Analyst", account: "Planet Express", location: "New York, NY", start: "Jun 1, 2026", end: "Dec 4, 2026", status: "Ending soon" },
];

/**
 * Candidate list cards: recent touchpoints and a quick note per candidate.
 * Activity codes: LMEM = left message (email), LMOM = left message (mobile), CPF = candidate profile.
 */
export interface FeedEntry { type: "LMEM" | "LMOM" | "CPF" | "Call" | "Note" | string; when: string; by: string; note?: string; tags?: string[] }
export interface CandidateCard { submitted: string; lastTouch: string; quickNote: string; feed: FeedEntry[]; rates: Array<{ date: string; rate: string; req: string }> }

export const CANDIDATE_CARDS: Record<string, CandidateCard> = {
  "c-1001": { submitted: "4d ago", lastTouch: "LMEM: today", quickNote: "", feed: [
    { type: "LMEM", when: "Today @ 10:30 AM", by: "Marisol Ortega", note: "confirmed screening for Thu" },
    { type: "CPF", when: "Yesterday @ 3:15 PM", by: "Marisol Ortega", tags: ["In market", "$145K", "Hybrid", "Perm"] },
    { type: "Call", when: "Nov 18 @ 2:05 PM", by: "Marisol Ortega", note: "walked thru Fleet IoT req, likes the OTA + LTE-M scope. wants hybrid 2 days max" },
    { type: "Note", when: "Nov 17 @ 9:40 AM", by: "Mike Alvarez", note: "HM liked her Zephyr work, asked for code sample" },
    { type: "LMOM", when: "Nov 14 @ 4:20 PM", by: "Marisol Ortega", note: "left vm re: rate, call back tmrw" },
    { type: "Note", when: "Nov 12 @ 11:00 AM", by: "Marisol Ortega", note: "sourced from LinkedIn, strong FreeRTOS + GNSS bg" },
  ], rates: [{ date: "Nov 9, 2026", rate: "$145K", req: "Embedded Systems Engineer, Fleet IoT" }, { date: "Jun 2, 2025", rate: "$132K", req: "Firmware Engineer, Halcyon Robotics" }] },
  "c-1002": { submitted: "2d ago", lastTouch: "LMOM: yesterday", quickNote: "", feed: [
    { type: "LMOM", when: "Yesterday @ 4:00 PM", by: "Mike Alvarez", note: "phone screen scheduled" },
    { type: "CPF", when: "Today @ 11:45 AM", by: "Marisol Ortega", tags: ["In market", "$118K", "Onsite", "Contract"] },
    { type: "Note", when: "Nov 19 @ 1:30 PM", by: "Marisol Ortega", note: "needs PLC portfolio review before submit" },
    { type: "Call", when: "Nov 18 @ 10:10 AM", by: "Marisol Ortega", note: "open to 2nd shift, has own tools. AB + conveyors daily" },
    { type: "LMEM", when: "Nov 15 @ 3:45 PM", by: "Mike Alvarez", note: "sent Controls Eng JD" },
  ], rates: [{ date: "Nov 8, 2026", rate: "$118K", req: "Controls Engineer, Warehouse Automation" }] },
  "c-1003": { submitted: "1d ago", lastTouch: "LMEM: today", quickNote: "", feed: [
    { type: "LMEM", when: "Today @ 9:00 AM", by: "Marisol Ortega", note: "screening completed" },
    { type: "CPF", when: "Today @ 1:20 PM", by: "Dana Whitfield", tags: ["In market", "$122K", "Onsite", "Perm"] },
    { type: "Call", when: "Nov 20 @ 3:00 PM", by: "Marisol Ortega", note: "strong on RF layout + FCC cert. 2 offers pending elsewhere, move fast" },
    { type: "Note", when: "Nov 19 @ 9:15 AM", by: "Dana Whitfield", note: "HM wants panel w/ scanner team next wk" },
    { type: "LMOM", when: "Nov 17 @ 12:30 PM", by: "Marisol Ortega", note: "vm re: notice period, ends Jan 4" },
    { type: "Note", when: "Nov 16 @ 5:05 PM", by: "Marisol Ortega", note: "referral from Nadia R" },
  ], rates: [{ date: "Nov 7, 2026", rate: "$122K", req: "RFID & Scanner Hardware Engineer" }, { date: "Feb 11, 2025", rate: "$110K", req: "RF Hardware Engineer, Lumen Optics" }] },
  "c-1004": { submitted: "3d ago", lastTouch: "LMEM: 2d ago", quickNote: "", feed: [
    { type: "LMEM", when: "2d ago @ 3:30 PM", by: "Mike Alvarez", note: "awaiting feedback" },
    { type: "CPF", when: "Yesterday @ 5:00 PM", by: "Marisol Ortega", tags: ["In market", "$135K", "Remote", "Perm"] },
    { type: "Note", when: "Nov 18 @ 2:45 PM", by: "Marisol Ortega", note: "strong linux driver bg, Yocto builds from scratch" },
    { type: "Call", when: "Nov 17 @ 11:20 AM", by: "Marisol Ortega", note: "remote only, won't relocate from Raleigh. ok w/ quarterly travel" },
    { type: "LMOM", when: "Nov 15 @ 9:00 AM", by: "Mike Alvarez", note: "no answer, try again Mon" },
  ], rates: [{ date: "Nov 6, 2026", rate: "$135K", req: "Embedded Systems Engineer, Fleet IoT" }] },
  "c-1005": { submitted: "5d ago", lastTouch: "LMEM: 3d ago", quickNote: "", feed: [
    { type: "LMEM", when: "3d ago @ 10:00 AM", by: "Marisol Ortega", note: "interview scheduled" },
    { type: "CPF", when: "Today @ 2:30 PM", by: "Dana Whitfield", tags: ["In market", "$140K", "Onsite", "Contract"] },
    { type: "Note", when: "Nov 18 @ 4:15 PM", by: "Dana Whitfield", note: "strong problem solving on tech screen, HM liked her" },
    { type: "Call", when: "Nov 16 @ 1:00 PM", by: "Marisol Ortega", note: "ROS 2 + AMR fleet exp at Redline, 40 bots. wants contract-to-hire" },
    { type: "Note", when: "Nov 14 @ 10:30 AM", by: "Marisol Ortega", note: "notice ends Feb 1, may buy out early" },
  ], rates: [{ date: "Nov 5, 2026", rate: "$140K", req: "Robotics Integration Engineer (AMR)" }] },
  "c-1006": { submitted: "6d ago", lastTouch: "LMEM: 4d ago", quickNote: "", feed: [
    { type: "LMEM", when: "4d ago @ 9:45 AM", by: "Mike Alvarez", note: "profile shortlisted" },
    { type: "CPF", when: "Yesterday @ 11:00 AM", by: "Marisol Ortega", tags: ["In market", "$80/hr", "Hybrid", "Contract"] },
    { type: "Call", when: "Nov 17 @ 3:30 PM", by: "Marisol Ortega", note: "strong warehouse network exp, did 6 DC Wi-Fi 6E rollouts" },
    { type: "Note", when: "Nov 16 @ 8:50 AM", by: "Mike Alvarez", note: "client asked about CCNP, he has it" },
    { type: "LMOM", when: "Nov 13 @ 2:15 PM", by: "Marisol Ortega", note: "vm, available immediately" },
  ], rates: [{ date: "Nov 4, 2026", rate: "$80/hr", req: "Network Engineer, Distribution Centers" }] },
  "c-1007": { submitted: "2d ago", lastTouch: "LMOM: today", quickNote: "", feed: [
    { type: "LMOM", when: "Today @ 8:40 AM", by: "Marisol Ortega", note: "second interview Fri" },
    { type: "CPF", when: "Nov 3 @ 4:10 PM", by: "Marisol Ortega", tags: ["In market", "$150K", "Hybrid", "Perm"] },
    { type: "Note", when: "Nov 20 @ 5:30 PM", by: "Dana Whitfield", note: "1st round feedback great, EDI depth stood out" },
    { type: "Call", when: "Nov 19 @ 12:00 PM", by: "Marisol Ortega", note: "prepped for panel, reviewed Manhattan SCALE q's" },
    { type: "LMEM", when: "Nov 17 @ 9:30 AM", by: "Marisol Ortega", note: "sent interview confirmation + parking info" },
    { type: "Note", when: "Nov 15 @ 3:20 PM", by: "Marisol Ortega", note: "counteroffer risk, current co knows she's looking" },
  ], rates: [{ date: "Nov 3, 2026", rate: "$150K", req: "WMS Integration Engineer" }, { date: "Jan 20, 2025", rate: "$138K", req: "Integration Engineer, Halden & Rowe" }] },
  "c-1008": { submitted: "1w ago", lastTouch: "LMEM: 5d ago", quickNote: "", feed: [
    { type: "LMEM", when: "5d ago @ 1:00 PM", by: "Mike Alvarez", note: "sent JD, waiting to hear back" },
    { type: "CPF", when: "Nov 2 @ 10:15 AM", by: "Mike Alvarez", tags: ["Passive", "$95K", "Onsite", "Perm"] },
    { type: "Note", when: "Nov 14 @ 11:40 AM", by: "Marisol Ortega", note: "good fit for junior req, STM32 projects on github" },
    { type: "Call", when: "Nov 12 @ 4:00 PM", by: "Mike Alvarez", note: "passive, happy where he is but curious. wants mentorship" },
    { type: "LMOM", when: "Nov 10 @ 10:05 AM", by: "Mike Alvarez", note: "vm intro" },
  ], rates: [{ date: "Nov 2, 2026", rate: "$95K", req: "Junior Embedded Software Engineer" }] },
  "c-1009": { submitted: "3d ago", lastTouch: "LMEM: yesterday", quickNote: "", feed: [
    { type: "LMEM", when: "Yesterday @ 2:10 PM", by: "Marisol Ortega", note: "sent telematics req details" },
    { type: "CPF", when: "Nov 19 @ 10:00 AM", by: "Marisol Ortega", tags: ["In market", "$160K", "Hybrid", "Perm"] },
    { type: "Call", when: "Nov 18 @ 1:45 PM", by: "Marisol Ortega", note: "AUTOSAR + ISO 26262, senior. rate firm at 160" },
    { type: "Note", when: "Nov 17 @ 9:20 AM", by: "Dana Whitfield", note: "may be overqualified for Fleet IoT, check w/ HM" },
    { type: "LMOM", when: "Nov 15 @ 11:30 AM", by: "Marisol Ortega", note: "vm, call back after 4" },
  ], rates: [{ date: "Nov 1, 2026", rate: "$160K", req: "Embedded Systems Engineer, Fleet IoT" }, { date: "Mar 3, 2025", rate: "$151K", req: "Senior Embedded Engineer, Tandem Auto" }] },
  "c-1010": { submitted: "1w ago", lastTouch: "LMOM: 2d ago", quickNote: "", feed: [
    { type: "LMOM", when: "2d ago @ 9:15 AM", by: "Mike Alvarez", note: "no answer, 2nd attempt" },
    { type: "CPF", when: "Nov 18 @ 3:40 PM", by: "Mike Alvarez", tags: ["In market", "$112K", "Onsite", "Perm"] },
    { type: "Call", when: "Nov 16 @ 2:00 PM", by: "Mike Alvarez", note: "Siemens TIA heavy, light on AB. ok w/ Newark DC" },
    { type: "Note", when: "Nov 14 @ 10:50 AM", by: "Marisol Ortega", note: "could work for controls req if AB training ok" },
  ], rates: [{ date: "Oct 30, 2026", rate: "$112K", req: "Controls Engineer, Warehouse Automation" }] },
  "c-1011": { submitted: "4d ago", lastTouch: "LMEM: today", quickNote: "", feed: [
    { type: "LMEM", when: "Today @ 12:15 PM", by: "Marisol Ortega", note: "sent prep notes for test eng panel" },
    { type: "CPF", when: "Nov 19 @ 2:30 PM", by: "Dana Whitfield", tags: ["In market", "$115K", "Onsite", "Perm"] },
    { type: "Call", when: "Nov 18 @ 11:00 AM", by: "Marisol Ortega", note: "knows Northstar team already, referred Helen O" },
    { type: "Note", when: "Nov 16 @ 4:40 PM", by: "Dana Whitfield", note: "strong LabVIEW + RF test, python automation" },
    { type: "LMOM", when: "Nov 14 @ 9:00 AM", by: "Marisol Ortega", note: "vm re: notice, ends Dec 15" },
  ], rates: [{ date: "Oct 29, 2026", rate: "$115K", req: "Hardware Test Engineer, Scanners" }] },
  "c-1012": { submitted: "5d ago", lastTouch: "LMEM: 3d ago", quickNote: "", feed: [
    { type: "LMEM", when: "3d ago @ 3:00 PM", by: "Marisol Ortega", note: "sent fleet IoT req + benefits summary" },
    { type: "CPF", when: "Nov 18 @ 1:10 PM", by: "Marisol Ortega", tags: ["Passive", "$142K", "Hybrid", "Perm"] },
    { type: "Call", when: "Nov 17 @ 10:30 AM", by: "Marisol Ortega", note: "MQTT + AWS IoT at scale, 12k devices. curious not urgent" },
    { type: "Note", when: "Nov 15 @ 2:20 PM", by: "Mike Alvarez", note: "good backup for Priya on Fleet IoT" },
    { type: "LMOM", when: "Nov 13 @ 4:50 PM", by: "Marisol Ortega", note: "vm intro, mentioned Planet Express" },
  ], rates: [{ date: "Oct 28, 2026", rate: "$142K", req: "Embedded Systems Engineer, Fleet IoT" }] },
};

export const NOTICE: Record<string, string> = {
  "c-1001": "Available Dec 1", "c-1002": "Available immediately", "c-1003": "Notice period ends Jan 4", "c-1004": "Notice period ends Dec 15",
  "c-1005": "Notice period ends Feb 1", "c-1006": "Available immediately", "c-1007": "Notice period ends Dec 8", "c-1008": "Notice period ends Jan 11",
  "c-1009": "Available Dec 1", "c-1010": "Available immediately", "c-1011": "Notice period ends Dec 15", "c-1012": "Notice period ends Jan 4",
};

/* ---------------- Account detail (account page) ---------------- */

export interface AccountActivity { by: string; verb: string; with: string; office: string; time: string; note: string }
export interface AccountDetail {
  team: string[];
  teamSize: number;
  revenue: string;
  contractors: number;
  map?: boolean;
  mapAlt?: string;
  roles: Array<{ role: string; name: string; phone: string }>;
  origin: { year: number; by: string };
  activity: Array<{ day: string; items: AccountActivity[] }>;
  activityTotal: number;
}

const PE_TEAM = ["Brittany Thompson", "Daniel Ruiz", "Hannah Wilks", "Sofia Lindqvist", "Noah Bennett", "Maya Castillo", "Jordan Ellis", "Ethan Cho", "Stacy Jones"];

export const ACCOUNT_DETAILS: Record<string, AccountDetail> = {
  "a-1": {
    team: PE_TEAM,
    teamSize: 67,
    revenue: "$12.5M",
    contractors: 128,
    map: true,
    mapAlt: "Map of the blocks around Planet Express headquarters in New York, beside the Hudson River",
    roles: [
      { role: "Account lead", name: "Brittany Thompson", phone: "(484) 500-1000" },
      { role: "Compliance", name: "Maya Castillo", phone: "(678) 291-8080" },
      { role: "Delivery lead", name: "Daniel Ruiz", phone: "(484) 500-1000" },
    ],
    origin: { year: 2012, by: "Arika Zimm" },
    activityTotal: 89,
    activity: [
      { day: "Today • Nov 23", items: [
        { by: "Jordan Ellis", verb: "meeting with", with: "Taylor Lee", office: "Dallas", time: "10:30 AM", note: "Mike and Taylor coordinated start timing, onboarding, and conversion expectations for several Red Oak and Irving positions, including an immediate backfill and offers for Francisco Olivarez and Heun Park. Mike will identify candidates and begin recruiting while Taylor tracks HR, acceptance, and background-check progress." },
        { by: "Stacy Jones", verb: "meeting with", with: "Taz Priya", office: "New York", time: "10:00 AM", note: "sync re Taz and vendor performance. need Taz to improve onsite presence. Chris, Nick, Milo doing great." },
      ] },
      { day: "Yesterday • Nov 22", items: [
        { by: "Jordan Ellis", verb: "meeting with", with: "Dana Copper", office: "Dallas", time: "5:30 PM", note: "call w/ Dana re Q4 volume. peak starts early Dec, needs 15 extra pickers on 2nd shift at Newark. sending headcount plan Fri." },
        { by: "Hannah Wilks", verb: "meeting with", with: "Yesenia Bayle", office: "New York", time: "5:30 PM", note: "Yesenia confirmed the telematics budget is on the Dec 8 board agenda." },
      ] },
      { day: "Last week", items: [
        { by: "Stacy Jones", verb: "meeting with", with: "Taz Priya", office: "New York", time: "Nov 18", note: "onsite walk w/ Taz. new badge process live Mon. Chris covering 2nd shift lead until Jan." },
        { by: "Jordan Ellis", verb: "meeting with", with: "Taylor Lee", office: "Dallas", time: "Nov 17", note: "Irving backfill filled. Taylor wants a weekly fill-rate report by Fri." },
        { by: "Hannah Wilks", verb: "meeting with", with: "Yesenia Bayle", office: "New York", time: "Nov 16", note: "QBR prep. OTD at 97.2%. Yesenia wants options for weekend coverage in the Northeast by mid Dec." },
        { by: "Jordan Ellis", verb: "meeting with", with: "Dana Copper", office: "Dallas", time: "Nov 15", note: "Dana flagged 2 no-shows at Red Oak this wk. pushing for an attendance report + backup bench." },
      ] },
      { day: "Earlier in November", items: [
        { by: "Stacy Jones", verb: "meeting with", with: "Taz Priya", office: "New York", time: "Nov 9", note: "kickoff for Q4 peak hiring. targets: 40 pickers, 6 leads across the NJ sites." },
        { by: "Hannah Wilks", verb: "meeting with", with: "Yesenia Bayle", office: "New York", time: "Nov 4", note: "billing contact changed: invoices now go to Nadia Rahman, Controller." },
      ] },
    ],
  },
};

/** Other accounts get a lighter page built from the list row until they have real detail. */
export function accountDetail(id: string, am: string): AccountDetail {
  return ACCOUNT_DETAILS[id] ?? {
    team: [am, "Daniel Ruiz", "Maya Castillo", "Noah Bennett"],
    teamSize: 12,
    revenue: "$3.1M",
    contractors: 24,
    roles: [
      { role: "Account lead", name: am, phone: "(484) 500-1000" },
      { role: "Compliance", name: "Maya Castillo", phone: "(678) 291-8080" },
    ],
    origin: { year: 2019, by: am },
    activityTotal: 1,
    activity: [{ day: "Last week", items: [{ by: am, verb: "meeting with", with: "Hiring team", office: "Dallas", time: "Nov 17", note: "quarterly check-in. 2 reqs likely to open in Jan, will send JDs." }] }],
  };
}
