/**
 * Filtros fotográficos de JERGA. Primero convierten la imagen a luminancia y
 * después remapean sombras y luces a los dos colores de cada paleta.
 */
export function JergaDuotoneFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <defs>
        <filter id="jerga-duotone-rosa" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="
              0.2126 0.7152 0.0722 0 0
              0.2126 0.7152 0.0722 0 0
              0.2126 0.7152 0.0722 0 0
              0      0      0      1 0
            "
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 0.937255" />
            <feFuncG type="table" tableValues="0 0.615686" />
            <feFuncB type="table" tableValues="0 0.713725" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  )
}
