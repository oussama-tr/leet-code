/**
 * #424 · Longest Repeating Character Replacement
 *
 * Returns the length of the longest substring that can be transformed into a
 * string with all identical characters by replacing at most k characters.
 *
 * Uses a sliding window where the frequency of characters and the count of
 * the most frequent character are tracked in the current window. The window 
 * is valid if the number of replacements needed (window size − max frequency)
 * does not exceed k.
 *
 * @param s - input string consisting of uppercase English letters
 * @param k - maximum number of allowed character replacements
 * @returns Length of the longest valid substring
 *
 * Time  O(n)
 * Space O(1)  (bounded by alphabet size)
 */
function characterReplacement(s: string, k: number): number {
    const freq = new Map<string, number>();
    let left = 0;
    let maxFreq = 0;
    let longest = 0;

    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        freq.set(c, (freq.get(c) ?? 0) + 1);
        maxFreq = Math.max(maxFreq, freq.get(c)!);

        while ((right - left + 1) - maxFreq > k) {
            const l = s[left++];
            freq.set(l, freq.get(l)! - 1);
        }

        longest = Math.max(longest, right - left + 1);
    }

    return longest;
}
