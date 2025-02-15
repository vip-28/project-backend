export function isWithinRadius(userLat, userLng) {
    // const targetLat=22.68187127048084
    const targetLat=22.7195687  //TESTING PURPOSES 
    const targetLng=75.8577258 //TESTING PURPOSES
    // const targetLng=75.88036122571177
    const radius = 50
    const earthRadius = 6371000; // Earth radius in meters

    // Convert degrees to radians
    const toRadians = (deg) => (deg * Math.PI) / 180;

    const dLat = toRadians(userLat - targetLat);
    const dLng = toRadians(userLng - targetLng);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(targetLat)) * Math.cos(toRadians(userLat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in meters

    return distance <= radius;
}