import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  public apiUrl = 'http://localhost:3000/api/file'; // 백엔드 API URL

  constructor(private http: HttpClient) {}

  // 파일 업로드 메서드
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      headers: new HttpHeaders({}),
    });
  }

  // 파일 URL 가져오기 메서드
  getFileUrl(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${filename}`);
  }
}
