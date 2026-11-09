// All site copy lives here so it can be edited without touching components.

export const NAV = [
  { id: 'solutions', label: 'Solutions' },
  { id: 'tools', label: 'Tools' },
  { id: 'how', label: 'How it works' },
  { id: 'technology', label: 'Technology' },
  { id: 'why', label: 'Why Endloops' },
]

export const AUDIENCE = [
  { label: 'Accountants', dot: 'bg-green' },
  { label: 'Auditors', dot: 'bg-teal' },
  { label: 'Finance teams', dot: 'bg-blue' },
  { label: 'Property management companies', dot: 'bg-purple' },
]

export const END_TO_END = [
  {
    id: 'budget-review',
    name: 'Budget review',
    summary: 'Reviews a submitted budget against agreed rules and prior figures, and drafts the review notes.',
    prepares: ['Compares each budget line with prior-year figures and supporting documents', 'Flags lines that fall outside agreed limits', 'Drafts review notes for the reviewer'],
    you: 'Decide which variances need an explanation and conclude on the budget.',
  },
  {
    id: 'escrow-audit',
    name: 'Escrow audit',
    summary: 'Works through escrow account activity from statements to supporting documents.',
    prepares: ['Reads statements and supporting documents', 'Matches receipts and payments to the records', 'Lists unmatched items in a working paper'],
    you: 'Assess each exception and sign off the audit.',
  },
  {
    id: 'financial-audit',
    name: 'Financial audit',
    summary: 'Prepares schedules and working papers from ledgers and source documents.',
    prepares: ['Extracts figures from invoices, contracts and statements', 'Checks totals, duplicates and missing items', 'Produces draft schedules and working papers'],
    you: 'Apply professional judgement and form the audit opinion.',
  },
  {
    id: 'interim-audit',
    name: 'Interim audit',
    summary: 'Keeps periodic checks during the year organised, so year-end starts from a prepared position.',
    prepares: ['Runs the agreed checks on each period’s documents', 'Records results in interim working papers', 'Keeps a running list of open points'],
    you: 'Review the open points and decide what carries forward.',
  },
  {
    id: 'budget-preparation',
    name: 'Budget preparation',
    audience: 'For property management companies',
    summary: 'Builds a first-draft budget from previous actuals, contracts and service costs.',
    prepares: ['Gathers prior actuals and contract figures', 'Drafts each budget line with its source', 'Produces a budget ready for review'],
    you: 'Set the assumptions, adjust the draft and approve the budget.',
  },
]

export const TOOLS = [
  { id: 'po-extraction', name: 'Purchase-order extraction', text: 'Reads purchase orders and pulls suppliers, items, quantities and amounts into structured data.', icon: 'doc', tone: 'green' },
  { id: 'vouching', name: 'Vouching automation', text: 'Checks recorded entries against their supporting documents and lists what does not agree.', icon: 'check', tone: 'teal' },
  { id: 'expense-working', name: 'Expense working automation', text: 'Prepares expense schedules from invoices and statements, ready for review.', icon: 'layers', tone: 'blue' },
  { id: 'report-review', name: 'Financial report review', text: 'Reads a draft report and checks figures and notes against each other and against rules.', icon: 'doc', tone: 'purple' },
  { id: 'tender-verification', name: 'Tender verification', text: 'Compares quotes against each other and against the tender requirements.', icon: 'compare', tone: 'green' },
  { id: 'reconciliation', name: 'Reconciliation', text: 'Matches two sets of records, such as a ledger and a statement, and surfaces what is left.', icon: 'compare', tone: 'teal' },
]

export const STEPS = [
  { id: 'read', name: 'Read', tone: 'green', text: 'Endloops reads your invoices, purchase orders, contracts and statements and extracts the figures and details that matter.' },
  { id: 'compare', name: 'Compare', tone: 'teal', text: 'It matches documents against ledgers, or quotes against each other, so nothing is checked by eye alone.' },
  { id: 'check', name: 'Check', tone: 'blue', text: 'It applies your rules and flags missing items, mismatched totals, duplicates and anything outside agreed limits.' },
  { id: 'prepare', name: 'Prepare', tone: 'blue', text: 'It produces schedules, working papers and reports as drafts, laid out for review.' },
  { id: 'review', name: 'You review', tone: 'purple', text: 'You look at what was flagged, decide, and sign off. The final decision always stays with you.' },
]

export const CAPABILITIES = [
  { name: 'Read documents', text: 'Extract figures and details from invoices, purchase orders, contracts and statements.', tone: 'green', icon: 'doc' },
  { name: 'Compare and match', text: 'Check documents against ledgers, or quotes against each other.', tone: 'teal', icon: 'compare' },
  { name: 'Check against rules', text: 'Flag missing items, mismatched totals, duplicates and anything outside agreed limits.', tone: 'blue', icon: 'check' },
  { name: 'Prepare drafts', text: 'Produce schedules, working papers and reports that are ready for review.', tone: 'purple', icon: 'layers' },
  { name: 'Handle bulk work', text: 'Process hundreds of documents at once, so volume does not decide how much gets checked.', tone: 'green', icon: 'stack' },
]

export const WHY = [
  { title: 'Built by people who do this work', text: 'Endloops began as the technology department of Alkazim, an accounting and audit firm in Dubai. The tools come from real finance workflows.' },
  { title: 'Software prepares, you decide', text: 'Automation handles the repetitive tasks. Every result is laid out for review, and sign-off stays with your team.' },
  { title: 'Start with a tool or a whole process', text: 'Use one focused tool on its own, or run an entire service end to end. The range will keep growing.' },
  { title: 'Made for the GCC and beyond', text: 'We are building towards being the automation partner for accounting, audit and property finance teams in the region.' },
]

export const ROLES = ['Accountant', 'Auditor', 'Finance team', 'Property management', 'Other']
