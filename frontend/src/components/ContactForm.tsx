import Button from './Button';

/** Primary inbox until on-site form routing is ready */
export const ZANC_CONTACT_EMAIL = 'zancsac@gmail.com';

/**
 * On-site message form is disabled — visitors are directed to email directly.
 */
const ContactForm: React.FC = () => {
  const mailtoHref = `mailto:${ZANC_CONTACT_EMAIL}?subject=${encodeURIComponent('Message for ZANC')}`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate leading-relaxed">
        We&apos;re not routing messages through this website yet. To reach the team, please send an email — we read every message.
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
        <a href={mailtoHref} className="inline-block">
          <Button variant="accent" size="lg">
            Email {ZANC_CONTACT_EMAIL}
          </Button>
        </a>
      </div>
      <p className="text-xs text-slate/80">
        Copy address:{' '}
        <a href={mailtoHref} className="font-mono text-bay-blue hover:underline break-all">
          {ZANC_CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
};

export default ContactForm;
