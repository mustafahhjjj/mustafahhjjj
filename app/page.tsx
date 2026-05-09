import { AnalyticsReports } from "@/components/AnalyticsReports";
import { Awards } from "@/components/Awards";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { GradeExplorer } from "@/components/GradeExplorer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Recommendations } from "@/components/Recommendations";
import { SkillPlans } from "@/components/SkillPlans";
import { SocialProof } from "@/components/SocialProof";
import { SubjectGrid } from "@/components/SubjectGrid";
import { TeacherAnalytics } from "@/components/TeacherAnalytics";
import { TrustStats } from "@/components/TrustStats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <GradeExplorer />
        <SubjectGrid />
        <SkillPlans />
        <Recommendations />
        <TeacherAnalytics />
        <Awards />
        <AnalyticsReports />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
