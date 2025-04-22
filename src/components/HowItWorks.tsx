import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Heroic Support",
    description:
      "We provide 24/7 support to help you find your lost items. ",
  },
  {
    icon: <MapIcon />,
    title: "Location",
    description:
      "Choose your location and find lost items near you. ",
  },
  {
    icon: <PlaneIcon />,
    title: "Chat",
    description:
      "Chat with the person who found your item and get it back. ",
  },
  {
    icon: <GiftIcon />,
    title: "Gifts",
    description:
      "Get a chance to receive gifts for getting your lost items back. ",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        What we{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Offer{" "}
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
      Report an item or reconnect with a lost one. Everything is simple and easy to use. We can provide: 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
