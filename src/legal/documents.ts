import type { Language } from '../i18n/translations';
import type { LegalSection } from './privacy';

/**
 * Lawyer-approved legal documents (FINAL versions, effective 15/09/2026).
 * Do not edit the wording without legal review.
 */

export const LEGAL_CONTACT_EMAIL = 'info@cleanovoxcy.com';
export const LEGAL_EFFECTIVE_DATE = '15/09/2026';

export type LegalDocId = 'terms' | 'cancellation' | 'cookies';

// ---------------------------------------------------------------------------
// Terms and Conditions
// ---------------------------------------------------------------------------

const termsSections: Record<Language, LegalSection[]> = {
  el: [
    {
      title: '1. Εισαγωγή και Πεδίο Εφαρμογής',
      body:
        'Οι παρόντες Όροι και Προϋποθέσεις («Όροι») διέπουν την πρόσβαση και χρήση της ηλεκτρονικής πλατφόρμας, ιστοσελίδας και/ή εφαρμογής που λειτουργεί υπό την εμπορική ονομασία Cleanovox («Cleanovox» ή «Πλατφόρμα»), καθώς και την κράτηση και παροχή υπηρεσιών καθαρισμού μέσω αυτής («Υπηρεσίες»).\n\nΜε τη δημιουργία λογαριασμού, την πραγματοποίηση κράτησης, την επιβεβαίωση παραγγελίας, την πραγματοποίηση πληρωμής ή/και τη χρήση οποιασδήποτε Υπηρεσίας, ο χρήστης ή πελάτης («Πελάτης») επιβεβαιώνει ότι έχει διαβάσει, κατανοήσει και αποδέχεται ανεπιφύλακτα τους παρόντες Όρους. Εάν ο Πελάτης δεν συμφωνεί με οποιοδήποτε μέρος των Όρων, δεν πρέπει να χρησιμοποιήσει την Πλατφόρμα ή να πραγματοποιήσει κράτηση.\n\nΗ Cleanovox αποτελεί την εμπορική ονομασία υπό την οποία προσφέρονται οι Υπηρεσίες από την [ΠΛΗΡΗΣ ΝΟΜΙΚΗ ΕΠΩΝΥΜΙΑ], εταιρεία εγγεγραμμένη στην Κυπριακή Δημοκρατία με αριθμό εγγραφής [ΑΡΙΘΜΟΣ ΕΓΓΡΑΦΗΣ] (η «Εταιρεία»). Η διεύθυνση της Εταιρείας και τα εκάστοτε ισχύοντα στοιχεία επικοινωνίας της δημοσιεύονται στην Πλατφόρμα. Για επικοινωνία: info@cleanovoxcy.com.',
    },
    {
      title: '2. Αντικείμενο των Υπηρεσιών',
      body:
        'Η Cleanovox παρέχει τη δυνατότητα ηλεκτρονικής κράτησης υπηρεσιών καθαρισμού κατοικιών, διαμερισμάτων, γραφείων και άλλων κατάλληλων χώρων. Οι Υπηρεσίες εκτελούνται από προσωπικό καθαρισμού που ορίζεται από την Cleanovox («Καθαριστές»).\n\nΟι Καθαριστές δύνανται να αποτελούν εργαζομένους της επιχείρησης που λειτουργεί την Cleanovox. Ο Πελάτης δεν καθίσταται εργοδότης του Καθαριστή και δεν δημιουργείται οποιαδήποτε εργασιακή, εταιρική ή άλλη αντίστοιχη σχέση μεταξύ τους.\n\nΟποιοδήποτε θέμα σχετίζεται με την εκτέλεση της Υπηρεσίας, την ποιότητα καθαρισμού, τη συμπεριφορά Καθαριστή, πληρωμές, παράπονα, ζημιές, περιστατικά ή οποιοδήποτε άλλο σχετικό ζήτημα πρέπει να γνωστοποιείται απευθείας στην Cleanovox μέσω των επίσημων καναλιών επικοινωνίας της.',
    },
    {
      title: '3. Κρατήσεις και Πληροφορίες Πελάτη',
      body:
        'Ο Πελάτης πραγματοποιεί την κράτηση μέσω της Πλατφόρμας επιλέγοντας τις διαθέσιμες επιλογές σχετικά με την τοποθεσία, ημερομηνία, ώρα, διάρκεια, είδος καθαρισμού και τυχόν πρόσθετες Υπηρεσίες. Η κράτηση θεωρείται αποδεκτή μόνο όταν επιβεβαιωθεί μέσω της Πλατφόρμας ή με άλλο επίσημο τρόπο από την Cleanovox.\n\nΟ Πελάτης έχει την υποχρέωση να παρέχει ακριβείς, πλήρεις και επικαιροποιημένες πληροφορίες. Η Cleanovox δεν ευθύνεται για καθυστέρηση, αδυναμία εκτέλεσης ή άλλο πρόβλημα το οποίο προκύπτει από ανακριβείς ή ελλιπείς πληροφορίες που παρασχέθηκαν από τον Πελάτη.\n\nΗ Cleanovox διατηρεί το δικαίωμα να αρνηθεί, να τροποποιήσει ή να ακυρώσει κράτηση όταν υπάρχει εύλογος λόγος, συμπεριλαμβανομένων θεμάτων ασφάλειας, αδυναμίας πρόσβασης, μη διαθεσιμότητας προσωπικού, μη πληρωμής ή ακατάλληλων συνθηκών στον χώρο.',
    },
    {
      title: '4. Υποχρεωτική Παρουσία του Πελάτη',
      body:
        'Αποτελεί ουσιώδη και βασική προϋπόθεση κάθε Υπηρεσίας ότι ο Πελάτης ή άλλο ενήλικο πρόσωπο που έχει εξουσιοδοτηθεί από αυτόν πρέπει να βρίσκεται στον χώρο καθ’ όλη τη διάρκεια της παροχής της Υπηρεσίας.\n\nΟ Πελάτης δεν πρέπει να αφήνει τον Καθαριστή μόνο στον χώρο. Η υποχρέωση παρουσίας αποσκοπεί, μεταξύ άλλων, στην επίβλεψη της πρόσβασης στον χώρο, στην παροχή οδηγιών όπου απαιτείται, στην προστασία της προσωπικής περιουσίας του Πελάτη και στην άμεση αντιμετώπιση οποιουδήποτε ζητήματος προκύψει κατά την εκτέλεση της Υπηρεσίας.\n\nΕάν ο Πελάτης ή το εξουσιοδοτημένο ενήλικο πρόσωπο αποφασίσει να αποχωρήσει από τον χώρο, έστω και προσωρινά, η αποχώρηση γίνεται με αποκλειστικά δική του επιλογή και ευθύνη. Ο Πελάτης αναλαμβάνει τους κινδύνους για την περιουσία του που προκαλούνται ή αυξάνονται λόγω της απουσίας του.\n\nΕάν η έναρξη της Υπηρεσίας καθυστερεί επειδή ο Πελάτης δεν βρίσκεται στον χώρο κατά την προγραμματισμένη ώρα, δεν έχει αφήσει κλειδί στον προκαθορισμένο χώρο ή για άλλο λόγο που οφείλεται στον Πελάτη δεν είναι δυνατή η πρόσβαση, η Cleanovox θα επιχειρήσει να επικοινωνήσει τηλεφωνικώς με τον Πελάτη. Θα παρέχεται χρονικό περιθώριο 20 λεπτών από την προγραμματισμένη ώρα έναρξης, ανεξάρτητα από το εάν ο Πελάτης απαντήσει στην κλήση. Εάν εντός του χρονικού αυτού διαστήματος δεν καταστεί δυνατή η είσοδος του Καθαριστή στον χώρο, ο Καθαριστής θα αποχωρεί και το ποσό της κράτησης δεν επιστρέφεται.\n\nΗ Cleanovox διατηρεί το δικαίωμα να αρνηθεί την έναρξη ή να διακόψει την Υπηρεσία εάν δεν παραμένει στον χώρο ο Πελάτης ή άλλο εξουσιοδοτημένο ενήλικο πρόσωπο.',
    },
    {
      title: '5. Ευθύνη του Πελάτη για την Προσωπική του Περιουσία',
      body:
        'Η φύλαξη, προστασία και ασφάλεια της προσωπικής περιουσίας που βρίσκεται στον χώρο αποτελεί ευθύνη του Πελάτη. Η Cleanovox παρέχει αποκλειστικά Υπηρεσίες καθαρισμού και δεν παρέχει υπηρεσίες ασφάλειας, φύλαξης, επιτήρησης, παρακαταθήκης ή προστασίας προσωπικής περιουσίας.\n\nΗ είσοδος ή παρουσία Καθαριστή στον χώρο δεν συνιστά παράδοση της περιουσίας του Πελάτη στην Cleanovox ούτε ανάληψη υποχρέωσης φύλαξης οποιουδήποτε αντικειμένου.\n\nΠριν από την έναρξη της Υπηρεσίας, ο Πελάτης οφείλει να ενημερώνει την Cleanovox στο πεδίο «notes» της Πλατφόρμας για οποιοδήποτε εύθραυστο αντικείμενο, αντίκα, έργο τέχνης, φυσική πέτρα, μάρμαρο, ειδική ή ευαίσθητη επιφάνεια, ελαττωματική συσκευή, προϋπάρχουσα ζημιά ή άλλο αντικείμενο ή υλικό που απαιτεί ιδιαίτερη προσοχή ή συγκεκριμένο τρόπο καθαρισμού ή μεταχείρισης.\n\nΟ Πελάτης είναι υπεύθυνος να γνωρίζει ποια αντικείμενα βρίσκονται στον χώρο, πού βρίσκονται και να λαμβάνει τα κατάλληλα μέτρα για την ασφάλειά τους πριν από την άφιξη του Καθαριστή.',
    },
    {
      title: '6. Κλοπή, Απώλεια ή Εξαφάνιση Περιουσίας',
      body:
        'Αποτελεί ουσιώδη προϋπόθεση για την παροχή της Υπηρεσίας ότι ο Πελάτης ή εξουσιοδοτημένο από αυτόν ενήλικο πρόσωπο παραμένει στον χώρο καθ’ όλη τη διάρκεια της Υπηρεσίας και ότι, πριν από την έναρξή της, ο Πελάτης έχει απομακρύνει ή ασφαλίσει επαρκώς χρήματα, κοσμήματα, τιμαλφή και οποιαδήποτε άλλη προσωπική περιουσία οικονομικής ή συναισθηματικής αξίας.\n\nΗ Cleanovox παρέχει αποκλειστικά υπηρεσίες καθαρισμού και δεν αναλαμβάνει, ούτε θεωρείται ότι αναλαμβάνει, φύλαξη, επιτήρηση, παρακαταθήκη, κατοχή ή προστασία της προσωπικής περιουσίας του Πελάτη. Η παρουσία Καθαριστή στον χώρο δεν συνιστά παράδοση οποιουδήποτε αντικειμένου στη φύλαξη ή κατοχή της Cleanovox.\n\nΟ Πελάτης αναγνωρίζει και αποδέχεται ότι η προστασία, επίβλεψη και ασφάλεια της προσωπικής του περιουσίας παραμένει δική του ευθύνη καθ’ όλη τη διάρκεια της Υπηρεσίας.\n\nΩς εκ τούτου, η Cleanovox δεν φέρει ευθύνη και αποκλείει την ευθύνη της για οποιαδήποτε κλοπή, απώλεια, εξαφάνιση, μη εντοπισμό, μετακίνηση ή μη εξουσιοδοτημένη αφαίρεση χρημάτων, κοσμημάτων, τιμαλφών ή οποιασδήποτε άλλης προσωπικής περιουσίας από τον χώρο στον οποίο παρέχεται η Υπηρεσία.\n\nΕάν ο Πελάτης παραλείψει να απομακρύνει ή να ασφαλίσει τα πιο πάνω αντικείμενα ή εάν ο Πελάτης ή το εξουσιοδοτημένο ενήλικο πρόσωπο εγκαταλείψει τον χώρο κατά τη διάρκεια της Υπηρεσίας, αυτό γίνεται κατά παράβαση των υποχρεώσεών του βάσει των παρόντων Όρων και με δική του ανάληψη των κινδύνων που προκαλούνται ή αυξάνονται από την εν λόγω παράλειψη ή απουσία.\n\nΗ παρουσία Καθαριστή στον χώρο πριν από τη διαπίστωση ότι κάποιο αντικείμενο λείπει δεν αποτελεί από μόνη της απόδειξη, τεκμήριο ή παραδοχή ότι η απώλεια ή κλοπή προκλήθηκε από τον Καθαριστή ή την Cleanovox.\n\nΟποιαδήποτε απαίτηση για υποτιθέμενη κλοπή ή απώλεια πρέπει να υποστηρίζεται από επαρκή, αντικειμενικά και αξιόπιστα αποδεικτικά στοιχεία. Η Cleanovox δύναται να απαιτήσει επίσημη αναφορά του περιστατικού στην Αστυνομία, καθώς και αποδεικτικά ιδιοκτησίας και αξίας, φωτογραφίες, διαθέσιμο οπτικοακουστικό υλικό και οποιαδήποτε άλλη πληροφορία είναι εύλογα απαραίτητη για τη διερεύνηση της καταγγελίας.\n\nΚαμία διερεύνηση, επικοινωνία ή συνεργασία της Cleanovox με τον Πελάτη, την Αστυνομία ή άλλη αρμόδια αρχή δεν αποτελεί αναγνώριση ή παραδοχή ευθύνης.\n\nΚαμία διάταξη των παρόντων Όρων δεν αποκλείει ή περιορίζει ευθύνη ή υποχρεωτικό δικαίωμα καταναλωτή που δεν μπορεί νόμιμα να αποκλειστεί ή να περιοριστεί.',
    },
    {
      title: '7. Αναφορά Ύποπτης Κλοπής ή Απώλειας',
      body:
        'Ο Πελάτης οφείλει να ενημερώσει την Cleanovox χωρίς αδικαιολόγητη καθυστέρηση μόλις διαπιστώσει οποιαδήποτε υποτιθέμενη κλοπή ή απώλεια. Σε περίπτωση που ο Πελάτης ισχυρίζεται ότι έχει διαπραχθεί ποινικό αδίκημα, η Cleanovox δύναται να ζητήσει την υποβολή σχετικής καταγγελίας στην Αστυνομία και την προσκόμιση των σχετικών στοιχείων αναφοράς.\n\nΗ Cleanovox δικαιούται να ζητήσει οποιαδήποτε πληροφορία είναι εύλογα αναγκαία για τη διερεύνηση του περιστατικού, όπως αποδεικτικά ιδιοκτησίας και αξίας, φωτογραφικό ή οπτικοακουστικό υλικό, πληροφορίες σχετικά με το πότε το αντικείμενο εθεάθη τελευταία φορά και στοιχεία σχετικά με άλλα πρόσωπα που είχαν πρόσβαση στον χώρο.\n\nΗ Cleanovox δύναται να συνεργάζεται με την Αστυνομία και οποιαδήποτε άλλη αρμόδια αρχή σύμφωνα με την εφαρμοστέα νομοθεσία. Η παραλαβή, διερεύνηση ή διαβίβαση οποιασδήποτε καταγγελίας δεν συνιστά αναγνώριση, παραδοχή ή αποδοχή ευθύνης από την Cleanovox.',
    },
    {
      title: '8. Ψευδείς ή Δόλιες Καταγγελίες',
      body:
        'Ο Πελάτης υποχρεούται να ενεργεί καλόπιστα κατά την υποβολή οποιασδήποτε απαίτησης ή καταγγελίας. Απαγορεύεται η εν γνώσει υποβολή ψευδούς, παραπλανητικής, διογκωμένης ή δόλιας απαίτησης σχετικά με κλοπή, απώλεια, ζημιά ή οποιοδήποτε άλλο περιστατικό.\n\nΗ Cleanovox διατηρεί όλα τα δικαιώματα και ένδικα μέσα που της παρέχει η εφαρμοστέα νομοθεσία σε περίπτωση αποδεδειγμένης απάτης ή εν γνώσει ψευδούς καταγγελίας.',
    },
    {
      title: '9. Ζημιά σε Αντικείμενα και Επιφάνειες',
      body:
        'Πριν από την έναρξη της Υπηρεσίας, ο Πελάτης οφείλει να ενημερώνει την Cleanovox στο πεδίο «notes» της Πλατφόρμας για οποιοδήποτε εύθραυστο αντικείμενο, αντίκα, έργο τέχνης, φυσική πέτρα, μάρμαρο, ειδική ή ευαίσθητη επιφάνεια, ελαττωματική συσκευή, προϋπάρχουσα ζημιά ή άλλο αντικείμενο ή υλικό που απαιτεί ιδιαίτερη προσοχή ή συγκεκριμένο τρόπο καθαρισμού ή μεταχείρισης.\n\nΗ Cleanovox δεν ευθύνεται για φυσιολογική φθορά, προϋπάρχουσα ζημιά, κρυμμένα ελαττώματα, ελαττωματικές εγκαταστάσεις ή συσκευές, μη γνωστοποιημένη ευαισθησία υλικού ή ζημιά που προκύπτει λόγω ανακριβών ή ελλιπών οδηγιών του Πελάτη.',
    },
    {
      title: '10. Ασφάλεια του Χώρου',
      body:
        'Ο Πελάτης υποχρεούται να παρέχει ασφαλές και κατάλληλο εργασιακό περιβάλλον. Πρέπει να ενημερώνει εκ των προτέρων την Cleanovox για οποιονδήποτε κίνδυνο που μπορεί εύλογα να επηρεάσει την υγεία ή ασφάλεια του Καθαριστή, συμπεριλαμβανομένων επικίνδυνων ουσιών, βιολογικών κινδύνων, επικίνδυνων ηλεκτρικών εγκαταστάσεων, σπασμένων αντικειμένων, αιχμηρών αντικειμένων, επιθετικών ζώων ή επικίνδυνων κατασκευών.\n\nΟ Καθαριστής και η Cleanovox διατηρούν το δικαίωμα να αρνηθούν την έναρξη ή να διακόψουν την Υπηρεσία όταν υπάρχει εύλογη ανησυχία για την υγεία, ασφάλεια ή αξιοπρέπεια του Καθαριστή.',
    },
    {
      title: '11. Πρόσβαση στον Χώρο',
      body:
        'Ο Πελάτης είναι υπεύθυνος για την έγκαιρη και νόμιμη πρόσβαση στον χώρο. Η Cleanovox δεν ευθύνεται για αδυναμία ή καθυστέρηση εκτέλεσης της Υπηρεσίας όταν ο Καθαριστής δεν μπορεί να αποκτήσει πρόσβαση.\n\nΟ Πελάτης δεν πρέπει να παραδίδει απευθείας σε Καθαριστή μόνιμα κλειδιά, κωδικούς συναγερμού, κωδικούς τραπεζικών λογαριασμών, PIN, passwords ή άλλα ιδιαίτερα ευαίσθητα στοιχεία, εκτός εάν αυτό πραγματοποιείται μέσω επίσημης διαδικασίας που έχει εγκριθεί από την Cleanovox.',
    },
    {
      title: '12. Κατοικίδια Ζώα',
      body:
        'Ο Πελάτης παραμένει αποκλειστικά υπεύθυνος για την επίβλεψη και ασφαλή διαχείριση οποιουδήποτε κατοικίδιου ζώου και οφείλει να απομακρύνει τα κατοικίδιά του από τον χώρο κατά τη διάρκεια εκτέλεσης της Υπηρεσίας από τους Καθαριστές. Η Cleanovox παρέχει υπηρεσίες καθαρισμού και όχι υπηρεσίες φύλαξης, επίβλεψης ή φροντίδας ζώων.',
    },
    {
      title: '13. Συμπεριφορά του Πελάτη',
      body:
        'Ο Πελάτης οφείλει να συμπεριφέρεται στους Καθαριστές με σεβασμό και να παρέχει ασφαλές εργασιακό περιβάλλον. Απαγορεύεται οποιαδήποτε μορφή βίας, απειλής, παρενόχλησης, σεξουαλικής παρενόχλησης, διάκρισης, εκφοβισμού ή άλλης καταχρηστικής συμπεριφοράς.\n\nΣε περίπτωση τέτοιας συμπεριφοράς, η Cleanovox δικαιούται να διακόψει άμεσα την Υπηρεσία και να αναστείλει ή να τερματίσει την πρόσβαση του Πελάτη στην Πλατφόρμα.',
    },
    {
      title: '14. Οδηγίες προς τους Καθαριστές',
      body:
        'Ο Πελάτης μπορεί να παρέχει εύλογες οδηγίες που αφορούν την εκτέλεση της συμφωνημένης Υπηρεσίας. Δεν επιτρέπεται να απαιτεί από Καθαριστή παράνομη, επικίνδυνη ή ουσιωδώς διαφορετική εργασία από αυτή που περιλαμβάνεται στην κράτηση.\n\nΟποιοδήποτε ζήτημα αφορά την απόδοση, συμπεριφορά ή εργασία Καθαριστή πρέπει να γνωστοποιείται στην Cleanovox και να αντιμετωπίζεται μέσω αυτής.',
    },
    {
      title: '15. Τιμές και Πληρωμές',
      body:
        'Η συνολική τιμή της Υπηρεσίας ή ο τρόπος υπολογισμού της παρουσιάζεται στον Πελάτη πριν από την ολοκλήρωση της κράτησης. Με την επιβεβαίωση της κράτησης, ο Πελάτης εξουσιοδοτεί τη χρέωση του ποσού που εμφανίζεται μέσω του επιλεγμένου τρόπου πληρωμής.\n\nΟποιαδήποτε πρόσθετη χρέωση εφαρμόζεται μόνο σύμφωνα με τους παρόντες Όρους, τις πληροφορίες που παρουσιάζονται κατά τη διαδικασία κράτησης και την εφαρμοστέα νομοθεσία.',
    },
    {
      title: '16. Ακυρώσεις και Αδυναμία Εκτέλεσης',
      body:
        'Ο Πελάτης μπορεί να ακυρώσει κράτηση σύμφωνα με την Πολιτική Ακυρώσεων και Επιστροφών. Ακύρωση τουλάχιστον 24 ώρες πριν από την προγραμματισμένη έναρξη της Υπηρεσίας παρέχει δικαίωμα πλήρους επιστροφής του ποσού που έχει καταβληθεί για τη συγκεκριμένη κράτηση. Σε ακύρωση λιγότερο από 24 ώρες πριν από την προγραμματισμένη έναρξη, χρεώνεται το πλήρες ποσό της κράτησης.\n\nΕάν η Cleanovox ακυρώσει επιβεβαιωμένη κράτηση επειδή δεν μπορεί να παράσχει την Υπηρεσία για λόγο που δεν οφείλεται στον Πελάτη, ο Πελάτης μπορεί να επιλέξει είτε πλήρη επιστροφή του ποσού που έχει καταβληθεί για τη συγκεκριμένη κράτηση είτε μεταφορά της κράτησης σε άλλη διαθέσιμη ημέρα ή/και ώρα.\n\nΕάν ο Καθαριστής φτάσει στον συμφωνημένο χώρο αλλά δεν μπορεί να αποκτήσει πρόσβαση, δεν βρίσκεται εκεί ο Πελάτης ή εξουσιοδοτημένο ενήλικο πρόσωπο, έχουν δοθεί ανακριβή στοιχεία ή ο χώρος κρίνεται μη ασφαλής, η Cleanovox μπορεί να ακυρώσει ή να διακόψει την Υπηρεσία και να εφαρμόσει οποιαδήποτε νόμιμη και προηγουμένως γνωστοποιημένη χρέωση.\n\nΟποιαδήποτε υποχρεωτικά δικαιώματα του Πελάτη ως καταναλωτή παραμένουν ανεπηρέαστα.',
    },
    {
      title: '17. Δικαίωμα Υπαναχώρησης',
      body:
        'Για εξ αποστάσεως σύμβαση παροχής υπηρεσιών, ο Πελάτης που ενεργεί ως καταναλωτής διαθέτει, όπου εφαρμόζεται, δικαίωμα υπαναχώρησης εντός 14 ημερών από τη σύναψη της σύμβασης, σύμφωνα με την εφαρμοστέα νομοθεσία. Εάν ο Πελάτης ζητήσει ρητά να αρχίσει η Υπηρεσία πριν από τη λήξη της περιόδου υπαναχώρησης και στη συνέχεια υπαναχωρήσει αφού έχει αρχίσει η παροχή της, οφείλει το αναλογικό ποσό για την Υπηρεσία που παρασχέθηκε μέχρι τον χρόνο της υπαναχώρησης, όπου αυτό επιτρέπεται από τον νόμο.\n\nΌταν η Υπηρεσία έχει εκτελεστεί πλήρως πριν από τη λήξη της περιόδου υπαναχώρησης, το δικαίωμα υπαναχώρησης παύει μόνο εφόσον η εκτέλεση άρχισε με την προηγούμενη ρητή συγκατάθεση του Πελάτη και ο Πελάτης αναγνώρισε ότι θα απολέσει το δικαίωμα υπαναχώρησης μόλις η Υπηρεσία εκτελεστεί πλήρως, στον βαθμό που απαιτείται από την εφαρμοστέα νομοθεσία.',
    },
    {
      title: '18. Παράπονα για την Ποιότητα των Υπηρεσιών',
      body:
        'Εάν ο Πελάτης θεωρεί ότι η Υπηρεσία δεν εκτελέστηκε σύμφωνα με την κράτηση, πρέπει να ενημερώσει την Cleanovox εντός 12 ωρών από την ολοκλήρωση της Υπηρεσίας και να παρέχει κατάλληλο φωτογραφικό αποδεικτικό υλικό και τις πληροφορίες που είναι εύλογα απαραίτητες για τη διερεύνηση του παραπόνου.\n\nΚάθε παράπονο ή περίπτωση μη ικανοποίησης από τον καθαρισμό εξετάζεται ξεχωριστά από την Cleanovox, με βάση τις συγκεκριμένες περιστάσεις. Δεν παρέχεται αυτόματα επιστροφή χρημάτων, δωρεάν επανάληψη ή διόρθωση του καθαρισμού.',
    },
    {
      title: '19. Περιορισμός Ευθύνης',
      body:
        'Η Cleanovox δεν ευθύνεται για έμμεσες, παρεπόμενες, απομακρυσμένες ή μη εύλογα προβλέψιμες ζημιές, ούτε για απώλεια κέρδους, εισοδήματος, επιχειρηματικής ευκαιρίας ή δεδομένων που προκύπτει σε σχέση με τη χρήση της Πλατφόρμας ή των Υπηρεσιών.\n\nΚαμία διάταξη των παρόντων Όρων δεν έχει σκοπό ούτε αποτέλεσμα να αποκλείσει ή να περιορίσει ευθύνη της Cleanovox ή νόμιμο δικαίωμα καταναλωτή το οποίο, σύμφωνα με αναγκαστική διάταξη της νομοθεσίας της Κυπριακής Δημοκρατίας, δεν μπορεί νόμιμα να αποκλειστεί ή να περιοριστεί.',
    },
    {
      title: '20. Προσωπικά Δεδομένα',
      body:
        'Η Cleanovox επεξεργάζεται προσωπικά δεδομένα σύμφωνα με την Πολιτική Απορρήτου της και την εφαρμοστέα νομοθεσία περί προστασίας προσωπικών δεδομένων. Πληροφορίες που είναι εύλογα αναγκαίες για την εκτέλεση της Υπηρεσίας, όπως η διεύθυνση και οδηγίες πρόσβασης, μπορούν να γνωστοποιούνται στον Καθαριστή στον βαθμό που απαιτείται για την παροχή της Υπηρεσίας.',
    },
    {
      title: '21. Διαθεσιμότητα της Πλατφόρμας',
      body:
        'Η Cleanovox καταβάλλει εύλογες προσπάθειες για την ομαλή λειτουργία της Πλατφόρμας, χωρίς να εγγυάται ότι αυτή θα είναι διαθέσιμη συνεχώς ή απαλλαγμένη από τεχνικά προβλήματα.\n\nΗ λειτουργία μπορεί να διακόπτεται προσωρινά για λόγους συντήρησης, ενημέρωσης, ασφάλειας, τεχνικών προβλημάτων ή περιστάσεων πέραν του εύλογου ελέγχου της Cleanovox.',
    },
    {
      title: '22. Ανωτέρα Βία',
      body:
        'Η Cleanovox δεν ευθύνεται για καθυστέρηση, ακύρωση ή αδυναμία παροχής Υπηρεσίας η οποία οφείλεται σε περιστάσεις πέραν του εύλογου ελέγχου της.',
    },
    {
      title: '23. Αναστολή και Τερματισμός Λογαριασμού',
      body:
        'Η Cleanovox μπορεί, για εύλογο και νόμιμο λόγο, να αναστείλει ή να τερματίσει λογαριασμό Πελάτη σε περίπτωση απάτης, μη πληρωμής, παροχής ψευδών πληροφοριών, κακοποιητικής συμπεριφοράς έναντι εργαζομένων, δημιουργίας επικίνδυνων συνθηκών ή σοβαρής ή επαναλαμβανόμενης παραβίασης των παρόντων Όρων.',
    },
    {
      title: '24. Τροποποίηση των Όρων',
      body:
        'Η Cleanovox δύναται να τροποποιεί τους παρόντες Όρους όταν αυτό είναι εύλογα αναγκαίο λόγω αλλαγής της νομοθεσίας, της λειτουργίας της Πλατφόρμας, των προσφερόμενων Υπηρεσιών ή άλλων νόμιμων επιχειρηματικών λόγων.\n\nΟυσιώδεις τροποποιήσεις γνωστοποιούνται στον Πελάτη όπου και με τον τρόπο που απαιτεί η εφαρμοστέα νομοθεσία.',
    },
    {
      title: '25. Μερική Ακυρότητα',
      body:
        'Εάν οποιαδήποτε διάταξη των παρόντων Όρων κριθεί άκυρη, παράνομη ή μη εκτελεστή, η διάταξη αυτή θα εφαρμόζεται στον μέγιστο βαθμό που επιτρέπεται από τον νόμο και οι υπόλοιπες διατάξεις θα συνεχίσουν να ισχύουν.',
    },
    {
      title: '26. Εφαρμοστέο Δίκαιο και Δικαιοδοσία',
      body:
        'Οι παρόντες Όροι και οποιαδήποτε συμβατική σχέση που δημιουργείται μέσω της Cleanovox διέπονται από το δίκαιο της Κυπριακής Δημοκρατίας.\n\nΟποιαδήποτε διαφορά υπόκειται στη δικαιοδοσία των αρμόδιων δικαστηρίων της Κυπριακής Δημοκρατίας, με την επιφύλαξη οποιωνδήποτε υποχρεωτικών δικαιωμάτων δικαιοδοσίας, εφαρμοστέου δικαίου ή προστασίας που παρέχονται στον Πελάτη ως καταναλωτή.',
    },
    {
      title: '27. Επικοινωνία',
      body:
        'Οποιαδήποτε επικοινωνία σχετικά με κράτηση, πληρωμή, Καθαριστή, παράπονο, ζημιά, υποτιθέμενη κλοπή ή άλλο περιστατικό πρέπει να απευθύνεται στην επίσημη υπηρεσία εξυπηρέτησης πελατών της Cleanovox στο info@cleanovoxcy.com ή στα άλλα στοιχεία επικοινωνίας που δημοσιεύονται στην Πλατφόρμα.',
    },
  ],
  en: [
    {
      title: '1. Introduction and Scope',
      body:
        'These Terms and Conditions (“Terms”) govern access to and use of the website, application and/or electronic platform operating under the Cleanovox brand (“Cleanovox” or the “Platform”), together with all bookings and cleaning services provided through it (“Services”).\n\nBy creating an account, making a booking, confirming an order, making payment and/or using any Service, the user or customer (“Customer”) confirms that they have read, understood and accepted these Terms. A Customer who does not agree to these Terms must not use the Platform or book a Service.\n\nCleanovox is the trading brand under which the Services are offered by [FULL LEGAL NAME], a company registered in the Republic of Cyprus under registration number [REGISTRATION NUMBER] (the “Company”). The Company’s address and current contact details are published on the Platform. For contact: info@cleanovoxcy.com.',
    },
    {
      title: '2. Nature of the Services',
      body:
        'Cleanovox provides facilities for booking cleaning services for homes, apartments, offices and other suitable premises. Services are performed by cleaning personnel appointed by Cleanovox (“Cleaners”).\n\nCleaners may be employees of the business operating Cleanovox. No employment, partnership or similar relationship is created between the Customer and a Cleaner.\n\nAny matter concerning performance of a Service, cleaning quality, Cleaner conduct, payments, complaints, damage, incidents or other Service-related matters must be communicated directly to Cleanovox through its official communication channels.',
    },
    {
      title: '3. Bookings and Customer Information',
      body:
        'The Customer books a Service through the Platform by selecting the available location, date, time, duration, cleaning type and any additional Services. A booking becomes accepted only after confirmation by Cleanovox through the Platform or another official communication channel.\n\nCustomers must provide accurate, complete and current information. Cleanovox shall not be responsible for delay, inability to perform or other problems resulting from inaccurate or incomplete information provided by the Customer.\n\nCleanovox may reasonably reject, amend or cancel a booking because of safety concerns, inability to obtain access, staff unavailability, non-payment or unsuitable conditions at the Premises.',
    },
    {
      title: '4. Mandatory Customer Presence',
      body:
        'It is a material condition of every Service that the Customer or another adult authorised by the Customer remains at the Premises throughout the entire duration of the Service.\n\nThe Customer must not leave the Cleaner alone at the Premises. This requirement is intended, among other matters, to enable the Customer to supervise access to the Premises, provide instructions where necessary, safeguard personal property and address any issue arising during performance of the Service.\n\nIf the Customer or authorised adult chooses to leave the Premises, even temporarily, that decision is made at their own choice and responsibility. The Customer assumes property risks caused or materially increased by their absence.\n\nCleanovox reserves the right to refuse to commence or to discontinue a Service if the Customer or another authorised adult does not remain at the Premises.\n\nIf commencement of the Service is delayed because the Customer is not present at the scheduled time, has failed to leave a key at the pre-agreed location, or access cannot otherwise be obtained for a reason attributable to the Customer, Cleanovox will attempt to contact the Customer by telephone. A period of 20 minutes from the scheduled commencement time will be allowed, whether or not the Customer answers the call. If the Cleaner is unable to gain access within that period, the Cleaner will leave and the booking amount will not be refunded.',
    },
    {
      title: '5. Customer Responsibility for Personal Property',
      body:
        'The Customer remains responsible for the safekeeping, protection and security of personal property situated at the Premises. Cleanovox provides cleaning services only and does not provide security, surveillance, custody, bailment, safekeeping or property-protection services.\n\nThe entry or presence of a Cleaner at the Premises does not constitute delivery of the Customer’s property into the custody of Cleanovox and does not constitute acceptance of responsibility for any property situated there.\n\nBefore commencement of the Service, the Customer must remove from the cleaning area or securely store in an appropriately locked location any cash, jewellery, watches, precious metals, payment cards, keys, passports, important documents, portable electronic devices, artwork, antiques, collectibles and any other property having substantial financial or sentimental value.\n\nThe Customer is responsible for knowing what property is present, where it is situated and ensuring that appropriate security precautions have been taken before the Cleaner arrives.',
    },
    {
      title: '6. Theft, Loss or Missing Property',
      body:
        'It is a material condition of the Service that the Customer or an adult authorised by the Customer remains at the Premises throughout the entire Service and that, before the Service begins, the Customer has removed or adequately secured cash, jewellery, valuables and any other personal property of financial or sentimental value.\n\nCleanovox provides cleaning services only and does not undertake, and shall not be deemed to undertake, custody, surveillance, bailment, possession, safekeeping or protection of the Customer’s personal property. The presence of a Cleaner at the Premises does not constitute delivery of any property into the custody or possession of Cleanovox.\n\nThe Customer acknowledges and agrees that the protection, supervision and security of the Customer’s personal property remain the Customer’s responsibility throughout the Service.\n\nAccordingly, Cleanovox shall not be liable and excludes liability for any theft, loss, disappearance, missing property, movement or unauthorised removal of cash, jewellery, valuables or any other personal property from the Premises where the Service is provided.\n\nIf the Customer fails to remove or secure such property, or if the Customer or authorised adult leaves the Premises during the Service, this constitutes a breach of the Customer’s obligations under these Terms and the Customer assumes the risks caused or materially increased by that failure or absence.\n\nThe fact that a Cleaner was present at the Premises before an item was discovered to be missing does not, by itself, constitute evidence, a presumption or an admission that the loss or theft was caused by the Cleaner or Cleanovox.\n\nAny claim concerning alleged theft or loss must be supported by sufficient, objective and reliable evidence. Cleanovox may require an official Police report, evidence of ownership and value, photographs, available audiovisual material and any other information reasonably necessary to investigate the allegation.\n\nNo investigation, communication or cooperation by Cleanovox with the Customer, Police or any other competent authority constitutes an acknowledgement or admission of liability.\n\nNothing in these Terms excludes or restricts liability or any mandatory consumer right that cannot lawfully be excluded or restricted.',
    },
    {
      title: '7. Reporting Suspected Theft or Loss',
      body:
        'A Customer must notify Cleanovox without undue delay after discovering any alleged theft or loss. Where the Customer alleges that a criminal theft has occurred, Cleanovox may require the matter to be reported to the Police and relevant report details to be supplied.\n\nCleanovox may request any information reasonably necessary to investigate the incident, including evidence of ownership and value, photographic or audiovisual evidence, information concerning when the property was last seen and information concerning other persons having access to the Premises.\n\nCleanovox may cooperate with the Police and other competent authorities in accordance with applicable law. Receipt, investigation or referral of a complaint does not constitute an acknowledgement, admission or acceptance of liability by Cleanovox.',
    },
    {
      title: '8. False or Fraudulent Claims',
      body:
        'Customers must act in good faith when submitting any complaint or claim. Knowingly submitting a false, misleading, exaggerated or fraudulent allegation concerning theft, loss, damage or another incident is prohibited.\n\nCleanovox reserves all rights and remedies available under applicable law in relation to proven fraud or knowingly false allegations.',
    },
    {
      title: '9. Property Damage',
      body:
        'Before the Service begins, the Customer must notify Cleanovox in the “notes” field of the Platform of any fragile property, antiques, artwork, natural stone, marble, specialist or sensitive surfaces, defective appliances, pre-existing damage, or any other item or material requiring particular care or a specific cleaning or handling method.\n\nCleanovox shall not be responsible for ordinary wear and tear, pre-existing damage, latent defects, defective installations or appliances, undisclosed material sensitivities or damage resulting from inaccurate or incomplete Customer instructions.',
    },
    {
      title: '10. Safety of the Premises',
      body:
        'The Customer must provide a reasonably safe and suitable working environment and disclose in advance any condition reasonably capable of affecting the health or safety of the Cleaner, including hazardous substances, biological hazards, unsafe electrical installations, broken or sharp objects, aggressive animals or unsafe structures.\n\nThe Cleaner and Cleanovox may refuse to commence or may discontinue a Service where there is a reasonable concern regarding the health, safety or dignity of the Cleaner.',
    },
    {
      title: '11. Access to the Premises',
      body:
        'The Customer is responsible for ensuring lawful and timely access to the Premises. Cleanovox shall not be responsible for inability or delay in performing a Service where access cannot be obtained.\n\nCustomers should not provide permanent keys, alarm codes, banking credentials, PINs, passwords or similarly sensitive information directly to a Cleaner unless this occurs through an official procedure approved by Cleanovox.',
    },
    {
      title: '12. Pets',
      body:
        'The Customer remains solely responsible for the supervision and safe management of any pet and must remove pets from the Premises while the Service is being performed by the Cleaners. Cleanovox provides cleaning services and does not provide animal custody, supervision or pet-care services.',
    },
    {
      title: '13. Customer Conduct',
      body:
        'Customers must treat Cleaners respectfully and provide a safe working environment. Violence, threats, harassment, sexual harassment, discrimination, intimidation and other abusive behaviour are prohibited.\n\nCleanovox may immediately discontinue a Service and suspend or terminate the Customer’s access to the Platform where such conduct occurs.',
    },
    {
      title: '14. Instructions to Cleaners',
      body:
        'Customers may provide reasonable instructions concerning performance of the agreed Service but may not require illegal, unsafe or materially different work from the Service booked.\n\nAny matter concerning a Cleaner’s performance, conduct or employment must be communicated to and handled through Cleanovox.',
    },
    {
      title: '15. Prices and Payments',
      body:
        'The total price of the Service or the method by which it is calculated shall be presented before the Customer completes the booking. By confirming the booking, the Customer authorises collection of the displayed amount through the selected payment method.\n\nAny additional charge shall apply only in accordance with these Terms, information presented during the booking process and applicable law.',
    },
    {
      title: '16. Cancellations and Inability to Perform',
      body:
        'The Customer may cancel a booking in accordance with the Cancellation and Refund Policy. Cancellation at least 24 hours before the scheduled commencement of the Service entitles the Customer to a full refund of the amount paid for that booking. Where cancellation occurs less than 24 hours before the scheduled commencement, the full booking amount will be charged.\n\nIf Cleanovox cancels a confirmed booking because it is unable to provide the Service for a reason not attributable to the Customer, the Customer may choose either a full refund of the amount paid for that booking or to move the booking to another available date and/or time.\n\nWhere the Cleaner arrives but cannot obtain access, the Customer or authorised adult is not present, inaccurate details have been provided or the Premises are unsafe, Cleanovox may cancel or discontinue the Service and apply any lawful charge previously disclosed to the Customer.\n\nMandatory consumer rights remain unaffected.',
    },
    {
      title: '17. Withdrawal Rights',
      body:
        'For a distance contract for services, a Customer acting as a consumer has, where applicable, a statutory right to withdraw within 14 days from conclusion of the contract, in accordance with applicable law. If the Customer expressly requests that the Service begin before expiry of the withdrawal period and then withdraws after performance has begun, the Customer must pay the proportionate amount for the Service supplied up to the time of withdrawal, where permitted by law.\n\nWhere the Service has been fully performed before expiry of the withdrawal period, the right of withdrawal is lost only where performance began with the Customer’s prior express consent and the Customer acknowledged that the right of withdrawal would be lost once the Service had been fully performed, to the extent required by applicable law.',
    },
    {
      title: '18. Service Quality Complaints',
      body:
        'Where a Customer believes that a Service was not performed in accordance with the booking, the Customer must notify Cleanovox within 12 hours after completion of the Service and provide appropriate photographic evidence and information reasonably required to investigate the complaint.\n\nEach complaint or case of dissatisfaction with the cleaning will be considered by Cleanovox on a case-by-case basis, taking into account the specific circumstances. No refund, free repeat service or corrective cleaning is provided automatically.',
    },
    {
      title: '19. Limitation of Liability',
      body:
        'Cleanovox shall not be liable for indirect, incidental, remote or not reasonably foreseeable loss, or for loss of profit, income, business opportunity or data arising in connection with the Platform or Services.\n\nNothing in these Terms is intended to exclude or restrict any liability of Cleanovox or mandatory consumer right which cannot lawfully be excluded or restricted under the mandatory laws of the Republic of Cyprus.',
    },
    {
      title: '20. Personal Data',
      body:
        'Cleanovox processes personal data in accordance with its Privacy Policy and applicable data-protection legislation. Information reasonably necessary for performance of a Service, including the Customer’s address and relevant access instructions, may be provided to the Cleaner to the extent required for performance of the Service.',
    },
    {
      title: '21. Platform Availability',
      body:
        'Cleanovox takes reasonable measures to maintain the Platform but does not guarantee uninterrupted or error-free availability.\n\nThe Platform may temporarily become unavailable because of maintenance, updates, security requirements, technical problems or circumstances outside Cleanovox’s reasonable control.',
    },
    {
      title: '22. Force Majeure',
      body:
        'Cleanovox shall not be responsible for delay, cancellation or failure to provide a Service caused by circumstances outside its reasonable control.',
    },
    {
      title: '23. Account Suspension and Termination',
      body:
        'Cleanovox may suspend or terminate a Customer account for legitimate and reasonable grounds, including fraud, non-payment, provision of false information, abuse of employees, creation of unsafe conditions or serious or repeated breaches of these Terms.',
    },
    {
      title: '24. Amendments',
      body:
        'Cleanovox may amend these Terms where reasonably necessary because of changes to applicable law, operation of the Platform, the Services offered or other legitimate business reasons.\n\nMaterial amendments shall be communicated where and in the manner required by applicable law.',
    },
    {
      title: '25. Severability',
      body:
        'If any provision of these Terms is held invalid, unlawful or unenforceable, that provision shall apply to the maximum extent legally permissible and the remaining provisions shall continue in effect.',
    },
    {
      title: '26. Governing Law and Jurisdiction',
      body:
        'These Terms and any contractual relationship established through Cleanovox are governed by the laws of the Republic of Cyprus.\n\nAny dispute shall be subject to the jurisdiction of the competent courts of the Republic of Cyprus, without prejudice to any mandatory jurisdictional, applicable-law or consumer-protection rights available to the Customer.',
    },
    {
      title: '27. Contact',
      body:
        'All communications concerning bookings, payments, Cleaners, complaints, damage, alleged theft or any other incident must be directed to Cleanovox customer support at info@cleanovoxcy.com or through the other official contact details published on the Platform.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Cancellation and Refund Policy
// ---------------------------------------------------------------------------

const cancellationSections: Record<Language, LegalSection[]> = {
  el: [
    {
      title: '1. Γενικά',
      body:
        'Η παρούσα Πολιτική Ακυρώσεων και Επιστροφών εφαρμόζεται στις Υπηρεσίες Καθαρισμού που πραγματοποιούνται μέσω της Cleanovox και αποτελεί μέρος των Όρων και Προϋποθέσεων της Πλατφόρμας.',
    },
    {
      title: '2. Ακύρωση από τον Πελάτη',
      body:
        'Ο Πελάτης μπορεί να ζητήσει την ακύρωση κράτησης μέσω της Πλατφόρμας ή μέσω του διαθέσιμου επίσημου καναλιού εξυπηρέτησης πελατών.\n\nΑκύρωση που πραγματοποιείται τουλάχιστον 24 ώρες πριν από την προγραμματισμένη ώρα έναρξης της Υπηρεσίας παρέχει στον Πελάτη δικαίωμα πλήρους επιστροφής οποιουδήποτε ποσού έχει ήδη καταβληθεί για τη συγκεκριμένη κράτηση.\n\nΕάν η ακύρωση πραγματοποιηθεί λιγότερο από 24 ώρες πριν από την προγραμματισμένη ώρα έναρξης της Υπηρεσίας, ο Πελάτης χρεώνεται το πλήρες ποσό της κράτησης.',
    },
    {
      title: '3. Απουσία του Πελάτη',
      body:
        'Ο Πελάτης ή εξουσιοδοτημένο ενήλικο πρόσωπο πρέπει να βρίσκεται στον χώρο κατά την άφιξη του Καθαριστή και καθ’ όλη τη διάρκεια της Υπηρεσίας.\n\nΕάν ο Καθαριστής φτάσει στον χώρο και ο Πελάτης ή άλλο εξουσιοδοτημένο πρόσωπο δεν είναι διαθέσιμο, η Cleanovox μπορεί να θεωρήσει την κράτηση ως καθυστερημένη ακύρωση ή μη παρουσία και να εφαρμόσει τη σχετική χρέωση που είχε γνωστοποιηθεί κατά την κράτηση.',
    },
    {
      title: '4. Αδυναμία Πρόσβασης',
      body:
        'Εάν η Υπηρεσία δεν μπορεί να εκτελεστεί επειδή ο Πελάτης παρείχε λανθασμένη διεύθυνση, δεν εξασφάλισε πρόσβαση, δεν άφησε το κλειδί στον προκαθορισμένο χώρο ή παρέλειψε να γνωστοποιήσει απαραίτητες πληροφορίες, η Cleanovox θα επιχειρήσει να επικοινωνήσει τηλεφωνικώς με τον Πελάτη και θα παρέχεται χρονικό περιθώριο 20 λεπτών από την προγραμματισμένη ώρα έναρξης, ανεξάρτητα από το εάν ο Πελάτης απαντήσει. Εάν εντός των 20 λεπτών δεν καταστεί δυνατή η είσοδος του Καθαριστή, ο Καθαριστής θα αποχωρεί και το ποσό της κράτησης δεν επιστρέφεται.',
    },
    {
      title: '5. Μη Ασφαλής Χώρος',
      body:
        'Η Cleanovox μπορεί να αρνηθεί την έναρξη ή να διακόψει Υπηρεσία εάν ο χώρος παρουσιάζει εύλογο κίνδυνο για την υγεία ή ασφάλεια του Καθαριστή ή εάν ζητείται εργασία ουσιωδώς διαφορετική από την Υπηρεσία που έχει κρατηθεί.\n\nΗ τυχόν χρέωση ή επιστροφή χρημάτων σε τέτοια περίπτωση θα καθορίζεται ανάλογα με τις περιστάσεις και σύμφωνα με την εφαρμοστέα νομοθεσία.',
    },
    {
      title: '6. Ακύρωση από την Cleanovox',
      body:
        'Εάν η Cleanovox ακυρώσει επιβεβαιωμένη κράτηση για λόγο που δεν οφείλεται στον Πελάτη επειδή δεν μπορεί να παράσχει την Υπηρεσία, ο Πελάτης μπορεί να επιλέξει είτε πλήρη επιστροφή οποιουδήποτε ποσού έχει ήδη καταβληθεί για τη συγκεκριμένη κράτηση είτε μεταφορά της κράτησης σε άλλη διαθέσιμη ημέρα ή/και ώρα.',
    },
    {
      title: '7. Παράπονα για την Υπηρεσία',
      body:
        'Η απλή δυσαρέσκεια δεν δημιουργεί αυτομάτως δικαίωμα επιστροφής χρημάτων. Ο Πελάτης πρέπει να γνωστοποιεί οποιοδήποτε παράπονο στην Cleanovox εντός 12 ωρών από την ολοκλήρωση της Υπηρεσίας και να το συνοδεύει από κατάλληλο φωτογραφικό αποδεικτικό υλικό, ώστε να μπορεί να αξιολογηθεί το παράπονο.\n\nΚάθε παράπονο ή περίπτωση μη ικανοποίησης από τον καθαρισμό εξετάζεται ξεχωριστά από την Cleanovox, με βάση τις συγκεκριμένες περιστάσεις. Δεν παρέχεται αυτόματα επιστροφή χρημάτων, δωρεάν επανάληψη ή διόρθωση του καθαρισμού.',
    },
    {
      title: '8. Χρόνος Επιστροφής',
      body:
        'Όταν εγκρίνεται επιστροφή χρημάτων, η Cleanovox προχωρεί στην επιστροφή μέσω του κατάλληλου τρόπου πληρωμής. Ο χρόνος εμφάνισης των χρημάτων στον λογαριασμό του Πελάτη μπορεί να εξαρτάται από την τράπεζα, τον εκδότη της κάρτας ή τον πάροχο πληρωμών.',
    },
    {
      title: '9. Νόμιμα Δικαιώματα',
      body:
        'Η παρούσα Πολιτική δεν περιορίζει οποιοδήποτε υποχρεωτικό δικαίωμα του καταναλωτή. Ειδικότερα, όπου εφαρμόζεται δικαίωμα υπαναχώρησης σε εξ αποστάσεως σύμβαση υπηρεσιών, αυτό ασκείται σύμφωνα με την εφαρμοστέα νομοθεσία και υπερισχύει οποιουδήποτε ασυμβίβαστου όρου της παρούσας Πολιτικής.',
    },
  ],
  en: [
    {
      title: '1. General',
      body:
        'This Cancellation and Refund Policy applies to Cleaning Services booked through Cleanovox and forms part of the Platform Terms and Conditions.',
    },
    {
      title: '2. Customer Cancellations',
      body:
        'Customers may request cancellation through the Platform or an available official customer-support channel.\n\nA cancellation made at least 24 hours before the scheduled commencement of the Service entitles the Customer to a full refund of any amount already paid for that booking.\n\nWhere cancellation occurs less than 24 hours before the scheduled commencement of the Service, the Customer will be charged the full booking amount.',
    },
    {
      title: '3. Customer No-Show',
      body:
        'The Customer or an authorised adult must be present when the Cleaner arrives and throughout the Service.\n\nWhere the Cleaner arrives but the Customer or authorised person is unavailable, Cleanovox may treat the booking as a late cancellation or no-show and apply the charge disclosed during booking.',
    },
    {
      title: '4. Failure to Provide Access',
      body:
        'Where the Service cannot be performed because the Customer provided an incorrect address, failed to provide access, failed to leave a key at the pre-agreed location or failed to disclose information necessary to perform the Service, Cleanovox will attempt to contact the Customer by telephone and a period of 20 minutes from the scheduled commencement time will be allowed, whether or not the Customer answers. If the Cleaner cannot gain access within that 20-minute period, the Cleaner will leave and the booking amount will not be refunded.',
    },
    {
      title: '5. Unsafe Premises',
      body:
        'Cleanovox may refuse to commence or may discontinue a Service where the Premises present a reasonable health or safety risk to the Cleaner or where materially different work from the booked Service is requested.\n\nAny applicable charge or refund in such circumstances will be determined according to the circumstances and applicable law.',
    },
    {
      title: '6. Cancellation by Cleanovox',
      body:
        'Where Cleanovox cancels a confirmed booking for reasons not attributable to the Customer because it is unable to provide the Service, the Customer may choose either a full refund of any amount already paid for that booking or to reschedule the booking to another available date and/or time.',
    },
    {
      title: '7. Service Complaints',
      body:
        'Dissatisfaction does not automatically create an entitlement to a refund. The Customer must notify Cleanovox of any complaint within 12 hours after completion of the Service and provide appropriate photographic evidence so that the complaint can be assessed.\n\nEach complaint or case of dissatisfaction with the cleaning will be considered by Cleanovox on a case-by-case basis, taking into account the specific circumstances. No refund, free repeat service or corrective cleaning is provided automatically.',
    },
    {
      title: '8. Processing Refunds',
      body:
        'Approved refunds will be processed through the appropriate payment method. The time required for the funds to appear may depend upon the Customer’s bank, card issuer or payment provider.',
    },
    {
      title: '9. Statutory Rights',
      body:
        'Nothing in this Policy restricts any mandatory consumer right. In particular, where a statutory right of withdrawal applies to a distance contract for services, it may be exercised in accordance with applicable law and prevails over any inconsistent provision of this Policy.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Cookie Policy
// ---------------------------------------------------------------------------

const cookieSections: Record<Language, LegalSection[]> = {
  el: [
    {
      title: '1. Τι Είναι τα Cookies',
      body:
        'Η Cleanovox χρησιμοποιεί cookies και παρόμοιες τεχνολογίες στην ιστοσελίδα και/ή εφαρμογή της. Τα cookies είναι μικρά αρχεία ή πληροφορίες που χρησιμοποιούνται, μεταξύ άλλων, για την ορθή λειτουργία ψηφιακών υπηρεσιών, την αποθήκευση επιλογών και, όπου επιτρέπεται, την κατανόηση του τρόπου χρήσης μιας υπηρεσίας.\n\nΗ παρούσα Πολιτική πρέπει να διαβάζεται μαζί με την Πολιτική Απορρήτου της Cleanovox.',
    },
    {
      title: '2. Απολύτως Αναγκαίες Τεχνολογίες',
      body:
        'Ορισμένα cookies ή παρόμοιες τεχνολογίες είναι αναγκαία για τη λειτουργία της Πλατφόρμας. Μπορούν, για παράδειγμα, να χρησιμοποιούνται για τη διατήρηση ασφαλούς σύνδεσης, την ασφάλεια του λογαριασμού, τη λειτουργία της διαδικασίας κράτησης και πληρωμής ή την αποθήκευση των επιλογών συγκατάθεσης του χρήστη.\n\nΌπου η εφαρμοστέα νομοθεσία επιτρέπει τη χρήση τους χωρίς συγκατάθεση επειδή είναι απολύτως αναγκαία, δεν χρησιμοποιούνται για ανεξάρτητους διαφημιστικούς ή μη αναγκαίους σκοπούς.',
    },
    {
      title: '3. Analytics',
      body:
        'Η Cleanovox μπορεί να χρησιμοποιεί τεχνολογίες analytics για να κατανοεί τον τρόπο με τον οποίο χρησιμοποιείται η Πλατφόρμα και να βελτιώνει την απόδοση και εμπειρία χρήσης της.\n\nΌπου απαιτείται συγκατάθεση από την εφαρμοστέα νομοθεσία, αυτές οι τεχνολογίες δεν ενεργοποιούνται μέχρι ο χρήστης να τις αποδεχθεί μέσω του μηχανισμού διαχείρισης cookies.',
    },
    {
      title: '4. Διαφήμιση και Marketing',
      body:
        'Εάν στο μέλλον η Cleanovox χρησιμοποιεί advertising, remarketing ή άλλες μη αναγκαίες tracking technologies, αυτές θα χρησιμοποιούνται μόνο σύμφωνα με τις απαιτήσεις της εφαρμοστέας νομοθεσίας και, όπου απαιτείται, μετά τη συγκατάθεση του χρήστη.',
    },
    {
      title: '5. Διαχείριση Επιλογών',
      body:
        'Κατά την πρώτη επίσκεψη μπορεί να εμφανίζεται μηχανισμός διαχείρισης cookies μέσω του οποίου ο χρήστης μπορεί να αποδεχθεί ή να απορρίψει τις προαιρετικές κατηγορίες.\n\nΟ χρήστης πρέπει να έχει τη δυνατότητα να αλλάξει τις σχετικές επιλογές του μέσω της Πλατφόρμας. Η ανάκληση συγκατάθεσης δεν επηρεάζει τη νομιμότητα επεξεργασίας που πραγματοποιήθηκε πριν από την ανάκληση.',
    },
    {
      title: '6. Cookies Τρίτων',
      body:
        'Ορισμένες λειτουργίες μπορεί να παρέχονται μέσω τρίτων παρόχων. Όπου αυτοί τοποθετούν ή αποκτούν πρόσβαση σε cookies ή παρόμοιες τεχνολογίες, η χρήση τους υπόκειται στις εφαρμοστέες απαιτήσεις συγκατάθεσης και προστασίας δεδομένων.\n\nΗ Cleanovox θα διατηρεί ενημερωμένες πληροφορίες σχετικά με τις τεχνολογίες που χρησιμοποιούνται μέσω του cookie preference centre ή άλλου κατάλληλου σημείου της Πλατφόρμας.',
    },
    {
      title: '7. Αλλαγές',
      body:
        'Η παρούσα Πολιτική μπορεί να τροποποιείται όταν αλλάζουν οι τεχνολογίες που χρησιμοποιεί η Cleanovox ή οι εφαρμοστέες νομικές απαιτήσεις.',
    },
    {
      title: '8. Επικοινωνία',
      body:
        'Για ερωτήσεις σχετικά με cookies και προστασία δεδομένων, ο χρήστης μπορεί να επικοινωνεί με την Cleanovox στο info@cleanovoxcy.com.',
    },
  ],
  en: [
    {
      title: '1. What Cookies Are',
      body:
        'Cleanovox uses cookies and similar technologies through its website and/or application. These technologies may be used to enable digital services to operate correctly, remember preferences and, where permitted, understand how the Platform is used.\n\nThis Cookie Policy should be read together with the Cleanovox Privacy Policy.',
    },
    {
      title: '2. Strictly Necessary Technologies',
      body:
        'Certain cookies or similar technologies are necessary for operation of the Platform. They may be used, for example, to maintain secure sessions, protect accounts, enable booking and payment functionality and remember a user’s privacy choices.\n\nWhere applicable law permits these technologies to operate without consent because they are strictly necessary, they will not be used for unrelated advertising or other non-essential purposes.',
    },
    {
      title: '3. Analytics',
      body:
        'Cleanovox may use analytics technologies to understand Platform usage and improve performance and user experience.\n\nWhere consent is required by applicable law, these technologies will not be activated until the user has consented through the relevant cookie-management mechanism.',
    },
    {
      title: '4. Advertising and Marketing',
      body:
        'If Cleanovox uses advertising, remarketing or other non-essential tracking technologies, they will be deployed in accordance with applicable law and, where required, only after the user has provided consent.',
    },
    {
      title: '5. Managing Preferences',
      body:
        'A cookie-management mechanism may be displayed when a user first visits the Platform, allowing the user to accept or reject optional categories.\n\nUsers should be able to change their preferences through the Platform. Withdrawal of consent does not affect the lawfulness of processing carried out before consent was withdrawn.',
    },
    {
      title: '6. Third-Party Technologies',
      body:
        'Certain functionality may be provided by third-party service providers. Where third parties place or access cookies or similar technologies, their use will be subject to applicable consent and data-protection requirements.\n\nCurrent information concerning technologies in use will be made available through the cookie preference centre or another appropriate section of the Platform.',
    },
    {
      title: '7. Changes',
      body:
        'This Policy may be amended when the technologies used by Cleanovox or applicable legal requirements change.',
    },
    {
      title: '8. Contact',
      body:
        'Questions concerning cookies or privacy may be directed to Cleanovox at info@cleanovoxcy.com.',
    },
  ],
};

const docs: Record<LegalDocId, Record<Language, LegalSection[]>> = {
  terms: termsSections,
  cancellation: cancellationSections,
  cookies: cookieSections,
};

export function legalDocSections(doc: LegalDocId, language: Language): LegalSection[] {
  return docs[doc][language];
}
