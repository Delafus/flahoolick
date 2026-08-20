export type GlossySolidKind = 'cube' | 'triangle'

interface Vector3 {
  x: number
  y: number
  z: number
}

interface GlossySolidOptions {
  kind: GlossySolidKind
  x: number
  y: number
  size: number
  rotationX: number
  rotationY: number
  rotationZ: number
  opacity?: number
}

const CUBE_VERTICES: Vector3[] = [
  { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
  { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
  { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
  { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 },
]

const CUBE_FACES = [
  [0, 3, 2, 1], [4, 5, 6, 7],
  [0, 1, 5, 4], [3, 7, 6, 2],
  [0, 4, 7, 3], [1, 2, 6, 5],
]

const TRIANGLE_VERTICES: Vector3[] = [
  { x: 0, y: -1.15, z: 0 },
  { x: -1, y: 0.7, z: 0.65 },
  { x: 1, y: 0.7, z: 0.65 },
  { x: 0, y: 0.7, z: -0.9 },
]

const TRIANGLE_FACES = [
  [0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2],
]

function rotate(point: Vector3, rotationX: number, rotationY: number, rotationZ: number): Vector3 {
  const cosX = Math.cos(rotationX)
  const sinX = Math.sin(rotationX)
  const yAfterX = point.y * cosX - point.z * sinX
  const zAfterX = point.z * cosX + point.y * sinX

  const cosY = Math.cos(rotationY)
  const sinY = Math.sin(rotationY)
  const xAfterY = point.x * cosY + zAfterX * sinY
  const zAfterY = zAfterX * cosY - point.x * sinY

  const cosZ = Math.cos(rotationZ)
  const sinZ = Math.sin(rotationZ)

  return {
    x: xAfterY * cosZ - yAfterX * sinZ,
    y: yAfterX * cosZ + xAfterY * sinZ,
    z: zAfterY,
  }
}

function subtract(a: Vector3, b: Vector3): Vector3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
}

function cross(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

function normalize(vector: Vector3): Vector3 {
  const length = Math.hypot(vector.x, vector.y, vector.z) || 1
  return { x: vector.x / length, y: vector.y / length, z: vector.z / length }
}

function dot(a: Vector3, b: Vector3) {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

const LIGHT = normalize({ x: -0.55, y: -0.75, z: 0.8 })

export function drawGlossySolid(ctx: CanvasRenderingContext2D, options: GlossySolidOptions) {
  const {
    kind,
    x,
    y,
    size,
    rotationX,
    rotationY,
    rotationZ,
    opacity = 1,
  } = options

  const sourceVertices = kind === 'cube' ? CUBE_VERTICES : TRIANGLE_VERTICES
  const faces = kind === 'cube' ? CUBE_FACES : TRIANGLE_FACES
  const vertices = sourceVertices.map(vertex => rotate(vertex, rotationX, rotationY, rotationZ))

  const visibleFaces = faces
    .map(indices => {
      const points = indices.map(index => vertices[index])
      let normal = normalize(cross(subtract(points[1], points[0]), subtract(points[2], points[0])))
      const centroid = points.reduce(
        (sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y, z: sum.z + point.z }),
        { x: 0, y: 0, z: 0 },
      )
      if (dot(normal, centroid) < 0) normal = { x: -normal.x, y: -normal.y, z: -normal.z }

      return {
        points,
        normal,
        z: points.reduce((sum, point) => sum + point.z, 0) / points.length,
      }
    })
    .filter(face => face.normal.z > 0.01)
    .sort((a, b) => a.z - b.z)

  ctx.save()
  ctx.globalAlpha = opacity
  ctx.lineJoin = 'round'

  visibleFaces.forEach(face => {
    const diffuse = Math.max(0, dot(face.normal, LIGHT))
    const brightness = Math.min(82, 8 + diffuse * 62 + face.normal.z * 12)
    const highlight = Math.min(105, brightness + 24)
    const shadow = Math.max(2, brightness * 0.28)
    const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size)
    gradient.addColorStop(0, `rgb(${highlight}, ${highlight}, ${highlight})`)
    gradient.addColorStop(0.38, `rgb(${brightness}, ${brightness}, ${brightness})`)
    gradient.addColorStop(1, `rgb(${shadow}, ${shadow}, ${shadow})`)

    ctx.beginPath()
    face.points.forEach((point, index) => {
      const px = x + point.x * size
      const py = y + point.y * size
      if (index === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    })
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
    ctx.lineWidth = Math.max(0.5, size * 0.045)
    ctx.stroke()
  })

  ctx.restore()
}
