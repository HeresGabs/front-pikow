<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import SectionTitle from './ui/SectionTitle.vue'
import SearchBar from './ui/SearchBar.vue'
import FilterPill from './ui/FilterPill.vue'

interface Store {
  name: string
  coords: [number, number]
}

const DEFAULT_CENTER: [number, number] = [47.7982, 3.5733]
const RADII = [10, 20, 30]

interface CitySuggestion {
  label: string
  coords: [number, number]
}

const search = ref('')
const radius = ref(30)
const center = ref<[number, number]>(DEFAULT_CENTER)
const stores = ref<Store[]>([])
const suggestions = ref<CitySuggestion[]>([])
const mapEl = ref<HTMLElement | null>(null)

let searchTimer: ReturnType<typeof setTimeout> | null = null
let skipNextSearch = false

let map: L.Map | null = null
let overlay: L.LayerGroup | null = null

const storeIcon = L.divIcon({
  className: '',
  iconSize: [28, 34],
  iconAnchor: [14, 34],
  popupAnchor: [0, -30],
  html: `<svg width="28" height="34" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.4 0 0 5.4 0 12c0 8.8 12 20 12 20s12-11.2 12-20C24 5.4 18.6 0 12 0z" fill="#2b35e8"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>`,
})

function toRad(value: number): number {
  return (value * Math.PI) / 180
}

function distanceKm(a: [number, number], b: [number, number]): number {
  const R = 6371
  const dLat = toRad(b[0] - a[0])
  const dLon = toRad(b[1] - a[1])
  const lat1 = toRad(a[0])
  const lat2 = toRad(b[0])
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(h))
}

function destination(
  origin: [number, number],
  distance: number,
  bearing: number
): [number, number] {
  const R = 6371
  const br = toRad(bearing)
  const lat1 = toRad(origin[0])
  const lon1 = toRad(origin[1])
  const dr = distance / R
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(dr) + Math.cos(lat1) * Math.sin(dr) * Math.cos(br)
  )
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(br) * Math.sin(dr) * Math.cos(lat1),
      Math.cos(dr) - Math.sin(lat1) * Math.sin(lat2)
    )
  return [(lat2 * 180) / Math.PI, (lon2 * 180) / Math.PI]
}

function generateStores(origin: [number, number]): Store[] {
  const specs = [
    { name: 'Pikow Store Centre', distance: 4, bearing: 35 },
    { name: 'Maison du Jeu', distance: 8, bearing: 320 },
    { name: 'Ludothèque Nord', distance: 13, bearing: 70 },
    { name: 'Carrefour des Jeux', distance: 17, bearing: 200 },
    { name: 'Boutique Sud', distance: 23, bearing: 150 },
    { name: 'Espace Loisirs Est', distance: 28, bearing: 110 },
    { name: 'Comptoir Ouest', distance: 34, bearing: 260 },
  ]
  return specs.map((s) => ({
    name: s.name,
    coords: destination(origin, s.distance, s.bearing),
  }))
}

function visibleStores(): Store[] {
  return stores.value.filter((s) => distanceKm(center.value, s.coords) <= radius.value)
}

function render() {
  if (!map || !overlay) return
  overlay.clearLayers()

  const circle = L.circle(center.value, {
    radius: radius.value * 1000,
    color: '#2b35e8',
    weight: 2,
    fillColor: '#2b35e8',
    fillOpacity: 0.08,
  }).addTo(overlay)

  L.circleMarker(center.value, {
    radius: 7,
    color: '#ffffff',
    weight: 2,
    fillColor: '#e7544b',
    fillOpacity: 1,
  })
    .bindPopup('Vous êtes ici')
    .addTo(overlay)

  visibleStores().forEach((s) => {
    L.marker(s.coords, { icon: storeIcon }).bindPopup(s.name).addTo(overlay!)
  })

  map.fitBounds(circle.getBounds(), { padding: [24, 24] })
}

function locateUser() {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      center.value = [pos.coords.latitude, pos.coords.longitude]
      stores.value = generateStores(center.value)
    },
    () => {},
    { enableHighAccuracy: true, timeout: 8000 }
  )
}

async function fetchCities(query: string) {
  const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=nom,centre,codesPostaux&boost=population&limit=5`
  try {
    const res = await fetch(url)
    const data = (await res.json()) as {
      nom: string
      centre?: { coordinates: [number, number] }
      codesPostaux?: string[]
    }[]
    suggestions.value = data
      .filter((c) => c.centre)
      .map((c) => ({
        label: c.codesPostaux?.length ? `${c.nom} (${c.codesPostaux[0]})` : c.nom,
        coords: [c.centre!.coordinates[1], c.centre!.coordinates[0]],
      }))
  } catch {
    suggestions.value = []
  }
}

function selectCity(city: CitySuggestion) {
  skipNextSearch = true
  search.value = city.label
  suggestions.value = []
  center.value = city.coords
  stores.value = generateStores(center.value)
}

function onSearch() {
  if (suggestions.value[0]) selectCity(suggestions.value[0])
}

watch(search, (query) => {
  if (skipNextSearch) {
    skipNextSearch = false
    return
  }
  if (searchTimer) clearTimeout(searchTimer)
  const value = query.trim()
  if (value.length < 2) {
    suggestions.value = []
    return
  }
  searchTimer = setTimeout(() => fetchCities(value), 250)
})

onMounted(() => {
  if (!mapEl.value) return
  map = L.map(mapEl.value, { scrollWheelZoom: false }).setView(center.value, 10)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(map)
  overlay = L.layerGroup().addTo(map)
  stores.value = generateStores(center.value)
  render()
  locateUser()
})

watch([radius, center, stores], render)

onBeforeUnmount(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <section class="bg-pikow-gray px-6 py-14">
    <div class="mx-auto max-w-5xl">
      <SectionTitle title="Nos magasins revendeurs" />

      <div class="mt-8 flex flex-col items-center gap-4">
        <div class="relative z-20 w-full max-w-md">
          <SearchBar v-model="search" placeholder="Rechercher une ville…" @keyup.enter="onSearch" />
          <ul
            v-if="suggestions.length"
            class="absolute top-full left-0 mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-lg"
          >
            <li
              v-for="city in suggestions"
              :key="city.label"
              class="cursor-pointer px-5 py-2.5 font-body text-sm text-pikow-ink transition hover:bg-pikow-gray"
              @click="selectCity(city)"
            >
              {{ city.label }}
            </li>
          </ul>
        </div>
        <div class="flex gap-2">
          <FilterPill
            v-for="r in RADII"
            :key="r"
            :label="`+${r}km`"
            :active="radius === r"
            @click="radius = r"
          />
        </div>
      </div>

      <div
        ref="mapEl"
        class="relative z-0 mt-6 h-105 w-full overflow-hidden rounded-2xl shadow-sm"
      />
    </div>
  </section>
</template>
