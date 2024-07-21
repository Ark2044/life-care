// pages/schemes.js

const schemesList = [
  {
    name: 'Basic Plan',
    description: 'Provides essential telemedicine services with limited features.',
    features: ['Consultations', 'Basic Health Monitoring'],
    price: '$19/month',
  },
  {
    name: 'Standard Plan',
    description: 'Includes additional features and more comprehensive services.',
    features: ['All Basic Plan features', 'Extended Health Monitoring', 'Specialist Consultations'],
    price: '$49/month',
  },
  {
    name: 'Premium Plan',
    description: 'Offers full access to all services with priority support.',
    features: ['All Standard Plan features', '24/7 Support', 'Personal Health Coach'],
    price: '$99/month',
  },
];

const Schemes = () => {
  return (
    <div className="p-8" id="schemes">
      <h1 className="text-4xl font-bold text-center mb-8">Our Schemes</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {schemesList.map((scheme, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{scheme.name}</h2>
            <p className="text-gray-600 mb-4">{scheme.description}</p>
            <ul className="list-disc list-inside mb-4">
              {scheme.features.map((feature, i) => (
                <li key={i} className="text-gray-700">{feature}</li>
              ))}
            </ul>
            <p className="text-xl font-bold text-gray-900">{scheme.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
