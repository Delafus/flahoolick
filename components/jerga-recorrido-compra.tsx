const etapas = [
  'Comprende el problema',
  'Conoce una solución',
  'Asocia empresas',
  'Forma su lista',
  'Contacta proveedores',
]

export function JergaRecorridoCompra() {
  return (
    <figure className="jerga-buying-path" aria-labelledby="jerga-buying-path-title">
      <figcaption id="jerga-buying-path-title" className="jerga-buying-path__title">
        Antes del contacto comercial
      </figcaption>
      <ol className="jerga-buying-path__steps">
        {etapas.map((etapa, index) => (
          <li key={etapa} className="jerga-buying-path__step">
            <span className="jerga-buying-path__number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="jerga-buying-path__label">{etapa}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
