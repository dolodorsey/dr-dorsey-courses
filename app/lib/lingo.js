export const LINGO = Object.freeze({
  catalog: "Flagship Programs",
  program: "Program",
  programs: "Programs",
  module: "Stage",
  modules: "Stages",
  lesson: "Play",
  lessons: "Plays",
  assignment: "Build",
  assignments: "Builds",
  assessment: "Stage Gate",
  assessments: "Stage Gates",
  capstone: "Proof Build",
  resources: "Tool Vault",
  dashboard: "Operator Console",
  certificate: "Operator Credential",
  enrollment: "Program Access",
  progress: "Build Progress",
  consultation: "Strategy Room",
  services: "Build Desk",
});

export function programMeta(lessonCount = 32) {
  return [
    `${lessonCount} Plays`,
    "8 Stages",
    "8 Stage Gates",
    "1 Proof Build",
  ];
}

export function stageLabel(index) {
  return `STAGE ${String(index).padStart(2, "0")}`;
}

export function playLabel(stage, play) {
  return `STAGE ${String(stage).padStart(2, "0")} · PLAY ${String(play).padStart(2, "0")}`;
}

export function offerKindLabel(kind) {
  return ({
    consultation: "ADVISORY",
    course_level: "PROGRAM IMMERSION",
  })[kind] || "STRATEGY ACCESS";
}
