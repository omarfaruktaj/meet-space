import member1 from "@/assets/customers/customer-1.jpg";
import member2 from "@/assets/customers/customer-2.jpg";
import member3 from "@/assets/customers/customer-3.jpg";
import member4 from "@/assets/customers/customer-6.jpg";

const teamMembers = [
  { src: member1, name: "Sophia Johnson", title: "Chief Executive Officer" },
  { src: member2, name: "Liam Martinez", title: "Chief Technology Officer" },
  { src: member3, name: "Olivia Brown", title: "Marketing Director" },
  { src: member4, name: "Noah Wilson", title: "Lead Software Engineer" },
];

export default function Team() {
  return (
    <section className="py-16 bg-gray-100 rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
        <p className="mt-4 text-lg text-gray-600">
          Our team is made up of passionate professionals dedicated to
          delivering the best results.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full shadow-lg"
                src={member.src}
                alt={`Team Member ${index + 1}`}
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-2 text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
