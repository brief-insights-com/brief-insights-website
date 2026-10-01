import LegalPage from "@/components/site/LegalPage";

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

const Impressum = () => <LegalPage page="impressum" de={deContent} en={enContent} />;

export default Impressum;
