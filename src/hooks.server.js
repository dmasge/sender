// In-memory store for request counts
import { error } from "@sveltejs/kit";
const requestCounts = {};


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const ip = event.getClientAddress();

    // Define the maximum number of requests and time window
    const maxRequests = 10;
    const windowMs = 10000;

    // Get the current count for the IP
    const currentCount = requestCounts[ip] || 0;

    // Increment the count for the IP
    requestCounts[ip] = currentCount + 1;

    // If the count exceeds the maximum, return an error response
    if (currentCount >= maxRequests) {
        throw error(
            429,
            `Too many requests. Please try again in ${windowMs / 1000} seconds.`,
        );
    }

    // Reset the count for the IP after the time window
    setTimeout(() => {
        delete requestCounts[ip];
    }, windowMs);


    const response = await resolve(event);
    return response;
}