import { Link } from "react-router-dom";

const legalProse =
  "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-6 [&_h1]:mt-10 first:[&_h1]:mt-0 " +
  "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 " +
  "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 " +
  "[&_h4]:text-sm [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-4 [&_h4]:mb-2 " +
  "[&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 " +
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-2 " +
  "[&_li]:text-sm [&_li]:text-muted-foreground [&_li]:leading-relaxed " +
  "[&_strong]:text-foreground [&_strong]:font-semibold " +
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:opacity-80 [&_a]:transition-opacity";

const deContent = `
<h1>Datenschutzerklärung</h1>

<h2>1. Datenschutz auf einen Blick</h2>
<h3>Allgemeine Hinweise</h3>
<p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>

<h3>Datenerfassung auf dieser Website</h3>
<h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
<p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.</p>

<h4>Wie erfassen wir Ihre Daten?</h4>
<p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
<p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>

<h4>Wofür nutzen wir Ihre Daten?</h4>
<p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.</p>

<h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
<p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
<p>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>

<h3>Analyse-Tools und Tools von Drittanbietern</h3>
<p>Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.</p>
<p>Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.</p>

<h2>2. Hosting</h2>
<h3>Externes Hosting</h3>
<p>Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.</p>
<p>Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).</p>
<p>Wir setzen folgenden Hoster ein:</p>
<p>GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA</p>

<h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
<h3>Datenschutz</h3>
<p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
<p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>

<h3>Hinweis zur verantwortlichen Stelle</h3>
<p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
<p>Brief Insights UG (haftungsbeschränkt)<br />
Johanna-Stegen-Straße 24, c/o Alves Avelino, 12167 Berlin</p>
<p>Telefon: +493016637678<br />
E-Mail: <a href="mailto:info@brief-insights.com">info@brief-insights.com</a></p>
<p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</p>

<h3>Speicherdauer</h3>
<p>Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.</p>

<h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
<p>Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.</p>

<h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
<p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>

<h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
<p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>

<h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
<p>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.</p>

<h3>Recht auf Datenübertragbarkeit</h3>
<p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.</p>

<h3>Auskunft, Berichtigung und Löschung</h3>
<p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu können Sie sich jederzeit an uns wenden.</p>

<h3>Recht auf Einschränkung der Verarbeitung</h3>
<p>Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen in folgenden Fällen:</p>
<ul>
<li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten.</li>
<li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht.</li>
<li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen.</li>
<li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben.</li>
</ul>

<h3>SSL- bzw. TLS-Verschlüsselung</h3>
<p>Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>

<h3>Widerspruch gegen Werbe-E-Mails</h3>
<p>Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung wird hiermit widersprochen. Die Betreiber behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen vor.</p>

<h2>4. Datenerfassung auf dieser Website</h2>
<h3>Cookies</h3>
<p>Unsere Website verwendet Cookies. Cookies sind kleine Datenpakete, die auf Ihrem Endgerät gespeichert werden. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.</p>
<p>Sofern eine Einwilligung zur Speicherung von Cookies abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.</p>

<h3>Cookie-Einwilligung</h3>
<p>Diese Website verwendet ein eigenes Cookie-Einwilligungs-Banner, um Ihre Einwilligung zur Speicherung von Analyse-Cookies auf Ihrem Endgerät einzuholen. Ihre Entscheidung wird lokal im Speicher Ihres Browsers (localStorage) gespeichert, sodass das Banner bei Folgebesuchen nicht erneut erscheint. Es werden keine personenbezogenen Daten zur Verwaltung Ihrer Einwilligung an Drittanbieter übermittelt.</p>
<p>Die Einwilligung ist jederzeit widerrufbar, indem Sie den lokalen Speicher Ihres Browsers löschen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO sowie § 25 Abs. 1 TDDDG.</p>

<h3>Kontaktformular</h3>
<p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
<p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).</p>

<h3>Anfrage per E-Mail oder Telefon</h3>
<p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
<p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO oder auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).</p>

<h2>5. Analyse-Tools und Werbung</h2>
<h3>Metricool</h3>
<p>Diese Website nutzt Metricool, einen Webanalysedienst der Metricool Inc. Metricool analysiert das Verhalten der Besucher auf unserer Website (z. B. Seitenaufrufe, Verweildauer, Herkunft). Die Datenverarbeitung erfolgt ausschließlich nach Ihrer Einwilligung über das Cookie-Banner (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie den lokalen Speicher Ihres Browsers löschen.</p>
<p>Weitere Informationen finden Sie in der Datenschutzerklärung von Metricool unter: <a href="https://metricool.com/privacy-policy" target="_blank" rel="noopener noreferrer">https://metricool.com/privacy-policy</a></p>
`;

const enContent = `
<h1>Privacy Policy</h1>

<h2>1. An overview of data protection</h2>
<h3>General information</h3>
<p>The following information will provide you with an easy to navigate overview of what will happen with your personal data when you visit this website. The term "personal data" comprises all data that can be used to personally identify you. For detailed information about the subject matter of data protection, please consult our Data Protection Declaration below.</p>

<h3>Data recording on this website</h3>
<h4>Who is the responsible party for the recording of data on this website?</h4>
<p>The data on this website is processed by the operator of the website, whose contact information is available under section "Information about the responsible party" in this Privacy Policy.</p>

<h4>How do we record your data?</h4>
<p>We collect your data as a result of your sharing of your data with us. This may, for instance, be information you enter into our contact form.</p>
<p>Other data shall be recorded by our IT systems automatically or after you consent to its recording during your website visit. This data comprises primarily technical information (e.g., web browser, operating system, or time the site was accessed). This information is recorded automatically when you access this website.</p>

<h4>What are the purposes we use your data for?</h4>
<p>A portion of the information is generated to guarantee the error-free provision of the website. Other data may be used to analyze your user patterns. If contracts can be concluded or initiated via the website, the transmitted data will also be processed for contract offers, orders, or other enquiries.</p>

<h4>What rights do you have as far as your information is concerned?</h4>
<p>You have the right to receive information about the source, recipients, and purposes of your archived personal data at any time without having to pay a fee for such disclosures. You also have the right to demand that your data are rectified or eradicated. If you have consented to data processing, you have the option to revoke this consent at any time. Moreover, you have the right to demand that the processing of your data be restricted under certain circumstances. Furthermore, you have the right to log a complaint with the competent supervising agency.</p>
<p>Please do not hesitate to contact us at any time if you have questions about this or any other data protection related issues.</p>

<h3>Analysis tools and tools provided by third parties</h3>
<p>There is a possibility that your browsing patterns will be statistically analyzed when you visit this website. Such analyses are performed primarily with what we refer to as analysis programs. For detailed information about these analysis programs please consult our Data Protection Declaration below.</p>

<h2>2. Hosting</h2>
<h3>External Hosting</h3>
<p>This website is hosted externally. Personal data collected on this website are stored on the servers of the host. These may include, but are not limited to, IP addresses, contact requests, metadata and communications, contract information, contact information, names, web page access, and other data generated through a web site.</p>
<p>The external hosting serves the purpose of fulfilling the contract with our potential and existing customers (Art. 6(1)(b) GDPR) and in the interest of secure, fast, and efficient provision of our online services by a professional provider (Art. 6(1)(f) GDPR).</p>
<p>We are using the following host:</p>
<p>GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA</p>

<h2>3. General information and mandatory information</h2>
<h3>Data protection</h3>
<p>The operators of this website take the protection of your personal data very seriously. We handle your personal data as confidential information and in compliance with the statutory data protection regulations and this Data Protection Declaration.</p>
<p>We herewith advise you that the transmission of data via the Internet may be prone to security gaps. It is not possible to completely protect data against third-party access.</p>

<h3>Information about the responsible party (controller)</h3>
<p>The data processing controller on this website is:</p>
<p>Brief Insights UG (haftungsbeschränkt)<br />
Johanna-Stegen-Straße 24, c/o Alves Avelino, 12167 Berlin</p>
<p>Phone: +493016637678<br />
E-mail: <a href="mailto:info@brief-insights.com">info@brief-insights.com</a></p>
<p>The controller is the natural person or legal entity that single-handedly or jointly with others makes decisions as to the purposes of and resources for the processing of personal data.</p>

<h3>Storage duration</h3>
<p>Unless a more specific storage period has been specified in this privacy policy, your personal data will remain with us until the purpose for which it was collected no longer applies. If you assert a justified request for deletion or revoke your consent to data processing, your data will be deleted, unless we have other legally permissible reasons for storing your personal data.</p>

<h3>General information on the legal basis for the data processing on this website</h3>
<p>If you have consented to data processing, we process your personal data on the basis of Art. 6(1)(a) GDPR. If you have consented to the storage of cookies or to the access to information in your end device, the data processing is additionally based on § 25(1) TDDDG. The consent can be revoked at any time. If your data is required for the fulfillment of a contract, we process your data on the basis of Art. 6(1)(b) GDPR. Furthermore, if your data is required for the fulfillment of a legal obligation, we process it on the basis of Art. 6(1)(c) GDPR.</p>

<h3>Revocation of your consent to the processing of data</h3>
<p>A wide range of data processing transactions are possible only subject to your express consent. You can also revoke at any time any consent you have already given us. This shall be without prejudice to the lawfulness of any data collection that occurred prior to your revocation.</p>

<h3>Right to object to the collection of data in special cases; right to object to direct advertising (Art. 21 GDPR)</h3>
<p>IN THE EVENT THAT DATA ARE PROCESSED ON THE BASIS OF ART. 6(1)(E) OR (F) GDPR, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA BASED ON GROUNDS ARISING FROM YOUR UNIQUE SITUATION. TO DETERMINE THE LEGAL BASIS ON WHICH ANY PROCESSING OF DATA IS BASED, PLEASE CONSULT THIS DATA PROTECTION DECLARATION. IF YOU LOG AN OBJECTION, WE WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA, UNLESS WE ARE IN A POSITION TO PRESENT COMPELLING PROTECTION-WORTHY GROUNDS FOR THE PROCESSING OF YOUR DATA THAT OUTWEIGH YOUR INTERESTS, RIGHTS AND FREEDOMS (OBJECTION PURSUANT TO ART. 21(1) GDPR).</p>

<h3>Right to log a complaint with the competent supervisory agency</h3>
<p>In the event of violations of the GDPR, data subjects are entitled to log a complaint with a supervisory agency, in particular in the member state where they usually maintain their domicile, place of work or at the place where the alleged violation occurred.</p>

<h3>Right to data portability</h3>
<p>You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format.</p>

<h3>Information about, rectification and eradication of data</h3>
<p>Within the scope of the applicable statutory provisions, you have the right to demand information about your archived personal data, their source and recipients as well as the purpose of the processing of your data at any time. You may also have a right to have your data rectified or eradicated. Please do not hesitate to contact us at any time if you have questions about this subject matter.</p>

<h3>Right to demand processing restrictions</h3>
<p>You have the right to demand the imposition of restrictions as far as the processing of your personal data is concerned. To do so, you may contact us at any time. The right to demand restriction of processing applies in the following cases:</p>
<ul>
<li>In the event that you should dispute the correctness of your data archived by us.</li>
<li>If the processing of your personal data was/is conducted in an unlawful manner.</li>
<li>If we do not need your personal data any longer and you need it to exercise, defend or claim legal entitlements.</li>
<li>If you have raised an objection pursuant to Art. 21(1) GDPR.</li>
</ul>

<h3>SSL and/or TLS encryption</h3>
<p>For security reasons and to protect the transmission of confidential content, this website uses either an SSL or a TLS encryption program. You can recognize an encrypted connection by checking whether the address line of the browser switches from "http://" to "https://" and also by the appearance of the lock icon in the browser line.</p>

<h3>Rejection of unsolicited e-mails</h3>
<p>We herewith object to the use of contact information published in conjunction with the mandatory information to be provided in our Site Notice to send us promotional and information material that we have not expressly requested.</p>

<h2>4. Recording of data on this website</h2>
<h3>Cookies</h3>
<p>Our website uses cookies. Cookies are small data packages that do not cause any damage to your device. They are either stored temporarily for the duration of a session (session cookies) or permanently archived on your device (permanent cookies). Session cookies are automatically deleted once you terminate your visit.</p>
<p>If your consent to the storage of the cookies has been requested, the processing occurs exclusively on the basis of the consent obtained (Art. 6(1)(a) GDPR and § 25(1) TDDDG); this consent may be revoked at any time.</p>

<h3>Cookie Consent</h3>
<p>This website uses a custom-built cookie consent banner to obtain your consent for the storage of analytics cookies on your device. Your consent preference is stored locally in your browser's local storage (localStorage). No personal data is transmitted to third parties for consent management purposes.</p>
<p>You may revoke your consent at any time by clearing your browser's local storage. The legal basis for this processing is Art. 6(1)(a) GDPR and § 25(1) TDDDG.</p>

<h3>Contact form</h3>
<p>If you submit inquiries to us via our contact form, the information provided in the contact form as well as any contact information provided therein will be stored by us in order to handle your inquiry and in the event that we have further questions. We will not share this information without your consent.</p>
<p>The processing of these data is based on Art. 6(1)(b) GDPR if your request is related to the execution of a contract. In all other cases the processing is based on our legitimate interest in the effective processing of the requests addressed to us (Art. 6(1)(f) GDPR).</p>

<h3>Request by e-mail or telephone</h3>
<p>If you contact us by e-mail or telephone, your request, including all resulting personal data, will be stored and processed by us for the purpose of processing your request. We do not pass these data on without your consent.</p>
<p>These data are processed on the basis of Art. 6(1)(b) GDPR if your inquiry is related to the fulfillment of a contract, or on the basis of our legitimate interest in the effective handling of inquiries submitted to us (Art. 6(1)(f) GDPR).</p>

<h2>5. Analysis tools and advertising</h2>
<h3>Metricool</h3>
<p>This website uses Metricool, a web analytics service provided by Metricool Inc. Metricool analyzes visitor behavior on our website (e.g., page views, session duration, referral source). Data is processed only after you have given your consent via the cookie banner (Art. 6(1)(a) GDPR). You may revoke your consent at any time by clearing your browser's local storage.</p>
<p>For more information, please refer to Metricool's privacy policy at: <a href="https://metricool.com/privacy-policy" target="_blank" rel="noopener noreferrer">https://metricool.com/privacy-policy</a></p>
`;

const Privacy = () => (
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

      <div className="my-16 border-t border-foreground/10" />

      <div
        className={legalProse}
        dangerouslySetInnerHTML={{ __html: enContent }}
      />
    </div>
  </div>
);

export default Privacy;
