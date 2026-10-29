// Shared form fields, worded as on awbauerco.com's own form:
// "Name", "Surname", "Mail", "Phone", "What's on your mind?".
export function FormFalt({ meddelandeKravs = true }: { meddelandeKravs?: boolean }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-namn" className="text-sm font-medium">
            Name
          </label>
          <input id="f-namn" name="namn" required autoComplete="given-name" className="field mt-2" />
        </div>
        <div>
          <label htmlFor="f-efternamn" className="text-sm font-medium">
            Surname
          </label>
          <input
            id="f-efternamn"
            name="efternamn"
            required
            autoComplete="family-name"
            className="field mt-2"
          />
        </div>
        <div>
          <label htmlFor="f-epost" className="text-sm font-medium">
            Mail
          </label>
          <input
            id="f-epost"
            name="epost"
            type="email"
            required
            autoComplete="email"
            className="field mt-2"
          />
        </div>
        <div>
          <label htmlFor="f-telefon" className="text-sm font-medium">
            Phone
          </label>
          <input id="f-telefon" name="telefon" type="tel" autoComplete="tel" className="field mt-2" />
        </div>
      </div>
      <div>
        <label htmlFor="f-meddelande" className="text-sm font-medium">
          What’s on your mind?
        </label>
        <textarea
          id="f-meddelande"
          name="meddelande"
          rows={5}
          required={meddelandeKravs}
          className="field mt-2"
        />
      </div>
    </>
  );
}
