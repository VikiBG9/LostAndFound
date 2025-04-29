import { Button } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  user: string | null;
}

export const Hero = ({ user }: HeroProps) => {
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#CF0F47]  to-[#FF0B55] text-transparent bg-clip-text">
              Report
            </span>{" "}
            Lost and Found Stuff easily with
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Lost&Found
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Help people find their lost items and report found items with ease. Get started now!
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3" onClick={() => handleRedirect("/report-lost")}>
            Report Lost
          </Button>
          <Button className="w-full md:w-1/3" onClick={() => handleRedirect("/report-found")}>
            Report Found
          </Button>
        </div>
      </div>

      <div className="z-10">
        <HeroCards />
      </div>

      <div className="shadow"></div>
    </section>
  );
};