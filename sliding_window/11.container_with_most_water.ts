/**
 * #11 · Container With Most Water
 *
 * Returns the maximum amount of water that can be contained between
 * two vertical lines in the height array.
 *
 * Uses a two-pointer greedy approach:
 * - Start with the widest possible container
 * - Compute area between left/right pointers
 * - Move the pointer at the shorter line inward, since moving the taller
 *   line cannot increase area while width decreases
 *
 * @param height - Array of non-negative line heights
 * @returns The maximum water area that can be contained
 *
 * Time  O(n), n = height.length
 * Space O(1)
 */
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const hLeft = height[left];
        const hRight = height[right];
        const width = right - left;

        maxWater = Math.max(maxWater, Math.min(hLeft, hRight) * width);

        if (hLeft < hRight) left++;
        else right--;
    }

    return maxWater;
}
