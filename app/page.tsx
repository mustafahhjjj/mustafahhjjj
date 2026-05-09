import { Awards } from "@/components/Awards";
import { FeatureCards } from "@/components/FeatureCards";
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureCards />
        <GradeExplorer />
        <SubjectGrid />
        <SkillPlans />
        <Recommendations />
        <TeacherAnalytics />
        <Awards />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
