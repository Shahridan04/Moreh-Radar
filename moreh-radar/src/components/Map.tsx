'use client'

import { useEffect, useRef, useState } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import type { Mosque } from '@/lib/supabase'

// Fix default Leaflet icon issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom green pulsing icon for active mosques
const createActiveIcon = () =>
    L.divIcon({
        className: '',
        html: `<div class="pin-active" style="position:relative;width:24px;height:24px;"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    })

// Custom grey hollow icon for finished mosques
const createFinishedIcon = () =>
    L.divIcon({
        className: '',
        html: `<div class="pin-finished" style="width:20px;height:20px;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    })

// Custom blue target icon for user location
const createUserIcon = () =>
    L.divIcon({
        className: '',
        html: `<div class="pin-user" style="width:18px;height:18px;"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    })

type MapProps = {
    mosques: Mosque[]
    userLocation: [number, number] | null
    onPinClick: (mosque: Mosque) => void
    selectedMosque: Mosque | null
}

// Component to fly map to selected mosque
function FlyToMosque({ mosque }: { mosque: Mosque | null }) {
    const map = useMap()
    useEffect(() => {
        if (mosque) {
            map.flyTo([mosque.lat, mosque.lng], 16, { duration: 1.5 })
        }
    }, [mosque, map])
    return null
}

// Component to handle map click (deselect)
function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
    useMapEvents({
        click: () => onMapClick(),
    })
    return null
}

export default function RadarMap({
    mosques,
    userLocation,
    onPinClick,
    selectedMosque,
}: MapProps) {
    const mapRef = useRef<L.Map | null>(null)
    const [center] = useState<[number, number]>(
        userLocation || [3.1390, 101.6869] // KL center fallback
    )

    return (
        <div className="relative w-full h-full">
            {/* Radar sweep overlay */}
            <div className="radar-sweep" />

            {/* Map */}
            <MapContainer
                center={center}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
                zoomControl={true}
                ref={mapRef}
                attributionControl={false}
            >
                {/* CartoDB DarkMatter tiles for tactical look */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Map interactions */}
                <MapClickHandler onMapClick={() => { }} />
                <FlyToMosque mosque={selectedMosque} />

                {/* Mosque markers */}
                {mosques.map((mosque) => (
                    <Marker
                        key={mosque.id}
                        position={[mosque.lat, mosque.lng]}
                        icon={
                            mosque.status === 'ACTIVE'
                                ? createActiveIcon()
                                : createFinishedIcon()
                        }
                        eventHandlers={{
                            click: () => onPinClick(mosque),
                        }}
                    />
                ))}

                {/* User location marker */}
                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={createUserIcon()}
                    />
                )}
            </MapContainer>

            {/* Grid overlay for tactical look */}
            <div
                className="absolute inset-0 pointer-events-none z-[401]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    )
}
