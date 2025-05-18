
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-montserrat text-4xl font-bold text-aegis-blue mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: May 18, 2025</p>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">1. Introduction</h2>
              <p>
                At AegisWhistle, we take your privacy extremely seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our whistleblowing platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">2. Collection of Your Information</h2>
              <p>
                We collect information that you voluntarily provide to us when you use our whistleblowing platform. The personal information we collect depends on your interaction with us and may include:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Report details you choose to provide</li>
                <li>Contact information (if you choose to provide it)</li>
                <li>Authentication information if you create an account</li>
                <li>Technical data such as IP address and browser information</li>
              </ul>
              <p>
                <strong>Important:</strong> Our platform is designed with anonymity as a priority. You can submit reports without providing any personally identifiable information.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">3. Use of Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Process and investigate reported concerns</li>
                <li>Communicate with you about your report (if you opt for communication)</li>
                <li>Improve and maintain our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">4. Disclosure of Your Information</h2>
              <p>
                We may share information with:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Designated investigators at the organization you're reporting about (content of reports only)</li>
                <li>Third-party service providers that help us operate our platform</li>
                <li>Law enforcement if required by law</li>
              </ul>
              <p>
                <strong>Blockchain Anchoring:</strong> We use blockchain technology to create an immutable timestamp and verification of your report. This does not include your personal information, only a cryptographic hash of the report content.
              </p>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">5. Security of Your Information</h2>
              <p>
                We use industry-standard technical and organizational security measures to protect your information. However, no system is completely secure. We implement various security measures including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>End-to-end encryption</li>
                <li>Anonymous reporting options</li>
                <li>Secure data storage</li>
                <li>Access controls for all data</li>
              </ul>
              
              <h2 className="font-montserrat text-2xl font-bold text-aegis-blue mt-8 mb-4">6. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: <a href="mailto:privacy@aegiswhistle.com" className="text-aegis-accent hover:underline">privacy@aegiswhistle.com</a><br />
                Address: 123 Transparency Avenue, San Francisco, CA 94105, United States
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
