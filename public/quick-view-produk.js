(function () {
  // Quick View Produk - public script
  // Usage: include <script src="/quick-view-produk.js"></script> in your layout or page.
  // Add triggers with class "quick-view-trigger" and data attributes:
  // data-quickview-id, data-quickview-title, data-quickview-price, data-quickview-image, data-quickview-desc, data-quickview-brand

  if (typeof window === 'undefined') return;

  function formatPrice(value) {
    try {
      const n = Number(value);
      if (Number.isNaN(n)) return value;
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n);
    } catch (e) {
      return value;
    }
  }

  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'quickview-overlay fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4';
    overlay.style.backdropFilter = 'blur(2px)';

    const dialog = document.createElement('div');
    dialog.className = 'quickview-dialog bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden relative';
    dialog.style.maxHeight = '90vh';
    dialog.style.overflow = 'auto';

    overlay.appendChild(dialog);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.body.appendChild(overlay);

    function closeModal() {
      overlay.remove();
    }

    return { overlay, dialog, closeModal };
  }

  function buildContent(product, dialog, closeModal) {
    const container = document.createElement('div');
    container.className = 'p-6';

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 lg:grid-cols-2 gap-6';

    const left = document.createElement('div');
    left.className = 'space-y-4';

    const mainImageWrap = document.createElement('div');
    mainImageWrap.className = 'bg-gray-50 rounded border p-4 flex items-center justify-center h-80';
    const mainImg = document.createElement('img');
    mainImg.src = product.images && product.images.length ? product.images[0] : '/image/logo/logo-primary.png';
    mainImg.alt = product.title || 'Product Image';
    mainImg.className = 'max-h-full object-contain';
    mainImageWrap.appendChild(mainImg);

    const thumbs = document.createElement('div');
    thumbs.className = 'flex items-center gap-3 overflow-x-auto';
    (product.images || []).forEach((src) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'w-16 h-16 rounded border p-1 bg-white flex items-center justify-center';
      const t = document.createElement('img');
      t.src = src;
      t.className = 'max-h-full object-contain';
      t.alt = product.title || 'thumb';
      b.appendChild(t);
      b.addEventListener('click', () => (mainImg.src = src));
      thumbs.appendChild(b);
    });

    left.appendChild(mainImageWrap);
    left.appendChild(thumbs);

    const right = document.createElement('div');
    right.className = 'space-y-4';

    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold';
    title.textContent = product.title || 'Title Produk';

    const ratingRow = document.createElement('div');
    ratingRow.className = 'flex items-center gap-3 text-sm text-yellow-500';
    ratingRow.innerHTML = `<span>★★★★★</span><span class="text-gray-500 text-xs">(4.7 dari 5)</span>`;

    const price = document.createElement('div');
    price.className = 'text-2xl font-bold text-orange-500';
    price.textContent = product.price ? formatPrice(product.price) : 'Rp -';

    const meta = document.createElement('div');
    meta.className = 'text-sm text-gray-500';
    meta.innerHTML = product.brand ? `Merek: <strong class="text-gray-700">${product.brand}</strong>` : '';

    const options = document.createElement('div');
    options.className = 'space-y-3';
    const row = document.createElement('div');
    row.className = 'flex items-center gap-3';
    const label = document.createElement('div');
    label.className = 'text-sm text-gray-600 w-24';
    label.textContent = 'Ukuran';
    const select = document.createElement('select');
    select.className = 'flex-1 rounded border p-2';
    ['S','M','L','XL','42'].forEach((opt)=>{ const o = document.createElement('option'); o.value = opt; o.textContent = opt; select.appendChild(o); });
    row.appendChild(label);
    row.appendChild(select);
    options.appendChild(row);

    const actions = document.createElement('div');
    actions.className = 'flex items-center gap-3';

    const qtyWrap = document.createElement('div');
    qtyWrap.className = 'flex items-center border rounded overflow-hidden';
    const minus = document.createElement('button'); minus.type='button'; minus.className='px-3 bg-gray-100'; minus.textContent='-';
    const qty = document.createElement('input'); qty.type='number'; qty.value='1'; qty.min='1'; qty.className='w-12 text-center';
    const plus = document.createElement('button'); plus.type='button'; plus.className='px-3 bg-gray-100'; plus.textContent='+';
    minus.addEventListener('click', () => { if (Number(qty.value) > 1) qty.value = String(Number(qty.value) - 1); });
    plus.addEventListener('click', () => { qty.value = String(Number(qty.value) + 1); });
    qtyWrap.appendChild(minus); qtyWrap.appendChild(qty); qtyWrap.appendChild(plus);

    const addToCart = document.createElement('button');
    addToCart.type='button'; addToCart.className='flex-1 inline-flex items-center justify-center rounded bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3'; addToCart.textContent='TAMBAH KE KERANJANG';
    const buyNow = document.createElement('button'); buyNow.type='button'; buyNow.className='inline-flex items-center justify-center rounded border border-orange-500 text-orange-500 font-semibold px-4 py-3'; buyNow.textContent='BELI SEKARANG';

    actions.appendChild(qtyWrap); actions.appendChild(addToCart); actions.appendChild(buyNow);

    const desc = document.createElement('div'); desc.className='text-sm text-gray-600'; desc.innerHTML=product.description||'Deskripsi singkat produk...';

    right.appendChild(title); right.appendChild(ratingRow); right.appendChild(price); right.appendChild(meta); right.appendChild(options); right.appendChild(actions); right.appendChild(desc);

    grid.appendChild(left); grid.appendChild(right);
    container.appendChild(grid);

    const dialogInner = document.createElement('div'); dialogInner.className='quickview-inner'; dialogInner.appendChild(container);

    const closeBtn = document.createElement('button'); closeBtn.type='button'; closeBtn.className='absolute top-3 right-3 rounded-full bg-white p-2 border'; closeBtn.innerHTML='&#10005;';
    closeBtn.addEventListener('click', () => { if (typeof dialog.closeModal === 'function') dialog.closeModal(); else { const overlay=document.querySelector('.quickview-overlay'); if (overlay) overlay.remove(); }});

    const wrapper = document.createElement('div'); wrapper.className='relative'; wrapper.appendChild(closeBtn); wrapper.appendChild(dialogInner);

    dialog.appendChild(wrapper);

    addToCart.addEventListener('click', () => { console.log('Add to cart:', { id: product.id, qty: qty.value }); alert('Produk ditambahkan ke keranjang (demo)'); });
    buyNow.addEventListener('click', () => { console.log('Buy now:', { id: product.id, qty: qty.value }); alert('Beli sekarang (demo)'); });
  }

  async function fetchProduct(id) {
    try {
      const res = await fetch('/api/products/' + encodeURIComponent(id));
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      return data;
    } catch (e) { return null; }
  }

  async function showQuickViewFromElement(el) {
    const id = el.getAttribute('data-quickview-id');
    const fallback = {
      id,
      title: el.getAttribute('data-quickview-title') || el.getAttribute('data-title') || 'Produk',
      price: el.getAttribute('data-quickview-price') || el.getAttribute('data-price') || null,
      images: el.getAttribute('data-quickview-image') ? [el.getAttribute('data-quickview-image')] : (el.getAttribute('data-images') ? el.getAttribute('data-images').split(',') : []),
      description: el.getAttribute('data-quickview-desc') || '',
      brand: el.getAttribute('data-quickview-brand') || '',
    };

    const modal = createModal();
    const { dialog, closeModal } = modal;
    dialog.closeModal = closeModal;
    dialog.innerHTML = '<div class="p-8 text-center">Memuat...</div>';
    const product = (await fetchProduct(id)) || fallback;
    if (product.images && typeof product.images === 'string') product.images = product.images.split(',');
    dialog.innerHTML = '';
    buildContent(product, dialog, closeModal);
  }

  function initQuickView() {
    document.querySelectorAll('.quick-view-trigger, [data-quickview-id]').forEach((el) => {
      el.addEventListener('click', function (e) { e.preventDefault(); showQuickViewFromElement(el); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initQuickView); else initQuickView();

  window.QuickViewProduk = { init: initQuickView, showFromElement: showQuickViewFromElement };
})();
