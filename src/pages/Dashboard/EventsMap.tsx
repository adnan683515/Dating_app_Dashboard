import {
    GoogleMap,
    Marker,
    useLoadScript,
} from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import sequreApi from "../../axios/axiosSequre";

const containerStyle = {
    width: "100%",
    height: "600px",
};

const center = {
    lat: 23.8103,
    lng: 90.4125,
};


const mapStyles = [
    {
        elementType: "geometry",
        stylers: [{ color: "#1e1e1e" }],
    },

    {
        elementType: "labels.text.fill",
        stylers: [{ color: "#E5E7EB" }], // light gray (soft white)
    },

    {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#111827" }], // dark stroke → better readability
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#EC4899" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#F9A8D4" }], // lighter pink
    },

    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0f172a" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93C5FD" }],
    },

    // 🏙 POI (disable clutter)
    {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
    },
];

// API
const fetchEvents = async () => {
    const res = await sequreApi.get(
        "/event/getEventsForAdmin?fields=-openDoor,-start_date_time,-lineupMember,-end_date_time,-tags,-descripton,-createdAt,-updatedAt,-status,-fee,-category,-venue,-isDelete,-location"
    );
    return res.data.data?.data;
};





export default function EventsMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const { data: events, isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    if (!isLoaded) return <p>Loading Map...</p>;
    if (isLoading) return <p>Loading Events...</p>;

    // Color
    const getColor = (attendance: number) => {
        if (attendance > 20) return "#EC4899";
        if (attendance > 10) return "#C7B268";
        return "#22c55e";
    };

    // SAFE marker (no newline issue)
    const getMarker = (color: string) => ({
        url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <!-- Thin pin shape -->
            <path 
                d="M32 2C21 2 13 10.5 13 22c0 10.5 6.5 20.5 19 36 
                   c12.5-15.5 19-25.5 19-36C51 10.5 43 2 32 2z" 
                fill="${color}" 
                stroke="white" 
                stroke-width="1.2"
            />

            <!-- Small inner circle -->
            <circle cx="32" cy="22" r="3" fill="white"/>
        </svg>
    `),
        scaledSize: isLoaded
            ? new window.google.maps.Size(45, 45)
            : undefined,
    });


    console.log(selectedEvent)

    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                options={{
                    styles: mapStyles,
                    disableDefaultUI: true,
                }}
            >

                {/* MARKERS */}
                {events?.map((event: {
                    _id: string,
                    title: string,
                    user: string,
                    category: {
                        _id: string,
                        name: string
                    },
                    addRess : string,
                    lat: number,
                    long: number,
                    image: string,
                    serviceFee: number,
                    attendanceTotal: number
                }) => {
                    const lat = event.lat;
                    const lng = event.long;

                    // ❗ skip only truly invalid
                    if (isNaN(lat) || isNaN(lng)) {
                        console.log("INVALID:", event);
                        return null;
                    }

                    return (
                        <Marker
                            key={event._id}
                            position={{ lat, lng }}
                            icon={getMarker(
                                getColor(event.attendanceTotal || 0)
                            )}
                            onClick={() => setSelectedEvent(event)}
                        />
                    );
                })}
            </GoogleMap>

            {/* MODAL */}
            {selectedEvent && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                    onClick={() => setSelectedEvent(null)}
                >
                    <div className=" w-[80%] sm:w-[20%]"
                        style={{
                      
                            background: "#fff",
                            borderRadius: "12px",
                            overflow: "hidden",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={
                                selectedEvent.image ||
                                "https://via.placeholder.com/320x150"
                            }
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                            }}
                        />

                        <div style={{ padding: "12px" }}>
                            <h2>{selectedEvent.title}</h2>

                            <p>
                                📂 {selectedEvent.category?.name}
                            </p>

                            <p>
                                👥 {selectedEvent.attendanceTotal || 0}
                            </p>

                            <p style={{ fontSize: "12px" }}>
                                📍 {selectedEvent.addRess ?? ""}
                           
                            </p>

                            <button
                                onClick={() => setSelectedEvent(null)}
                                style={{
                                    marginTop: "10px",
                                    background: "#EC4899",
                                    color: "#fff",
                                    padding: "6px 12px",
                                    border: "none",
                                    borderRadius: "6px",
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}