import { LeetCode, Credential } from 'leetcode-query'

let leetcodeInstance: LeetCode | null = null

/**
 * Initializes the LeetCode client singleton with optional credentials.
 * Should be called during sign-in if a session cookie is provided.
 * 
 * @param sessionCookie - Optional LeetCode session cookie.
 * @returns The initialized LeetCode instance.
 */
export async function initializeLeetCodeClient(sessionCookie?: string): Promise<LeetCode> {
	if (sessionCookie && sessionCookie.trim()) {
		console.log('Initializing LeetCode client with session cookie.')
		const credential = new Credential()
		await credential.init(sessionCookie)
		leetcodeInstance = new LeetCode(credential)
	} else {
		console.log('Initializing LeetCode client for anonymous access.')
		leetcodeInstance = new LeetCode()
	}

	return leetcodeInstance
}

/**
 * Gets the singleton LeetCode client instance.
 * Initializes an anonymous client if it hasn't been initialized yet.
 * 
 * @returns The LeetCode instance.
 * @throws {Error} If the client fails to initialize.
 */
export async function getLeetCodeClient(sessionCookie?: string): Promise<LeetCode> {
	if (!leetcodeInstance) {
		console.log('LeetCode client not initialized. Initializing for anonymous access.')
		if (sessionCookie && sessionCookie.trim()) {
			const credential = new Credential()
			await credential.init(sessionCookie)
			leetcodeInstance = new LeetCode(credential)
		} else {
			leetcodeInstance = new LeetCode()
		}
	}

	return leetcodeInstance
}

/**
 * Resets the singleton instance (e.g., for sign-out).
 */
export function resetLeetCodeClient(): void {
    console.log('Resetting LeetCode client instance.')
    leetcodeInstance = null
} 