import { Component, OnInit } from '@angular/core';
import { GetImageService } from './get-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imgUrl: string = 'https://images.pexels.com/photos/258136/pexels-photo-258136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920';

  imageToShow: string | undefined;

  constructor(private imageService: GetImageService) { }

  ngOnInit(): void {
    // this.imageService.getImageF(this.imgUrl)
    //   .then((result: any) => this.createImageFromBlob(result))
    //   .catch((e: any) => console.error(e))
    this.imageService.getImage(this.imgUrl)
      .subscribe({
        next: (data: Blob) => this.createImageFromBlob(data),
        error: (error: any) => console.log(error)
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
    }
    reader.addEventListener('load', () =>
      this.imageToShow = 'url(' + reader.result + ')'
    )
    reader.addEventListener('error', () =>
      console.log(JSON.stringify(reader.error)))
  }
}
