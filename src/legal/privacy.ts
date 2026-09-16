import type { Language } from '../i18n/translations';

/**
 * Lawyer-approved Privacy Policy (FINAL LOCKED, effective 15/09/2026).
 * Do not edit the wording without legal review.
 */

/** Inbox for privacy / erasure requests. */
export const PRIVACY_CONTACT_EMAIL = 'info@cleanovoxcy.com';

export const CONTROLLER_NAME = 'Cleanovox';
export const CONTROLLER_COUNTRY = 'Cyprus';
export const PRIVACY_UPDATED = '15/09/2026';

/** Marker written onto bookings / orders when a customer deletes their account. */
export const DELETED_ACCOUNT_LABEL = 'Deleted account';

export type LegalSection = {
  title: string;
  body: string;
};

const sections: Record<Language, LegalSection[]> = {
  el: [
    {
      title: '1. Εισαγωγή',
      body:
        'Η Cleanovox σέβεται την ιδιωτικότητα των χρηστών και δεσμεύεται να επεξεργάζεται τα προσωπικά δεδομένα με νόμιμο, θεμιτό, διαφανή και ασφαλή τρόπο.\n\nΗ παρούσα Πολιτική Απορρήτου εξηγεί τον τρόπο με τον οποίο συλλέγονται, χρησιμοποιούνται, αποθηκεύονται και, όπου απαιτείται, κοινοποιούνται προσωπικά δεδομένα όταν κάποιος επισκέπτεται ή χρησιμοποιεί την ιστοσελίδα, εφαρμογή ή άλλη ηλεκτρονική υπηρεσία της Cleanovox, δημιουργεί λογαριασμό, πραγματοποιεί κράτηση ή επικοινωνεί με την Cleanovox.\n\nΓια τους σκοπούς της εφαρμοστέας νομοθεσίας περί προστασίας δεδομένων, συμπεριλαμβανομένου του Γενικού Κανονισμού για την Προστασία Δεδομένων («GDPR»), υπεύθυνος επεξεργασίας είναι η [ΠΛΗΡΗΣ ΝΟΜΙΚΗ ΕΠΩΝΥΜΙΑ], εταιρεία εγγεγραμμένη στην Κυπριακή Δημοκρατία με αριθμό εγγραφής [ΑΡΙΘΜΟΣ ΕΓΓΡΑΦΗΣ], η οποία λειτουργεί την Cleanovox. Η διεύθυνση της εταιρείας και τα εκάστοτε ισχύοντα εταιρικά στοιχεία θα δημοσιεύονται στην Πλατφόρμα. Για θέματα προστασίας δεδομένων: info@cleanovoxcy.com.',
    },
    {
      title: '2. Προσωπικά Δεδομένα που Συλλέγουμε',
      body:
        'Η Cleanovox μπορεί να επεξεργάζεται πληροφορίες που παρέχει ο χρήστης κατά τη δημιουργία ή χρήση λογαριασμού και κατά την πραγματοποίηση κράτησης, όπως ονοματεπώνυμο, αριθμό τηλεφώνου, διεύθυνση ηλεκτρονικού ταχυδρομείου, διεύθυνση στην οποία θα παρασχεθεί η Υπηρεσία, πληροφορίες σχετικές με την κράτηση και ειδικές οδηγίες που είναι αναγκαίες για την εκτέλεση του καθαρισμού.\n\nΜπορεί επίσης να επεξεργαζόμαστε στοιχεία συναλλαγών και πληρωμών. Όταν χρησιμοποιείται εξωτερικός πάροχος πληρωμών, τα πλήρη στοιχεία κάρτας ενδέχεται να συλλέγονται και να επεξεργάζονται απευθείας από τον συγκεκριμένο πάροχο και όχι από την Cleanovox.\n\nΚατά τη χρήση της Πλατφόρμας μπορεί επίσης να συλλέγονται τεχνικές πληροφορίες, όπως διεύθυνση IP, πληροφορίες συσκευής και browser, αρχεία καταγραφής, πληροφορίες ασφαλείας και δεδομένα σχετικά με τον τρόπο αλληλεπίδρασης με την Πλατφόρμα.\n\nΌταν ο χρήστης επικοινωνεί με την εξυπηρέτηση πελατών, μπορεί να διατηρούμε το περιεχόμενο της σχετικής επικοινωνίας και πληροφορίες που είναι απαραίτητες για τη διαχείριση του αιτήματος.',
    },
    {
      title: '3. Σκοποί και Νομικές Βάσεις Επεξεργασίας',
      body:
        'Τα προσωπικά δεδομένα χρησιμοποιούνται για τη δημιουργία και διαχείριση λογαριασμών, την αποδοχή και διαχείριση κρατήσεων, την αποστολή Καθαριστή στη σωστή τοποθεσία, την επεξεργασία πληρωμών, την επικοινωνία σχετικά με μια κράτηση και γενικά για την εκτέλεση της σύμβασης μεταξύ του Πελάτη και της Cleanovox.\n\nΔεδομένα μπορούν επίσης να υποβάλλονται σε επεξεργασία για τη συμμόρφωση με νομικές, φορολογικές, λογιστικές ή άλλες υποχρεώσεις της Cleanovox.\n\nΌπου είναι αναγκαίο, η Cleanovox μπορεί να επεξεργάζεται δεδομένα για τα έννομα συμφέροντά της, όπως η ασφάλεια της Πλατφόρμας, η πρόληψη και διερεύνηση απάτης, η διαχείριση παραπόνων και απαιτήσεων, η προστασία των εργαζομένων της και η άσκηση ή υπεράσπιση νομικών αξιώσεων, εφόσον τα συμφέροντα αυτά δεν υπερισχύονται από τα δικαιώματα και τις ελευθερίες του υποκειμένου των δεδομένων.\n\nΌπου η επεξεργασία απαιτεί συγκατάθεση, όπως μπορεί να συμβαίνει με ορισμένες μορφές ηλεκτρονικού marketing ή μη αναγκαία cookies, η συγκατάθεση ζητείται χωριστά και μπορεί να ανακληθεί σύμφωνα με την εφαρμοστέα νομοθεσία.',
    },
    {
      title: '4. Δεδομένα που Κοινοποιούνται στους Καθαριστές',
      body:
        'Για την εκτέλεση της Υπηρεσίας, η Cleanovox μπορεί να παρέχει στον Καθαριστή μόνο τις πληροφορίες που είναι εύλογα αναγκαίες για την πραγματοποίηση της συγκεκριμένης εργασίας. Αυτές μπορεί να περιλαμβάνουν τη διεύθυνση, την ώρα κράτησης, σχετικές οδηγίες πρόσβασης και οδηγίες σχετικά με τον καθαρισμό.\n\nΟι Καθαριστές δεν επιτρέπεται να χρησιμοποιούν τα στοιχεία του Πελάτη για προσωπικούς ή άλλους μη εξουσιοδοτημένους σκοπούς.',
    },
    {
      title: '5. Κοινοποίηση σε Τρίτους',
      body:
        'Η Cleanovox μπορεί να χρησιμοποιεί αξιόπιστους παρόχους τεχνολογίας, hosting, cloud services, ηλεκτρονικών επικοινωνιών, customer support, analytics, λογιστικών υπηρεσιών και επεξεργασίας πληρωμών στον βαθμό που αυτό είναι αναγκαίο για τη λειτουργία της.\n\nΠροσωπικά δεδομένα μπορεί επίσης να κοινοποιηθούν όταν αυτό απαιτείται από τον νόμο, δικαστική απόφαση ή νόμιμο αίτημα αρμόδιας δημόσιας αρχής.\n\nΣε περίπτωση καταγγελίας για κλοπή, απάτη, απειλή, βία ή άλλο πιθανό αδίκημα, η Cleanovox μπορεί, όταν υπάρχει νόμιμη βάση, να διαβιβάσει σχετικά δεδομένα στην Αστυνομία, στις αρμόδιες αρχές, σε ασφαλιστές ή σε νομικούς συμβούλους.\n\nΗ Cleanovox δεν πωλεί προσωπικά δεδομένα.',
    },
    {
      title: '6. Διεθνείς Διαβιβάσεις',
      body:
        'Ορισμένοι πάροχοι υπηρεσιών μπορεί να επεξεργάζονται δεδομένα εκτός του Ευρωπαϊκού Οικονομικού Χώρου. Όταν πραγματοποιείται τέτοια διαβίβαση, η Cleanovox λαμβάνει τα κατάλληλα μέτρα που απαιτούνται από την εφαρμοστέα νομοθεσία για την προστασία των προσωπικών δεδομένων.',
    },
    {
      title: '7. Χρόνος Διατήρησης',
      body:
        'Τα προσωπικά δεδομένα διατηρούνται μόνο για όσο χρονικό διάστημα είναι αναγκαίο για τον σκοπό για τον οποίο συλλέχθηκαν και για όσο απαιτείται λόγω φορολογικών, λογιστικών, συμβατικών, κανονιστικών ή άλλων νόμιμων υποχρεώσεων.\n\nΔεδομένα σχετικά με διαφορές, παράπονα, απάτη, κλοπή, ζημιές ή άλλες απαιτήσεις μπορούν να διατηρούνται για όσο χρονικό διάστημα είναι εύλογα αναγκαίο για τη διερεύνηση, άσκηση ή υπεράσπιση σχετικών νομικών αξιώσεων.',
    },
    {
      title: '8. Ασφάλεια',
      body:
        'Η Cleanovox εφαρμόζει κατάλληλα τεχνικά και οργανωτικά μέτρα που αποσκοπούν στην προστασία των προσωπικών δεδομένων από μη εξουσιοδοτημένη πρόσβαση, απώλεια, αλλοίωση, καταστροφή ή παράνομη επεξεργασία.\n\nΚανένα ηλεκτρονικό σύστημα δεν μπορεί να εγγυηθεί απόλυτη ασφάλεια και για τον λόγο αυτό τα μέτρα ασφάλειας αξιολογούνται και προσαρμόζονται ανάλογα με τους σχετικούς κινδύνους.',
    },
    {
      title: '9. Δικαιώματα',
      body:
        'Σύμφωνα με τις προϋποθέσεις της εφαρμοστέας νομοθεσίας, το υποκείμενο των δεδομένων μπορεί να έχει δικαίωμα πρόσβασης στα προσωπικά του δεδομένα, διόρθωσης ανακριβών δεδομένων, διαγραφής, περιορισμού της επεξεργασίας, εναντίωσης σε ορισμένες μορφές επεξεργασίας και φορητότητας δεδομένων.\n\nΌπου η επεξεργασία βασίζεται σε συγκατάθεση, η συγκατάθεση μπορεί να ανακληθεί οποτεδήποτε, χωρίς αυτό να επηρεάζει τη νομιμότητα της επεξεργασίας που πραγματοποιήθηκε πριν από την ανάκληση.\n\nΟ χρήστης έχει επίσης δικαίωμα υποβολής καταγγελίας στην αρμόδια εποπτική αρχή προστασίας δεδομένων.',
    },
    {
      title: '10. Marketing',
      body:
        'Η Cleanovox μπορεί να αποστέλλει προωθητικές επικοινωνίες μόνο όταν διαθέτει την κατάλληλη νομική βάση.\n\nΟ παραλήπτης μπορεί να διακόψει τη λήψη marketing επικοινωνιών χρησιμοποιώντας τον διαθέσιμο μηχανισμό διαγραφής ή επικοινωνώντας με την Cleanovox.',
    },
    {
      title: '11. Αλλαγές',
      body:
        'Η παρούσα Πολιτική μπορεί να τροποποιείται όταν μεταβάλλονται οι υπηρεσίες, η τεχνολογία, οι πρακτικές επεξεργασίας ή η εφαρμοστέα νομοθεσία. Η εκάστοτε ισχύουσα έκδοση δημοσιεύεται στην Πλατφόρμα.',
    },
    {
      title: '12. Επικοινωνία',
      body:
        'Για ερωτήσεις ή αιτήματα σχετικά με προσωπικά δεδομένα, ο χρήστης μπορεί να επικοινωνεί με την Cleanovox στο info@cleanovoxcy.com.',
    },
  ],
  en: [
    {
      title: '1. Introduction',
      body:
        'Cleanovox respects the privacy of its users and is committed to processing personal data lawfully, fairly, transparently and securely.\n\nThis Privacy Policy explains how personal data is collected, used, stored and, where appropriate, disclosed when a person visits or uses the Cleanovox website, application or other digital service, creates an account, books a Cleaning Service or communicates with Cleanovox.\n\nFor the purposes of applicable data-protection legislation, including the General Data Protection Regulation (“GDPR”), the controller is [FULL LEGAL NAME], a company registered in the Republic of Cyprus under registration number [REGISTRATION NUMBER], which operates Cleanovox. The Company’s address and current corporate details will be published on the Platform. For data-protection matters: info@cleanovoxcy.com.',
    },
    {
      title: '2. Personal Data We Process',
      body:
        'Cleanovox may process information supplied when creating or using an account and making a booking, including the Customer’s name, telephone number, email address, Service address, booking information and instructions reasonably necessary to perform the Cleaning Service.\n\nWe may process transaction and payment-related information. Where an external payment processor is used, full payment-card details may be collected and processed directly by that provider rather than Cleanovox.\n\nWhen the Platform is used, technical information may also be processed, including IP address, device and browser information, security logs and information concerning interaction with the Platform.\n\nWhen a user contacts customer support, Cleanovox may retain the communication and information reasonably required to handle the request.',
    },
    {
      title: '3. Purposes and Legal Bases',
      body:
        'Personal data may be processed to create and manage accounts, accept and manage bookings, enable Cleaners to attend the correct Premises, process payments, communicate regarding Services and otherwise perform the contract between the Customer and Cleanovox.\n\nData may also be processed to comply with legal, accounting, taxation and regulatory obligations.\n\nWhere appropriate, Cleanovox may process data for legitimate interests including Platform security, fraud prevention and investigation, complaints and claims management, employee protection and the establishment, exercise or defence of legal claims, provided such interests are not overridden by the rights and freedoms of the relevant individual.\n\nWhere consent is legally required, including for certain electronic marketing activities or non-essential cookies, consent will be requested separately and may be withdrawn in accordance with applicable law.',
    },
    {
      title: '4. Information Provided to Cleaners',
      body:
        'Cleanovox may provide a Cleaner with only the information reasonably necessary to perform a particular Service, which may include the Service address, booking time, relevant access information and cleaning instructions.\n\nCleaners are not permitted to use Customer information for personal or other unauthorised purposes.',
    },
    {
      title: '5. Sharing Personal Data',
      body:
        'Cleanovox may use trusted technology, hosting, cloud, communications, customer-support, analytics, accounting and payment-processing providers to the extent necessary to operate the Platform and Services.\n\nPersonal data may also be disclosed where required by applicable law, court order or a lawful request from a competent authority.\n\nWhere theft, fraud, violence, threats or another potential offence is reported, Cleanovox may, where a lawful basis exists, disclose relevant information to the Police, competent authorities, insurers or legal advisers.\n\nCleanovox does not sell personal data.',
    },
    {
      title: '6. International Transfers',
      body:
        'Certain service providers may process information outside the European Economic Area. Where such transfers occur, Cleanovox shall implement appropriate safeguards required by applicable data-protection law.',
    },
    {
      title: '7. Retention',
      body:
        'Personal data is retained only for as long as reasonably necessary for the purpose for which it was collected and to satisfy applicable legal, accounting, taxation, contractual or regulatory requirements.\n\nInformation concerning disputes, complaints, fraud, alleged theft, damage or other claims may be retained for an appropriate period where necessary to investigate, establish, exercise or defend legal claims.',
    },
    {
      title: '8. Security',
      body:
        'Cleanovox implements appropriate technical and organisational measures intended to protect personal data against unauthorised access, loss, alteration, destruction or unlawful processing.\n\nNo electronic system can guarantee absolute security, and security measures are therefore reviewed and adapted according to the relevant risks.',
    },
    {
      title: '9. Data Protection Rights',
      body:
        'Subject to the conditions of applicable law, individuals may have rights to access their personal data, correct inaccurate information, request erasure, restrict processing, object to certain processing and receive certain data in a portable format.\n\nWhere processing is based on consent, consent may be withdrawn at any time without affecting processing lawfully undertaken before withdrawal.\n\nIndividuals also have the right to lodge a complaint with the competent data-protection supervisory authority.',
    },
    {
      title: '10. Marketing',
      body:
        'Cleanovox may send promotional communications where an appropriate legal basis exists.\n\nRecipients may opt out of marketing using the unsubscribe mechanism provided or by contacting Cleanovox.',
    },
    {
      title: '11. Changes to this Policy',
      body:
        'This Privacy Policy may be amended to reflect changes in Services, technology, processing practices or applicable law. The current version will be made available through the Platform.',
    },
    {
      title: '12. Contact',
      body:
        'Questions and data-protection requests may be submitted to Cleanovox at info@cleanovoxcy.com.',
    },
  ],
};

export function privacySections(language: Language): LegalSection[] {
  return sections[language];
}
