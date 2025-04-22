import { Statistics } from "./Statistics";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src="./src/assets/lostandfound.jpg"
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span>
                  About{" "}
                </span>
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                Lost&Found{" "}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
              Lost & Found is a community-driven platform where users can report and search for lost or found items. Whether you’ve misplaced your phone, found a pet, or left something behind in a public place, our website helps connect people to reunite lost belongings with their rightful owners. Simple to use, fast, and secure. Get stareted now!
              </p>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
