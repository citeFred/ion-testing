import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  standalone: false,
})
export class FileComponent implements OnInit {
  selectedFile: File | null = null;
  uploadedFileUrl: string | null = null; // 업로드된 파일 URL 저장
http: any;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  onUploadClick() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput.click();
  }

  // 파일 업로드 메서드
  uploadFile() {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log('File uploaded successfully', response);
          // 파일 업로드 후 추가 처리 필요 시 여기에 구현
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }

  // 파일 URL 가져오기 메서드
  getFileUrl(filename: string | undefined) {
    if (filename) {
      this.fileService.getFileUrl(filename).subscribe(
        (response: any) => {
          this.uploadedFileUrl = response.url; // 서버에서 받은 URL 저장
          console.log('File URL:', this.uploadedFileUrl);
        },
        (error) => {
          console.error('Error fetching file URL', error);
        }
      );
    } else {
      console.error('No filename provided');
    }
  }
}
