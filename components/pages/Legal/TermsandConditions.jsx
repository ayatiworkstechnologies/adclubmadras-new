import React from "react";

export default function TermsConditions() {
  return (
    <section className="bg-white dark:bg-black transition-colors mt-16 duration-500 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Terms & Conditions
        </h1>
        

        <div className="space-y-6 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
          <p>
            Applications must be proposed and seconded by members, who must quote
            their membership number while affixing their signatures.
          </p>

          <p>
            Offline Applications must be accompanied by a crossed cheque or demand
            draft. Cheque/demand draft should be drawn in favour of{" "}
            <strong className="text-primary">“Advertising Club Madras”</strong> and
            should be payable at Chennai.
          </p>

          <p>Please insist on an official receipt and preserve the same with you.</p>

          <h2 className="text-xl font-semibold text-primary mt-6">
            Eligibility for Membership:
          </h2>
          <p>
            An individual of good standing in the community, who has attained the age
            of 18 years, who believes in and subscribes to the object set forth in
            the Memorandum of Association of the club and who is professionally
            engaged in advertising, publicity and public relations, or who is
            directly concerned with the creation or placing of advertising and the
            purchasing or selling of space, print or time, and who fulfills all the
            terms and conditions laid down in these rules and regulations shall be
            eligible to become a Life Member.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6">
            Admission of Members:
          </h2>
          <p>
            Every application for membership shall be placed before a meeting of the
            Managing Committee for its consideration. The Managing Committee reserves
            the right to accept or reject the application for membership without
            assigning any reason.
          </p>
        </div>
      </div>
    </section>
  );
}
