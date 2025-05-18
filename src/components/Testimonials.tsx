
const testimonials = [
  {
    quote: "AegisWhistle's AI assistant made reporting a complex financial irregularity straightforward and less intimidating. The platform's security measures gave me confidence throughout the process.",
    author: "Anonymous Financial Analyst",
    company: "Fortune 500 Company"
  },
  {
    quote: "As a compliance officer, I've seen a 40% increase in valuable reports since implementing AegisWhistle. The blockchain verification feature adds an essential layer of trust to our whistleblowing process.",
    author: "Compliance Director",
    company: "Global Healthcare Organization"
  },
  {
    quote: "The empathetic approach of the AI assistant helps whistleblowers feel heard and respected. This psychological safety is crucial for encouraging people to come forward with sensitive information.",
    author: "Corporate Ethics Researcher",
    company: "Leading Business School"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-aegis-blue text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            AegisWhistle is transforming how organizations handle whistleblower reports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <div className="mb-6 text-5xl text-aegis-accent">"</div>
              <p className="mb-6 text-gray-100">{testimonial.quote}</p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-gray-300 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
