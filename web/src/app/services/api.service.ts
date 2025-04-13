import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    apiStatus() {
        return this.http.get(`${environment.apiHost}/status`)
    }

    sendEmail(formData: Partial<{
        name: string | null | undefined,
        company: string | null | undefined,
        phone: string | null | undefined,
        email: string | null | undefined,
        subject: string | null | undefined,
        message: string | null | undefined
    }>) {
        return this.http.post(`${environment.apiHost}/email/send`, formData)
    }
}
