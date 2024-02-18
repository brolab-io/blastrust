import Template03 from "@/components/profile-templates/Template03";
import { getProfile } from "@/services/profile.service";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: {
    wallet: string;
  };
};

export const revalidate = 0;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const profile = await getProfile(params.wallet);

  if (!profile) {
    return {
      title: "This profile was not found",
      description: "Create a bio profile on Blastrust now!",
    };
  }

  return {
    title: `Visit ${profile.name} on Blastrust`,
    description: `Bio: ${profile.bio}`,
    metadataBase: new URL("https://Blastrust.vercel.app"),
    openGraph: {
      type: "profile",
      // images: profile?.avatar ? profile.avatar : undefined,
      // username: profile.username,
      description: `Bio: ${profile.bio}`,
      title: `Visit ${profile.name} on Blastrust`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@Blastrust",
      title: `Visit ${profile.name} on Blastrust`,
      description: `Bio: ${profile.bio}`,
      // images: profile?.avatar ? profile.avatar : undefined,
    },
  };
}

const ProfilePage = async ({ params }: PageProps) => {
  if (!params.wallet.startsWith("%40")) {
    notFound();
  }
  const algoProfile = await getProfile(params.wallet);
  if (!algoProfile) {
    redirect("/profile-not-exists");
  }

  return (
    <div className="h-full">
      {/* <Template02 profile={algoProfile} wallet={params.wallet} /> */}
      <Template03 profile={algoProfile} wallet={params.wallet} />
    </div>
  );
};

export default ProfilePage;
