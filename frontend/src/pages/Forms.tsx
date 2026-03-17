import PageHeader from '../components/PageHeader';

const formFiles = [
  { name: 'Membership Application', path: '/forms/membership-application.pdf', description: 'PDF — complete and submit per instructions' },
  { name: 'Insurance Application', path: '/forms/insurance-application.pdf', description: 'PDF — complete and submit per instructions' },
];

const Forms = () => {
  return (
    <div>
      <PageHeader title="Forms" />
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 mb-8 max-w-3xl">
            Download the following forms for ZANC programs. Complete the required forms and submit them according to the instructions provided in each document.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formFiles.map((form) => (
              <a
                key={form.path}
                href={form.path}
                download
                className="flex items-center p-4 bg-white rounded-md border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-medium text-primary-800">{form.name}</h3>
                  <p className="text-sm text-gray-500">{form.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forms;
