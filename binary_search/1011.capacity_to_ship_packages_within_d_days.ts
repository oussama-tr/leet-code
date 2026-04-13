/**
 * #1011 · Capacity To Ship Packages Within D Days
 *
 * Returns the minimum ship capacity to transport all weights in order
 * within days days, shipping each day as greedily as possible.
 *
 * @param weights - weights[i] is the weight of the i-th package
 * @param days    - maximum number of days allowed to ship all packages
 * @returns Minimum capacity such that all packages ship within days days
 *
 * Time  O(n · log S),  S = sum(weights)
 * Space O(1)
 */
function shipWithinDays(weights: number[], days: number): number {
    let lo = 0, hi = 0;
    for (const w of weights) {
        if (w > lo) lo = w; // Min viable: must fit heaviest package
        hi += w;            // Max viable: ship everything in one day
    }

    // Greedy check: pack each day as full as possible, count days needed
    const canShip = (capacity: number): boolean => {
        let daysNeeded = 1, currentLoad = 0;

        for (const w of weights) {
            if (currentLoad + w > capacity) {
                daysNeeded++;
                if (daysNeeded > days) return false; // Early exit
                currentLoad = 0;
            }
            currentLoad += w;
        }

        return true;
    };

    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        canShip(mid) ? (hi = mid) : (lo = mid + 1);
    }

    return lo; // lo == hi: smallest capacity that satisfies the constraint
}
