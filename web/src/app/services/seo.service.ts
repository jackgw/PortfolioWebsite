import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
    constructor(private meta: Meta) { }

    updateTitle(title: string) {
        document.title = title;
        this.meta.updateTag({name: 'og:title', content: title});
        this.meta.updateTag({name: 'DC.title', content: title});
    }

    updateDescription(desc: string) {
        this.meta.updateTag({name: 'description', content: desc});
        this.meta.updateTag({name: 'og:description', content: desc});
    }

    updateKeywords(tags: string) {
        this.meta.updateTag({name: 'keywords', content: tags});
    }
}
