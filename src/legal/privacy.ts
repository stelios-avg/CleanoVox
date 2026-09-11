import type { Language } from '../i18n/translations';

/** Inbox for access / erasure requests. Create this mailbox before launch. */
export const PRIVACY_CONTACT_EMAIL = 'privacy@cleanovox.com';

export const CONTROLLER_NAME = 'Cleanovox';
export const CONTROLLER_COUNTRY = 'Cyprus';
export const PRIVACY_UPDATED = '11 Sep 2026';

/** Marker written onto bookings / orders when a customer deletes their account. */
export const DELETED_ACCOUNT_LABEL = 'Deleted account';

export type LegalSection = {
  title: string;
  body: string;
};

export type ProcessorRow = {
  name: string;
  role: string;
  region: string;
  data: string;
};

const sections: Record<Language, LegalSection[]> = {
  el: [
    {
      title: '1. Ποιος είναι υπεύθυνος',
      body:
        'Υπεύθυνος επεξεργασίας είναι η Cleanovox, που παρέχει υπηρεσίες καθαρισμού στην περιοχή της Λευκωσίας, Κύπρος. Για θέματα απορρήτου γράψε στο privacy@cleanovox.com. Το νομικό πρόσωπο (επωνυμία / ΑΦΜ) το συμπληρώνει ο δικηγόρος πριν το live.',
    },
    {
      title: '2. Τι δεδομένα συλλέγουμε',
      body:
        'Λογαριασμός: email, όνομα, τηλέφωνο, διεύθυνση, προαιρετικό GPS pin, γλώσσα. Κράτηση / παραγγελία: ημερομηνία, ώρα, είδος υπηρεσίας, τετραγωνικά ή τεμάχια, διεύθυνση επίσκεψης, συντεταγμένες, push token συσκευής. Πληρωμή: ποσό και Stripe IDs — ο αριθμός κάρτας δεν περνάει από εμάς. Guest checkout: τα ίδια στοιχεία κράτησης χωρίς λογαριασμό.',
    },
    {
      title: '3. Γιατί τα χρειαζόμαστε',
      body:
        'Εκτέλεση σύμβασης: να έρθει η καθαρίστρια, να πληρωθεί η υπηρεσία, να σταλούν υπενθυμίσεις άφιξης. Έννομο συμφέρον: να μην κλείνουν διπλές ώρες στο ημερολόγιο, να προστατεύουμε από απάτη. Νομική υποχρέωση: λογιστικά στοιχεία πληρωμών. Συγκατάθεση: θέση συσκευής (όταν πατάς «Χρήση τοποθεσίας») και ειδοποιήσεις push.',
    },
    {
      title: '4. Τοποθεσία',
      body:
        'Η θέση χρησιμοποιείται μόνο για να συμπληρωθεί η διεύθυνση και να επιβεβαιωθεί ότι είσαι στην περιοχή εξυπηρέτησης (Λευκωσία). Αποθηκεύεται το pin της διεύθυνσης στο προφίλ και στην κράτηση, όχι συνεχές tracking. Μπορείς να πληκτρολογήσεις διεύθυνση χωρίς GPS.',
    },
    {
      title: '5. Πού πάνε τα δεδομένα',
      body:
        'Δεν πουλάμε πελατολόγιο. Τα μοιραζόμαστε μόνο με επεξεργαστές που χρειάζονται για να λειτουργήσει η υπηρεσία (λίστα παρακάτω) και με την καθαρίστρια / συνεργείο για την συγκεκριμένη επίσκεψη. Στο ημερολόγιο οι άλλοι χρήστες βλέπουν μόνο ποιες ώρες είναι πιασμένες, όχι όνομα ή διεύθυνση.',
    },
    {
      title: '6. Πόσο τα κρατάμε',
      body:
        'Προφίλ, push tokens και GPS pin: όσο έχεις λογαριασμό. Μετά τη διαγραφή, τα προσωπικά στοιχεία ανωνυμοποιούνται. Κρατήσεις και πληρωμές: διατηρούμε ποσό, ημερομηνία και κατάσταση για λογιστικούς λόγους (συνήθως έως 7 έτη, όπως ορίζει η κυπριακή φορολογική νομοθεσία — ο δικηγόρος επιβεβαιώνει το ακριβές διάστημα).',
    },
    {
      title: '7. Τα δικαιώματά σου',
      body:
        'Έχεις δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού, φορητότητας και εναντίωσης. Από το app: Λογαριασμός → Διαγραφή λογαριασμού. Guest κρατήσεις: στείλε email με όνομα, τηλέφωνο και ημερομηνία επίσκεψης. Ακύρωση συνδρομής Stripe γίνεται μαζί με τη διαγραφή. Μπορείς επίσης να απευθυνθείς στον Επίτροπο Προστασίας Δεδομένων Προσωπικού Χαρακτήρα της Κύπρου.',
    },
    {
      title: '8. Ασφάλεια',
      body:
        'Η βάση είναι στην ΕΕ (Ireland). Κάθε πελάτης βλέπει μόνο τα δικά του δεδομένα (row-level security). Το κλειδί πληρωμών Stripe μένει στον server. Δεν χρησιμοποιούμε διαφημιστικά / analytics SDK. Κανένα σύστημα δεν είναι 100% απρόσβλητο· αν υπάρξει περιστατικό, θα ενημερώσουμε όπως απαιτεί ο νόμος.',
    },
  ],
  en: [
    {
      title: '1. Who is responsible',
      body:
        'The controller is Cleanovox, providing cleaning services in the Nicosia area, Cyprus. Privacy requests: privacy@cleanovox.com. The legal entity (company name / tax ID) will be filled in by counsel before launch.',
    },
    {
      title: '2. What we collect',
      body:
        'Account: email, name, phone, address, optional GPS pin, language. Booking / order: date, time, service type, size or piece count, visit address, coordinates, device push token. Payment: amount and Stripe IDs — card numbers never touch our servers. Guest checkout: the same booking details without an account.',
    },
    {
      title: '3. Why we need it',
      body:
        'Contract: send a cleaner, take payment, send arrival reminders. Legitimate interest: stop double-booking slots, prevent fraud. Legal duty: payment records. Consent: device location (when you tap “Use my location”) and push notifications.',
    },
    {
      title: '4. Location',
      body:
        'Location is used only to fill the address and confirm you are in the service area (Nicosia). We store the address pin on your profile and booking — not continuous tracking. You can type an address without GPS.',
    },
    {
      title: '5. Who we share with',
      body:
        'We do not sell customer lists. We share data only with processors needed to run the service (list below) and with the cleaner for that visit. Other customers only see that a time slot is taken — never a name or address.',
    },
    {
      title: '6. How long we keep it',
      body:
        'Profile, push tokens and GPS pin: for as long as you have an account. After deletion, personal fields are anonymised. Bookings and payments: we keep amount, date and status for accounting (typically up to 7 years under Cypriot tax rules — counsel should confirm the exact period).',
    },
    {
      title: '7. Your rights',
      body:
        'You can access, correct, erase, restrict, port or object. In the app: Account → Delete account. Guest bookings: email us with your name, phone and visit date. Stripe membership is cancelled with the account. You may also contact the Commissioner for Personal Data Protection of Cyprus.',
    },
    {
      title: '8. Security',
      body:
        'The database is in the EU (Ireland). Each customer can only see their own rows (row-level security). The Stripe secret stays on the server. We do not use advertising or analytics SDKs. No system is perfectly secure; if an incident happens we will notify as required by law.',
    },
  ],
};

const processorRows: Record<Language, ProcessorRow[]> = {
  el: [
    {
      name: 'Supabase (Postgres + Auth)',
      role: 'Φιλοξενία βάσης, λογαριασμοί, RLS',
      region: 'EE — Ireland (eu-west-1)',
      data: 'Προφίλ, κρατήσεις, παραγγελίες, hashes κωδικών',
    },
    {
      name: 'Stripe',
      role: 'Πληρωμές / συνδρομές (PCI)',
      region: 'Stripe (DPA) — νόμισμα EUR',
      data: 'Ποσό, email απόδειξης, όνομα σε metadata — όχι αριθμός κάρτας σε εμάς',
    },
    {
      name: 'Expo (push)',
      role: 'Αποστολή ειδοποιήσεων',
      region: 'ΗΠΑ (υποδομή Expo)',
      data: 'Expo push token, κείμενο υπενθύμισης άφιξης',
    },
    {
      name: 'Apple / Google',
      role: 'Τοποθεσία, Maps, Apple/Google Pay',
      region: 'OS vendors',
      data: 'Συντεταγμένες όταν ζητάς θέση· διεύθυνση στο Maps του admin',
    },
  ],
  en: [
    {
      name: 'Supabase (Postgres + Auth)',
      role: 'Database, accounts, RLS',
      region: 'EU — Ireland (eu-west-1)',
      data: 'Profiles, bookings, orders, password hashes',
    },
    {
      name: 'Stripe',
      role: 'Payments / memberships (PCI)',
      region: 'Stripe (DPA) — EUR',
      data: 'Amount, receipt email, name in metadata — card number never stored by us',
    },
    {
      name: 'Expo (push)',
      role: 'Push delivery',
      region: 'US (Expo infrastructure)',
      data: 'Expo push token, arrival reminder text',
    },
    {
      name: 'Apple / Google',
      role: 'Location, Maps, Apple/Google Pay',
      region: 'OS vendors',
      data: 'Coordinates when you request location; address in admin Maps',
    },
  ],
};

export function privacySections(language: Language): LegalSection[] {
  return sections[language];
}

export function privacyProcessors(language: Language): ProcessorRow[] {
  return processorRows[language];
}
