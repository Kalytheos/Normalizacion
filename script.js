// Datos para las tablas de cada forma normal
const tableData = {
  original: [
    {
      title: "Tabla Original - Almacén de Venta de Zapatos",
      headers: ["Cliente", "Vendedor", "Producto", "Almacén", "Factura", "Proveedor"],
      rows: [
        ["Mario Luis", "Marco Polo", "Botas manchas", "Sede A", "Electrónica Física", "Payless"],
        ["Camilo", "Sergio", "Zapatillas", "Sede B", "Física", "Adidas"],
        ["Tulio", "Luna", "Botas Zapatos", "Sede A", "Electrónica", "Payless"],
        ["Lina", "Sol", "Zapatos", "Sede B", "Física", "Adidas"]
      ]
    }
  ],
  fn1: [
    {
      title: "Primera Forma Normal - Almacén de Venta de Zapatos",
      headers: [
        "Cliente_Nombre", 
        "Cliente_Apellido", 
        "Vendedor_Nombre", 
        "Vendedor_Apellido",
        "Producto_Nombre",
        "Producto_Marca",
        "Almacén_Sede",
        "Factura_Tipo",
        "Factura_Modalidad",
        "Proveedor_Nombre"
      ],
      rows: [
        ["Mario", "Luis", "Marco", "Polo", "Botas", "manchas", "Sede A", "Electrónica", "Física", "Payless"],
        ["Camilo", "", "Sergio", "", "Zapatillas", "", "Sede B", "", "Física", "Adidas"],
        ["Tulio", "", "Luna", "", "Botas", "Zapatos", "Sede A", "Electrónica", "", "Payless"],
        ["Lina", "", "Sol", "", "Zapatos", "", "Sede B", "", "Física", "Adidas"]
      ]
    }
  ],
  fn2: [
    {
      type: "2FN",
      tables: [
        {
          title: "Cliente",
          headers: ["IdCliente", "P_Nombre", "P_Apellido", "Teléfono", "Dirección"],
          rows: [["C001", "Mario", "Luis", "3001234567", "Calle 1 #23-45"]]
        },
        {
          title: "Vendedor",
          headers: ["IdVendedor", "P_Nombre", "P_Apellido", "Teléfono", "Dirección", "Correo"],
          rows: [["V001", "Marco", "Polo", "3112345678", "Calle 12 #34-56", "marco@email.com"]]
        },
        {
          title: "Productos",
          headers: ["IdProductos", "Marca", "Color", "Talla", "Precio"],
          rows: [["P001", "Botas manchas", "Negro", "40", "120000"]]
        },
        {
          title: "Almacén",
          headers: ["IdAlmacen", "Cantidad", "Disponibilidad", "IdProductos"],
          rows: [["A001", "50", "Disponible", "P001"]]
        },
        {
          title: "Proveedor",
          headers: ["IdProveedor", "IdProductos", "Teléfono", "Correo", "Dirección"],
          rows: [["PR001", "P001", "3991234567", "payless@email.com", "Zona Industrial 1"]]
        },
        {
          title: "Factura",
          headers: ["IdFactura", "NIT", "Dirección", "IdCliente", "IdVendedor", "IdProducto", "Fecha"],
          rows: [["F001", "900123456", "Sede Principal", "C001", "V001", "P001", "2023-08-21"]]
        }
      ]
    }
  ],
  fn3: [
    {
      type: "3FN",
      tables: [
        {
          title: "Persona",
          showInfo: true,
          headers: [
            "ID_persona",
            "Nombres",
            "Primer_Apellido",
            "Segundo_Apellido",
            "Correo",
            "Teléfono",
            "Dirección",
            "Es_Cliente",
            "Es_Vendedor"
          ]
        },
        {
          title: "Producto",
          headers: ["IdProducto", "Marca", "Color", "Talla", "Precio"],
          rows: [["P001", "Botas manchas", "Negro", "40", "120000"]]
        },
        {
          title: "Proveedor",
          headers: ["IdProveedor", "Teléfono", "Correo", "Dirección"],
          rows: [["PR001", "3991234567", "payless@email.com", "Zona Industrial 1"]]
        },
        {
          title: "Almacén",
          headers: ["IdAlmacen", "Cantidad", "IdProducto"],
          rows: [["A001", "50", "P001"]]
        },
        {
          title: "Factura",
          headers: ["IdFactura", "IdCliente", "IdVendedor", "IdProducto", "Fecha"],
          rows: [["F001", "C001", "V001", "P001", "2023-08-21"]]
        },
        {
          title: "Factura Detalle",
          headers: ["IdFactura", "IdProducto", "Cantidad", "Precio"],
          rows: [["F001", "P001", "2", "120000"]]
        }
      ]
    }
  ],
  creacion: [],
  consultas: [],
  extras: []
};

// Función para mostrar/ocultar el modal
function toggleModal() {
  const modal = document.getElementById('infoModal');
  modal.classList.toggle('active');
}

function closeModal() {
  const modal = document.getElementById('infoModal');
  modal.classList.remove('active');
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
  const modal = document.getElementById('infoModal');
  if (event.target === modal) {
    modal.classList.remove('active');
  }
}

// Función para crear una tabla HTML
function createTable(tableInfo) {
  if (tableInfo.type === "2FN" || tableInfo.type === "3FN") {
    return `
      <div class="normalized-section">
        <div class="normalized-form-title">${tableInfo.type === "2FN" ? "Segunda" : "Tercera"} Forma Normal (${tableInfo.type})</div>
        <div class="normalized-tables-grid">
          ${tableInfo.tables.map(table => `
            <div class="normalized-table-container">
              <div class="table-title">
                ${table.title}
                ${table.showInfo ? `<span class="info-icon" onclick="toggleModal()">i</span>` : ''}
              </div>
              <ul class="vertical-list">
                ${table.headers.map(header => `
                  <li>${header}</li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    return `
      <div class="table-container">
        <h3>${tableInfo.title}</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>${tableInfo.headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${tableInfo.rows.map(row => 
                `<tr>${row.map(cell => `<td>${cell || ''}</td>`).join('')}</tr>`
              ).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

// Función para mostrar el contenido
function showContent(id) {
  const sections = document.querySelectorAll('.content');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  
  // Actualizar estado de botones
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Encontrar y activar el botón correspondiente
  const activeButton = Array.from(buttons).find(btn => 
    btn.getAttribute('onclick') === `showContent('${id}')`
  );
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  // Renderizar tablas si es necesario
  if (id !== 'final' && id !== 'creacion' && id !== 'consultas' && id !== 'extras') {
    const tablesContainer = document.getElementById(id + '-tables');
    if (tableData[id] && tableData[id].length > 0) {
      tablesContainer.innerHTML = tableData[id].map(table => createTable(table)).join('');
    }
  }
}

// Inicializar la primera vista
document.addEventListener('DOMContentLoaded', () => {
  showContent('original');
});
