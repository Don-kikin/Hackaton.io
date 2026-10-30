(function iniciarModuloOfertas() {
  if (window.ofertasInicializadas) return;
  window.ofertasInicializadas = true;

  const PRODUCTS = [
    {
      id: 101,
      name: "Mancuernas hexagonales 20 kg (par)",
      cat: "Mancuernas",
      price: 1890,
      old: 2700,
      img: "assets/products/mancuernas.jpg"
    },
    {
      id: 102,
      name: "Barra olímpica 20 kg",
      cat: "Barras y Discos",
      price: 3290,
      old: 4390,
      img: "assets/products/barra-olimpica.jpg"
    },
    {
      id: 103,
      name: "Discos bumper 10 kg (par)",
      cat: "Barras y Discos",
      price: 1490,
      old: 1990,
      img: "https://safesport.cl/wp-content/uploads/2025/05/1-700x700.jpg"
    },
    {
      id: 104,
      name: "Kettlebell 16 kg recubierta",
      cat: "Mancuernas",
      price: 790,
      old: 1150,
      img: "https://dojiw2m9tvv09.cloudfront.net/17331/product/pesa-rusa-16-kilos-azul-foto016153.png?60&time=1745727144"
    },
    {
      id: 105,
      name: "Banco Multiposición GMP",
      cat: "Equipos",
      price: 2590,
      old: 3490,
      img: "https://tse1.mm.bing.net/th/id/OIP.rIBaXwat6zPC2bjOMh0RVAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      id: 106,
      name: "Muñequeras de soporte profesional",
      cat: "Accesorios",
      price: 249,
      old: 420,
      img: "https://sdmed.cl/wp-content/uploads/2024/02/web5-11.png"
    },
    {
      id: 107,
      name: "Cinturón de levantamiento 10mm",
      cat: "Accesorios",
      price: 690,
      old: 990,
      img: "assets/products/cinturon.jpg"
    },
    {
      id: 108,
      name: "Straps de agarre antideslizante",
      cat: "Accesorios",
      price: 179,
      old: 299,
      img: "https://contents.mediadecathlon.com/m26892866/k$dc3b45c4b42e8cd9c0a50492ade80b11/picture.jpg?format=auto&f=969x0"
    },
    {
      id: 109,
      name: "Half Rack Plegable de Pared",
      cat: "Equipos",
      price: 4490,
      old: 6000,
      img: "https://tse1.mm.bing.net/th/id/OIP.xWujzXyo75-E7JlbgRScaAHaHa?r=0&pid=ImgDet&w=474&h=474&rs=1&o=7&rm=3"
    },
    {
      id: 110,
      name: "Proteína whey 2 kg",
      cat: "Suplementos",
      price: 849,
      old: 1299,
      img: "https://contents.mediadecathlon.com/p2573280/k$a6d2c9489303277ce6f653cf03759c22/sq/proteina-whey-gold-standard-double-rich-chocolat-22kg.jpg?format=auto&f=800x0"
    },
    {
      id: 111,
      name: "Creatina monohidratada 300 g",
      cat: "Suplementos",
      price: 399,
      old: 560,
      img: "https://tse2.mm.bing.net/th/id/OIP.RCpXn_6rc7tbmOPV8pl-mwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      id: 112,
      name: "Pre-entreno 30 porciones",
      cat: "Suplementos",
      price: 529,
      old: 790,
      img: "https://tse4.mm.bing.net/th/id/OIP.iC513y_zRimwzOw_8HIQHQHaJf?r=0&rs=1&pid=ImgDetMain&o=7&rm=3  "
    }
  ];

  // Mismas 6 categorías que en Equipamiento Destacado
  const CATS = [
    "Todos",
    "Mancuernas",
    "Barras y Discos",
    "Equipos",
    "Accesorios",
    "Suplementos"
  ];

  const pct = p => Math.round((1 - p.price / p.old) * 100);
  const SORTS = [
    ["Mayor descuento", (a, b) => pct(b) - pct(a)],
    ["Precio: menor a mayor", (a, b) => a.price - b.price],
    ["Precio: mayor a mayor", (a, b) => b.price - a.price]
  ];
  const money = n => "$" + n.toLocaleString("es-MX");
  const $ = id => document.getElementById(id);
  let cat = "Todos", sort = 0;

  function renderTabs() {
    if ($("tabs")) {
      $("tabs").innerHTML = CATS.map(c =>
        `<li role="presentation"><button role="tab" aria-selected="${c === cat}" data-c="${c}">${c}</button></li>`
      ).join("");
    }
  }

  function renderSort() {
    if ($("sortMenu")) {
      $("sortMenu").innerHTML = SORTS.map((s, i) =>
        `<li><button class="dropdown-item ${i === sort ? "active" : ""}" data-s="${i}">${s[0]}</button></li>`
      ).join("");
    }
  }

  function renderGrid() {
    if (!$("grid") || !$("count")) return;
    const list = PRODUCTS.filter(p => cat === "Todos" || p.cat === cat).sort(SORTS[sort][1]);
    $("count").textContent = list.length + (list.length === 1 ? " producto en descuento" : " productos en descuento");
    $("grid").innerHTML = list.length ? list.map(p => `
      <div class="col">
        <article class="sc-item">
          <div class="sc-tile">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <span class="sc-badge">-${pct(p)}%</span>
            <button class="btn sc-add" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">Agregar</button>
          </div>
          <div class="sc-info">
            <div><span class="sc-now">${money(p.price)}</span><span class="sc-was">${money(p.old)}</span></div>
            <div class="sc-name">${p.name}</div>
            <div class="sc-cat">${p.cat}</div>
          </div>
        </article>
      </div>`).join("") : `<p class="sc-empty">No hay ofertas en esta categoría por ahora.</p>`;
  }

  // Temporizador al próximo domingo a las 23:59:59
  const END = (() => {
    const fin = new Date();
    const diasParaDomingo = (7 - fin.getDay()) % 7;
    fin.setDate(fin.getDate() + diasParaDomingo);
    fin.setHours(23, 59, 59, 999);
    if (fin <= new Date()) fin.setDate(fin.getDate() + 7);
    return fin;
  })();

  function tick() {
    const t = Math.max(0, END - new Date()) / 1000;
    const v = [
      Math.floor(t / 86400),
      Math.floor((t % 86400) / 3600),
      Math.floor((t % 3600) / 60),
      Math.floor(t % 60)
    ];
    ["d", "h", "m", "s"].forEach((id, i) => {
      const el = $(id);
      if (el) el.textContent = String(v[i]).padStart(2, "0");
    });
  }

  function arrancar() {
    if ($("total")) $("total").textContent = PRODUCTS.length;
    renderTabs();
    renderSort();
    renderGrid();
    tick();
    setInterval(tick, 1000);

    document.addEventListener("click", e => {
      const tabBtn = e.target.closest("[data-c]");
      if (tabBtn) {
        cat = tabBtn.dataset.c;
        renderTabs();
        renderGrid();
      }

      const sortBtn = e.target.closest("[data-s]");
      if (sortBtn) {
        sort = +sortBtn.dataset.s;
        renderSort();
        renderGrid();
      }

      const addBtn = e.target.closest("[data-add]");
      if (addBtn) {
        const p = PRODUCTS.find(x => x.id === +addBtn.dataset.add);
        if (p) {
          document.dispatchEvent(new CustomEvent("agregar-producto", {
            detail: {
              id: p.id,
              nombre: p.name + " (Oferta)",
              precio: p.price,
              imagen: p.img
            }
          }));
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", arrancar);
  } else {
    arrancar();
  }
})();