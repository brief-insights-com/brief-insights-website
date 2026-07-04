import { Link } from "react-router-dom";

const deContent = `
<h1>Impressum</h1>

<p>Brief Insights UG (haftungsbeschränkt)<br />
Johanna-Stegen-Straße 24<br />
c/o Alves Avelino<br />
12167 Berlin</p>

<p>Handelsregister: HRB 284028 B<br />
Registergericht: Amtsgericht Charlottenburg</p>

<p><strong>Vertreten durch:</strong><br />
Jefferson Alves Avelino, Ali Zomorodian</p>

<h2>Kontakt</h2>
<p>Telefon: +493016637678<br />
E-Mail: <a href="mailto:info@brief-insights.com">info@brief-insights.com</a></p>

<h2>Umsatzsteuer-ID</h2>
<p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
DE461404955</p>

<h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
<p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
`;

const enContent = `
<h1>Site Notice</h1>

<p>Brief Insights UG (haftungsbeschränkt)<br />
Johanna-Stegen-Straße 24<br />
c/o Alves Avelino<br />
12167 Berlin</p>

<p>Commercial Register: HRB 284028 B<br />
Registration court: Amtsgericht Charlottenburg</p>

<p><strong>Represented by:</strong><br />
Jefferson Alves Avelino, Ali Zomorodian</p>

<h2>Contact</h2>
<p>Phone: +493016637678<br />
E-mail: <a href="mailto:info@brief-insights.com">info@brief-insights.com</a></p>

<h2>VAT ID</h2>
<p>Sales tax identification number according to Sect. 27 a of the Sales Tax Law:<br />
DE461404955</p>

<h2>Dispute resolution proceedings in front of a consumer arbitration board</h2>
<p>We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.</p>
`;

const legalProse =
  "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-6 [&_h1]:mt-10 first:[&_h1]:mt-0 " +
  "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 " +
  "[&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 " +
  "[&_strong]:text-foreground [&_strong]:font-semibold " +
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:opacity-80 [&_a]:transition-opacity";

const Impressum = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="max-w-2xl mx-auto px-6 py-20">
      <Link
        to="/"
        className="text-sm text-muted-foreground hover:text-primary transition-colors mb-12 inline-block"
      >
        ← Back to Home
      </Link>

      <div
        className={legalProse}
        dangerouslySetInnerHTML={{ __html: deContent }}
      />

      <div className="my-12 border-t border-foreground/10" />

      <div
        className={legalProse}
        dangerouslySetInnerHTML={{ __html: enContent }}
      />
    </div>
  </div>
);

export default Impressum;
