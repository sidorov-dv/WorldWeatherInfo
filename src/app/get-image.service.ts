import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  imageToShow: string | undefined;

  constructor(private httpClient: HttpClient) { }

  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  async getImageF(imageUrl: string): Promise<Blob> {
    let resp = await fetch(imageUrl);
    let result = await resp.blob();
    return result;
  }

  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  //   reader.addEventListener('load', () => {
  //     this.imageToShow = 'url(' + reader.result + ')';
  //     console.log(this.imageToShow);
  //   })
  //   reader.addEventListener('error', () =>
  //     console.log(JSON.stringify(reader.error)))
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred: ', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened. Please try again later.');
  }
}
