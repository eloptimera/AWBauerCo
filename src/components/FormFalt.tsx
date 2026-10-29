// Shared form fields, worded as on awbauerco.com's own form:
// "Name", "Surname", "Mail", "Phone", "What's on your mind?".
export function FormFalt({ meddelandeKravs = true }: { meddelandeKravs?: boolean }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-namn" className="label text-ink-soft">
            Name
          </label>
          <input
            id="f-namn"
            name="namn"
            required
            autoComplete="given-name"
            className="field mt-3"
          />
        </div>
        <div>
          <label htmlFor="f-efternamn" className="label text-ink-soft">
            Surname
          </label>
          <input
            id="f-efternamn"
            name="efternamn"
            required
            autoComplete="family-name"
            className="field mt-3"
          />
        </div>
        <div>
          <label htmlFor="f-epost" className="label text-ink-soft">
            Mail
          </label>
          <input
            id="f-epost"
            name="epost"
            type="email"
            required
            autoComplete="email"
            className="field mt-3"
          />
        </div>
        <div>
          <label htmlFor="f-telefon" className="label text-ink-soft">
            Phone
          </label>
          <input
            id="f-telefon"
            name="telefon"
            type="tel"
            autoComplete="tel"
            className="field mt-3"
          />
        </div>
      </div>
      <div>
        <label htmlFor="f-meddelande" className="label text-ink-soft">
          What’s on your mind?
        </label>
        <textarea
          id="f-meddelande"
          name="meddelande"
          rows={5}
          required={meddelandeKravs}
          className="field mt-3"
        />
      </div>
    </>
  );
}
