// script.js - carrito y comportamiento
document.getElementById('year').textContent = new Date().getFullYear();

let carrito = [];
let total = 0;

function actualizarVistaCarrito(){
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    carrito.forEach((item, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.nombre}</strong> <span style="float:right">$${item.precio.toFixed(2)}</span>
                        <div style="font-size:12px;margin-top:6px">
                          <button class="boton secondary" onclick="quitar(${idx})">Quitar</button>
                        </div>`;
        lista.appendChild(li);
    });
    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
}

function agregarAlCarritoDesdeBoton(e){
    if(!e.target.matches('.boton')) return;
    const btn = e.target;
    const nombre = btn.dataset ? btn.dataset.name : btn.getAttribute('data-name');
    const precio = parseFloat(btn.dataset ? btn.dataset.price : btn.getAttribute('data-price'));
    carrito.push({nombre, precio});
    total += precio;
    actualizarVistaCarrito();
}

document.addEventListener('click', agregarAlCarritoDesdeBoton);

function vaciarCarrito(){
    carrito = []; total = 0; actualizarVistaCarrito();
}
window.vaciarCarrito = vaciarCarrito;

function quitar(idx){
    if(carrito[idx]){
        total -= carrito[idx].precio;
        carrito.splice(idx,1);
        actualizarVistaCarrito();
    }
}
window.quitar = quitar;

document.getElementById('vaciar').addEventListener('click', vaciarCarrito);
document.getElementById('checkout').addEventListener('click', ()=>{
    if(carrito.length === 0){ alert('El carrito está vacío'); return; }
    const pedido = {id: 'ORD'+Date.now(), date: new Date().toISOString(), items: carrito, total: total};
    localStorage.setItem('coke_last_order', JSON.stringify(pedido));
    alert('Pedido simulado creado: ' + pedido.id + '\nRevisa localStorage para detalles.');
    vaciarCarrito();
});

// Contact form (simulado)
document.getElementById('contactForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    document.getElementById('contactStatus').textContent = 'Enviando...';
    setTimeout(()=>{ document.getElementById('contactStatus').textContent = 'Mensaje enviado. Te responderemos pronto.'; e.target.reset(); }, 800);
});
