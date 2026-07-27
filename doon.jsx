import { useMemo, useState } from "react";
import { ShoppingBag, Plus, Minus, X, Search, Check, ArrowRight, MapPin } from "lucide-react";

/* ---------- palette ----------
paper:    #F7F2E7  (rice-paper cream)
ink:      #26301F  (deep forest ink)
green:    #3F5C3A  (doon valley green)
green2:   #2E4429  (deeper green, hover)
amber:    #C4801F  (turmeric / marigold accent)
brick:    #8B3A2E  (litchi / brick red)
line:     #D9CCA6  (rice-husk tan, borders)
paperDk:  #EFE7D4  (card surface, slightly darker paper)
--------------------------------- */

const C = {
  paper: "#F7F2E7",
  ink: "#26301F",
  green: "#3F5C3A",
  green2: "#2E4429",
  amber: "#C4801F",
  brick: "#8B3A2E",
  line: "#D9CCA6",
  paperDk: "#EFE7D4",
};

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-body { font-family: 'Work Sans', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes stampIn { from { opacity: 0; transform: scale(1.4) rotate(-8deg); } to { opacity: 1; transform: scale(1) rotate(-8deg); } }
    .drawer-in { animation: slideIn 0.28s cubic-bezier(.2,.8,.2,1); }
    .fade-in { animation: fadeIn 0.2s ease; }
    .stamp-in { animation: stampIn 0.4s cubic-bezier(.2,.8,.2,1); }
    .torn-edge {
      -webkit-mask-image: linear-gradient(#000, #000);
      position: relative;
    }
    .torn-edge::before {
      content: "";
      position: absolute;
      top: -1px; left: 0; right: 0; height: 10px;
      background-image: linear-gradient(135deg, ${C.paper} 50%, transparent 50%),
                         linear-gradient(-135deg, ${C.paper} 50%, transparent 50%);
      background-size: 16px 20px;
      background-repeat: repeat-x;
      background-position: top;
    }
    ::selection { background: ${C.amber}; color: ${C.paper}; }
    .focus-ring:focus-visible { outline: 2px solid ${C.green}; outline-offset: 2px; }
  `}</style>
);

/* ---------- product line-art icons (consistent stamp style) ---------- */
function IconBase({ children }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="46" fill="none" stroke={C.line} strokeWidth="1.5" strokeDasharray="2 3" />
      {children}
    </svg>
  );
}
const RiceIcon = () => (
  <IconBase>
    <path d="M30 68 L30 40 Q50 26 70 40 L70 68 Z" fill={C.paperDk} stroke={C.ink} strokeWidth="2" />
    <path d="M30 40 Q50 30 70 40" fill="none" stroke={C.ink} strokeWidth="2" />
    <path d="M42 40 L42 68 M50 38 L50 68 M58 40 L58 68" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M50 26 L50 18 M45 22 L50 18 L55 22" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" />
  </IconBase>
);
const HoneyIcon = () => (
  <IconBase>
    <path d="M38 34 h24 v8 l4 6 v22 a4 4 0 0 1 -4 4 h-24 a4 4 0 0 1 -4 -4 v-22 l4 -6 Z" fill={C.paperDk} stroke={C.ink} strokeWidth="2" />
    <rect x="36" y="34" width="28" height="6" fill={C.brick} />
    <path d="M42 52 q8 8 16 0 q-8 10 0 18" fill="none" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" />
  </IconBase>
);
const TeaIcon = () => (
  <IconBase>
    <path d="M30 46 q20 -10 40 0 v6 q-20 10 -40 0 Z" fill={C.paperDk} stroke={C.ink} strokeWidth="2" />
    <path d="M32 52 q3 16 8 20 h20 q5 -4 8 -20" fill="none" stroke={C.ink} strokeWidth="2" />
    <path d="M42 34 q-4 6 0 10 M50 30 q-4 6 0 10 M58 34 q-4 6 0 10" stroke={C.green} strokeWidth="2" fill="none" strokeLinecap="round" />
  </IconBase>
);
const ChiliIcon = () => (
  <IconBase>
    <path d="M40 34 q-4 4 -2 8" stroke={C.green} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M40 40 q28 4 22 30 q-4 12 -18 8 q-10 -4 -8 -18 q1 -12 4 -20 Z" fill={C.brick} stroke={C.ink} strokeWidth="2" />
  </IconBase>
);
const SquashIcon = () => (
  <IconBase>
    <path d="M40 32 h20 v6 h-20 Z" fill={C.paperDk} stroke={C.ink} strokeWidth="2" />
    <path d="M36 38 h28 l-3 32 a4 4 0 0 1 -4 4 h-14 a4 4 0 0 1 -4 -4 Z" fill="#C2515A" stroke={C.ink} strokeWidth="2" />
    <path d="M40 46 q10 6 20 0" stroke={C.amber} strokeWidth="2" fill="none" />
  </IconBase>
);
const PickleIcon = () => (
  <IconBase>
    <path d="M36 36 h28 v6 h-28 Z" fill={C.green} stroke={C.ink} strokeWidth="2" />
    <path d="M34 42 h32 v28 a4 4 0 0 1 -4 4 h-24 a4 4 0 0 1 -4 -4 Z" fill={C.paperDk} stroke={C.ink} strokeWidth="2" />
    <circle cx="44" cy="54" r="3" fill={C.brick} />
    <circle cx="56" cy="60" r="3" fill={C.amber} />
    <circle cx="48" cy="66" r="3" fill={C.brick} />
  </IconBase>
);
const JamIcon = () => (
  <IconBase>
    <path d="M38 34 h24 v6 h-24 Z" fill={C.paperDk} stroke={C.ink} strokeWidth="2" />
    <path d="M36 40 h28 v26 a4 4 0 0 1 -4 4 h-20 a4 4 0 0 1 -4 -4 Z" fill="#9C3B4A" stroke={C.ink} strokeWidth="2" />
    <rect x="34" y="50" width="32" height="8" fill={C.paperDk} opacity="0.85" />
  </IconBase>
);
const TurmericIcon = () => (
  <IconBase>
    <path d="M36 60 q-4 -14 8 -22 q14 -8 22 4 q6 10 -2 18 q-6 6 -16 6 q-8 0 -12 -6 Z" fill={C.amber} stroke={C.ink} strokeWidth="2" />
    <path d="M42 46 q6 4 12 0" stroke={C.ink} strokeWidth="1.5" fill="none" opacity="0.5" />
  </IconBase>
);

const ICONS = {
  rice: RiceIcon,
  honey: HoneyIcon,
  tea: TeaIcon,
  chili: ChiliIcon,
  squash: SquashIcon,
  pickle: PickleIcon,
  jam: JamIcon,
  turmeric: TurmericIcon,
};

/* ---------- product data ---------- */
const PRODUCTS = [
  { id: "p1", name: "Doon Basmati Rice", cat: "Grains", weight: "1 kg", price: 180, icon: "rice", desc: "Aged, extra-long grain basmati grown in the Doon valley paddies. Cooks light and fragrant." },
  { id: "p2", name: "Wild Forest Honey", cat: "Sweeteners", weight: "500 g", price: 350, icon: "honey", desc: "Raw multi-flora honey gathered from hillside combs above 1500m. Unfiltered, unheated." },
  { id: "p3", name: "Kumaon Green Tea", cat: "Beverages", weight: "250 g", price: 220, icon: "tea", desc: "First-flush green tea leaves, hand-rolled and sun-dried on a small Kumaon estate." },
  { id: "p4", name: "Garhwali Red Chilli", cat: "Spices", weight: "200 g", price: 120, icon: "chili", desc: "Sun-dried hill chillies, stone-ground for a deep colour with moderate heat." },
  { id: "p5", name: "Buransh Squash", cat: "Beverages", weight: "750 ml", price: 280, icon: "squash", desc: "Tangy rhododendron-flower squash from the high slopes, cold-pressed the traditional way." },
  { id: "p6", name: "Pahadi Mixed Pickle", cat: "Preserves", weight: "400 g", price: 150, icon: "pickle", desc: "Mountain radish, turnip and chilli pickled in mustard oil, aged in the sun for three weeks." },
  { id: "p7", name: "Litchi Preserve", cat: "Preserves", weight: "300 g", price: 200, icon: "jam", desc: "Small-batch preserve made from Dehradun's famed litchi orchards, light on added sugar." },
  { id: "p8", name: "Hill Turmeric Powder", cat: "Spices", weight: "200 g", price: 90, icon: "turmeric", desc: "Lakadong-variety turmeric root, dried and milled fine for deep colour and aroma." },
];

const CATEGORIES = ["All", "Grains", "Sweeteners", "Beverages", "Spices", "Preserves"];
const DELIVERY_FEE = 40;
const FREE_DELIVERY_OVER = 500;
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function DoonValleyStore() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNo] = useState(() => `DV-${Math.floor(1000 + Math.random() * 9000)}`);

  const items = useMemo(() => {
    return PRODUCTS.filter(
      (p) =>
        (category === "All" || p.cat === category) &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [category, query]);

  const cartLines = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty })),
    [cart]
  );

  const cartCount = cartLines.reduce((s, l) => s + l.qty, 0);
  const subtotal = cartLines.reduce((s, l) => s + l.qty * l.price, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const setQty = (id, qty) =>
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const placeOrder = () => {
    setOrderPlaced(true);
  };
  const closeReceipt = () => {
    setOrderPlaced(false);
    setCart({});
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen w-full font-body" style={{ background: C.paper, color: C.ink }}>
      {FONTS}

      {/* ---------- header ---------- */}
      <header
        className="sticky top-0 z-30 backdrop-blur"
        style={{ background: `${C.paper}ee`, borderBottom: `1px solid ${C.line}` }}
      >
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 stamp-in"
            style={{ border: `2px solid ${C.green}`, transform: "rotate(-8deg)" }}
          >
            <span className="font-display font-bold text-sm" style={{ color: C.green }}>
              DV
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-semibold text-lg leading-tight truncate" style={{ color: C.ink }}>
              Doon Valley Store
            </h1>
            <p className="text-xs flex items-center gap-1 truncate" style={{ color: C.green }}>
              <MapPin size={11} /> Kirana from the hills · Dehradun
            </p>
          </div>

          <div className="hidden sm:flex items-center flex-1 max-w-sm ml-4 rounded-full px-3 py-2 gap-2" style={{ background: C.paperDk, border: `1px solid ${C.line}` }}>
            <Search size={16} style={{ color: C.green }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rice, honey, tea…"
              className="bg-transparent outline-none text-sm w-full font-body focus-ring"
              style={{ color: C.ink }}
            />
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="ml-auto relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium focus-ring"
            style={{ background: C.green, color: C.paper }}
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span
                className="font-mono absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full text-[11px] flex items-center justify-center"
                style={{ background: C.amber, color: C.paper }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <div className="sm:hidden px-5 pb-3 flex items-center rounded-full px-3 py-2 gap-2" style={{ background: C.paperDk, border: `1px solid ${C.line}`, margin: "0 20px 12px" }}>
          <Search size={16} style={{ color: C.green }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="bg-transparent outline-none text-sm w-full font-body focus-ring"
          />
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-8">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <span
              className="inline-block text-xs font-mono px-2 py-1 rounded-full mb-4"
              style={{ background: C.paperDk, color: C.green, border: `1px solid ${C.line}` }}
            >
              Est. Dehradun, Uttarakhand
            </span>
            <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] font-semibold" style={{ color: C.ink }}>
              Harvested in the hills.
              <br />
              <span style={{ color: C.green }}>Delivered to your door.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px]" style={{ color: "#4A5442" }}>
              Rice, honey, tea and preserves sourced directly from small growers around Dehradun,
              Mussoorie and the Kumaon hills — no middle stock, no long shelf life.
            </p>
          </div>
          <div
            className="rounded-2xl p-5 font-mono text-xs leading-relaxed"
            style={{ background: C.paperDk, border: `1px dashed ${C.line}`, color: "#4A5442" }}
          >
            <p style={{ color: C.ink }} className="font-medium mb-2">TODAY'S LEDGER</p>
            <p>· Free delivery over {inr(FREE_DELIVERY_OVER)}</p>
            <p>· Dispatched from our Rajpur Road store</p>
            <p>· Same-day packing, next-day delivery in Doon</p>
          </div>
        </div>
      </section>

      {/* ---------- category chips ---------- */}
      <div className="max-w-6xl mx-auto px-5 flex gap-2 flex-wrap pb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="text-sm px-4 py-1.5 rounded-full transition-colors focus-ring"
            style={
              category === c
                ? { background: C.green, color: C.paper }
                : { background: "transparent", color: C.ink, border: `1px solid ${C.line}` }
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* ---------- product grid ---------- */}
      <main className="max-w-6xl mx-auto px-5 pb-24">
        {items.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#6b7563" }}>
            <p className="font-display text-xl mb-1">Nothing on the shelf for that.</p>
            <p className="text-sm">Try another search or pick a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((p) => {
              const Icon = ICONS[p.icon];
              const qty = cart[p.id] || 0;
              return (
                <div
                  key={p.id}
                  className="rounded-2xl p-4 flex flex-col fade-in"
                  style={{ background: C.paperDk, border: `1px solid ${C.line}` }}
                >
                  <div className="w-full aspect-square mb-3 p-3">
                    <Icon />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wide" style={{ color: C.green }}>
                    {p.cat}
                  </span>
                  <h3 className="font-display font-semibold text-[15px] mt-0.5 leading-snug" style={{ color: C.ink }}>
                    {p.name}
                  </h3>
                  <p className="text-xs mt-1 mb-3 flex-1" style={{ color: "#5b6553" }}>
                    {p.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-mono font-medium text-sm" style={{ color: C.ink }}>
                        {inr(p.price)}
                      </span>
                      <span className="text-[11px] ml-1" style={{ color: "#8a927f" }}>
                        / {p.weight}
                      </span>
                    </div>
                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(p.id)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full focus-ring"
                        style={{ background: C.green, color: C.paper }}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 rounded-full px-1" style={{ background: C.paper, border: `1px solid ${C.line}` }}>
                        <button onClick={() => setQty(p.id, qty - 1)} className="p-1.5 focus-ring" aria-label={`Remove one ${p.name}`}>
                          <Minus size={12} style={{ color: C.ink }} />
                        </button>
                        <span className="font-mono text-xs w-4 text-center">{qty}</span>
                        <button onClick={() => setQty(p.id, qty + 1)} className="p-1.5 focus-ring" aria-label={`Add one more ${p.name}`}>
                          <Plus size={12} style={{ color: C.ink }} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-5 py-8 text-xs" style={{ color: "#8a927f", borderTop: `1px solid ${C.line}` }}>
        Doon Valley Store · Rajpur Road, Dehradun, Uttarakhand · Open 9am–8pm daily
      </footer>

      {/* ---------- cart drawer ---------- */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 fade-in">
          <div className="absolute inset-0" style={{ background: "rgba(38,48,31,0.35)" }} onClick={() => setCartOpen(false)} />
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm drawer-in flex flex-col"
            style={{ background: C.paper }}
          >
            {!orderPlaced ? (
              <>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
                  <h3 className="font-display font-semibold text-lg">Your bill</h3>
                  <button onClick={() => setCartOpen(false)} className="p-1 focus-ring" aria-label="Close cart">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {cartLines.length === 0 ? (
                    <p className="text-sm mt-8 text-center" style={{ color: "#8a927f" }}>
                      Your bill is empty. Add something from the shelf.
                    </p>
                  ) : (
                    <div className="space-y-4 font-mono text-sm">
                      {cartLines.map((l) => (
                        <div key={l.id} className="flex items-start gap-3">
                          <div className="w-10 h-10 shrink-0" style={{ opacity: 0.9 }}>
                            {(() => {
                              const Icon = ICONS[l.icon];
                              return <Icon />;
                            })()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body font-medium text-[13px] truncate" style={{ color: C.ink }}>
                              {l.name}
                            </p>
                            <p className="text-[11px]" style={{ color: "#8a927f" }}>
                              {inr(l.price)} × {l.qty}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 rounded-full px-1 shrink-0" style={{ background: C.paperDk, border: `1px solid ${C.line}` }}>
                            <button onClick={() => setQty(l.id, l.qty - 1)} className="p-1 focus-ring" aria-label={`Remove one ${l.name}`}>
                              <Minus size={11} />
                            </button>
                            <span className="text-xs w-4 text-center">{l.qty}</span>
                            <button onClick={() => setQty(l.id, l.qty + 1)} className="p-1 focus-ring" aria-label={`Add one more ${l.name}`}>
                              <Plus size={11} />
                            </button>
                          </div>
                          <span className="text-xs w-14 text-right shrink-0">{inr(l.price * l.qty)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cartLines.length > 0 && (
                  <div className="torn-edge px-5 pt-5 pb-6 font-mono text-sm" style={{ borderTop: `1px dashed ${C.line}` }}>
                    <div className="flex justify-between mb-1">
                      <span style={{ color: "#5b6553" }}>Subtotal</span>
                      <span>{inr(subtotal)}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span style={{ color: "#5b6553" }}>Delivery</span>
                      <span>{delivery === 0 ? "Free" : inr(delivery)}</span>
                    </div>
                    {delivery > 0 && (
                      <p className="text-[11px] mb-3" style={{ color: C.amber }}>
                        Add {inr(FREE_DELIVERY_OVER - subtotal)} more for free delivery
                      </p>
                    )}
                    <div className="flex justify-between font-semibold text-base mb-4 pt-2" style={{ borderTop: `1px solid ${C.line}`, color: C.ink }}>
                      <span>Total</span>
                      <span>{inr(total)}</span>
                    </div>
                    <button
                      onClick={placeOrder}
                      className="w-full rounded-full py-3 font-body font-medium text-sm flex items-center justify-center gap-2 focus-ring"
                      style={{ background: C.green, color: C.paper }}
                    >
                      Place order <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center fade-in">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 stamp-in"
                  style={{ border: `2px solid ${C.green}` }}
                >
                  <Check size={26} style={{ color: C.green }} />
                </div>
                <h3 className="font-display font-semibold text-xl mb-1">Order confirmed</h3>
                <p className="font-mono text-xs mb-4" style={{ color: "#8a927f" }}>
                  Receipt No. {orderNo}
                </p>
                <p className="text-sm mb-6" style={{ color: "#5b6553" }}>
                  Thanks for shopping local. Your order of {inr(total)} will be packed today and
                  delivered within 24 hours.
                </p>
                <button
                  onClick={closeReceipt}
                  className="rounded-full px-6 py-2.5 text-sm font-medium focus-ring"
                  style={{ background: C.ink, color: C.paper }}
                >
                  Back to shop
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
