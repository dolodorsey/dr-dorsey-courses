const STORAGE_ROOT = "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/lifestyle-university";

export const mediaUrl = (path) => `${STORAGE_ROOT}/${path}`;

export const MEDIA = {
  primaryLogo: mediaUrl("brand/primary-logo.webp"),
  alternateCrest: mediaUrl("brand/alternate-crest.webp"),
  homepageHero: mediaUrl("site/homepage-hero.webp"),
  homepageBackground: mediaUrl("site/homepage-background.webp"),
  flagshipPrograms: mediaUrl("site/flagship-programs.webp"),
  operatorConsole: mediaUrl("site/operator-console.webp"),
  operatorConsoleEmpire: mediaUrl("site/operator-console-empire.webp"),
  toolVault: mediaUrl("site/tool-vault.webp"),
  toolVaultExpanded: mediaUrl("site/tool-vault-expanded.webp"),
  strategyRoom: mediaUrl("site/strategy-room.webp"),
  buildDesk: mediaUrl("site/build-desk.webp"),
  dashboardWelcome: mediaUrl("dashboard/welcome.webp"),
  dashboardProgress: mediaUrl("dashboard/progress-command.webp"),
  proofBuild: mediaUrl("lms/proof-build-arena.webp"),
  operatorCredential: mediaUrl("lms/operator-credential.webp"),
  stageGate: mediaUrl("lms/stage-gate.webp"),
  globalMastermind: mediaUrl("community/global-mastermind-society.webp"),
  communityAccess: mediaUrl("community/community-access.webp"),
  brandArchitectureLab: mediaUrl("labs/brand-architecture-lab.webp"),
  wealthStrategy: mediaUrl("wealth/wealth-strategy-chamber.webp"),
  campusFuture: mediaUrl("brand/campus-of-the-future.webp"),
  liveLifestyle: mediaUrl("brand/live-the-lifestyle.webp"),
  stageHeader: mediaUrl("templates/stage-header.webp"),
  lessonFrame: mediaUrl("templates/lesson-frame.webp"),
  courseTitle: mediaUrl("templates/course-title-card.webp"),
  lowerThird: mediaUrl("templates/lower-third.webp"),
  quoteCard: mediaUrl("templates/quote-card.webp"),
  actionCard: mediaUrl("templates/action-card.webp"),
  completionCard: mediaUrl("templates/completion-card.webp"),
};

const COURSE_COVERS = new Set([
  "event-money-machine",
  "nightlife-money-machine",
  "lifestyle-specialist-blueprint",
  "automate-your-business-os",
  "restaurant-qsr-blueprint",
  "audience-to-income-system",
  "culture-brand-ecommerce",
  "service-business-scale",
  "app-launch-blueprint",
  "venue-revenue-blueprint",
]);

export function courseCover(slug) {
  return COURSE_COVERS.has(slug) ? mediaUrl(`courses/${slug}.webp`) : MEDIA.flagshipPrograms;
}

export function layeredBackground(url, overlay = "linear-gradient(90deg,rgba(5,8,18,.94) 0%,rgba(5,8,18,.76) 52%,rgba(5,8,18,.42) 100%)") {
  return { backgroundImage: `${overlay}, url(${url})` };
}
