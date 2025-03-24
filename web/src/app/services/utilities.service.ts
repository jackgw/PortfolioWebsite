import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {
	darkMode = false;

	constructor(
		private router: Router
	) {
		const element = document.querySelector('html');

		// Determine default theme (light or dark) based on browser preferences
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.darkMode = true
			element?.classList.add('app-dark');
		}

		// Watch for changes in preferences
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			this.darkMode = event.matches;
			if (this.darkMode) {
				element?.classList.add('app-dark');
			} else {
				element?.classList.remove('app-dark');
			}
		});
	}

	/**
	 * Switches between dark and light mode.
	 */
	toggleDarkMode() {
		this.darkMode = !this.darkMode;
		const element = document.querySelector('html');
		element?.classList.toggle('app-dark');
	}

	/**
	 * Navigates to the specified URL
	 * @param useRouter Whether to route using the angular router (true) or window href (false).
	 * @param url The URL to be navigated to. Should be a relative URL from / when useRouter is true.
	 */
	navigate(useRouter: boolean, url: string) {
		useRouter ? this.router.navigateByUrl(url) : (location.href = url);
	}

	/**
	 * Navigates to a page using the angular router and scrolls to a specified element within that page
	 * @param route 
	 * @param elementId 
	 */
	scrollToPageElement(route: string, elementId: string) {
		this.router.navigateByUrl(route);
		
		// Slightly delay scroll to allow element to load in.
		setTimeout(() => {
			const element = document.getElementById(elementId);
			if (element) {
				element.scrollIntoView({behavior: "smooth"})
			}
		}, 100)
	}
}
