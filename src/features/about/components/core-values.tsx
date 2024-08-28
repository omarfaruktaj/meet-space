import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const coreValues = [
  {
    title: "Integrity",
    description:
      "We uphold the highest standards of integrity in all our actions.",
  },
  {
    title: "Innovation",
    description:
      "We constantly strive for innovation in our products and services.",
  },
  {
    title: "Customer Focus",
    description: "Our customers are at the heart of everything we do.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
                <CardDescription>{value.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
