/**
 * #567 · Permutation in String
 *
 * Returns true if s2 contains any permutation of s1 as a substring.
 *
 * Uses a fixed-size sliding window with frequency maps:
 * - Expand the window across s2
 * - Track how many character frequencies exactly match s1
 * - Shrink when window exceeds s1 length
 * - A valid permutation exists when all target frequencies match
 *
 * @param s1 - Pattern string whose permutation to search for
 * @param s2 - Source string to search within
 * @returns True if any permutation of s1 exists in s2
 *
 * Time  O(n + m), n = s2.length, m = s1.length
 * Space O(k), k = number of unique characters in s1
 */
function checkInclusion(s1: string, s2: string): boolean {
    const targetFrequency = new Map<string, number>();
    const k = s1.length, m = s2.length;

    if (k > m) return false;

    for (const c of s1) targetFrequency.set(c, (targetFrequency.get(c) ?? 0) + 1);

    let left = 0;
    const windowFrequency = new Map<string, number>();
    let included = 0;

    for (let right = 0; right < m; right++) {
        const current = s2[right];
        const prevCount = windowFrequency.get(current) ?? 0;

        windowFrequency.set(current, prevCount + 1);

        // Credit only when crossing UP to exactly the target
        if (targetFrequency.has(current) && prevCount + 1 === targetFrequency.get(current)) included++;

        if (right - left + 1 > k) {
            const leftChar = s2[left++];
            const leftCount = windowFrequency.get(leftChar)!;
            
            if (leftCount - 1 === 0) windowFrequency.delete(leftChar);
            else windowFrequency.set(leftChar, leftCount - 1);


            // Debit only when crossing DOWN from exactly the target
            if (targetFrequency.has(leftChar) && leftCount === targetFrequency.get(leftChar)) included--;
        }

        if (right - left + 1 === k && included === targetFrequency.size) return true;
    }

    return false;
}
