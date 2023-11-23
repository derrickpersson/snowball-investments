declare global {
	/// <reference types="stripe-event-types" />
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		interface PageData {
			user: User | null;
		}
		// interface Platform {}
	}
}

export {};
