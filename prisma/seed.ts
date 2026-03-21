import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [
  // ── Quiz Event #1 (Q1–Q15) ──
  {
    id: 1,
    category: "Core Products",
    questionText: "What can users do with KAST?",
    choices: ["Mine Bitcoin", "Create NFTs", "Hold, send, receive, and spend money globally", "Stake Ethereum validators"],
    correctIndex: 2,
    explanation: "KAST is a stablecoin-powered fintech platform offering three core functions: Store (hold USD in your account), Move (send & receive globally), and Spend (card payments at 150M+ merchants in 170+ countries)."
  },
  {
    id: 2,
    category: "Core Products",
    questionText: "What feature allows users to earn yield on their USD in the app?",
    choices: ["KAST Stake", "KAST Rewards", "KAST Boost", "KAST Earn"],
    correctIndex: 3,
    explanation: "KAST Earn lets you deposit USD into the Gauntlet USD Alpha vault — a risk-optimized on-chain vault — and earn yield through on-chain lending. Funds are 100% on-chain with full flexibility to deposit or withdraw at any time."
  },
  {
    id: 3,
    category: "Core Products",
    questionText: "Who manages the on-chain vault used in KAST Earn?",
    choices: ["Binance", "Coinbase", "Gauntlet", "Kraken"],
    correctIndex: 2,
    explanation: "Gauntlet is one of the most trusted risk managers in crypto, with 8 years of experience building quantitative DeFi strategies. They operate and optimize the vault using institutional-grade risk management."
  },
  {
    id: 4,
    category: "Core Products",
    questionText: "What does KAST Pay allow users to do?",
    choices: ["Mine stablecoins", "Convert and transfer money across crypto and fiat rails", "Trade NFTs", "Build smart contracts"],
    correctIndex: 1,
    explanation: "KAST Pay is an all-in-one payment solution bridging crypto and traditional finance. It enables instant conversion and transfer of funds across crypto and fiat rails without the delays of traditional banking."
  },
  {
    id: 5,
    category: "Leadership & Fundraising",
    questionText: "Who is the Founder and CEO of KAST?",
    choices: ["Vitalik Buterin", "Brian Armstrong", "Raagulan Pathy", "Changpeng Zhao"],
    correctIndex: 2,
    explanation: "Raagulan Pathy is the Co-Founder and CEO of KAST. He previously served as VP of Circle APAC and CEO of Circle Singapore."
  },
  {
    id: 6,
    category: "Leadership & Fundraising",
    questionText: "Where was Raagulan born?",
    choices: ["Sri Lanka", "Mumbai", "Australia", "Singapore"],
    correctIndex: 0,
    explanation: "Raagulan Pathy is a Sri Lankan-born Tamil Australian who moved from Sri Lanka to Australia at age 5."
  },
  {
    id: 7,
    category: "Leadership & Fundraising",
    questionText: "How much has KAST raised in investments so far?",
    choices: ["$60M", "$70M", "$80M", "$90M"],
    correctIndex: 3,
    explanation: "KAST raised $10M in its Seed round (led by HSG and Peak XV Partners) and $80M in its Series A (co-led by QED Investors and Left Lane Capital), totaling $90M in funding."
  },
  {
    id: 8,
    category: "Cards & Rewards",
    questionText: "How is KAST's customer service called?",
    choices: ["Help Center", "Support Team", "Concierge"],
    correctIndex: 2,
    explanation: "KAST's customer support is branded as \"Concierge.\" The support portal runs at concierge.kast.xyz, and higher card tiers (Limited, Luxe) include VIP Concierge with exclusive access to the KAST senior team."
  },
  {
    id: 9,
    category: "Cards & Rewards",
    questionText: "How many grams of gold are in the Solid Gold Card?",
    choices: ["30g", "33g", "37g", "39g"],
    correctIndex: 2,
    explanation: "The Luxe-tier \"Solana Solid Gold Card\" is made of 37g of solid gold — the only one on the market. It is available by invitation only."
  },
  {
    id: 10,
    category: "Cards & Rewards",
    questionText: "What is the maximum cashback (KAST Points + $MOVE Rewards) that KAST provides?",
    choices: ["8%", "10%", "11%", "12%"],
    correctIndex: 3,
    explanation: "KAST uses a tiered rewards system. The top-tier Luxe provides 8% KAST Points + 4% MOVE Rewards = 12% total. Breakdown: Standard 6%, Premium/Limited 9%, Luxe 12%."
  },
  {
    id: 11,
    category: "Stablecoins & Fees",
    questionText: "What is the name of KAST's stablecoin?",
    choices: ["USDKY", "USDKK", "USDK", "USDKA"],
    correctIndex: 0,
    explanation: "KAST developed its own stablecoin \"KAST Dollar\" in partnership with M^0. It comes in two versions: USDKY (yield-bearing, treasury-backed for savings) and USDK (optimized for payments), both launching on Solana."
  },
  {
    id: 12,
    category: "Stablecoins & Fees",
    questionText: "What is the FX fee for USD spending?",
    choices: ["0%", "0.5%", "1%", "1.5%"],
    correctIndex: 0,
    explanation: "There is no FX fee (0%) for USD purchases with a KAST card. Stablecoin deposits are also converted 1:1 at 0%, and Apple Pay/Google Pay transactions are 0%."
  },
  {
    id: 13,
    category: "Stablecoins & Fees",
    questionText: "What is the fee for non-USD spending?",
    choices: ["0.5–1.75%", "0.75–1.25%", "1–2%", "2–4%"],
    correctIndex: 0,
    explanation: "Non-USD transactions incur an FX fee of 0.5% to 1.75% depending on the currency. All fees are transparently displayed before transaction confirmation."
  },
  {
    id: 14,
    category: "Staking & Team",
    questionText: "You can earn KAST Points by staking Solana.",
    choices: ["True", "False"],
    correctIndex: 0,
    explanation: "By staking SOL through the KAST Validator, you earn KAST Points. Multipliers vary by tier: Standard 0.25x (~1.75% APY), Solana Illuma 0.5x (~3.5% APY), Solana Gold & Solid 1x (~7% APY). Points are credited every epoch (~2 days)."
  },
  {
    id: 15,
    category: "Staking & Team",
    questionText: "Who is KAST's COO (Chief Operating Officer)?",
    choices: ["Brad Jaffe", "Clement Berger", "Sameera Nilupul", "Sam Kerrins"],
    correctIndex: 3,
    explanation: "Sam Kerrins is KAST's COO, overseeing customer support, treasury management, card operations, disputes & chargebacks, and data reconciliation."
  },
  // ── Mock QUIZ — Cards & Products (Q16–Q20) ──
  {
    id: 16,
    category: "Cards & Products",
    questionText: "How much does shipping cost for the Standard physical KAST card?",
    choices: ["Free", "$20", "$40", "$60"],
    correctIndex: 2,
    explanation: "The Standard physical card itself is free — users only pay a $40 shipping fee. Previously, the card had an additional issuance cost, but KAST removed it to make physical cards more accessible globally."
  },
  {
    id: 17,
    category: "Cards & Products",
    questionText: "What is the maximum ATM withdrawal amount per single transaction with a KAST card?",
    choices: ["$200", "$250", "$500", "$1,000"],
    correctIndex: 1,
    explanation: "KAST cards allow a maximum of $250 per ATM withdrawal, with a fee of $3 + 2% per transaction. Users can make up to 3 ATM withdrawals per day, for a maximum daily limit of $750."
  },
  {
    id: 18,
    category: "Cards & Products",
    questionText: "Which NFT project partnered with KAST for a co-branded card?",
    choices: ["Bored Ape Yacht Club", "Azuki", "Pudgy Penguins", "CryptoPunks"],
    correctIndex: 2,
    explanation: "KAST launched a co-branded Pengu Card in partnership with Pudgy Penguins. The card is available in Standard, Premium, and Luxe tiers. When the waitlist opened, it hit 100,000 sign-ups on day one."
  },
  {
    id: 19,
    category: "Cards & Products",
    questionText: "How many card tiers does KAST offer?",
    choices: ["2", "3", "4", "5"],
    correctIndex: 2,
    explanation: "KAST offers 4 card tiers: Standard, Premium, Limited, and Luxe. Each tier comes with increasing cashback rates, rewards multipliers, and perks (such as VIP Concierge for Limited and Luxe tiers)."
  },
  {
    id: 20,
    category: "Cards & Products",
    questionText: "What payment network do KAST cards operate on?",
    choices: ["Mastercard", "Visa", "American Express", "UnionPay"],
    correctIndex: 1,
    explanation: "KAST cards operate on the Visa network, providing access to over 150 million merchants across 170+ countries."
  },
  // ── Mock QUIZ — Stablecoins & Blockchain (Q21–Q25) ──
  {
    id: 21,
    category: "Stablecoins & Blockchain",
    questionText: "Which stablecoins does KAST support for deposits? (Choose the most complete answer)",
    choices: ["USDC and USDT only", "USDC, USDT, and DAI", "USDC, USDT, USDe, PYUSD, and RLUSD", "USDC, USDT, BUSD, and TUSD"],
    correctIndex: 2,
    explanation: "KAST supports multiple stablecoins: USDC, USDT, USDe, PYUSD, and RLUSD. All stablecoin deposits are converted 1:1 at 0% fee."
  },
  {
    id: 22,
    category: "Stablecoins & Blockchain",
    questionText: "On which blockchain are KAST's own stablecoins (USDKY and USDK) launching?",
    choices: ["Ethereum", "Polygon", "Solana", "Arbitrum"],
    correctIndex: 2,
    explanation: "Both USDKY (yield-bearing, for savings) and USDK (optimized for payments) are launching on Solana. KAST chose Solana for its extremely low transaction fees (<$0.001) and fast confirmation times (<1 second)."
  },
  {
    id: 23,
    category: "Stablecoins & Blockchain",
    questionText: "What is the approximate total stablecoin market capitalization as of early 2026?",
    choices: ["$50 billion", "$150 billion", "$308 billion", "$500 billion"],
    correctIndex: 2,
    explanation: "The total stablecoin market value reached approximately $308 billion USD as of early 2026."
  },
  {
    id: 24,
    category: "Stablecoins & Blockchain",
    questionText: "Which blockchain offers the lowest transaction fees among those supported by KAST?",
    choices: ["Ethereum", "Polygon", "Tron", "Solana"],
    correctIndex: 3,
    explanation: "Solana offers transaction fees of less than $0.001 with confirmation times under 1 second."
  },
  {
    id: 25,
    category: "Stablecoins & Blockchain",
    questionText: "Who is KAST's partner for developing the KAST Dollar stablecoin?",
    choices: ["Circle", "Tether", "M^0", "Paxos"],
    correctIndex: 2,
    explanation: "KAST developed its own stablecoin \"KAST Dollar\" in partnership with M^0 (M-zero)."
  },
  // ── Mock QUIZ — Fees & Transfers (Q26–Q30) ──
  {
    id: 26,
    category: "Fees & Transfers",
    questionText: "What is the fee for SWIFT transfers over $5,000 during the promotional period (through March 2026)?",
    choices: ["$30", "$15", "$5", "$0 (waived)"],
    correctIndex: 3,
    explanation: "KAST ran a promotional campaign through March 2026 where the $30 SWIFT transfer fee is fully waived for transfers above $5,000."
  },
  {
    id: 27,
    category: "Fees & Transfers",
    questionText: "What is KAST's fee for MXN (Mexican Peso) SPEI transfers?",
    choices: ["0% (zero fee)", "0.5%", "1%", "$2 flat fee"],
    correctIndex: 0,
    explanation: "KAST offers zero-fee SPEI transfers in Mexican Pesos."
  },
  {
    id: 28,
    category: "Fees & Transfers",
    questionText: "What is the fixed fee for a Fedwire (US domestic) transfer on KAST?",
    choices: ["$2", "$5", "$15", "$30"],
    correctIndex: 2,
    explanation: "Fedwire transfers on KAST cost a $15 fixed fee. For comparison, ACH transfers cost only $2."
  },
  {
    id: 29,
    category: "Fees & Transfers",
    questionText: "How much does an ACH (US bank) transfer cost on KAST?",
    choices: ["$0", "$2", "$5", "$15"],
    correctIndex: 1,
    explanation: "ACH transfers on KAST cost only $2. This is significantly cheaper than competitors."
  },
  {
    id: 30,
    category: "Fees & Transfers",
    questionText: "What is the annual fee for a KAST Premium card?",
    choices: ["$100", "$500", "$1,000", "$2,500"],
    correctIndex: 2,
    explanation: "The KAST Premium card carries an annual fee of $1,000/year, while the Luxe tier costs $10,000/year. The Standard card has no annual fee."
  },
  // ── Mock QUIZ — Leadership & Team (Q31–Q35) ──
  {
    id: 31,
    category: "Leadership & Team",
    questionText: "Who is KAST's Chief Communications Officer (CCO)?",
    choices: ["Sam Kerrins", "Clement Berger", "Brad Jaffe", "Oriana Tessari"],
    correctIndex: 2,
    explanation: "Brad Jaffe is KAST's CCO, bringing experience from his previous role at Binance where he spent over 3 years."
  },
  {
    id: 32,
    category: "Leadership & Team",
    questionText: "Who is KAST's Chief Legal Officer (CLO)?",
    choices: ["Sam Kerrins", "Clement Berger", "Sameera Nilupul", "Brad Jaffe"],
    correctIndex: 1,
    explanation: "Clement Berger serves as KAST's CLO, overseeing all legal and compliance matters."
  },
  {
    id: 33,
    category: "Leadership & Team",
    questionText: "Who leads KAST's Global Financial Partnerships, with experience from ANZ, Airwallex, and Stripe?",
    choices: ["Brad Jaffe", "Sameera Nilupul", "Oriana Tessari", "Sam Kerrins"],
    correctIndex: 2,
    explanation: "Oriana Tessari leads KAST's Global Financial Partnerships, bringing over 10 years of experience from major institutions including ANZ Bank, Airwallex, and Stripe."
  },
  {
    id: 34,
    category: "Leadership & Team",
    questionText: "Which investment firms co-led KAST's $80M Series A round?",
    choices: ["Andreessen Horowitz and Sequoia Capital", "QED Investors and Left Lane Capital", "HSG and Peak XV Partners", "Binance Labs and Coinbase Ventures"],
    correctIndex: 1,
    explanation: "KAST's $80M Series A was co-led by QED Investors and Left Lane Capital."
  },
  {
    id: 35,
    category: "Leadership & Team",
    questionText: "Who is KAST's CTO (Chief Technology Officer)?",
    choices: ["Raagulan Pathy", "Brad Jaffe", "Sam Kerrins", "Sameera Nilupul"],
    correctIndex: 3,
    explanation: "Sameera Nilupul is KAST's CTO, responsible for the platform's technology architecture and engineering."
  },
  // ── Mock QUIZ — Security & Compliance (Q36–Q40) ──
  {
    id: 36,
    category: "Security & Compliance",
    questionText: "Which type of 2FA does KAST recommend avoiding due to SIM swapping vulnerability?",
    choices: ["Hardware security key", "Authenticator app", "SMS-based 2FA", "Biometric login"],
    correctIndex: 2,
    explanation: "KAST recommends avoiding SMS-based 2FA because it is vulnerable to SIM swapping attacks."
  },
  {
    id: 37,
    category: "Security & Compliance",
    questionText: "What KYC level is required to create a KAST card and start sending/receiving funds?",
    choices: ["Level 1", "Level 2", "Level 3", "No KYC required"],
    correctIndex: 1,
    explanation: "KYC Level 2 is required for card creation and sending/receiving functions."
  },
  {
    id: 38,
    category: "Security & Compliance",
    questionText: "By what percentage did reported crypto fraud cases increase year-over-year (2024–2025)?",
    choices: ["25%", "40%", "64%", "80%"],
    correctIndex: 2,
    explanation: "Reported crypto fraud cases increased by 64% year-over-year between 2024 and 2025."
  },
  {
    id: 39,
    category: "Security & Compliance",
    questionText: "What is the name of the US stablecoin regulation act signed in July 2025?",
    choices: ["Stablecoin Act", "Digital Dollar Act", "GENIUS Act", "Crypto Framework Act"],
    correctIndex: 2,
    explanation: "The GENIUS Act was signed into law on July 18, 2025 in the United States."
  },
  {
    id: 40,
    category: "Security & Compliance",
    questionText: "What should you always choose when paying abroad with a KAST card — local currency or your home currency?",
    choices: ["Your home currency (USD)", "The local currency", "It doesn't matter", "Whichever has the lower number"],
    correctIndex: 1,
    explanation: "Always choose to pay in local currency when prompted. Choosing your home currency triggers Dynamic Currency Conversion (DCC), which often applies a markup of up to 14%."
  },
  // ── Mock QUIZ — DeFi & Yield (Q41–Q45) ──
  {
    id: 41,
    category: "DeFi & Yield",
    questionText: "What is the approximate APY range for KAST Earn?",
    choices: ["1–2%", "3–7%", "10–15%", "20–30%"],
    correctIndex: 1,
    explanation: "KAST Earn provides a variable APY of approximately 3–7%, which changes based on market conditions. There is no lock-up period."
  },
  {
    id: 42,
    category: "DeFi & Yield",
    questionText: "What is the approximate impermanent loss when a token in a liquidity pool doubles in price (2x)?",
    choices: ["~2%", "~5.7%", "~10%", "~20%"],
    correctIndex: 1,
    explanation: "When one token in a pool experiences a 2x price increase, the impermanent loss is approximately 5.7%. This increases to ~13.4% at 3x and ~25.5% at 5x."
  },
  {
    id: 43,
    category: "DeFi & Yield",
    questionText: "What does TVL stand for in DeFi?",
    choices: ["Token Value Ledger", "Total Value Locked", "Transaction Verification Layer", "Tokenized Virtual Liquidity"],
    correctIndex: 1,
    explanation: "TVL stands for Total Value Locked — the total amount of crypto assets deposited in a DeFi protocol."
  },
  {
    id: 44,
    category: "DeFi & Yield",
    questionText: "What does APY stand for, and how does it differ from APR?",
    choices: ["APY includes compounding; APR does not", "APR includes compounding; APY does not", "They are the same thing", "APY applies only to staking; APR applies to lending"],
    correctIndex: 0,
    explanation: "APR (Annual Percentage Rate) represents the simple yearly interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compounding."
  },
  {
    id: 45,
    category: "DeFi & Yield",
    questionText: "What are the main sources of yield for stablecoin-based DeFi vaults?",
    choices: ["Mining rewards only", "Token airdrops only", "DeFi lending, RWA (Treasury bills), and collateralized loans", "NFT royalties"],
    correctIndex: 2,
    explanation: "Stablecoin yields in DeFi come from DeFi lending, RWA (Real World Assets) such as tokenized US Treasury bills, and collateralized loan interest."
  },
  // ── Mock QUIZ — Community & Campaigns (Q46–Q50) ──
  {
    id: 46,
    category: "Community & Campaigns",
    questionText: "How many members had joined the KAST Discord community as of March 6, 2026?",
    choices: ["3,000+", "5,000+", "7,000+", "10,000+"],
    correctIndex: 2,
    explanation: "As of March 6, 2026, the KAST Discord community had grown to over 7,000 members."
  },
  {
    id: 47,
    category: "Community & Campaigns",
    questionText: "What bonus does KAST offer to Y Combinator startups?",
    choices: ["$500 signup bonus + 2 free cards", "$1,000 signup bonus + 5 free cards", "$2,000 signup bonus + 10 free premium cards + 5% cashback", "$5,000 signup bonus + unlimited cards"],
    correctIndex: 2,
    explanation: "KAST offers Y Combinator startups a $2,000 signup bonus, 10 free premium cards for the team, and 5% cashback on spending."
  },
  {
    id: 48,
    category: "Community & Campaigns",
    questionText: "What is a \"KAST Tag\" used for?",
    choices: ["Tagging posts on social media", "Sending crypto instantly to other KAST users worldwide", "Tracking card shipments", "Earning reward multipliers"],
    correctIndex: 1,
    explanation: "A KAST Tag is a unique username that allows users to send crypto instantly to other KAST users worldwide without needing a wallet address."
  },
  {
    id: 49,
    category: "Community & Campaigns",
    questionText: "How many industry events did KAST attend in 2025?",
    choices: ["10+", "25+", "50+", "100+"],
    correctIndex: 2,
    explanation: "KAST attended over 50 industry events in 2025, its first full year of operation."
  },
  {
    id: 50,
    category: "Community & Campaigns",
    questionText: "How many languages does the KAST app support (as of February 2026)?",
    choices: ["3 (English, Spanish, Portuguese)", "5 (English, Spanish, Portuguese, French, Arabic)", "The app added Chinese, Turkish, and Arabic", "15 languages"],
    correctIndex: 2,
    explanation: "In February 2026, KAST expanded its app language support by adding Chinese, Turkish, and Arabic."
  },
  // ── Mock QUIZ — Geography & Use Cases (Q51–Q55) ──
  {
    id: 51,
    category: "Geography & Use Cases",
    questionText: "What is the pegged exchange rate between AED (UAE Dirham) and USD?",
    choices: ["1 USD = 2.50 AED", "1 USD = 3.6725 AED", "1 USD = 4.25 AED", "1 USD = 5.00 AED"],
    correctIndex: 1,
    explanation: "The UAE Dirham is pegged to the US dollar at a fixed rate of 1 USD = 3.6725 AED."
  },
  {
    id: 52,
    category: "Geography & Use Cases",
    questionText: "What local payment system does KAST support for zero-fee transfers in Mexico?",
    choices: ["PIX", "SPEI", "UPI", "SWIFT"],
    correctIndex: 1,
    explanation: "KAST supports SPEI (Sistema de Pagos Electrónicos Interbancarios) for Mexican Peso transfers at zero fees."
  },
  {
    id: 53,
    category: "Geography & Use Cases",
    questionText: "In Brazil, what tax is applied to international card transactions, in addition to the FX fee?",
    choices: ["VAT", "IOF", "GST", "ICMS"],
    correctIndex: 1,
    explanation: "In Brazil, international card transactions are subject to IOF (Imposto sobre Operações Financeiras), at approximately 0.88%."
  },
  {
    id: 54,
    category: "Geography & Use Cases",
    questionText: "What is the typical settlement time for most KAST card transactions?",
    choices: ["Instant (0 seconds)", "Within 15 minutes", "1–2 hours", "24 hours"],
    correctIndex: 1,
    explanation: "Most KAST card transactions settle within 15 minutes when using fast blockchain networks like Solana."
  },
  {
    id: 55,
    category: "Geography & Use Cases",
    questionText: "Which of the following can you pay for using a KAST card through delivery apps?",
    choices: ["Only food delivery", "Wolt and Uber Eats orders", "Only in-store purchases", "Only cryptocurrency purchases"],
    correctIndex: 1,
    explanation: "KAST cards can be used with food delivery platforms like Wolt and Uber Eats, and everyday spending earns cashback."
  },
  // ── Mock QUIZ — Technical Knowledge (Q56–Q60) ──
  {
    id: 56,
    category: "Technical Knowledge",
    questionText: "What is slippage in a crypto transaction?",
    choices: ["A fee charged by the exchange", "The difference between expected and actual execution price", "The time delay in confirming a block", "A type of blockchain consensus mechanism"],
    correctIndex: 1,
    explanation: "Slippage refers to the difference between the expected price of a trade and the actual execution price."
  },
  {
    id: 57,
    category: "Technical Knowledge",
    questionText: "What is a block explorer used for in relation to KAST card top-ups?",
    choices: ["Mining cryptocurrency", "Tracking and verifying on-chain transactions", "Creating new wallets", "Trading tokens"],
    correctIndex: 1,
    explanation: "A block explorer allows users to track and verify on-chain transactions, including KAST card top-ups."
  },
  {
    id: 58,
    category: "Technical Knowledge",
    questionText: "What is the typical gas limit for a simple ETH transfer?",
    choices: ["5,000 gas", "21,000 gas", "100,000 gas", "500,000 gas"],
    correctIndex: 1,
    explanation: "A simple Ethereum transfer requires exactly 21,000 gas units."
  },
  {
    id: 59,
    category: "Technical Knowledge",
    questionText: "What is the difference between a \"coin\" and a \"token\" in crypto?",
    choices: ["They are the same thing", "A coin operates on its own blockchain; a token is built on an existing blockchain", "A token is always worth more than a coin", "Coins are for payments; tokens are only for governance"],
    correctIndex: 1,
    explanation: "A coin (e.g., BTC, ETH, SOL) operates on its own native blockchain. A token (e.g., USDC, MOVE) is built on top of an existing blockchain using smart contracts."
  },
  {
    id: 60,
    category: "Technical Knowledge",
    questionText: "What is a seed phrase, and how many words does it typically contain?",
    choices: ["A password for your email; 8 words", "A recovery key for your crypto wallet; 12 or 24 words", "A username for exchanges; 6 words", "An API key for DeFi; 16 words"],
    correctIndex: 1,
    explanation: "A seed phrase is a set of 12 or 24 words that serves as the master backup for a cryptocurrency wallet."
  },
  // ── Mock QUIZ — Staking & Rewards (Q61–Q65) ──
  {
    id: 61,
    category: "Staking & Rewards",
    questionText: "What is the KAST Points multiplier for the Solana Illuma card tier when staking SOL?",
    choices: ["0.25x", "0.5x", "0.75x", "1x"],
    correctIndex: 1,
    explanation: "KAST staking multipliers vary by card tier: Standard = 0.25x (~1.75% APY), Solana Illuma = 0.5x (~3.5% APY), and Solana Gold & Solid = 1x (~7% APY)."
  },
  {
    id: 62,
    category: "Staking & Rewards",
    questionText: "What is the KAST referral commission rate at Level 1?",
    choices: ["10%", "20%", "30%", "50%"],
    correctIndex: 2,
    explanation: "KAST's referral program offers a 30% commission at Level 1 and 6% commission at Level 2."
  },
  {
    id: 63,
    category: "Staking & Rewards",
    questionText: "What are the two components of KAST's cashback reward system?",
    choices: ["Bitcoin rewards + Ethereum rewards", "KAST Points + $MOVE Rewards", "USDC cashback + NFT rewards", "SOL staking + airdrop tokens"],
    correctIndex: 1,
    explanation: "KAST's cashback system has two components: KAST Points (loyalty points) and $MOVE Rewards (crypto token rewards). Combined maximum is 12% at the Luxe tier."
  },
  {
    id: 64,
    category: "Staking & Rewards",
    questionText: "How often are KAST staking points credited?",
    choices: ["Daily", "Every Solana epoch (~2 days)", "Weekly", "Monthly"],
    correctIndex: 1,
    explanation: "KAST staking rewards are credited every Solana epoch, which occurs approximately every 2 days."
  },
  {
    id: 65,
    category: "Staking & Rewards",
    questionText: "How many KAST Tag changes are users allowed?",
    choices: ["Unlimited", "1", "2", "5"],
    correctIndex: 2,
    explanation: "Users can change their KAST Tag a maximum of 2 times."
  },
  // ── Mock QUIZ — Market Knowledge (Q66–Q70) ──
  {
    id: 66,
    category: "Market Knowledge",
    questionText: "What was the approximate total value of tokenized Real World Assets (RWA) on-chain as of February 2026?",
    choices: ["$50 billion", "$100 billion", "$240 billion", "$500 billion"],
    correctIndex: 2,
    explanation: "The total value of tokenized Real World Assets (RWA) on-chain reached approximately $240+ billion as of February 2026."
  },
  {
    id: 67,
    category: "Market Knowledge",
    questionText: "What is the average cumulative CPI (inflation) increase from 2016 to 2026?",
    choices: ["20%", "28%", "36%", "45%"],
    correctIndex: 2,
    explanation: "The cumulative CPI increase over the 2016–2026 decade was approximately 36%, averaging about 3.1% annually."
  },
  {
    id: 68,
    category: "Market Knowledge",
    questionText: "Which algorithmic stablecoin famously collapsed in 2022?",
    choices: ["USDC", "DAI", "UST (TerraUSD)", "BUSD"],
    correctIndex: 2,
    explanation: "UST (TerraUSD) was an algorithmic stablecoin that collapsed in May 2022, losing its dollar peg and causing billions in losses."
  },
  {
    id: 69,
    category: "Market Knowledge",
    questionText: "Which EUR stablecoin is issued by Societe Generale and focuses on institutional users?",
    choices: ["EURI (Eurite)", "EURC (Circle Euro)", "EURS (Stasis)", "EURCV"],
    correctIndex: 3,
    explanation: "EURCV is issued by Societe Generale (through its digital asset subsidiary SG-FORGE) and is primarily designed for institutional users."
  },
  {
    id: 70,
    category: "Market Knowledge",
    questionText: "How many countries can KAST users send SWIFT transfers to?",
    choices: ["50+", "80+", "125+", "200+"],
    correctIndex: 2,
    explanation: "KAST supports SWIFT transfers to 125+ countries globally."
  },
];

async function main() {
  console.log("Seeding quiz questions...");

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {
        category: q.category,
        questionText: q.questionText,
        choices: q.choices,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      },
      create: {
        id: q.id,
        category: q.category,
        questionText: q.questionText,
        choices: q.choices,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      },
    });
  }

  console.log(`Seeded ${questions.length} questions successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
