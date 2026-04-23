/**
 * #76 · Minimum Window Substring
 *
 * Returns the smallest substring of s that contains all characters of t
 * (including duplicates). If no such substring exists, returns "".
 *
 * Uses a sliding window with frequency maps:
 * - Expand right to satisfy all required character counts
 * - Shrink left greedily to maintain the minimum valid window
 *
 * @param s - source string to search within
 * @param t - target string whose characters must be included
 * @returns The minimum window substring of s containing all chars of t
 *
 * Time  O(n + m), n = s.length, m = t.length
 * Space O(k), k = number of unique characters in t
 */
function minWindow(s: string, t: string): string {
    if (!t.length || s.length < t.length) return "";

    const need = new Map<string, number>();
    for (const c of t) {
        need.set(c, (need.get(c) ?? 0) + 1);
    }

    const have = new Map<string, number>();
    let satisfied = 0;
    const required = need.size;

    let left = 0, bestStart = 0, bestLen = Infinity;

    for (let right = 0; right < s.length; right++) {
        const c = s[right];

        if (need.has(c)) {
            const newCount = (have.get(c) ?? 0) + 1;
            have.set(c, newCount);

            if (newCount === need.get(c)) {
                satisfied++;
            }
        }

        while (satisfied === required) {
            const windowLen = right - left + 1;
            if (windowLen < bestLen) {
                bestLen = windowLen;
                bestStart = left;
            }

            const l = s[left++];

            if (need.has(l)) {
                const newCount = (have.get(l) ?? 0) - 1;
                have.set(l, newCount);

                if (newCount < need.get(l)!) {
                    satisfied--;
                }
            }
        }
    }

    return bestLen === Infinity
        ? ""
        : s.substring(bestStart, bestStart + bestLen);
}
