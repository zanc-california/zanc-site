import { Download } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const formFiles = [
  { name: 'Membership Application', path: '/forms/membership-application.pdf', description: 'PDF — complete and submit per instructions' },
  { name: 'Insurance Application', path: '/forms/insurance-application.pdf', description: 'PDF — complete and submit per instructions' },
];

const SUBMIT_INSTRUCTIONS = 'Submit completed forms by email to info@zanc.org or mail to the address on the form.';

const Forms = () => {
  return (
    <div>
      <PageHeader title="Forms" />
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 mb-4 max-w-3xl">
            Download the following forms for ZANC programs. Complete the required forms and submit them according to the instructions provided in each document.
          </p>
          <p className="text-sm text-primary-800 font-medium mb-8">{SUBMIT_INSTRUCTIONS}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFiles.map((form) => (
              <a
                key={form.path}
                href={form.path}
                download
                className="flex items-center gap-4 p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:shadow-md transition-all group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <Download className="w-6 h-6 text-primary-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary-800 group-hover:text-primary-900">{form.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{form.description}</p>
                </div>
                <span className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md border-2 border-primary-700 text-primary-800 bg-white group-hover:bg-primary-50">
                  Download PDF
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forms;
