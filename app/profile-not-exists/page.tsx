import Image from "next/image";

const ProfileNotExistsPage = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2  font-bold text-2xl">
                  Looks like you&lsquo;ve found the doorway to the great nothing
                </h1>
                <p className="my-2 ">
                  Sorry about that! Please visit our hompage to get where you
                  need to go.
                </p>
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Take me there!
                </button>
              </div>
            </div>
            <div>
              <Image
                src="/assets/images/404-2.png"
                width={516}
                height={190}
                alt="404"
              />
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/assets/images/Group.png"
            width={539}
            height={400}
            alt="connect"
          />
        </div>
      </div>
    </div>
  );
};
export default ProfileNotExistsPage;
