import Reveal from './Reveal';

const JulyFourthCommunityNote = () => (
  <Reveal className="md:col-span-3 bg-white rounded-lg border border-copper/30 p-6 md:p-8 shadow-sm ring-1 ring-copper/10">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
      <h3 className="text-xl md:text-2xl font-heading font-semibold text-zambia-green leading-snug">
        <span aria-hidden>🇺🇸 </span>
        Happy Independence Day from ZANC!
        <span aria-hidden> 🇿🇲</span>
      </h3>
      <span className="shrink-0 text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded self-start">
        July 4, 2026
      </span>
    </div>

    <div className="space-y-4 text-slate leading-relaxed text-sm md:text-base">
      <p>
        Today, as we join our fellow Americans in celebrating the 250th anniversary of the United States, we extend our
        warmest wishes to all members of our community.
      </p>
      <p>
        Independence Day is not only a celebration of history, but also of the enduring ideals of liberty, opportunity,
        and civic participation that continue to shape this nation.
      </p>
      <p>
        One of America&apos;s greatest strengths has always been its willingness to strive toward becoming a more perfect
        union. Like every democracy, it has faced challenges, disagreements, and moments of testing. Yet its resilience
        lies in the continued pursuit of improvement through its institutions, its people, and the shared belief that
        tomorrow can be better than today.
      </p>
      <p>
        As members of the Zambian diaspora, we are grateful for the opportunities to live, work, raise our families,
        contribute to our communities, and celebrate both our Zambian heritage and our American home.
      </p>
      <p>
        Wherever you are celebrating today, we encourage everyone to enjoy the festivities, spend time with family and
        friends, and celebrate responsibly. Please stay safe on the roads, exercise caution with fireworks, and look out
        for one another.
      </p>
      <p>
        From all of us at <strong className="font-semibold text-zambia-green">ZANC</strong>, we wish you and your
        families a joyful, safe, and Happy Fourth of July!
      </p>
      <p className="font-heading font-medium text-zambia-green pt-1">
        <span aria-hidden>🇺🇸 </span>
        Happy Independence Day!
        <span aria-hidden> 🇿🇲</span>
      </p>
    </div>
  </Reveal>
);

export default JulyFourthCommunityNote;
