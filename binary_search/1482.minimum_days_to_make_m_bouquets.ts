/**
 * #1482 · Minimum Number of Days to Make m Bouquets
 *
 * Returns the minimum number of days to wait until m bouquets of k adjacent
 * bloomed flowers can be made, or -1 if impossible.
 *
 * @param bloomDay - bloomDay[i] is the day flower i blooms
 * @param m        - number of bouquets required
 * @param k        - number of adjacent flowers per bouquet
 * @returns Minimum day on which m bouquets can be made, or -1 if impossible
 *
 * Time  O(n · log D),  D = max(bloomDay) − min(bloomDay)
 * Space O(1)
 */
function minDays(bloomDay: number[], m: number, k: number): number {
    const n = bloomDay.length;
    if (m * k > n) return -1; // Not enough flowers

    // Monotone predicate: if day d is viable, any day d' > d is also viable
    const canMakeBouquets = (day: number): boolean => {
        let bouquets = 0, consecutive = 0;

        for (let i = 0; i < n; i++) {
            if (bloomDay[i] > day) consecutive = 0;
            else {
                if (++consecutive === k) {
                    consecutive = 0;
                    if (++bouquets === m) return true; // early exit
                }
            }
        }

        return false;
    };

    let lo = bloomDay[0], hi = bloomDay[0];
    for (const day of bloomDay) {
        if (day < lo) lo = day;
        if (day > hi) hi = day;
    }
    // lo = earliest any flower blooms (tightest lower bound)
    // hi = latest any flower blooms   (tightest upper bound)

    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        
        // Find the leftmost day where the predicate is true
        canMakeBouquets(mid) ? (hi = mid) : (lo = mid + 1);
    }

    return lo; // lo === hi: leftmost valid day
}
