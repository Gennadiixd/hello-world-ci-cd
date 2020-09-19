import MainLayout from "@/lib/components/complex/main-layout";
import MainBanner from "@/lib/components/atomic/main-banner";

export default function Index() {
  return (
    <MainLayout title="Main Page">
      <div className="grid-9">
        <div className="banner-container">
          <MainBanner />
        </div>
      </div>
    </MainLayout>
  );
}
